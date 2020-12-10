"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var react_1 = require("@emotion/react");
var Button_1 = require("../Button");
var Tooltip_1 = require("../Tooltip");
var react_2 = require("@storybook/react");
var IconButton_1 = require("../IconButton");
var Icons_1 = require("../Icons");
var Providers_1 = require("../Theme/Providers");
exports.TooltipStories = react_2.storiesOf("Tooltip", module)
    .add("basic", function () {
    return (<div css={{ padding: "100px" }}>
        <Tooltip_1.Tooltip content="This is some tooltip content">
          <Button_1.Button>Hello world. Hover me!!</Button_1.Button>
        </Tooltip_1.Tooltip>
      </div>);
})
    .add("hover effects remain", function () {
    return (<div css={{ padding: "100px" }}>
        <Tooltip_1.Tooltip content="This is some tooltip content">
          <IconButton_1.IconButton variant="ghost" label="hello" icon={<Icons_1.IconArrowRight />}/>
        </Tooltip_1.Tooltip>
      </div>);
})
    .add("works with dark mode wrapper", function () {
    return (<div css={{ padding: "100px" }}>
        <Tooltip_1.Tooltip content="This is some tooltip content">
          <Providers_1.DarkMode>
            <IconButton_1.IconButton variant="ghost" label="hello" icon={<Icons_1.IconArrowRight />}/>
          </Providers_1.DarkMode>
        </Tooltip_1.Tooltip>
      </div>);
})
    .add("delay show / hide", function () {
    return (<div css={{ padding: "100px" }}>
        <Tooltip_1.Tooltip delayIn={1000} delayOut={800} content="This is some tooltip content">
          <Button_1.Button>Hello world. Hover me!!</Button_1.Button>
        </Tooltip_1.Tooltip>
      </div>);
});
