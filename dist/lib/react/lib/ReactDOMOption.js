define('node_modules/react/lib/ReactDOMOption', function(require, exports, module) {

  /**
   * Copyright 2013-present, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * LICENSE file in the root directory of this source tree. An additional grant
   * of patent rights can be found in the PATENTS file in the same directory.
   *
   * @providesModule ReactDOMOption
   */
  
  'use strict';
  
  var _assign = require('node_modules/object-assign/index');
  
  var ReactChildren = require('node_modules/react/lib/ReactChildren');
  var ReactDOMComponentTree = require('node_modules/react/lib/ReactDOMComponentTree');
  var ReactDOMSelect = require('node_modules/react/lib/ReactDOMSelect');
  
  var warning = require('node_modules/fbjs/lib/warning');
  var didWarnInvalidOptionChildren = false;
  
  function flattenChildren(children) {
    var content = '';
  
    // Flatten children and warn if they aren't strings or numbers;
    // invalid types are ignored.
    ReactChildren.forEach(children, function (child) {
      if (child == null) {
        return;
      }
      if (typeof child === 'string' || typeof child === 'number') {
        content += child;
      } else if (!didWarnInvalidOptionChildren) {
        didWarnInvalidOptionChildren = true;
        'development' !== 'production' ? warning(false, 'Only strings and numbers are supported as <option> children.') : void 0;
      }
    });
  
    return content;
  }
  
  /**
   * Implements an <option> host component that warns when `selected` is set.
   */
  var ReactDOMOption = {
    mountWrapper: function (inst, props, hostParent) {
      // TODO (yungsters): Remove support for `selected` in <option>.
      if ('development' !== 'production') {
        'development' !== 'production' ? warning(props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.') : void 0;
      }
  
      // Look up whether this option is 'selected'
      var selectValue = null;
      if (hostParent != null) {
        var selectParent = hostParent;
  
        if (selectParent._tag === 'optgroup') {
          selectParent = selectParent._hostParent;
        }
  
        if (selectParent != null && selectParent._tag === 'select') {
          selectValue = ReactDOMSelect.getSelectValueContext(selectParent);
        }
      }
  
      // If the value is null (e.g., no specified value or after initial mount)
      // or missing (e.g., for <datalist>), we don't change props.selected
      var selected = null;
      if (selectValue != null) {
        var value;
        if (props.value != null) {
          value = props.value + '';
        } else {
          value = flattenChildren(props.children);
        }
        selected = false;
        if (Array.isArray(selectValue)) {
          // multiple
          for (var i = 0; i < selectValue.length; i++) {
            if ('' + selectValue[i] === value) {
              selected = true;
              break;
            }
          }
        } else {
          selected = '' + selectValue === value;
        }
      }
  
      inst._wrapperState = { selected: selected };
    },
  
    postMountWrapper: function (inst) {
      // value="" should make a value attribute (#6219)
      var props = inst._currentElement.props;
      if (props.value != null) {
        var node = ReactDOMComponentTree.getNodeFromInstance(inst);
        node.setAttribute('value', props.value);
      }
    },
  
    getHostProps: function (inst, props) {
      var hostProps = _assign({ selected: undefined, children: undefined }, props);
  
      // Read state only from initial mount because <select> updates value
      // manually; we need the initial state only for server rendering
      if (inst._wrapperState.selected != null) {
        hostProps.selected = inst._wrapperState.selected;
      }
  
      var content = flattenChildren(props.children);
  
      if (content) {
        hostProps.children = content;
      }
  
      return hostProps;
    }
  
  };
  
  module.exports = ReactDOMOption;

});