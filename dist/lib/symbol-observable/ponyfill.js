define('node_modules/symbol-observable/ponyfill', function(require, exports, module) {

  'use strict';
  
  module.exports = function symbolObservablePonyfill(root) {
  	var result;
  	var Symbol = root.Symbol;
  
  	if (typeof Symbol === 'function') {
  		if (Symbol.observable) {
  			result = Symbol.observable;
  		} else {
  			result = Symbol('observable');
  			Symbol.observable = result;
  		}
  	} else {
  		result = '@@observable';
  	}
  
  	return result;
  };
  

});
