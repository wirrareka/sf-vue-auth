'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = require('axios');
var User = require('./user');
var EventBus = require('./event_bus').default;

var instance = null;

var UserService = function () {
  function UserService(baseURL) {
    _classCallCheck(this, UserService);

    if (!instance) {
      instance = this;
    }
    this._cache = {};
    this.current = null;
    this.restore();
    return instance;
  }

  _createClass(UserService, [{
    key: 'get',
    value: function get(user_id, force) {
      var _this = this;

      if (this._cache[user_id] && !force) {
        return new Promise(function (resolve, reject) {
          resolve(_this._cache[user_id]);
        });
      } else {
        return axios.get('/user/' + user_id + '.json').then(function (response) {
          return new User(response.data.result);
        });
      }
    }
  }, {
    key: 'cache',
    value: function cache(user) {
      this._cache[user.id] = user;
    }
  }, {
    key: 'cacheAll',
    value: function cacheAll(users) {
      var self = this;
      users.forEach(function (user) {
        self._cache[user.id] = user;
      });
    }
  }, {
    key: 'isLoggedIn',
    value: function isLoggedIn() {
      return this.current && this.token;
    }
  }, {
    key: 'restore',
    value: function restore() {
      var user = localStorage.getItem('user');
      var token = localStorage.getItem('token');

      if (user && token) {
        this.current = new User(JSON.parse(user));
        this.token = token;
        EventBus.$emit('auth:logged_in', this.current);
      }

      if (this.token) {
        axios.defaults.headers.common['Authentication'] = this.token;
      }
    }
  }, {
    key: 'persist',
    value: function persist() {
      localStorage.setItem('user', JSON.stringify(this.current.data));
      localStorage.setItem('token', this.token);
    }
  }, {
    key: 'setCurrentUser',
    value: function setCurrentUser(user, token) {
      this.current = new User(user);
      this.token = token;
      axios.defaults.headers.common['Authentication'] = this.token;
      this.persist();
      EventBus.$emit('auth:logged_in', this.current);
    }
  }, {
    key: 'login',
    value: function login(email, password) {
      var self = this;
      return axios.post('/auth/login', {
        email: email,
        password: password
      }).then(function (response) {
        var result = response.data;
        if (result) {
          self.setCurrentUser(result.user, result.token);
        }
        return self.current;
      }).catch(function (error) {
        EventBus.$emit('auth:login_failure', {});
      });
    }
  }, {
    key: 'logout',
    value: function logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      EventBus.$emit('auth:logged_out');
      console.log('should be logged out');
    }
  }], [{
    key: 'setBaseURL',
    value: function setBaseURL(baseURL) {
      axios.defaults.baseURL = baseURL;
    }
  }]);

  return UserService;
}();

var _instance = new UserService();

module.exports = _instance;