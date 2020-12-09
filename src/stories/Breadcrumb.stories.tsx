//头部标记
import { jsx } from "@emotion/core";
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Breadcrumbs, BreadcrumbItem } from "../Breadcrumbs";
//import { Link } from "../Link";
//import { ToggleDarkMode } from "./ToggleDarkMode";

export default {
    title: "Components/Breadcrumbs",
    component: Breadcrumbs,
    argTypes: {},
};

const Template = (args) => <Breadcrumbs {...args} />;

export const Basic_usage = Template.bind({});
Basic_usage.args = {
    primary: true,
    children: "ContacBasic_usaget me",
};
export const Large = Template.bind({});
Large.args = {
    children: "MLargey work",
};


