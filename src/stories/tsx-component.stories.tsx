import React from "react";
import { Story } from "@storybook/react";

import { TsxComponent, TsxComponentProps } from "./tsx-component";

export default {
  title: "西溪",
  component: TsxComponent,
};

const Template: Story<TsxComponentProps> = (props) => (
  <TsxComponent {...props}>
    <p>Lorem ipsum dolor sit amet</p>
  </TsxComponent>
);


export const 康少 = Template.bind({});
康少.args = { thing: "that" };


export const Primary = Template.bind({});
Primary.args = {
    thing: "that"
};

export const Secondary = Template.bind({});
Secondary.args = {
    thing: "this"
};
