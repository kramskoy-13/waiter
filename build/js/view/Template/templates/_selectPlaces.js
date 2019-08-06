"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SELECT_PLACES_TEMPLATE = void 0;

var SELECT_PLACES_TEMPLATE = function SELECT_PLACES_TEMPLATE() {
  return "\n    <div>\n        <h1 class=\"logo\">Waiter</h1>\n        <div class=\"popup__wrapper\">\n            <div class=\"popup__container\">\n                <div class=\"popup__container_select\">\n                    <p>We have found several places near you. Please, choose one in which you want to be served.\n                        <span class=\"button\" id=\"showList\">Ok</span>\n                    </p>\n                    <h4 class=\"h4 hidden\">Please, choose a place in which you want to be served.</h4>\t\n                    <ul class=\"popup__container_list hidden\"></ul> \n                    <button class=\"popup__container_button button hidden\" id=\"back\">Back</button>\n                    <button class=\"popup__container_button button hidden\" id=\"select\">Select</button>\n                </div>\n            </div>\n        </div> \n    </div>";
};

exports.SELECT_PLACES_TEMPLATE = SELECT_PLACES_TEMPLATE;