/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";
import { Story } from "@storybook/react";
import faker from "faker";
import { Embed ,EmbedProps} from "../Embed";

export default {
    title: "Components/Embed2",
    component: Embed,
};

const Template: Story<EmbedProps> = (props) => (
    <div css={{ maxWidth: "400px", border: "2px solid" }}>
        <Embed {...props}>
            <img src={faker.image.people(1600, 900)} alt="Some person" />
        </Embed>
        <div>I should not move around</div>
    </div>
);

export const basic = Template.bind({});
basic.args = {
    width: 16,
    height: 9
};
