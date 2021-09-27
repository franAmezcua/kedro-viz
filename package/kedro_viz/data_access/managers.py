# Copyright 2021 QuantumBlack Visual Analytics Limited
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
# OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
# NONINFRINGEMENT. IN NO EVENT WILL THE LICENSOR OR OTHER CONTRIBUTORS
# BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN
# ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF, OR IN
# CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
#
# The QuantumBlack Visual Analytics Limited ("QuantumBlack") name and logo
# (either separately or in combination, "QuantumBlack Trademarks") are
# trademarks of QuantumBlack. The License does not grant you any right or
# license to the QuantumBlack Trademarks. You may not use the QuantumBlack
# Trademarks or any confusingly similar mark as a trademark for your product,
# or use the QuantumBlack Trademarks in any other manner that might cause
# confusion in the marketplace, including but not limited to in advertising,
# on websites, or on software.
#
# See the License for the specific language governing permissions and
# limitations under the License.
"""`kedro_viz.data_access.managers` defines data access managers."""
from collections import defaultdict
from typing import Dict, List, Union
import networkx as nx

from kedro.io import DataCatalog
from kedro.pipeline import Pipeline as KedroPipeline
from kedro.pipeline.node import Node as KedroNode

from kedro_viz.models.graph import (
    DataNode,
    GraphEdge,
    GraphNode,
    ParametersNode,
    RegisteredPipeline,
    TaskNode,
    TranscodedDataNode,
    ModularPipeline,
    ModularPipelineChild,
)

from .repositories import (
    CatalogRepository,
    GraphEdgesRepository,
    GraphNodesRepository,
    LayersRepository,
    ModularPipelinesRepository,
    RegisteredPipelinesRepository,
    TagsRepository,
)


