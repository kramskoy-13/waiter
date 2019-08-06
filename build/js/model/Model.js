"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.model = void 0;

var _Controller = require("../controller/Controller.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model =
/*#__PURE__*/
function () {
  function Model() {
    _classCallCheck(this, Model);

    this.userEmail = null;
    this.userPassword = null;
    this.userLoggedIn = true; // <-- should be false

    this.place = null;
    this.placeData = null;
  }

  _createClass(Model, [{
    key: "checkIfUserLoggedIn",
    value: function checkIfUserLoggedIn() {
      console.log("checkIfUserLoggedIn fires");
      return this.userLoggedIn;
    }
  }, {
    key: "fillLoginDataFields",
    value: function fillLoginDataFields(loginDataObj) {
      this.userLoggedIn = true;
      this.userEmail = loginDataObj.email;
      this.userPassword = loginDataObj.password;
      console.log('fillLoginDataFields fires:', this);
    }
  }, {
    key: "getCurrentLocationPlaces",
    value: function getCurrentLocationPlaces() {
      /// HERE A REAL REQUEST TO THE DATA BASE SHOULD BE USED///
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          return resolve("result");
        }, 2000);
      });
    }
  }, {
    key: "refreshUserData",
    value: function refreshUserData() {
      this.userEmail = null;
      this.userPassword = null;
      this.userLoggedIn = false;
    }
  }, {
    key: "getSelectedPlaceData",
    value: function getSelectedPlaceData(place) {
      var _this = this;

      if (this.place == place && this.placeData) {
        return this.placeData;
      }

      return new Promise(function (resolve, reject) {
        _this.place = place; // <-- should be reall id

        _this.placeData = menu; // <-- should be reall data

        setTimeout(function () {
          return resolve(_this.placeData);
        }, 3000);
      });
    }
  }]);

  return Model;
}();

