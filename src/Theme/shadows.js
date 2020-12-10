"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("color");
function alpha(c, amount) {
    return color_1.default(c)
        .alpha(amount)
        .hsl()
        .string();
}
function createShadows(color) {
    var shadow = function (amount) { return alpha(color, amount); };
    return {
        xs: "0 0 1px " + shadow(0.1) + ",\n    0 0 1px 1px " + shadow(0.12) + "\n  ",
        sm: "0 1px 8px 0 " + shadow(0.15) + ", \n    0 1px 3px 0 " + shadow(0.1) + ",\n    0 2px 3px -2px " + shadow(0.12),
        md: "0 1px 10px 0 " + shadow(0.15) + ", \n    0 6px 12px 0 " + shadow(0.1) + ",\n    0 6px 15px -2px " + shadow(0.12),
        lg: "0 1px 10px 0 " + shadow(0.15) + ", \n    0 15px 22px 0 " + shadow(0.1) + ",\n    0 15px 25px -2px " + shadow(0.12),
        xl: "0 1px 10px 0 " + shadow(0.15) + ", \n    0 25px 35px 0 " + shadow(0.1) + ",\n    0 25px 40px -2px " + shadow(0.12)
    };
}
exports.createShadows = createShadows;
function createDarkShadows(color) {
    var shadow = function (amount) { return alpha(color, amount); };
    return {
        xs: "0 0 1px " + shadow(0.15) + ",\n    0 0 1px 1px " + shadow(0.3) + "\n  ",
        sm: "0 1px 8px 0 " + shadow(0.24) + ", \n    0 1px 3px 0 " + shadow(0.13) + ",\n    0 2px 3px -2px " + shadow(0.16),
        md: "0 1px 10px 0 " + shadow(0.15) + ", \n    0 6px 12px 0 " + shadow(0.25) + ",\n    0 6px 15px -2px " + shadow(0.25),
        lg: "0 1px 10px 0 " + shadow(0.15) + ", \n    0 15px 22px 0 " + shadow(0.25) + ",\n    0 15px 25px -2px " + shadow(0.25),
        xl: "0 1px 10px 0 " + shadow(0.15) + ", \n    0 25px 35px 0 " + shadow(0.25) + ",\n    0 25px 40px -2px " + shadow(0.25)
    };
}
exports.createDarkShadows = createDarkShadows;
