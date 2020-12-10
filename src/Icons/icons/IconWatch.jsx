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
exports.IconWatch = function (_a) {
    var providedColor = _a.color, _b = _a.size, providedSize = _b === void 0 ? "md" : _b, other = __rest(_a, ["color", "size"]);
    var theme = Providers_1.useTheme();
    var size = typeof providedSize === "string"
        ? theme.iconSizes[providedSize]
        : providedSize;
    var color = providedColor || theme.colors.text.default;
    return (<svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height={size} width={size} {...other}>
      <circle cx="12" cy="12" r="7"/>
      <polyline points="12 9 12 12 13.5 13.5"/>
      <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"/>
    </svg>);
};
exports.IconWatch.propTypes = {
    color: prop_types_1.default.string,
    size: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.number])
};
