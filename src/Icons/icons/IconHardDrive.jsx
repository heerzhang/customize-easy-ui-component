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
exports.IconHardDrive = function (_a) {
    var providedColor = _a.color, _b = _a.size, providedSize = _b === void 0 ? "md" : _b, other = __rest(_a, ["color", "size"]);
    var theme = Providers_1.useTheme();
    var size = typeof providedSize === "string"
        ? theme.iconSizes[providedSize]
        : providedSize;
    var color = providedColor || theme.colors.text.default;
    return (<svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} {...other}>
      <line x1="22" y1="12" x2="2" y2="12"/>
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
      <line x1="6" y1="16" x2="6" y2="16"/>
      <line x1="10" y1="16" x2="10" y2="16"/>
    </svg>);
};
exports.IconHardDrive.propTypes = {
    color: prop_types_1.default.string,
    size: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.number])
};
