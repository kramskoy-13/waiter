"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Template2 = _interopRequireDefault(require("./Template.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PopupTemplate =
/*#__PURE__*/
function (_Template) {
  _inherits(PopupTemplate, _Template);

  function PopupTemplate(_ref) {
    var _this;

    var parent = _ref.parent,
        template = _ref.template,
        message = _ref.message;

    _classCallCheck(this, PopupTemplate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PopupTemplate).call(this, {
      parent: parent,
      template: template
    }));
    _this.message = message || null;
    return _this;
  }

  _createClass(PopupTemplate, [{
    key: "create",
    value: function create() {
      var element;

      if (document.querySelector(".shadow-container__wrapper")) {
        element = document.querySelector(".shadow-container__wrapper");
        element.innerHTML = '';
      } else {
        element = document.createElement("div");
        element.className = "shadow-container__wrapper";
      }

      if (typeof this.template === "undefined") {
        console.error("template is undefined at PopupTemplate");
        return;
      }

      element.innerHTML = this.message ? this.template(this.message) : this.template();
      this.parent.appendChild(element); // this.parent.firstElementChild.classList.add("blur");

      _toConsumableArray(this.parent.children).forEach(function (child) {
        if (child.className !== "shadow-container__wrapper") {
          child.classList.add("blur");
        }
      });

      if (this.listeners.length > 0) {
        this.listeners.forEach(function (elem) {
          var selector = document.querySelectorAll(elem.selector);

          if (!selector.length) {
            console.error("selector ".concat(selector, " wasn't found at [Popup class]."));
            return;
          }

          selector.forEach(function (_elem) {
            return _elem.addEventListener(elem.listener, elem.callback);
          });
        });
      }

      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      //this.parent.firstElementChild.classList.remove("blur");
      _toConsumableArray(this.parent.children).forEach(function (child) {
        if (child.className !== "shadow-container__wrapper") {
          child.classList.remove("blur");
        }
      });

      document.querySelector(".shadow-container__wrapper").remove();
    }
  }]);

  return PopupTemplate;
}(_Template2["default"]);

var _default = PopupTemplate;
exports["default"] = _default;