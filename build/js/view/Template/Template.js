"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Template =
/*#__PURE__*/
function () {
  function Template(_ref) {
    var parent = _ref.parent,
        template = _ref.template;

    _classCallCheck(this, Template);

    this.parent = parent;
    this.template = template;
    this.listeners = [];
    this.children = [];
  }

  _createClass(Template, [{
    key: "create",
    value: function create() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.parent) {
        console.error("parent selector wasn't found at ".concat(this.constructor.name));
        return;
      }

      if (_typeof(this.parent) === "object") {
        this.parent.innerHTML = this.template(args); // <-- name of object inside create function should be equal to the corresponding arguments inside template
      } else if (typeof this.parent === "string") {
        var _parent = document.getElementById(this.parent);

        _parent.innerHTML = this.template(args);
      }

      if (this.listeners.length) {
        this.listeners.forEach(function (obj) {
          var selector = document.querySelectorAll(obj.selector);

          if (!selector.length) {
            console.error("selector ".concat(selector, " wasn't found."));
            return;
          }

          selector.forEach(function (e) {
            return e.addEventListener(obj.listener, obj.callback);
          });
        });
      }
    }
  }, {
    key: "initListener",
    value: function initListener(_ref2) {
      var selector = _ref2.selector,
          listener = _ref2.listener,
          callback = _ref2.callback;
      this.listeners.push({
        selector: selector,
        listener: listener,
        callback: callback
      });
      return this;
    }
  }, {
    key: "createChildren",
    value: function createChildren() {
      if (this.children.length) {
        this.children.forEach(function (childCreateFunc) {
          if (typeof childCreateFunc === "function") {
            childCreateFunc();
          } else {
            console.error(childCreateFunc, "is not a function");
          }
        });
      }
    }
  }, {
    key: "addChild",
    value: function addChild(child) {
      this.children.push(child);
      return this;
    }
  }, {
    key: "handleListener",
    value: function handleListener(_ref3) {
      var selector = _ref3.selector,
          listener = _ref3.listener,
          callback = _ref3.callback,
          action = _ref3.action;

      if (action != "add" && action != "remove") {
        console.error("action type has not been defined at handleListener [Template class]");
        return;
      }

      var slct = document.querySelectorAll(selector);

      if (!slct.length) {
        console.error("selector ".concat(selector, " wasn't found."));
        return;
      }

      switch (action) {
        case "add":
          slct.forEach(function (s) {
            return s.addEventListener(listener, callback);
          });
          break;

        case "remove":
          slct.forEach(function (s) {
            return s.removeEventListener(listener, callback);
          });
          break;

        default:
          return;
      }
    }
  }, {
    key: "appendElement",
    value: function appendElement(_ref4) {
      var tag = _ref4.tag,
          parentSelector = _ref4.parentSelector,
          text = _ref4.text;
      var elem = document.createElement(tag),
          parent;

      if (_typeof(parentSelector) == "object") {
        parent = parentSelector;
      } else if (typeof parentSelector == "string") {
        parent = document.querySelector(parentSelector);
      } else {
        console.error("impossible to define parent type at appendElement function [Template class]");
        return;
      }

      elem.innerText = text;
      parent.appendChild(elem);
      return this;
    }
  }, {
    key: "appendTemplate",
    value: function appendTemplate(_ref5) {
      var template = _ref5.template,
          parentSelector = _ref5.parentSelector;

      if (_typeof(parentSelector) == "object") {
        parent = parentSelector;
      } else if (typeof parentSelector == "string") {
        parent = document.querySelector(parentSelector);
      }
    }
  }, {
    key: "handleClass",
    value: function handleClass(_ref6) {
      var selector = _ref6.selector,
          _class = _ref6._class,
          action = _ref6.action;

      if (action != "add" && action != "remove" && action != "toggle") {
        console.error("action type has not been defined at handleClass [Template class]");
        return;
      }

      var elem;

      if (_typeof(selector) == "object") {
        elem = selector;
      } else if (typeof selector == "string") {
        elem = document.querySelector(selector);
      } else {
        console.error("impossible to define selector type at handleClass function [Template class]");
        return;
      }

      switch (action) {
        case "add":
          elem.classList.add(_class);
          break;

        case "remove":
          elem.classList.remove(_class);
          break;

        default:
          elem.classList.toggle(_class);
      }

      return this;
    }
  }]);

  return Template;
}();

exports["default"] = Template;