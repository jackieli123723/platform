define('node_modules/react/lib/ReactDOMTextarea', function(require, exports, module) {

  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMTextarea
   */
  
  'use strict';
  
  var _prodInvariant = require('node_modules/react/lib/reactProdInvariant'),
      _assign = require('node_modules/object-assign/index');
  
  var DisabledInputUtils = require('node_modules/react/lib/DisabledInputUtils');
  var LinkedValueUtils = require('node_modules/react/lib/LinkedValueUtils');
  var ReactDOMComponentTree = require('node_modules/react/lib/ReactDOMComponentTree');
  var ReactUpdates = require('node_modules/react/lib/ReactUpdates');
  
  var invariant = require('node_modules/fbjs/lib/invariant');
  var warning = require('node_modules/fbjs/lib/warning');
  
  var didWarnValueLink = false;
  var didWarnValDefaultVal = false;
  
  function forceUpdateIfMounted() {
    if (this._rootNodeID) {
      // DOM component is still mounted; update
      ReactDOMTextarea.updateWrapper(this);
    }
  }
  
  /**
   * Implements a <textarea> host component that allows setting `value`, and
   * `defaultValue`. This differs from the traditional DOM API because value is
   * usually set as PCDATA children.
   *
   * If `value` is not supplied (or null/undefined), user actions that affect the
   * value will trigger updates to the element.
   *
   * If `value` is supplied (and not null/undefined), the rendered element will
   * not trigger updates to the element. Instead, the `value` prop must change in
   * order for the rendered element to be updated.
   *
   * The rendered element will be initialized with an empty value, the prop
   * `defaultValue` if specified, or the children content (deprecated).
   */
  var ReactDOMTextarea = {
    getHostProps: function (inst, props) {
      !(props.dangerouslySetInnerHTML == null) ? 'development' !== 'production' ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : _prodInvariant('91') : void 0;
  
      // Always set children to the same thing. In IE9, the selection range will
      // get reset if `textContent` is mutated.  We could add a check in setTextContent
      // to only set the value if/when the value differs from the node value (which would
      // completely solve this IE9 bug), but Sebastian+Ben seemed to like this solution.
      // The value can be a boolean or object so that's why it's forced to be a string.
      var hostProps = _assign({}, DisabledInputUtils.getHostProps(inst, props), {
        value: undefined,
        defaultValue: undefined,
        children: '' + inst._wrapperState.initialValue,
        onChange: inst._wrapperState.onChange
      });
  
      return hostProps;
    },
  
    mountWrapper: function (inst, props) {
      if ('development' !== 'production') {
        LinkedValueUtils.checkPropTypes('textarea', props, inst._currentElement._owner);
        if (props.valueLink !== undefined && !didWarnValueLink) {
          'development' !== 'production' ? warning(false, '`valueLink` prop on `textarea` is deprecated; set `value` and `onChange` instead.') : void 0;
          didWarnValueLink = true;
        }
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValDefaultVal) {
          'development' !== 'production' ? warning(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components') : void 0;
          didWarnValDefaultVal = true;
        }
      }
  
      var value = LinkedValueUtils.getValue(props);
      var initialValue = value;
  
      // Only bother fetching default value if we're going to use it
      if (value == null) {
        var defaultValue = props.defaultValue;
        // TODO (yungsters): Remove support for children content in <textarea>.
        var children = props.children;
        if (children != null) {
          if ('development' !== 'production') {
            'development' !== 'production' ? warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.') : void 0;
          }
          !(defaultValue == null) ? 'development' !== 'production' ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : _prodInvariant('92') : void 0;
          if (Array.isArray(children)) {
            !(children.length <= 1) ? 'development' !== 'production' ? invariant(false, '<textarea> can only have at most one child.') : _prodInvariant('93') : void 0;
            children = children[0];
          }
  
          defaultValue = '' + children;
        }
        if (defaultValue == null) {
          defaultValue = '';
        }
        initialValue = defaultValue;
      }
  
      inst._wrapperState = {
        initialValue: '' + initialValue,
        listeners: null,
        onChange: _handleChange.bind(inst)
      };
    },
  
    updateWrapper: function (inst) {
      var props = inst._currentElement.props;
  
      var node = ReactDOMComponentTree.getNodeFromInstance(inst);
      var value = LinkedValueUtils.getValue(props);
      if (value != null) {
        // Cast `value` to a string to ensure the value is set correctly. While
        // browsers typically do this as necessary, jsdom doesn't.
        var newValue = '' + value;
  
        // To avoid side effects (such as losing text selection), only set value if changed
        if (newValue !== node.value) {
          node.value = newValue;
        }
        if (props.defaultValue == null) {
          node.defaultValue = newValue;
        }
      }
      if (props.defaultValue != null) {
        node.defaultValue = props.defaultValue;
      }
    },
  
    postMountWrapper: function (inst) {
      // This is in postMount because we need access to the DOM node, which is not
      // available until after the component has mounted.
      var node = ReactDOMComponentTree.getNodeFromInstance(inst);
  
      // Warning: node.value may be the empty string at this point (IE11) if placeholder is set.
      node.value = node.textContent; // Detach value from defaultValue
    }
  };
  
  function _handleChange(event) {
    var props = this._currentElement.props;
    var returnValue = LinkedValueUtils.executeOnChange(props, event);
    ReactUpdates.asap(forceUpdateIfMounted, this);
    return returnValue;
  }
  
  module.exports = ReactDOMTextarea;

});
