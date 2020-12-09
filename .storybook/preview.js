import "../styles/index.scss";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },

  //added for responsive screens
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
