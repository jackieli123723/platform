define('node_modules/strict-uri-encode/index', function(require, exports, module) {

  'use strict';
  module.exports = function (str) {
  	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
  		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  	});
  };
  

});
