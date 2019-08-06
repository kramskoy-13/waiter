"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controller = void 0;

var _View = require("../view/View.js");

var _Model = require("../model/Model.js");

var _Validator = _interopRequireDefault(require("./validator/Validator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller =
/*#__PURE__*/
function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, [{
    key: "getSignInHTML",
    value: function getSignInHTML() {
      if (!_Model.model.checkIfUserLoggedIn()) {
        _View.view.getLoginSignInTemplate();
      } else {
        this.getCurrentLocationPlaces();
      }
    }
  }, {
    key: "getSignUpHTML",
    value: function getSignUpHTML() {
      _View.view.getLoginSignInTemplate();
    }
  }, {
    key: "submitUserForm",
    value: function submitUserForm(loginDataObj) {
      if (!_Model.model.checkIfUserLoggedIn()) {
        return this.validateUserInfo(loginDataObj);
      }

      this.getCurrentLocationPlaces();
    }
  }, {
    key: "validateUserInfo",
    value: function validateUserInfo(loginDataObj) {
      var validator = new _Validator["default"](),
          loginDataErrors = validator.validateField(loginDataObj);

      if (loginDataErrors.length > 0) {
        return _View.view.showLoginFormErrors(loginDataErrors);
      }

      _Model.model.fillLoginDataFields(loginDataObj);

      this.getCurrentLocationPlaces();
    }
  }, {
    key: "getCurrentLocationPlaces",
    value: function getCurrentLocationPlaces() {
      var _this = this;

      _View.view.setLoading();

      _Model.model.getCurrentLocationPlaces().then(function (response) {
        response = ['McDonald’s', 'KFC', 'SomeCafe', 'Place to Eat', 'Another Restaurant', 'Burger Shop', 'Beer Pab'];

        if (response.length > 1) {
          _View.view.removeLoading();

          return _View.view.selectPlaceToBeServed(response);
        }

        response = 'SomeCafe'; // <== shoud be a real place

        _this.getSelectedPlaceData(response);
      });
    }
  }, {
    key: "getSelectedPlaceData",
    value: function getSelectedPlaceData(place) {
      console.log("getSelectedPlaceData");

      _Model.model.getSelectedPlaceData(place).then(function (response) {
        _View.view.removeLoading();

        _View.view.setSelectedPlaceData(response);

        _View.view.getMainLayoutTemplate();
      })["catch"](function (error) {
        _View.view.showErrorNotification(error);
      });
    }
  }, {
    key: "refreshUserData",
    value: function refreshUserData() {
      _Model.model.refreshUserData();
    }
  }]);

  return Controller;
}();

var controller = new Controller();
exports.controller = controller;