//头部标记
import { jsx, css } from "@emotion/react";
import React from "react";
import { Story } from "@storybook/react";
import { Avatar ,AvatarProps, AvatarSizes } from "../Avatar";
//import { Text } from "./Test";

export default {
    title: "西溪",
    component: Avatar,
};

const Template: Story<AvatarProps> = (props) => (
    <Avatar {...props}>
        <p>Lorem ipsum dolor sit amet</p>
    </Avatar>
);

export const Primaryfgh = Template.bind({});
Primaryfgh.args = {
    src: "that"
};


