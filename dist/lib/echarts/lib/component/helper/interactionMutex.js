define('node_modules/echarts/lib/component/helper/interactionMutex', function(require, exports, module) {

  
  
      var ATTR = '\0_ec_interaction_mutex';
  
      var interactionMutex = {
  
          take: function (zr, resourceKey, userKey) {
              var store = getStore(zr);
              store[resourceKey] = userKey;
          },
  
          release: function (zr, resourceKey, userKey) {
              var store = getStore(zr);
              var uKey = store[resourceKey];
  
              if (uKey === userKey) {
                  store[resourceKey] = null;
              }
          },
  
          isTaken: function (zr, resourceKey) {
              return !!getStore(zr)[resourceKey];
          }
      };
  
      function getStore(zr) {
          return zr[ATTR] || (zr[ATTR] = {});
      }
  
      /**
       * payload: {
       *     type: 'takeGlobalCursor',
       *     key: 'dataZoomSelect', or 'brush', or ...,
       *         If no userKey, release global cursor.
       * }
       */
      require('node_modules/echarts/lib/echarts').registerAction(
          {type: 'takeGlobalCursor', event: 'globalCursorTaken', update: 'update'},
          function () {}
      );
  
      module.exports = interactionMutex;
  

});
