import React from "react";
import type { Story, Meta } from "@storybook/react/types-6-0";

import { TsComponent, TsComponentProps } from "./ts-component";

export default {
  title: "TsComponent",
  component: TsComponent,
} as Meta;

const Template: Story<TsComponentProps> = (props) => (
  <TsComponent {...props}>
    <p>Lorem ipsum dolor sit amet</p>
  </TsComponent>
);

export const Default = Template.bind({});
Default.args = { thing: "that" };
