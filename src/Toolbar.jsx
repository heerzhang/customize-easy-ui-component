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
/** @jsx jsx */
var core_1 = require("@emotion/core");
var prop_types_1 = require("prop-types");
var Providers_1 = require("./Theme/Providers");
var MOBILE_HEIGHT = "56px";
var DESKTOP_HEIGHT = "64px";
exports.Toolbar = function (_a) {
    var compressed = _a.compressed, other = __rest(_a, ["compressed"]);
    var _b;
    var theme = Providers_1.useTheme();
    return (<div css={[
        (_b = {
                minHeight: MOBILE_HEIGHT,
                display: "flex",
                position: "relative",
                alignItems: "center",
                paddingLeft: theme.spaces.md,
                paddingRight: theme.spaces.md
            },
            _b[theme.mediaQueries.lg] = {
                minHeight: DESKTOP_HEIGHT,
                paddingLeft: theme.spaces.lg,
                paddingRight: theme.spaces.lg
            },
            _b),
        compressed ? { minHeight: "48px !important" } : undefined
    ]} {...other}/>);
};
exports.Toolbar.propTypes = {
    compressed: prop_types_1.default.bool,
    children: prop_types_1.default.node
};
exports.useResponsiveBodyPadding = function () {
    var _a;
    var theme = Providers_1.useTheme();
    return core_1.css((_a = {
            paddingTop: MOBILE_HEIGHT
        },
        _a[theme.mediaQueries.lg] = {
            paddingTop: DESKTOP_HEIGHT
        },
        _a));
};
