//头部标记
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import { Avatar as Text, AvatarSizes } from "../Avatar";
//import { Text } from "./Test";
import { Meta } from '@storybook/react/types-6-0';

export default {
    title: "Components / Text",
    component: Text,
    argTypes: {},
} as Meta;


export const WithArgs = (args: any) =>   <Text {...args}/>;

WithArgs.args = { variant: 'paragraph' };


