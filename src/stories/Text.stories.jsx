"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Avatar_1 = require("../Avatar");
exports.default = {
    title: "Components / Text",
    component: Avatar_1.Avatar,
    argTypes: {},
};
exports.WithArgs = function (args) { return <Avatar_1.Avatar {...args}/>; };
exports.WithArgs.args = { variant: 'paragraph' };
