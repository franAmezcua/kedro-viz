import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import sortBy from 'lodash.sortby';

import {
  toggleModularPipelineActive,
  toggleModularPipelineFilter,
} from '../../actions/modular-pipelines';
import { toggleTypeDisabled } from '../../actions/node-type';
import { getNodeTypes, getNodeTypeIDs } from '../../selectors/node-types';
import {
  getModularPipelineIDs,
  getModularPipelineTree,
} from '../../selectors/modular-pipelines';
import { getFilteredModularPipelineItems } from './node-list-items';
import {
  getNodeDataObject,
  getNodeSelected,
  getNodeModularPipelines,
  getInputOutputNodesForFocusedModularPipeline,
} from '../../selectors/nodes';
import { loadNodeData } from '../../actions/nodes';
import NodeListTreeItem from './node-list-tree-item';
import VisibleIcon from '../icons/visible';
import InvisibleIcon from '../icons/invisible';

const GROUPED_NODES_DISPLAY_ORDER = {
  modularPipeline: 0,
  task: 1,
  data: 2,
  parameter: 3,
};

// please note that this setup is unique for initialization of the material-ui tree,
// and setup is only used here and not anywhere else in the app.
const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const StyledTreeView = withStyles({
  root: {
    padding: '0 0 0 20px',
  },
})(TreeView);

const isModularPipelineType = (type) => type === 'modularPipeline';

const getModularPipelineRowData = ({ id, name, enabled, focusMode }) => ({
  id: id,
  name: name,
  type: 'modularPipeline',
  icon: 'modularPipeline',
  visibleIcon: VisibleIcon,
  invisibleIcon: InvisibleIcon,
  active: false,
  selected: false,
  faded: false,
  visible: true,
  enabled: true,
  disabled: focusMode && focusMode?.id !== id,
  checked: true,
});

const TreeListProvider = ({
  nodes,
  nodeSelected,
  onToggleNodeSelected,
  searchValue,
  modularPipelines,
  filteredModularPipelineItems,
  modularPipelineIds,
  modularPipelineTree,
  nodeModularPipelines,
  onItemChange,
  onItemMouseEnter,
  onItemMouseLeave,
  nodeTypeIDs,
  searching,
  focusMode,
  inputOutputDataNodes,
}) => {
  const classes = useStyles();

  const onItemClick = useCallback(
    (item) => {
      if (!isModularPipelineType(item.type)) {
        onToggleNodeSelected(item.id);
      }
    },
    [onToggleNodeSelected]
  );

  const renderLeafNode = useCallback(
    (nodeID) => (
      <NodeListTreeItem
        data={nodes[nodeID]}
        onItemMouseEnter={onItemMouseEnter}
        onItemMouseLeave={onItemMouseLeave}
        onItemChange={onItemChange}
        onItemClick={onItemClick}
        key={nodeID}
        focusMode={focusMode}
      />
    ),
    [
      nodes,
      focusMode,
      onItemChange,
      onItemMouseEnter,
      onItemMouseLeave,
      onItemClick,
    ]
  );

  const renderModularPipelineTree = useCallback(
    (key) => {
      const node = modularPipelineTree[key];

      if (key === '__root__') {
        return node?.children.map((child) =>
          renderModularPipelineTree(child.id)
        );
      }

      return (
        <NodeListTreeItem
          data={getModularPipelineRowData({
            ...node,
            focusMode,
          })}
          onItemMouseEnter={onItemMouseEnter}
          onItemMouseLeave={onItemMouseLeave}
          onItemChange={onItemChange}
          onItemClick={onItemClick}
          key={node.id}
          focusMode={focusMode}>
          {sortBy(
            node.children,
            (child) => GROUPED_NODES_DISPLAY_ORDER[child.type],
            (child) => nodes[child.id]?.name
          ).map((child) =>
            isModularPipelineType(child.type)
              ? renderModularPipelineTree(child.id)
              : renderLeafNode(child.id)
          )}
        </NodeListTreeItem>
      );
    },
    [
      nodes,
      focusMode,
      onItemChange,
      onItemMouseEnter,
      onItemMouseLeave,
      onItemClick,
      modularPipelineTree,
      renderLeafNode,
    ]
  );

  return searching ? (
    <StyledTreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      // expanded={expandedPipelines}
      key="tree-search">
      {/* render set of modular pipelines in the main pipeline */}
      {/* {renderModularPipelines(treeData, false)} */}
      {/* render set of node elements in the main pipeline */}
      {/* {renderChildNodes(treeData)} */}
    </StyledTreeView>
  ) : (
    <StyledTreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      key="tree">
      {renderModularPipelineTree('__root__')}
    </StyledTreeView>
  );
};

export const mapStateToProps = (state) => ({
  nodes: getNodeDataObject(state),
  nodeSelected: getNodeSelected(state),
  nodeModularPipelines: getNodeModularPipelines(state),
  types: getNodeTypes(state),
  nodeTypeIDs: getNodeTypeIDs(state),
  modularPipelineIds: getModularPipelineIDs(state),
  modularPipelineTree: getModularPipelineTree(state),
  filteredModularPipelineItems: getFilteredModularPipelineItems(state),
  inputOutputDataNodes: getInputOutputNodesForFocusedModularPipeline(state),
});

export const mapDispatchToProps = (dispatch) => ({
  onToggleModularPipelineActive: (modularPipelineIDs, active) => {
    dispatch(toggleModularPipelineActive(modularPipelineIDs, active));
  },
  onToggleModularPipelineFilter: (modularPipelineIDs, enabled) => {
    dispatch(toggleModularPipelineFilter(modularPipelineIDs, enabled));
  },
  onToggleTypeDisabled: (typeID, disabled) => {
    dispatch(toggleTypeDisabled(typeID, disabled));
  },
  onToggleNodeSelected: (nodeID) => {
    dispatch(loadNodeData(nodeID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeListProvider);
