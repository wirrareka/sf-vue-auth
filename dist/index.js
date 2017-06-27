'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user_service = require('./user_service');

var _user_service2 = _interopRequireDefault(_user_service);

var _event_bus = require('./event_bus');

var _event_bus2 = _interopRequireDefault(_event_bus);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  install: function install(Vue, parameters) {
    Vue.prototype.$bus = _event_bus2.default;
    if (parameters && parameters.baseURL) {
      _user_service2.default.setBaseURL(parameters.baseURL);
    }
    Vue.prototype.$auth = _user_service2.default;
    Vue.prototype.$http = _axios2.default;
  }
};