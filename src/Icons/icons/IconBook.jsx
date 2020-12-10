"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prop_types_1 = require("prop-types");
var Providers_1 = require("../../Theme/Providers");
exports.IconBook = function (_a) {
    var providedColor = _a.color, _b = _a.size, providedSize = _b === void 0 ? "md" : _b, other = __rest(_a, ["color", "size"]);
    var theme = Providers_1.useTheme();
    var size = typeof providedSize === "string"
        ? theme.iconSizes[providedSize]
        : providedSize;
    var color = providedColor || theme.colors.text.default;
    return (<svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} {...other}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>);
};
exports.IconBook.propTypes = {
    color: prop_types_1.default.string,
    size: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.number])
};
