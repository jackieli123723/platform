define('node_modules/echarts/lib/coord/parallel/parallelPreprocessor', function(require, exports, module) {

  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var modelUtil = require('node_modules/echarts/lib/util/model');
  
      module.exports = function (option) {
          createParallelIfNeeded(option);
          mergeAxisOptionFromParallel(option);
      };
  
      /**
       * Create a parallel coordinate if not exists.
       * @inner
       */
      function createParallelIfNeeded(option) {
          if (option.parallel) {
              return;
          }
  
          var hasParallelSeries = false;
  
          zrUtil.each(option.series, function (seriesOpt) {
              if (seriesOpt && seriesOpt.type === 'parallel') {
                  hasParallelSeries = true;
              }
          });
  
          if (hasParallelSeries) {
              option.parallel = [{}];
          }
      }
  
      /**
       * Merge aixs definition from parallel option (if exists) to axis option.
       * @inner
       */
      function mergeAxisOptionFromParallel(option) {
          var axes = modelUtil.normalizeToArray(option.parallelAxis);
  
          zrUtil.each(axes, function (axisOption) {
              if (!zrUtil.isObject(axisOption)) {
                  return;
              }
  
              var parallelIndex = axisOption.parallelIndex || 0;
              var parallelOption = modelUtil.normalizeToArray(option.parallel)[parallelIndex];
  
              if (parallelOption && parallelOption.parallelAxisDefault) {
                  zrUtil.merge(axisOption, parallelOption.parallelAxisDefault, false);
              }
          });
      }
  
  

});
