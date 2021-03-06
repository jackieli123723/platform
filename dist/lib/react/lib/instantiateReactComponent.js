define('node_modules/react/lib/instantiateReactComponent', function(require, exports, module) {

  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule instantiateReactComponent
   */
  
  'use strict';
  
  var _prodInvariant = require('node_modules/react/lib/reactProdInvariant'),
      _assign = require('node_modules/object-assign/index');
  
  var ReactCompositeComponent = require('node_modules/react/lib/ReactCompositeComponent');
  var ReactEmptyComponent = require('node_modules/react/lib/ReactEmptyComponent');
  var ReactHostComponent = require('node_modules/react/lib/ReactHostComponent');
  var ReactInstrumentation = require('node_modules/react/lib/ReactInstrumentation');
  
  var invariant = require('node_modules/fbjs/lib/invariant');
  var warning = require('node_modules/fbjs/lib/warning');
  
  // To avoid a cyclic dependency, we create the final class in this module
  var ReactCompositeComponentWrapper = function (element) {
    this.construct(element);
  };
  _assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent.Mixin, {
    _instantiateReactComponent: instantiateReactComponent
  });
  
  function getDeclarationErrorAddendum(owner) {
    if (owner) {
      var name = owner.getName();
      if (name) {
        return ' Check the render method of `' + name + '`.';
      }
    }
    return '';
  }
  
  function getDisplayName(instance) {
    var element = instance._currentElement;
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else if (instance.getName) {
      return instance.getName() || 'Unknown';
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  }
  
  /**
   * Check if the type reference is a known internal type. I.e. not a user
   * provided composite type.
   *
   * @param {function} type
   * @return {boolean} Returns true if this is a valid internal type.
   */
  function isInternalComponentType(type) {
    return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
  }
  
  var nextDebugID = 1;
  
  /**
   * Given a ReactNode, create an instance that will actually be mounted.
   *
   * @param {ReactNode} node
   * @param {boolean} shouldHaveDebugID
   * @return {object} A new instance of the element's constructor.
   * @protected
   */
  function instantiateReactComponent(node, shouldHaveDebugID) {
    var instance;
  
    if (node === null || node === false) {
      instance = ReactEmptyComponent.create(instantiateReactComponent);
    } else if (typeof node === 'object') {
      var element = node;
      !(element && (typeof element.type === 'function' || typeof element.type === 'string')) ? 'development' !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', element.type == null ? element.type : typeof element.type, getDeclarationErrorAddendum(element._owner)) : _prodInvariant('130', element.type == null ? element.type : typeof element.type, getDeclarationErrorAddendum(element._owner)) : void 0;
  
      // Special case string values
      if (typeof element.type === 'string') {
        instance = ReactHostComponent.createInternalComponent(element);
      } else if (isInternalComponentType(element.type)) {
        // This is temporarily available for custom components that are not string
        // representations. I.e. ART. Once those are updated to use the string
        // representation, we can drop this code path.
        instance = new element.type(element);
  
        // We renamed this. Allow the old name for compat. :(
        if (!instance.getHostNode) {
          instance.getHostNode = instance.getNativeNode;
        }
      } else {
        instance = new ReactCompositeComponentWrapper(element);
      }
    } else if (typeof node === 'string' || typeof node === 'number') {
      instance = ReactHostComponent.createInstanceForText(node);
    } else {
      !false ? 'development' !== 'production' ? invariant(false, 'Encountered invalid React node of type %s', typeof node) : _prodInvariant('131', typeof node) : void 0;
    }
  
    if ('development' !== 'production') {
      'development' !== 'production' ? warning(typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.getHostNode === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.') : void 0;
    }
  
    // These two fields are used by the DOM and ART diffing algorithms
    // respectively. Instead of using expandos on components, we should be
    // storing the state needed by the diffing algorithms elsewhere.
    instance._mountIndex = 0;
    instance._mountImage = null;
  
    if ('development' !== 'production') {
      if (shouldHaveDebugID) {
        var debugID = nextDebugID++;
        instance._debugID = debugID;
        var displayName = getDisplayName(instance);
        ReactInstrumentation.debugTool.onSetDisplayName(debugID, displayName);
        var owner = node && node._owner;
        if (owner) {
          ReactInstrumentation.debugTool.onSetOwner(debugID, owner._debugID);
        }
      } else {
        instance._debugID = 0;
      }
    }
  
    // Internal instances should fully constructed at this point, so they should
    // not get any new fields added to them at this point.
    if ('development' !== 'production') {
      if (Object.preventExtensions) {
        Object.preventExtensions(instance);
      }
    }
  
    return instance;
  }
  
  module.exports = instantiateReactComponent;

});
