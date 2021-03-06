define('node_modules/axios/lib/core/createError', function(require, exports, module) {

  'use strict';
  
  var enhanceError = require('node_modules/axios/lib/core/enhanceError');
  
  /**
   * Create an Error with the specified message, config, error code, and response.
   *
   * @param {string} message The error message.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   @ @param {Object} [response] The response.
   * @returns {Error} The created error.
   */
  module.exports = function createError(message, config, code, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, response);
  };
  

});
