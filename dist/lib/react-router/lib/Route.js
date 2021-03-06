define('node_modules/react-router/lib/Route', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _invariant = require('node_modules/invariant/browser');
  
  var _invariant2 = _interopRequireDefault(_invariant);
  
  var _RouteUtils = require('node_modules/react-router/lib/RouteUtils');
  
  var _InternalPropTypes = require('node_modules/react-router/lib/InternalPropTypes');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _React$PropTypes = _react2.default.PropTypes;
  var string = _React$PropTypes.string;
  var func = _React$PropTypes.func;
  
  /**
   * A <Route> is used to declare which components are rendered to the
   * page when the URL matches a given pattern.
   *
   * Routes are arranged in a nested tree structure. When a new URL is
   * requested, the tree is searched depth-first to find a route whose
   * path matches the URL.  When one is found, all routes in the tree
   * that lead to it are considered "active" and their components are
   * rendered into the DOM, nested in the same order as in the tree.
   */
  
  var Route = _react2.default.createClass({
    displayName: 'Route',
  
  
    statics: {
      createRouteFromReactElement: _RouteUtils.createRouteFromReactElement
    },
  
    propTypes: {
      path: string,
      component: _InternalPropTypes.component,
      components: _InternalPropTypes.components,
      getComponent: func,
      getComponents: func
    },
  
    /* istanbul ignore next: sanity check */
    render: function render() {
      !false ? 'development' !== 'production' ? (0, _invariant2.default)(false, '<Route> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
    }
  });
  
  exports.default = Route;
  module.exports = exports['default'];

});
