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
var Providers_1 = require("./Theme/Providers");
/**
 * A styled anchor element
 */
exports.Link = function (_a) {
    var children = _a.children, _b = _a.component, Component = _b === void 0 ? "a" : _b, other = __rest(_a, ["children", "component"]);
    var theme = Providers_1.useTheme();
    return (<Component className="Link" css={{
        textDecoration: "none",
        "@media (hover:hover)": {
            ":hover": {
                textDecoration: "underline"
            }
        },
        color: theme.colors.mode === "dark"
            ? theme.colors.palette.blue.light
            : theme.colors.palette.blue.base
    }} {...other}>
      {children}
    </Component>);
};
exports.Link.propTypes = {
    component: prop_types_1.default.any,
    children: prop_types_1.default.node
};
