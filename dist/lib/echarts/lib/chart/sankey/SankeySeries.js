define('node_modules/echarts/lib/chart/sankey/SankeySeries', function(require, exports, module) {

  /**
   * @file Get initial data and define sankey view's series model
   * @author Deqing Li(annong035@gmail.com)
   */
  
  
      var SeriesModel = require('node_modules/echarts/lib/model/Series');
      var createGraphFromNodeEdge = require('node_modules/echarts/lib/chart/helper/createGraphFromNodeEdge');
  
      var SankeySeries = SeriesModel.extend({
  
          type: 'series.sankey',
  
          layoutInfo: null,
  
          /**
           * Init a graph data structure from data in option series
           *
           * @param  {Object} option  the object used to config echarts view
           * @return {module:echarts/data/List} storage initial data
           */
          getInitialData: function (option) {
              var links = option.edges || option.links;
              var nodes = option.data || option.nodes;
              if (nodes && links) {
                  var graph = createGraphFromNodeEdge(nodes, links, this, true);
                  return graph.data;
              }
          },
  
          /**
           * Return the graphic data structure
           *
           * @return {module:echarts/data/Graph} graphic data structure
           */
          getGraph: function () {
              return this.getData().graph;
          },
  
          /**
           * Get edge data of graphic data structure
           *
           * @return {module:echarts/data/List} data structure of list
           */
          getEdgeData: function () {
              return this.getGraph().edgeData;
          },
  
          /**
           * @override
           */
          formatTooltip: function (dataIndex, multipleSeries, dataType) {
              // dataType === 'node' or empty do not show tooltip by default
              if (dataType === 'edge') {
                  var params = this.getDataParams(dataIndex, dataType);
                  var rawDataOpt = params.data;
                  var html = rawDataOpt.source + ' -- ' + rawDataOpt.target;
                  if (params.value) {
                      html += ' : ' + params.value;
                  }
                  return html;
              }
  
              return SankeySeries.superCall(this, 'formatTooltip', dataIndex, multipleSeries);
          },
  
          defaultOption: {
              zlevel: 0,
              z: 2,
  
              coordinateSystem: 'view',
  
              layout: null,
  
              // the position of the whole view
              left: '5%',
              top: '5%',
              right: '20%',
              bottom: '5%',
  
              // the dx of the node
              nodeWidth: 20,
  
              // the vertical distance between two nodes
              nodeGap: 8,
  
              // the number of iterations to change the position of the node
              layoutIterations: 32,
  
              label: {
                  normal: {
                      show: true,
                      position: 'right',
                      textStyle: {
                          color: '#000',
                          fontSize: 12
                      }
                  },
                  emphasis: {
                      show: true
                  }
              },
  
              itemStyle: {
                  normal: {
                      borderWidth: 1,
                      borderColor: '#333'
                  }
              },
  
              lineStyle: {
                  normal: {
                      color: '#314656',
                      opacity: 0.2,
                      curveness: 0.5
                  },
                  emphasis: {
                      opacity: 0.6
                  }
              },
  
              animationEasing: 'linear',
  
              animationDuration: 1000
          }
  
      });
  
      module.exports = SankeySeries;
  
  

});
