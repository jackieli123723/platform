define('node_modules/react/lib/ReactDOM', function(require, exports, module) {

  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOM
   */
  
  /* globals __REACT_DEVTOOLS_GLOBAL_HOOK__*/
  
  'use strict';
  
  var ReactDOMComponentTree = require('node_modules/react/lib/ReactDOMComponentTree');
  var ReactDefaultInjection = require('node_modules/react/lib/ReactDefaultInjection');
  var ReactMount = require('node_modules/react/lib/ReactMount');
  var ReactReconciler = require('node_modules/react/lib/ReactReconciler');
  var ReactUpdates = require('node_modules/react/lib/ReactUpdates');
  var ReactVersion = require('node_modules/react/lib/ReactVersion');
  
  var findDOMNode = require('node_modules/react/lib/findDOMNode');
  var getHostComponentFromComposite = require('node_modules/react/lib/getHostComponentFromComposite');
  var renderSubtreeIntoContainer = require('node_modules/react/lib/renderSubtreeIntoContainer');
  var warning = require('node_modules/fbjs/lib/warning');
  
  ReactDefaultInjection.inject();
  
  var React = {
    findDOMNode: findDOMNode,
    render: ReactMount.render,
    unmountComponentAtNode: ReactMount.unmountComponentAtNode,
    version: ReactVersion,
  
    /* eslint-disable camelcase */
    unstable_batchedUpdates: ReactUpdates.batchedUpdates,
    unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
  };
  
  // Inject the runtime into a devtools global hook regardless of browser.
  // Allows for debugging when the hook is injected on the page.
  /* eslint-enable camelcase */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
      ComponentTree: {
        getClosestInstanceFromNode: ReactDOMComponentTree.getClosestInstanceFromNode,
        getNodeFromInstance: function (inst) {
          // inst is an internal instance (but could be a composite)
          if (inst._renderedComponent) {
            inst = getHostComponentFromComposite(inst);
          }
          if (inst) {
            return ReactDOMComponentTree.getNodeFromInstance(inst);
          } else {
            return null;
          }
        }
      },
      Mount: ReactMount,
      Reconciler: ReactReconciler
    });
  }
  
  if ('development' !== 'production') {
    var ExecutionEnvironment = require('node_modules/fbjs/lib/ExecutionEnvironment');
    if (ExecutionEnvironment.canUseDOM && window.top === window.self) {
  
      // First check if devtools is not installed
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
        // If we're in Chrome or Firefox, provide a download link if not installed.
        if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
          // Firefox does not have the issue with devtools loaded over file://
          var showFileUrlMessage = window.location.protocol.indexOf('http') === -1 && navigator.userAgent.indexOf('Firefox') === -1;
          console.debug('Download the React DevTools ' + (showFileUrlMessage ? 'and use an HTTP server (instead of a file: URL) ' : '') + 'for a better development experience: ' + 'https://fb.me/react-devtools');
        }
      }
  
      var testFunc = function testFn() {};
      'development' !== 'production' ? warning((testFunc.name || testFunc.toString()).indexOf('testFn') !== -1, 'It looks like you\'re using a minified copy of the development build ' + 'of React. When deploying React apps to production, make sure to use ' + 'the production build which skips development warnings and is faster. ' + 'See https://fb.me/react-minification for more details.') : void 0;
  
      // If we're in IE8, check to see if we are in compatibility mode and provide
      // information on preventing compatibility mode
      var ieCompatibilityMode = document.documentMode && document.documentMode < 8;
  
      'development' !== 'production' ? warning(!ieCompatibilityMode, 'Internet Explorer is running in compatibility mode; please add the ' + 'following tag to your HTML to prevent this from happening: ' + '<meta http-equiv="X-UA-Compatible" content="IE=edge" />') : void 0;
  
      var expectedFeatures = [
      // shims
      Array.isArray, Array.prototype.every, Array.prototype.forEach, Array.prototype.indexOf, Array.prototype.map, Date.now, Function.prototype.bind, Object.keys, String.prototype.split, String.prototype.trim];
  
      for (var i = 0; i < expectedFeatures.length; i++) {
        if (!expectedFeatures[i]) {
          'development' !== 'production' ? warning(false, 'One or more ES5 shims expected by React are not available: ' + 'https://fb.me/react-warning-polyfills') : void 0;
          break;
        }
      }
    }
  }
  
  module.exports = React;

});
