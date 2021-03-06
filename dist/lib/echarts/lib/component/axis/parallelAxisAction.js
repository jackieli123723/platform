define('node_modules/echarts/lib/component/axis/parallelAxisAction', function(require, exports, module) {

  
  
      var echarts = require('node_modules/echarts/lib/echarts');
  
      /**
       * @payload
       * @property {string} parallelAxisId
       * @property {Array.<Array.<number>>} intervals
       */
      var actionInfo = {
          type: 'axisAreaSelect',
          event: 'axisAreaSelected',
          update: 'updateVisual'
      };
      echarts.registerAction(actionInfo, function (payload, ecModel) {
          ecModel.eachComponent(
              {mainType: 'parallelAxis', query: payload},
              function (parallelAxisModel) {
                  parallelAxisModel.axis.model.setActiveIntervals(payload.intervals);
              }
          );
      });
  
      /**
       * @payload
       */
      echarts.registerAction('parallelAxisExpand', function (payload, ecModel) {
          ecModel.eachComponent(
              {mainType: 'parallel', query: payload},
              function (parallelModel) {
                  parallelModel.setAxisExpand(payload);
              }
          );
  
      });
  

});
