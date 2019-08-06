"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CATEGORIES_TEMPLATE = void 0;

var CATEGORIES_TEMPLATE = function CATEGORIES_TEMPLATE(_ref) {
  var categories = _ref.categories;
  var insert = '';
  categories.forEach(function (category) {
    var icon = category.icon(); // <== const categories in View at getCategoriesTemplate method

    insert += "\n        <div class=\"main__container_item\" id=\"".concat(category.id, "\">\n            ").concat(icon, "\n            <div class=\"name\">").concat(category.name, "</div>\n            <div class=\"select\">Select</div>\n        </div>\n        ");
  });
  return "\n    <div class=\"main__container two\">\n        <h4 class=\"h4 big mt-30\">Categories</h4>\n        ".concat(insert, "\n    </div>\n ");
};

exports.CATEGORIES_TEMPLATE = CATEGORIES_TEMPLATE;