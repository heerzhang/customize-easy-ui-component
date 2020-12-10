"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var react_1 = require("@emotion/react");
var Avatar_1 = require("../Avatar");
var faker_1 = require("faker");
var react_2 = require("@storybook/react");
exports.AvatarStories = react_2.storiesOf("Avatar", module).add("basic", function () {
    var names = new Array(10).fill(null).map(function (a) { return faker_1.default.name.findName(); });
    var sizes = ["xs", "sm", "md", "lg", "xl"];
    return (<div>
      {sizes.map(function (size) { return (<div css={{ display: "flex" }}>
          {names.map(function (name) { return (<Avatar_1.Avatar size={size} name={name} css={{ margin: "0.25rem" }} key={name}/>); })}
        </div>); })}

      {sizes.map(function (size) { return (<div css={{ display: "flex" }}>
          {names.map(function (name) { return (<Avatar_1.Avatar size={size} name={name} src={faker_1.default.image.avatar()} css={{ margin: "0.25rem" }} key={name}/>); })}
        </div>); })}
    </div>);
});
