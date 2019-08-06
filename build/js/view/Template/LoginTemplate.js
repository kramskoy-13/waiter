"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Template2 = _interopRequireDefault(require("./Template.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LoginTemplate =
/*#__PURE__*/
function (_Template) {
  _inherits(LoginTemplate, _Template);

  function LoginTemplate(_ref) {
    var _this;

    var parent = _ref.parent,
        header = _ref.header,
        button = _ref.button,
        template = _ref.template;

    _classCallCheck(this, LoginTemplate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginTemplate).call(this, {
      parent: parent,
      template: template
    }));
    _this.header = header;
    _this.button = button;
    return _this;
  }

  _createClass(LoginTemplate, [{
    key: "create",
    value: function create() {
      //if(!this.parent) { 
      //    console.error(`parent selector wasn't found at ${this.constructor.name}`); return;
      //}; 
      //this.parent.innerHTML = this.template(this.header, this.btn);
      //this.listeners.forEach( obj => {
      //    const selector = document.querySelector(obj.selector)
      //    if(!selector) { 
      //        console.error(`selector ${selector} wasn't found.`); return;
      //     }
      //    selector.addEventListener(obj.listener, obj.callback)
      //});
      _get(_getPrototypeOf(LoginTemplate.prototype), "create", this).call(this, {
        header: this.header,
        button: this.button
      });

      setTimeout(function () {
        var container = document.querySelector('.initial-login__container');
        container.classList.remove('scale-down');
      }, 300);
    }
  }, {
    key: "removeLoginErrors",
    value: function removeLoginErrors() {
      var notifications = document.querySelectorAll(".initial-login__notification");
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = notifications[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var notification = _step.value;
          notification.classList.remove('error');
          notification.classList.remove('opened');
          notification.innerHTML = '!';
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      ;
      document.removeEventListener("click", this.toggleLoginErrors);
    }
  }, {
    key: "showLoginErrors",
    value: function showLoginErrors(errors) {
      var _this2 = this;

      errors.forEach(function (elem) {
        var selector = document.getElementById(elem.id).nextElementSibling;

        _this2.appendElement({
          tag: "div",
          parentSelector: selector,
          text: elem.message
        }).handleClass({
          selector: selector,
          _class: "error",
          action: "add"
        }).handleClass({
          selector: selector,
          _class: "opened",
          action: "add"
        });
      });
      setTimeout(function () {
        document.addEventListener("click", _this2.toggleLoginErrors);
      }, 500);
    }
  }, {
    key: "toggleLoginErrors",
    value: function toggleLoginErrors(event) {
      console.log("callback fires");

      if (event.target && event.target.classList.contains("initial-login__notification")) {
        event.target.classList.toggle("opened");
      } else {
        var notifications = document.querySelectorAll(".initial-login__notification");
        notifications.forEach(function (elem) {
          elem.classList.remove("opened");
        });
      }
    }
  }]);

  return LoginTemplate;
}(_Template2["default"]);

var _default = LoginTemplate;
exports["default"] = _default;