import React from "react";
import { Button } from "../components";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  children: "Contact me",
};
export const Secondary = Template.bind({});
Secondary.args = {
  children: "My work",
};
