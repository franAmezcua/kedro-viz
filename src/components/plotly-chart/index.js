import React from 'react';
import Plot from 'react-plotly.js';

/**
 * Display plotly chart
 * @param {object} chartSize Chart dimensions in pixels
 * @param {object} targetRect event.target.getBoundingClientRect()
 * @param {boolean} visible Whether to show the tooltip
 * @param {string} text Tooltip display label
 */
const PlotlyChart = ({ data, layout }) => {
  return (
    <div>
      <Plot data={data} layout={layout} />
    </div>
  );
};

PlotlyChart.defaultProps = {
  data: {},
  layout: {},
};

export default PlotlyChart;
