"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var visually_hidden_1 = require("@reach/visually-hidden");
var prop_types_1 = require("prop-types");
var Text_1 = require("./Text");
var Providers_1 = require("./Theme/Providers");
var spin = react_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  to { \n    transform: rotate(360deg); \n  }\n"], ["\n  to { \n    transform: rotate(360deg); \n  }\n"])));
var sizeStyles = {
    xs: react_1.css({ width: "0.5rem", height: "0.5rem" }),
    sm: react_1.css({ width: "0.75rem", height: "0.75rem" }),
    md: react_1.css({ width: "1rem", height: "1rem" }),
    lg: react_1.css({ width: "1.25rem", height: "1.25rem" }),
    xl: react_1.css({ width: "1.5rem", height: "1.5rem" })
};
// spinner css based on one provided by bootstrap
// https://getbootstrap.com/docs/4.3/components/spinners/
exports.Spinner = function (_a) {
    var _b = _a.delay, delay = _b === void 0 ? 400 : _b, _c = _a.size, size = _c === void 0 ? "md" : _c, center = _a.center, label = _a.label, other = __rest(_a, ["delay", "size", "center", "label"]);
    var theme = Providers_1.useTheme();
    var _d = React.useState(delay === 0 ? true : false), show = _d[0], setShow = _d[1];
    React.useEffect(function () {
        var timer = setTimeout(function () {
            setShow(true);
        }, delay);
        return function () {
            clearTimeout(timer);
        };
    }, [delay]);
    return (<div className="Spinner" css={[
        {
            opacity: show ? 1 : 0,
            display: "inline-block",
            transition: "opacity 0.4s cubic-bezier(0.35,0,0.25,1)"
        },
        center && {
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center"
        }
    ]} {...other}>
      <div className="Spinner__container" role="status" css={{
        color: theme.colors.text.default,
        textAlign: "center",
        display: "inline-block"
    }}>
        <div className="Spinner__spinner" css={[
        react_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n              display: inline-block;\n              vertical-align: text-bottom;\n              border: 0.15em solid currentColor;\n              border-right-color: transparent;\n              border-radius: 50%;\n              animation: ", " 0.75s linear infinite;\n            "], ["\n              display: inline-block;\n              vertical-align: text-bottom;\n              border: 0.15em solid currentColor;\n              border-right-color: transparent;\n              border-radius: 50%;\n              animation: ", " 0.75s linear infinite;\n            "])), spin),
        sizeStyles[size]
    ]}/>
        {label ? (<Text_1.Text className="Spinner__label" wrap={false} css={{ display: "block", marginTop: theme.spaces.sm }} variant="subtitle">
            {label}
          </Text_1.Text>) : (<visually_hidden_1.default>{"Loading"}</visually_hidden_1.default>)}
      </div>
    </div>);
};
exports.Spinner.propTypes = {
    delay: prop_types_1.default.number,
    center: prop_types_1.default.bool,
    label: prop_types_1.default.string,
    size: prop_types_1.default.oneOf(["xs", "sm", "md", "lg", "xl"])
};
var templateObject_1, templateObject_2;
