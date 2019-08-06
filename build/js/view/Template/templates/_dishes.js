"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DISHES_TEMPLATE = void 0;

var DISHES_TEMPLATE = function DISHES_TEMPLATE(_ref) {
  var name = _ref.name,
      dishes = _ref.dishes;
  var insert = '';
  dishes.forEach(function (dish) {
    insert += "\n        <div class=\"main__container_item\" id=\"".concat(dish.id, "\">\n            <div class=\"image\" style=\"background-image: url('").concat(dish.img, "')\"></div>\n            <div class=\"name\">").concat(dish.name, "</div>\n            <div class=\"select\">Select</div>\n        </div>\n        ");
  });
  return "\n    <div class=\"main__container two dishes\">\n        <h4 class=\"navigation__sub-menu\">\n            <div id=\"categories\">Categories</div>\n            <div class=\"current\">".concat(name, "</div>\n        </h4>\n        ").concat(insert, "\n    </div>\n ");
};

exports.DISHES_TEMPLATE = DISHES_TEMPLATE;