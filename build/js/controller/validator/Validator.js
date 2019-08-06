"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _PasswordStrategy = _interopRequireDefault(require("./strategy/PasswordStrategy.js"));

var _EmailStrategy = _interopRequireDefault(require("./strategy/EmailStrategy.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CONFIG = {
  email: new _EmailStrategy["default"](),
  password: new _PasswordStrategy["default"]()
};

var Validator =
/*#__PURE__*/
function () {
  function Validator(strategy) {
    _classCallCheck(this, Validator);

    this.strategy = strategy;
    this.errors = [];
  }

  _createClass(Validator, [{
    key: "validateField",
    value: function validateField(loginDataObj) {
      for (var field in loginDataObj) {
        var data = loginDataObj[field];

        if (loginDataObj.hasOwnProperty(field)) {
          if (!CONFIG[field]) {
            console.log("the strategy for ".concat(field, " has not been provided"));
            return;
          }

          this.strategy = CONFIG[field]; //////  the execute method return bool - //////////
          //////  "true" means a field has error value /////

          if (this.strategy.execute(data)) {
            var errorsObj = {};
            errorsObj.id = field;
            errorsObj.message = this.strategy.message;
            this.errors.push(errorsObj);
          }
        }
      }

      return this.errors;
    }
  }]);

  return Validator;
}();

var _default = Validator;
exports["default"] = _default;