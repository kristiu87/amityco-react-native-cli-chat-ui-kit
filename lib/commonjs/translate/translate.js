"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _translation = _interopRequireDefault(require("./translation.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const translate = key => {
  const language = globalThis.Language;
  const translation = _translation.default[key];
  if (translation && translation[language]) {
    return translation[language];
  } else {
    return key;
  }
};
var _default = exports.default = translate;
//# sourceMappingURL=translate.js.map