# pylint: disable=too-many-instance-attributes,missing-function-docstring
class DataAccessManager:
    """Centralised interface for the rest of the application to interact with data repositories."""

    def __init__(self):
        self.catalog = CatalogRepository()
        self.nodes = GraphNodesRepository()
        self.edges = GraphEdgesRepository()
        self.registered_pipelines = RegisteredPipelinesRepository()
        self.tags = TagsRepository()
        self.modular_pipelines = ModularPipelinesRepository()
        self.node_dependencies = defaultdict(set)
        self.layers = LayersRepository()

    def add_catalog(self, catalog: DataCatalog):
        self.catalog.set_catalog(catalog)

    def add_pipelines(self, pipelines: Dict[str, KedroPipeline]):
        for pipeline_key, pipeline in pipelines.items():
            self.add_pipeline(pipeline_key, pipeline)

        # todo: scope modular pipeline tree to registered pipelines
        self.set_modular_pipelines_tree()

    def add_pipeline(self, pipeline_key: str, pipeline: KedroPipeline):
        """Iterate through all the nodes and datasets in a "registered" pipeline
        and add them to relevant repositories. Take care of extracting other relevant information
        such as modular pipelines, layers, etc. and add them to relevant repositories.

        The purpose of this method is to construct a set of repositories of Viz-specific domian models
        from raw Kedro object before feeding them to the API serialisation layer.
        """
        self.registered_pipelines.add_pipeline(pipeline_key)
        free_inputs = pipeline.inputs()

        for node in pipeline.nodes:
            task_node = self.add_node(pipeline_key, node)
            self.registered_pipelines.add_node(pipeline_key, task_node.id)

            current_modular_pipeline = (
                self.modular_pipelines.add_modular_pipeline_from_node(task_node)
            )

            # Add node inputs as DataNode to the graph
            for input_ in node.inputs:
                is_free_input = input_ in free_inputs
                input_node = self.add_node_input(
                    pipeline_key, input_, task_node, is_free_input
                )
                self.registered_pipelines.add_node(pipeline_key, input_node.id)
                if isinstance(input_node, TranscodedDataNode):
                    input_node.transcoded_versions.add(self.catalog.get_dataset(input_))

                self.modular_pipelines.add_modular_pipeline_from_node(input_node)

                if current_modular_pipeline is not None:
                    self.modular_pipelines.add_modular_pipeline_input(
                        current_modular_pipeline, input_node
                    )

            # Add node outputs as DataNode to the graph
            # Similar reasoning to the inputs procedure.
            for output in node.outputs:
                output_node = self.add_node_output(pipeline_key, output, task_node)
                self.registered_pipelines.add_node(pipeline_key, output_node.id)
                if isinstance(output_node, TranscodedDataNode):
                    output_node.original_name = output
                    output_node.original_version = self.catalog.get_dataset(output)

                self.modular_pipelines.add_modular_pipeline_from_node(output_node)

                if current_modular_pipeline is not None:
                    self.modular_pipelines.add_modular_pipeline_output(
                        current_modular_pipeline, output_node
                    )

    def add_node(self, pipeline_key: str, node: KedroNode) -> TaskNode:
        task_node: TaskNode = self.nodes.add_node(GraphNode.create_task_node(node))
        task_node.add_pipeline(pipeline_key)
        self.tags.add_tags(task_node.tags)
        return task_node

    def add_node_input(
        self,
        pipeline_key: str,
        input_dataset: str,
        task_node: TaskNode,
        is_free_input: bool = False,
    ) -> Union[DataNode, TranscodedDataNode, ParametersNode]:
        graph_node = self.add_dataset(
            pipeline_key, input_dataset, is_free_input=is_free_input
        )
        graph_node.tags.update(task_node.tags)
        self.edges.add_edge(GraphEdge(source=graph_node.id, target=task_node.id))
        self.node_dependencies[graph_node.id].add(task_node.id)

        if isinstance(graph_node, ParametersNode):
            self.add_parameters_to_task_node(
                parameters_node=graph_node, task_node=task_node
            )
        return graph_node

    def add_node_output(
        self, pipeline_key: str, output_dataset: str, task_node: TaskNode
    ) -> Union[DataNode, TranscodedDataNode, ParametersNode]:
        graph_node = self.add_dataset(pipeline_key, output_dataset)
        graph_node.tags.update(task_node.tags)
        self.edges.add_edge(GraphEdge(source=task_node.id, target=graph_node.id))
        self.node_dependencies[task_node.id].add(graph_node.id)
        return graph_node

    def add_dataset(
        self, pipeline_key: str, dataset_name: str, is_free_input: bool = False
    ) -> Union[DataNode, TranscodedDataNode, ParametersNode]:
        obj = self.catalog.get_dataset(dataset_name)
        layer = self.catalog.get_layer_for_dataset(dataset_name)
        graph_node: Union[DataNode, TranscodedDataNode, ParametersNode]
        if self.catalog.is_dataset_param(dataset_name):
            graph_node = GraphNode.create_parameters_node(
                full_name=dataset_name,
                layer=layer,
                tags=set(),
                parameters=obj,
            )
        else:
            graph_node = GraphNode.create_data_node(
                full_name=dataset_name,
                layer=layer,
                tags=set(),
                dataset=obj,
                is_free_input=is_free_input,
            )
        graph_node = self.nodes.add_node(graph_node)
        graph_node.add_pipeline(pipeline_key)
        return graph_node

    @staticmethod
    def add_parameters_to_task_node(
        parameters_node: ParametersNode, task_node: TaskNode
    ):
        if parameters_node.is_all_parameters():
            task_node.parameters = parameters_node.parameter_value
        else:
            task_node.parameters[
                parameters_node.parameter_name
            ] = parameters_node.parameter_value

    def get_default_selected_pipeline(self) -> RegisteredPipeline:
        default_pipeline = RegisteredPipeline(id="__default__")
        return (
            default_pipeline
            if self.registered_pipelines.has_pipeline(default_pipeline.id)
            else self.registered_pipelines.as_list()[0]
        )

    def set_layers(self, layers: List[str]):
        self.layers.set_layers(layers)

    def set_modular_pipelines_tree(self):
        tree_node_ids = self.modular_pipelines.expand_tree()
        print(len(tree_node_ids))
        dangling_ids = set(self.nodes.as_dict().keys()) - tree_node_ids
        modular_pipelines_tree = self.modular_pipelines.as_dict()

        # turn all modular pipelines in the tree into a graph node for visualisation,
        # except for the artificial root node.
        for modular_pipeline_id, modular_pipeline in modular_pipelines_tree.items():
            if modular_pipeline_id == "__root__":
                continue

            self.nodes.add_node(
                GraphNode.create_modular_pipeline_node(modular_pipeline_id)
            )

            # Okay, here be dragons:
            # What we consider as a modular pipeline's inputs, i.e. the ones visualised as dotted nodes in focus mode,
            # are the inputs that don't serve as outputs for some nodes in the same modular pipeline
            # and vice versa.
            #
            # Here is an example. Let's say the modular pipeline has the following structure:
            #   A -> node(f) -> B -> node(g) -> C
            #
            # We consider A as an input for the modular pipeline and not B, C because
            # A isn't an output of any node in this same pipeline.
            # Similarly, we consider C as an output for the modular pipeline because
            # C isn't an input of any node in this same pipeline.
            #
            # Based on the observation above, the code below is what remove all intermediate inputs and outputs
            # and leave only the valid inputs and outputs for the current modular pipeline:
            modular_pipeline.inputs, modular_pipeline.outputs = (
                modular_pipeline.inputs - modular_pipeline.outputs,
                modular_pipeline.outputs - modular_pipeline.inputs,
            )

            for input_ in modular_pipeline.inputs:
                self.edges.add_edge(
                    GraphEdge(source=input_, target=modular_pipeline_id)
                )
                self.node_dependencies[input_].add(modular_pipeline_id)
            for output in modular_pipeline.outputs:
                self.edges.add_edge(
                    GraphEdge(source=modular_pipeline_id, target=output)
                )
                self.node_dependencies[modular_pipeline_id].add(output)

        # After adding modular pipeline nodes into the graph,
        # There is a chance that the graph contains cycle if
        # users construct their modular pipelines in a few particular ways.
        # To detect the cycles, we simply search for all reachable
        # descendants of a modular pipeline node and check if
        # any of them is an input into this modular pipeline.
        # If found, we will simply throw away the edge between
        # the bad input and the modular pipeline.
        # N.B.: when fully expanded, the graph will still be a fully connected valid DAG.
        #
        # We leverage networkx to help with graph traversal
        digraph = nx.DiGraph()
        for edge in self.edges.as_list():
            digraph.add_edge(edge.source, edge.target)

        for modular_pipeline_id, modular_pipeline in modular_pipelines_tree.items():
            if not digraph.has_node(modular_pipeline_id):
                continue
            descendants = nx.descendants(digraph, modular_pipeline_id)
            bad_inputs = modular_pipeline.inputs.intersection(descendants)
            for bad_input in bad_inputs:
                digraph.remove_edge(bad_input, modular_pipeline_id)
                self.edges.remove_edge(GraphEdge(bad_input, modular_pipeline_id))
                self.node_dependencies[bad_input].remove(modular_pipeline_id)

        for node_id, node in self.nodes.as_dict().items():
            if node_id in dangling_ids:
                modular_pipelines_tree["__root__"].children.add(
                    ModularPipelineChild(node.id, node.type)
                )

    def get_modular_pipelines_tree(self) -> Dict[str, ModularPipeline]:
        return self.modular_pipelines.as_dict()
