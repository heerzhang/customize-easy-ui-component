"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_2 = require("@storybook/react");
var Text_1 = require("../Text");
var Link_1 = require("../Link");
exports.ThemeExamples = react_2.storiesOf("Text", module).add("Link contrast", function () { return (<div css={{ padding: "1rem" }}>
      <Text_1.Text variant="paragraph">
        Deserunt dolore consequat labore aute{" "}
        <Link_1.Link href="#">est excepteur sit ut esse laboris</Link_1.Link> amet eiusmod.
        Tempor est officia cillum culpa velit. Esse do magna nostrud sunt minim
        ullamco id cillum ex. Officia cillum tempor adipisicing officia
        excepteur enim nostrud. Veniam Lorem ad minim est veniam duis. Magna
        Lorem commodo commodo amet non sint sunt aliquip voluptate.
      </Text_1.Text>
    </div>); });
