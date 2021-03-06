define('node_modules/react-router/lib/IndexRedirect', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _routerWarning = require('node_modules/react-router/lib/routerWarning');
  
  var _routerWarning2 = _interopRequireDefault(_routerWarning);
  
  var _invariant = require('node_modules/invariant/browser');
  
  var _invariant2 = _interopRequireDefault(_invariant);
  
  var _Redirect = require('node_modules/react-router/lib/Redirect');
  
  var _Redirect2 = _interopRequireDefault(_Redirect);
  
  var _InternalPropTypes = require('node_modules/react-router/lib/InternalPropTypes');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var _React$PropTypes = _react2.default.PropTypes;
  var string = _React$PropTypes.string;
  var object = _React$PropTypes.object;
  
  /**
   * An <IndexRedirect> is used to redirect from an indexRoute.
   */
  
  var IndexRedirect = _react2.default.createClass({
    displayName: 'IndexRedirect',
  
  
    statics: {
      createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
        /* istanbul ignore else: sanity check */
        if (parentRoute) {
          parentRoute.indexRoute = _Redirect2.default.createRouteFromReactElement(element);
        } else {
          'development' !== 'production' ? (0, _routerWarning2.default)(false, 'An <IndexRedirect> does not make sense at the root of your route config') : void 0;
        }
      }
    },
  
    propTypes: {
      to: string.isRequired,
      query: object,
      state: object,
      onEnter: _InternalPropTypes.falsy,
      children: _InternalPropTypes.falsy
    },
  
    /* istanbul ignore next: sanity check */
    render: function render() {
      !false ? 'development' !== 'production' ? (0, _invariant2.default)(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
    }
  });
  
  exports.default = IndexRedirect;
  module.exports = exports['default'];

});