var menu = [{
  name: "cocktails (alc)",
  id: "cocktails_alc",
  category: 1,
  dishes: [{
    name: "coctail 1",
    price: 5,
    id: "coctail_1",
    img: "/img/coctails_alc/coctails_alc1.jpg"
  }, {
    name: "coctail 2",
    price: 6,
    id: "coctail_2",
    img: "/img/coctails_alc/coctails_alc2.jpg"
  }, {
    name: "coctail 3",
    price: 2,
    id: "coctail_3",
    img: "/img/coctails_alc/coctails_alc3.jpg"
  }, {
    name: "coctail 4",
    price: 1,
    id: "coctail_4",
    img: "/img/coctails_alc/coctails_alc4.jpg"
  }, {
    name: "coctail 5",
    price: 5.5,
    id: "coctail_5",
    img: "/img/coctails_alc/coctails_alc5.jpg"
  }, {
    name: "coctail 6",
    price: 6.2,
    id: "coctail_6",
    img: "/img/coctails_alc/coctails_alc6.jpg"
  }, {
    name: "coctail 7",
    price: 6.2,
    id: "coctail_7",
    img: "/img/coctails_alc/coctails_alc7.jpg"
  }, {
    name: "coctail 8",
    price: 6.2,
    id: "coctail_8",
    img: "/img/coctails_alc/coctails_alc8.jpg"
  }, {
    name: "coctail 9",
    price: 6.2,
    id: "coctail_9",
    img: "/img/coctails_alc/coctails_alc9.jpeg"
  }]
}, {
  name: "cocktails (non alc)",
  id: "cocktails_non_alc",
  category: 2,
  dishes: [{
    name: "coctail (non alc) 1",
    price: 5,
    id: "coctail_non_alc_1",
    img: "/img/coctails_non_alc/coctails_non_alc1.jpeg"
  }, {
    name: "coctail (non alc) 2",
    price: 6,
    id: "coctail_non_alc_2",
    img: "/img/coctails_non_alc/coctails_non_alc2.jpg"
  }, {
    name: "coctail (non alc) 3",
    price: 2,
    id: "coctail_non_alc_3",
    img: "/img/coctails_non_alc/coctails_non_alc3.jpg"
  }, {
    name: "coctail (non alc) 4",
    price: 1,
    id: "coctail_non_alc_4",
    img: "/img/coctails_non_alc/coctails_non_alc4.jpg"
  }, {
    name: "coctail (non alc) 5",
    price: 5.5,
    id: "coctail_non_alc_5",
    img: "/img/coctails_non_alc/coctails_non_alc5.jpg"
  }, {
    name: "coctail (non alc) 6",
    price: 6.2,
    id: "coctail_non_alc_6",
    img: "/img/coctails_non_alc/coctails_non_alc6.jpg"
  }, {
    name: "coctail (non alc) 7",
    price: 6.2,
    id: "coctail_non_alc_7",
    img: "/img/coctails_non_alc/coctails_non_alc7.jpg"
  }, {
    name: "coctail (non alc) 8",
    price: 6.2,
    id: "coctail_non_alc_8",
    img: "/img/coctails_non_alc/coctails_non_alc8.jpg"
  }]
}, {
  name: "desserts",
  id: "desserts",
  category: 3,
  dishes: [{
    name: "dessert 1",
    price: 10,
    id: "dessert_1",
    img: "/img/desserts/desserts1.jpg"
  }, {
    name: "dessert 2",
    price: 6,
    id: "dessert_2",
    img: "/img/desserts/desserts2.jpg"
  }, {
    name: "dessert 3",
    price: 21,
    id: "dessert_3",
    img: "/img/desserts/desserts3.jpg"
  }, {
    name: "dessert 4",
    price: 1,
    id: "dessert_4",
    img: "/img/desserts/desserts4.jpg"
  }, {
    name: "dessert 5",
    price: 1,
    id: "dessert_5",
    img: "/img/desserts/desserts5.jpg"
  }, {
    name: "dessert 6",
    price: 1,
    id: "dessert_6",
    img: "/img/desserts/desserts6.jpg"
  }, {
    name: "dessert 7",
    price: 1,
    id: "dessert_7",
    img: "/img/desserts/desserts7.jpg"
  }, {
    name: "dessert 8",
    price: 1,
    id: "dessert_8",
    img: "/img/desserts/desserts8.jpg"
  }]
}, {
  name: "first courses",
  id: "first_courses",
  category: 4,
  dishes: [{
    name: "first courses 1",
    price: 12,
    id: "first_courses_1",
    img: "/img/first_courses/first_course1.jpg"
  }, {
    name: "first courses 2",
    price: 6,
    id: "first_courses_2",
    img: "/img/first_courses/first_course2.jpg"
  }, {
    name: "first courses 3",
    price: 44,
    id: "first_courses_3",
    img: "/img/first_courses/first_course3.jpg"
  }, {
    name: "first_courses 4",
    price: 11.5,
    id: "first_courses_4",
    img: "/img/first_courses/first_course4.jpg"
  }]
}, {
  name: "fish dishes",
  id: "fish_dishes",
  category: 5,
  dishes: [{
    name: "fish dishes 1",
    price: 12.1,
    id: "fish_dishes_1",
    img: "/img/fish/fish1.jpg"
  }, {
    name: "fish 2",
    price: 6.3,
    id: "fish_dishes_2",
    img: "/img/fish/fish2.jpg"
  }, {
    name: "fish 3",
    price: 44.2,
    id: "fish_dishes_3",
    img: "/img/fish/fish3.jpg"
  }, {
    name: "fish 4",
    price: 12.5,
    id: "fish_dishes_4",
    img: "/img/fish/fish4.jpg"
  }, {
    name: "fish 5",
    price: 12.5,
    id: "fish_dishes_5",
    img: "/img/fish/fish5.jpg"
  }, {
    name: "fish 6",
    price: 12.5,
    id: "fish_dishes_6",
    img: "/img/fish/fish6.jpg"
  }, {
    name: "fish 7",
    price: 12.5,
    id: "fish_dishes_7",
    img: "/img/fish/fish7.jpg"
  }, {
    name: "fish 8",
    price: 12.5,
    id: "fish_dishes_8",
    img: "/img/fish/fish8.jpg"
  }]
}, {
  name: "meat dishes",
  id: "meat_dishes",
  category: 6,
  dishes: [{
    name: "meat dishes 1",
    price: 122.1,
    id: "meat_dishes_1",
    img: "/img/meat/meat1.jpg"
  }, {
    name: "meat 2",
    price: 61.3,
    id: "meat_dishes_2",
    img: "/img/meat/meat2.jpg"
  }, {
    name: "meat 3",
    price: 44.2,
    id: "meat_dishes_3",
    img: "/img/meat/meat3.jpg"
  }, {
    name: "meat 4",
    price: 712.5,
    id: "meat_dishes_4",
    img: "/img/meat/meat4.jpg"
  }, {
    name: "meat 5",
    price: 712.5,
    id: "meat_dishes_5",
    img: "/img/meat/meat5.jpg"
  }, {
    name: "meat 6",
    price: 712.5,
    id: "meat_dishes_6",
    img: "/img/meat/meat6.jpg"
  }, {
    name: "meat 7",
    price: 712.5,
    id: "meat_dishes_7",
    img: "/img/meat/meat7.jpg"
  }, {
    name: "meat 8",
    price: 712.5,
    id: "meat_dishes_8",
    img: "/img/meat/meat8.jpg"
  }]
}, {
  name: "salads",
  id: "salads",
  category: 0,
  dishes: [{
    name: "salad 1",
    price: 22.1,
    id: "salads_1",
    img: "/img/salads/salads1.jpg"
  }, {
    name: "salad 2",
    price: 161.3,
    id: "salad_2",
    img: "/img/salads/salads2.jpg"
  }, {
    name: "salad 3",
    price: 414.2,
    id: "salad_3",
    img: "/img/salads/salads3.jpg"
  }, {
    name: "salad 4",
    price: 72.5,
    id: "salad_4",
    img: "/img/salads/salads4.jpg"
  }, {
    name: "salad 5",
    price: 72.5,
    id: "salad_5",
    img: "/img/salads/salads5.jpg"
  }, {
    name: "salad 6",
    price: 72.5,
    id: "salad_6",
    img: "/img/salads/salads6.jpg"
  }, {
    name: "salad 7",
    price: 72.5,
    id: "salad_7",
    img: "/img/salads/salads7.jpg"
  }, {
    name: "salad 8",
    price: 72.5,
    id: "salad_8",
    img: "/img/salads/salads8.jpg"
  }]
}];
var model = new Model();
exports.model = model;