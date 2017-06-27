"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(data) {
    _classCallCheck(this, User);

    this.data = data;
  }

  _createClass(User, [{
    key: "id",
    get: function get() {
      return this.data.id;
    }
  }, {
    key: "name",
    get: function get() {
      return this.data.firstName + " " + this.data.lastName;
    }
  }, {
    key: "firstName",
    get: function get() {
      return this.data.firstName;
    }
  }, {
    key: "lastName",
    get: function get() {
      return this.data.lastName;
    }
  }, {
    key: "statusText",
    get: function get() {
      return this.data.status_text;
    }
  }, {
    key: "email",
    get: function get() {
      return this.data.email;
    }
  }, {
    key: "thumbnail",
    get: function get() {
      return ImageManager.hello(this);
    }
  }]);

  return User;
}();

module.exports = User;