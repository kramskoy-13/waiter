"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _PopupTemplate2 = _interopRequireDefault(require("./PopupTemplate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PopupSPTemplate =
/*#__PURE__*/
function (_PopupTemplate) {
  _inherits(PopupSPTemplate, _PopupTemplate);

  function PopupSPTemplate(_ref) {
    var _this;

    var parent = _ref.parent,
        template = _ref.template,
        flag = _ref.flag;

    _classCallCheck(this, PopupSPTemplate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PopupSPTemplate).call(this, {
      parent: parent,
      template: template
    }));
    _this.flag = flag || null;
    return _this;
  }

  _createClass(PopupSPTemplate, [{
    key: "showList",
    value: function showList(places) {
      var _this2 = this;

      var arr = places,
          arr_length = arr.length,
          fragment = document.createDocumentFragment(),
          ul = document.querySelector('.popup__container_list'),
          li,
          i = 0,
          liList;

      for (; i < arr_length; i++) {
        li = document.createElement('li');
        li.innerHTML = arr[i];
        li.id = arr[i].replace(/ /g, "_").toLowerCase();
        li.addEventListener('click', function (event) {
          liList = document.querySelectorAll('li');
          liList.forEach(function (li) {
            return li.className = '';
          });

          if (!event.target.className) {
            event.target.className = 'selected';
            _this2.selectedPlace = event.target.id;
          }

          console.log("showList click listener");
        });
        fragment.appendChild(li);
      }

      fragment.children[0].className = 'selected'; //this.selectedPlace = fragment.children[0].id;

      ul.appendChild(fragment);
      var showList = document.getElementById("showList");

      if (!showList) {
        console.error("#showList");
        return;
      }

      showList.addEventListener('click', function () {
        console.log("PopupSPTemplate selectPlace");
        var hiddenElements = document.querySelectorAll('.popup__container .hidden');
        hiddenElements.forEach(function (elem) {
          return elem.classList.remove('hidden');
        });
        var paragraph = document.querySelector('.popup__container p'),
            button = document.querySelectorAll('.popup__container button');
        button.forEach(function (elem) {
          return elem.classList.add("bounce");
        });
        paragraph.classList.add("hidden");
      }, {
        once: true
      });

      if (this.flag) {
        setTimeout(function () {
          return showList["click"].call(showList);
        }, 0);
      }

      return this;
    }
  }]);

  return PopupSPTemplate;
}(_PopupTemplate2["default"]);

var _default = PopupSPTemplate;
exports["default"] = _default;