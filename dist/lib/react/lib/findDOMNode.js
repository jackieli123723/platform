define('node_modules/react/lib/findDOMNode', function(require, exports, module) {

  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule findDOMNode
   */
  
  'use strict';
  
  var _prodInvariant = require('node_modules/react/lib/reactProdInvariant');
  
  var ReactCurrentOwner = require('node_modules/react/lib/ReactCurrentOwner');
  var ReactDOMComponentTree = require('node_modules/react/lib/ReactDOMComponentTree');
  var ReactInstanceMap = require('node_modules/react/lib/ReactInstanceMap');
  
  var getHostComponentFromComposite = require('node_modules/react/lib/getHostComponentFromComposite');
  var invariant = require('node_modules/fbjs/lib/invariant');
  var warning = require('node_modules/fbjs/lib/warning');
  
  /**
   * Returns the DOM node rendered by this element.
   *
   * See https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode
   *
   * @param {ReactComponent|DOMElement} componentOrElement
   * @return {?DOMElement} The root node of this element.
   */
  function findDOMNode(componentOrElement) {
    if ('development' !== 'production') {
      var owner = ReactCurrentOwner.current;
      if (owner !== null) {
        'development' !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : void 0;
        owner._warnedAboutRefsInRender = true;
      }
    }
    if (componentOrElement == null) {
      return null;
    }
    if (componentOrElement.nodeType === 1) {
      return componentOrElement;
    }
  
    var inst = ReactInstanceMap.get(componentOrElement);
    if (inst) {
      inst = getHostComponentFromComposite(inst);
      return inst ? ReactDOMComponentTree.getNodeFromInstance(inst) : null;
    }
  
    if (typeof componentOrElement.render === 'function') {
      !false ? 'development' !== 'production' ? invariant(false, 'findDOMNode was called on an unmounted component.') : _prodInvariant('44') : void 0;
    } else {
      !false ? 'development' !== 'production' ? invariant(false, 'Element appears to be neither ReactComponent nor DOMNode (keys: %s)', Object.keys(componentOrElement)) : _prodInvariant('45', Object.keys(componentOrElement)) : void 0;
    }
  }
  
  module.exports = findDOMNode;

});
