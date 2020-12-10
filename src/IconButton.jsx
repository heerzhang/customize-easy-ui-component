"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var react_1 = require("@emotion/react");
var React = require("react");
var Button_1 = require("./Button");
var visually_hidden_1 = require("@reach/visually-hidden");
var prop_types_1 = require("prop-types");
var IconWrapper_1 = require("./IconWrapper");
var Icons_1 = require("./Icons");
var Providers_1 = require("./Theme/Providers");
/**
 * A component which composes Button and Icon to provide
 * interactive icon elements.
 */
exports.IconButton = React.forwardRef(function (_a, ref) {
    var label = _a.label, _b = _a.size, size = _b === void 0 ? "md" : _b, icon = _a.icon, onPress = _a.onPress, _c = _a.color, color = _c === void 0 ? "currentColor" : _c, other = __rest(_a, ["label", "size", "icon", "onPress", "color"]);
    var _d;
    var theme = Providers_1.useTheme();
    return (<Button_1.Button ref={ref} size={size} css={_d = {
            padding: 0
        },
        _d[theme.mediaQueries.sm] = {
            padding: 0,
        },
        _d[theme.mediaQueries.lg] = {
            padding: 0,
        },
        _d.width = Button_1.getHeight(size),
        _d} onPress={onPress} {...other}>
        <visually_hidden_1.default>{label}</visually_hidden_1.default>
        <IconWrapper_1.IconWrapper color={color} size={size}>
          {icon}
        </IconWrapper_1.IconWrapper>
      </Button_1.Button>);
});
exports.IconButton.displayName = "IconButton";
exports.IconButton.propTypes = {
    icon: prop_types_1.default.node.isRequired,
    color: prop_types_1.default.string,
    label: prop_types_1.default.string.isRequired,
    variant: prop_types_1.default.oneOf(["outline", "default", "ghost"]),
    size: prop_types_1.default.oneOf(["xs", "sm", "md", "lg", "xl"])
};
exports.CloseButton = function (_a) {
    var _b = _a.label, label = _b === void 0 ? "Close" : _b, other = __rest(_a, ["label"]);
    return (<exports.IconButton variant="ghost" label={label} icon={<Icons_1.IconX />} {...other}/>);
};
exports.CloseButton.propTypes = {
    label: prop_types_1.default.string,
    color: prop_types_1.default.string,
    variant: prop_types_1.default.oneOf(["outline", "default", "ghost"]),
    size: prop_types_1.default.oneOf(["xs", "sm", "md", "lg", "xl"])
};
