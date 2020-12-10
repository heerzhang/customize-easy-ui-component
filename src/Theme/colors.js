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
var open_color_1 = require("open-color");
var color_1 = require("color");
var shadows_1 = require("./shadows");
function lighten(c, amount) {
    return color_1.default(c)
        .lighten(amount)
        .hsl()
        .string();
}
exports.lighten = lighten;
function alpha(c, amount) {
    return color_1.default(c)
        .alpha(amount)
        .hsl()
        .string();
}
exports.alpha = alpha;
/**
 * normalize open-color to remove some colours,
 * such as 'grape'. This should be compatible with a tool
 * like palx.
 */
var defaultScales = {
    gray: open_color_1.default.gray,
    blue: open_color_1.default.blue,
    green: open_color_1.default.green,
    red: open_color_1.default.red,
    orange: open_color_1.default.orange,
    yellow: open_color_1.default.yellow,
    teal: open_color_1.default.teal,
    cyan: open_color_1.default.cyan,
    lime: open_color_1.default.lime,
    pink: open_color_1.default.pink,
    violet: open_color_1.default.violet,
    indigo: open_color_1.default.indigo
};
/**
 * Generate a palette from scales.
 *
 * `light` is typically used in dark mode for things like
 *  outline buttons, ghost buttons, etc.
 *
 * `base` is typically used for buttons, avatar colors, etc.
 *
 * @param scales
 */
function defaultGeneratePalette(scales) {
    return {
        gray: {
            lightest: scales.gray[1],
            light: scales.gray[4],
            base: scales.gray[8],
            dark: scales.gray[9]
        },
        blue: {
            lightest: scales.blue[1],
            light: scales.blue[5],
            base: scales.blue[8],
            dark: scales.blue[9]
        },
        red: {
            lightest: scales.red[1],
            light: scales.red[6],
            base: scales.red[8],
            dark: scales.red[9]
        },
        orange: {
            lightest: scales.orange[1],
            light: scales.orange[4],
            base: scales.orange[8],
            dark: scales.orange[9]
        },
        yellow: {
            lightest: scales.yellow[1],
            light: scales.yellow[4],
            base: scales.yellow[8],
            dark: scales.yellow[9]
        },
        green: {
            lightest: scales.green[1],
            light: scales.green[5],
            base: scales.green[8],
            dark: scales.green[9]
        },
        teal: {
            lightest: scales.teal[1],
            light: scales.teal[4],
            base: scales.teal[8],
            dark: scales.teal[9]
        },
        violet: {
            lightest: scales.violet[1],
            light: scales.violet[4],
            base: scales.violet[8],
            dark: scales.violet[9]
        }
    };
}
/**
 * Generate lightmode colors
 * @param scales
 * @param palette
 */
function defaultGenerateLightMode(scales, palette) {
    return {
        background: {
            tint1: scales.gray[1],
            tint2: scales.gray[3],
            overlay: alpha(scales.gray[9], 0.6),
            layer: "white",
            default: "white"
        },
        border: {
            default: alpha(scales.gray[9], 0.12),
            muted: alpha(scales.gray[9], 0.08)
        },
        text: {
            heading: scales.gray[9],
            muted: color_1.default(scales.gray[7])
                .lighten(0.3)
                .hex()
                .toString(),
            default: scales.gray[9],
            selected: palette.blue.base
        },
        shadows: shadows_1.createShadows(scales.gray[8])
    };
}
/**
 * Generate dark mode colors
 * @param scales
 * @param palette
 */
function defaultGenerateDarkMode(scales, palette) {
    var base = scales.gray[9];
    return {
        background: {
            tint1: lighten(base, 0.5),
            tint2: lighten(base, 0.7),
            overlay: alpha(scales.gray[7], 0.8),
            layer: lighten(base, 0.2),
            default: base
        },
        border: {
            default: alpha(scales.gray[0], 0.13),
            muted: alpha(scales.gray[0], 0.08)
        },
        text: {
            heading: "white",
            muted: "rgba(255,255,255,0.7)",
            default: "rgba(255,255,255,0.88)",
            selected: palette.blue.base
        },
        shadows: shadows_1.createDarkShadows("black")
    };
}
/**
 * Intents map a color palette to a particular intent (ie, primary, success)
 * @param palette
 */
function defaultGenerateIntents(palette) {
    return {
        none: palette.gray,
        primary: palette.blue,
        success: palette.green,
        danger: palette.red,
        warning: palette.yellow
    };
}
function generateColorsFromScales(scales, generators) {
    if (generators === void 0) { generators = {}; }
    var _a = __assign({ generateIntents: defaultGenerateIntents, generatePalette: defaultGeneratePalette, generateLightMode: defaultGenerateLightMode, generateDarkMode: defaultGenerateDarkMode }, generators), generateIntents = _a.generateIntents, generatePalette = _a.generatePalette, generateLightMode = _a.generateLightMode, generateDarkMode = _a.generateDarkMode;
    var palette = generatePalette(scales);
    var intent = generateIntents(palette);
    var modes = {
        light: __assign({ mode: "light" }, generateLightMode(scales, palette), { palette: palette,
            scales: scales,
            intent: intent }),
        dark: __assign({ mode: "dark" }, generateDarkMode(scales, palette), { palette: palette,
            scales: scales,
            intent: intent })
    };
    return {
        colors: modes.light,
        modes: modes
    };
}
exports.generateColorsFromScales = generateColorsFromScales;
exports.defaultColors = generateColorsFromScales(defaultScales);
