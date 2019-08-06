"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.view = void 0;

var _Controller = require("../controller/Controller.js");

var _Template = _interopRequireDefault(require("./Template/Template.js"));

var _LoginTemplate = _interopRequireDefault(require("./Template/LoginTemplate.js"));

var _PopupTemplate = _interopRequireDefault(require("./Template/PopupTemplate.js"));

var _PopupSPTemplate = _interopRequireDefault(require("./Template/PopupSPTemplate.js"));

var _insertText = require("./Template/templates/insert/_insertText.js");

var _loading = require("./Template/templates/_loading.js");

var _selectPlaces = require("./Template/templates/_selectPlaces.js");

var _login = require("./Template/templates/_login.js");

var _confirmation = require("./Template/templates/_confirmation.js");

var _main = require("./Template/templates/_main.js");

var _navigation = require("./Template/templates/_navigation.js");

var _footer = require("./Template/templates/_footer.js");

var _shoppingCart = require("./Template/templates/_shopping-cart.js");

var _categories = require("./Template/templates/_categories.js");

var _dishes = require("./Template/templates/_dishes.js");

var _cocktails_alc = require("./svg/cocktails_alc.js");

var _cocktails_alc_free = require("./svg/cocktails_alc_free.js");

var _dessert = require("./svg/dessert.js");

var _first_course = require("./svg/first_course.js");

var _fish = require("./svg/fish.js");

var _meat = require("./svg/meat.js");

