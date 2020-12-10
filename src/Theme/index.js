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
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("./colors");
var breakpoints_1 = require("./breakpoints");
var colors_2 = require("./colors");
exports.generateColorsFromScales = colors_2.generateColorsFromScales;
var spacer = 1;
// padding & margin
var spaces = {
    none: 0,
    xs: spacer * 0.25 + "rem",
    sm: spacer * 0.5 + "rem",
    md: spacer + "rem",
    lg: spacer * 1.5 + "rem",
    xl: spacer * 3 + "rem"
};
// font sizes
var fontSizes = {
    0: "0.875rem",
    1: "1rem",
    2: "1.25rem",
    3: "1.5rem",
    4: "1.75rem",
    5: "2rem",
    6: "2.5rem",
    7: "3.5rem",
    8: "4.5rem",
    9: "5.5rem"
};
// radius (for layers, buttons, etc)
var radii = {
    sm: "0.25rem",
    md: "0.4rem",
    lg: "1rem"
};
// bootstrap z-index
var zIndices = {
    sticky: 1020,
    fixed: 1030,
    overlay: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
};
var sansFont = "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"";
var fonts = {
    sans: sansFont,
    base: sansFont,
    monospace: "SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
};
var lineHeights = {
    heading: 1.2,
    body: 1.5
};
var fontWeights = {
    body: 400,
    heading: 500,
    display: 300
};
var iconSizes = {
    xs: "12px",
    sm: "16px",
    md: "20px",
    lg: "24px",
    xl: "32px"
};
exports.defaultTheme = __assign({}, colors_1.defaultColors, { spaces: spaces,
    zIndices: zIndices,
    breakpoints: breakpoints_1.breakpoints, mediaQueries: breakpoints_1.generateMediaQueries(breakpoints_1.breakpoints), fontSizes: fontSizes,
    radii: radii,
    fonts: fonts, shadows: colors_1.defaultColors.modes.light.shadows, lineHeights: lineHeights,
    fontWeights: fontWeights,
    iconSizes: iconSizes, outline: "3px auto " + colors_1.alpha(colors_1.defaultColors.colors.palette.blue.base, 0.8) });
exports.default = exports.defaultTheme;
