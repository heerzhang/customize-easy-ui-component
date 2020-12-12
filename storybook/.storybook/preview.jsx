"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { ThemeProvider } from "styled-components";
require("../styles/index.scss");
var addon_viewport_1 = require("@storybook/addon-viewport");
exports.parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    //added for responsive screens
    viewport: {
        viewports: addon_viewport_1.INITIAL_VIEWPORTS,
    },
};
