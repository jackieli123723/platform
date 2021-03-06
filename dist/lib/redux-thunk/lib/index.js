define('node_modules/redux-thunk/lib/index', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  function createThunkMiddleware(extraArgument) {
    return function (_ref) {
      var dispatch = _ref.dispatch;
      var getState = _ref.getState;
      return function (next) {
        return function (action) {
          if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
          }
  
          return next(action);
        };
      };
    };
  }
  
  var thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  
  exports['default'] = thunk;

});