var _salads = require("./svg/salads.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View =
/*#__PURE__*/
function () {
  function View() {
    _classCallCheck(this, View);

    this.wrapper = document.getElementById('wrapper');
    this.loginCurrentTemplate = null;
    this.selectedPlace = null;
    this.selectedPlaceData = null; ////////////////////////
    /////// POPUPS ////////
    //////////////////////

    this.loadingPopup = new _PopupTemplate["default"]({
      parent: this.wrapper,
      template: _loading.LOADING_TEMPLATE
    });
    this.currenPopup = null; //////////////////////////////
    /////// MAIN PARTS //////////
    ////////////////////////////

    this.mainLayoutTemplate = null; // <== consists of navigation bar, footer and placeholder for main content
    ///  NAVIGATION  ////

    this.navigationTemplate = new _Template["default"]({
      parent: "nav",
      template: _navigation.NAVIGATION_TEMPLATE
    }); ///  FOOTER  ////

    this.footerTemplate = new _Template["default"]({
      parent: "footer",
      template: _footer.FOOTER_TEMPLATE
    }); // <-- footer id set into main template

    this.shoppingChart = new _Template["default"]({
      parent: "shopping-cart",
      template: _shoppingCart.SHOPPING_CHART_TEMPLATE
    });
    this.currentMainTemplate = null;
  }

  _createClass(View, [{
    key: "addClassBeforeFire",
    value: function addClassBeforeFire(selector, classToAdd) {
      var element = document.querySelectorAll(selector);

      if (element) {
        element.forEach(function (elem) {
          return elem.classList.add(classToAdd);
        });
      }
    }
  }, {
    key: "getLoginSignInTemplate",
    value: function getLoginSignInTemplate() {
      var _this = this;

      console.log("getSignInTemplate function fired");
      this.addClassBeforeFire(".initial-login__container", "scale-down");
      this.loginCurrentTemplate = new _LoginTemplate["default"]({
        parent: this.wrapper,
        header: _insertText.INSERT_TEXT.signInHeader,
        button: _insertText.INSERT_TEXT.signInBtnText,
        template: _login.LOGIN_TEMPLATE
      });
      this.loginCurrentTemplate.initListener({
        selector: ".btn.btn-submit",
        listener: "click",
        callback: this.submitLoginForm.bind(this)
      });
      this.loginCurrentTemplate.initListener({
        selector: "#signUp",
        listener: "click",
        callback: this.getLoginSignUpTemplate.bind(this)
      });
      setTimeout(function () {
        _this.loginCurrentTemplate.create();
      }, 500);
    }
  }, {
    key: "getLoginSignUpTemplate",
    value: function getLoginSignUpTemplate() {
      var _this2 = this;

      console.log("getSignUpTemplate function fired");
      this.addClassBeforeFire(".initial-login__container", "scale-down");
      this.loginCurrentTemplate = new _LoginTemplate["default"]({
        parent: this.wrapper,
        header: _insertText.INSERT_TEXT.signUpHeader,
        button: _insertText.INSERT_TEXT.signUpBtnText,
        template: _login.LOGIN_TEMPLATE
      });
      this.loginCurrentTemplate.initListener({
        selector: ".btn.btn-submit",
        listener: "click",
        callback: this.submitLoginForm.bind(this)
      });
      this.loginCurrentTemplate.initListener({
        selector: "#signIn",
        listener: "click",
        callback: this.getLoginSignInTemplate.bind(this)
      });
      setTimeout(function () {
        _this2.loginCurrentTemplate.create();
      }, 500);
    }
  }, {
    key: "submitLoginForm",
    value: function submitLoginForm(event) {
      console.log("submitLoginForm function fired");
      event.preventDefault();
      var dataObj = {},
          inputArray = document.querySelectorAll("input:not([type='submit'])");
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = inputArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var input = _step.value;
          dataObj[input.id] = input.value;
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

      ; ////REMOVE ERROR CLASS AND ERROR NOTIFICATIONS////

      this.loginCurrentTemplate.removeLoginErrors();

      _Controller.controller.submitUserForm(dataObj);
    }
  }, {
    key: "showLoginFormErrors",
    value: function showLoginFormErrors(errors) {
      console.log("showLoginFormErrors fires");
      this.loginCurrentTemplate.showLoginErrors(errors);
    }
  }, {
    key: "setLoading",
    value: function setLoading() {
      this.loadingPopup.create();
    }
  }, {
    key: "removeLoading",
    value: function removeLoading() {
      this.loadingPopup.destroy();
    }
  }, {
    key: "selectPlaceToBeServed",
    value: function selectPlaceToBeServed(places, flag) {
      var _this3 = this;

      console.log("selectPlaceToBeServed fires");
      this.selectedPlace = places[0]; // <-- corresponding the first element is set at PopupSPTemplate

      this.currenPopup = new _PopupSPTemplate["default"]({
        parent: this.wrapper,
        template: _selectPlaces.SELECT_PLACES_TEMPLATE,
        flag: flag
      });
      this.currenPopup.initListener({
        selector: "#select",
        listener: "click",
        callback: this.getSelectedPlaceData.bind(this)
      }).initListener({
        selector: "#back",
        listener: "click",
        callback: this.showConfirmationMessage.bind(this, {
          message: _insertText.INSERT_TEXT.saveDataNotification,
          confirm: function confirm() {
            _this3.refreshUserData.bind(_this3)();

            _this3.getLoginSignInTemplate.bind(_this3)();

            _this3.currenPopup.destroy();
          },
          cancel: this.selectPlaceToBeServed.bind(this, places, true)
        })
      }).create().showList(places).handleListener({
        selector: ".popup__container_list > li",
        listener: "click",
        callback: this.selectPlace.bind(this),
        action: "add"
      });
    }
  }, {
    key: "selectPlace",
    value: function selectPlace() {
      console.log("View selectPlace");

      if (!event.target || !event.target.id) {
        return this.showErrorNotification();
      }

      this.selectedPlace = event.target.id;
    }
  }, {
    key: "getSelectedPlaceData",
    value: function getSelectedPlaceData() {
      console.log("getCategoriesData");
      this.setLoading();
      this.currentMainTemplate = this.getCategoriesTemplate;

      _Controller.controller.getSelectedPlaceData(this.selectedPlace);
    }
  }, {
    key: "setSelectedPlaceData",
    value: function setSelectedPlaceData(data) {
      console.log("setSelectedPlaceData");
      this.selectedPlaceData = data;
    }
  }, {
    key: "showConfirmationMessage",
    value: function showConfirmationMessage(_ref) {
      var message = _ref.message,
          _ref$confirm = _ref.confirm,
          confirm = _ref$confirm === void 0 ? Function.prototype : _ref$confirm,
          _ref$cancel = _ref.cancel,
          cancel = _ref$cancel === void 0 ? Function.prototype : _ref$cancel;
      console.log("showConfirmationMessage");
      this.currenPopup = new _PopupTemplate["default"]({
        parent: this.wrapper,
        template: _confirmation.CONFIRMATION_TEMPLATE,
        message: message
      });
      this.currenPopup.initListener({
        selector: "#confirm",
        listener: "click",
        callback: confirm
      }).initListener({
        selector: "#refuse",
        listener: "click",
        callback: cancel
      }).create();
    }
  }, {
    key: "getMainLayoutTemplate",
    value: function getMainLayoutTemplate() {
      console.log("getMainLayout");
      this.mainLayoutTemplate = new _Template["default"]({
        parent: this.wrapper,
        template: _main.MAIN_TEMPLATE
      });
      this.mainLayoutTemplate.create();
      this.mainLayoutTemplate.addChild(this.getNavigationTemplate.bind(this)).addChild(this.getFooterTemplate.bind(this)).addChild(this.getCurrentMainTemplate.bind(this)).createChildren();
    }
  }, {
    key: "getCurrentMainTemplate",
    value: function getCurrentMainTemplate() {
      console.log("getCurrentMainTemplate");

      if (typeof this.currentMainTemplate === "function") {
        this.currentMainTemplate();
      } else {
        console.error(this.currentMainTemplate, "is not a function");
      }
    }
  }, {
    key: "getNavigationTemplate",
    value: function getNavigationTemplate() {
      console.log("getNavigationTemplate");
      this.navigationTemplate.initListener({
        selector: "#nav",
        listener: "click",
        callback: this.toggleMenuPopup.bind(this)
      });
      this.navigationTemplate.create();
    }
  }, {
    key: "getFooterTemplate",
    value: function getFooterTemplate() {
      console.log("getFooterTemplate");
      this.footerTemplate.create();
      this.footerTemplate.addChild(this.getShoppingChartTemplate.bind(this)).createChildren();
    }
  }, {
    key: "getShoppingChartTemplate",
    value: function getShoppingChartTemplate() {
      console.log("getShoppingChartTemplate");
      this.shoppingChart.initListener({
        selector: "#shopping-cart",
        listener: "click",
        callback: this.getShoppingChartInfo.bind(this)
      });
      this.shoppingChart.create();
    }
  }, {
    key: "getCategoriesTemplate",
    value: function getCategoriesTemplate() {
      var _this4 = this;

      console.log("getCategoriesTemplate");
      var config = {
        0: _salads.salads,
        1: _cocktails_alc.cocktails_alc,
        2: _cocktails_alc_free.cocktails_alc_free,
        3: _dessert.dessert,
        4: _first_course.first_course,
        5: _fish.fish,
        6: _meat.meat
      };
      var categories = this.selectedPlaceData.map(function (item) {
        return {
          name: item.name,
          icon: config[item.category],
          id: item.id
        };
      });
      var selector = ".main__container_item";
      this.currentMainTemplate = new _Template["default"]({
        parent: "main",
        template: _categories.CATEGORIES_TEMPLATE
      });
      this.currentMainTemplate.initListener({
        selector: selector,
        listener: "click",
        callback: this.selectItem.bind(this, selector)
      }).initListener({
        selector: ".select",
        listener: "click",
        callback: function callback(event) {
          var target = event.target.className == "main__container_item aim" ? event.target.id : event.target.closest(".main__container_item.aim").id;
          var category;

          _this4.selectedPlaceData.forEach(function (c) {
            if (c.id && c.id == target) {
              category = c;
            }
          });

          if (category && category.dishes) {
            _this4.getDishesTemplate(category.name, category.dishes);
          }
        }
      }).create({
        categories: categories
      });
    }
  }, {
    key: "selectItem",
    value: function selectItem(selector) {
      console.log("selectItem fires");
      var items = document.querySelectorAll(selector);
      items.forEach(function (e) {
        return e.classList.remove("aim");
      });
      var target = event.target.closest(selector);
      target.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
      target.classList.add("aim");
    }
  }, {
    key: "getDishesTemplate",
    value: function getDishesTemplate(name, dishes) {
      var selector = ".main__container_item";
      this.currentMainTemplate = new _Template["default"]({
        parent: "main",
        template: _dishes.DISHES_TEMPLATE
      });
      this.currentMainTemplate.initListener({
        selector: "#categories",
        listener: "click",
        callback: this.getCategoriesTemplate.bind(this)
      }).initListener({
        selector: selector,
        listener: "click",
        callback: this.selectItem.bind(this, selector)
      }).create({
        name: name,
        dishes: dishes
      });
      document.querySelector(".navigation__sub-menu").scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    }
  }, {
    key: "toggleMenuPopup",
    value: function toggleMenuPopup() {
      console.log("toggleMenuPopup");
    }
  }, {
    key: "getShoppingChartInfo",
    value: function getShoppingChartInfo() {
      console.log("getShoppingChartInfo");
    }
  }, {
    key: "refreshUserData",
    value: function refreshUserData() {
      _Controller.controller.refreshUserData();
    }
  }, {
    key: "showErrorNotification",
    value: function showErrorNotification(error) {
      console.log(error);
      debugger;
    }
  }]);

  return View;
}();

var view = new View();
exports.view = view;