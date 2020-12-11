import { addDecorator } from "@storybook/react";
//import { ThemeProvider } from "styled-components";

import "../styles/index.scss";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";


type DecoratorFunction = Parameters<typeof addDecorator>[0];


export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },

    //added for responsive screens
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
};
