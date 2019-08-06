"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOGIN_TEMPLATE = void 0;

var LOGIN_TEMPLATE = function LOGIN_TEMPLATE(_ref) {
  var header = _ref.header,
      button = _ref.button;
  return "\n    <div class=\"waiter__wrapper\">\n     <div class=\"initial-login__wrapper\">\n         <div class=\"initial-login__container scale-down\">\n             <h1 class=\"initial-login__logo logo\">Waiter</h1>\n             <h4 class=\"h4\">".concat(header, "</h4>\n             <form id=\"signInForm\" class=\"initial-login\">\n                 <div class=\"initial-login__container_inner\">\n                     <div class=\"initial-login__input-wrapper\">\n                         <label class=\"initial-login__label\" for=\"email\">Your Login (email/username)</label>\n                         <input type=\"text\" name=\"email\" id=\"email\" autocomplete=\"current-password\"/>\n                         <div class=\"initial-login__notification\" id=\"notify-email\">!</div>\n                     </div>\n                     <div class=\"initial-login__input-wrapper\">\n                         <label class=\"initial-login__label\" for=\"password\">Your Password</label>\n                         <input type=\"password\" name=\"password\" id=\"password\" autocomplete=\"current-password\"/>\n                         <div class=\"initial-login__notification\" id=\"notify-password\">!</div>\n                     </div>\n                     <div class=\"initial-login__submit\">\n                         <input type=\"submit\" class=\"btn btn-submit\" value=\"LogIn\"/>\n                     </div>\n                 </div>\n             </form>\n         </div>\n         <div class=\"initial-login__change-option\">").concat(button, "</div></div>\n     </div>\n </div>\n ");
};

exports.LOGIN_TEMPLATE = LOGIN_TEMPLATE;