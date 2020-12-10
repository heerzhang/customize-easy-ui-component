"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
/**
 * This wrapper allows us to also render non-sancho icons. It should probably
 * remain a private component.
 */
exports.IconWrapper = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "md" : _b, color = _a.color, children = _a.children, other = __rest(_a, ["size", "color", "children"]);
    return React.cloneElement(children, __assign({ size: size,
        color: color, "aria-hidden": true, style: { display: "block" } }, other));
};
