"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONFIRMATION_TEMPLATE = void 0;

var CONFIRMATION_TEMPLATE = function CONFIRMATION_TEMPLATE(text) {
  if (!text) {
    text = "Unfortunately, there is an error occured. Please, try to reload the Waiter to be served.";
  }

  return "\n    <div>\n        <h1 class=\"logo\">Waiter</h1>\n        <div class=\"popup__wrapper\">\n            <div class=\"popup__container\">\n                <div class=\"popup__container_select\">\n                    <p>".concat(text, "</p>\n                    <button class=\"popup__container_button button\" id=\"confirm\">Yes</button>\n                    <button class=\"popup__container_button button\" id=\"refuse\">No</button>\n                </div>\n            </div>\n        </div> \n    </div>");
};

exports.CONFIRMATION_TEMPLATE = CONFIRMATION_TEMPLATE;