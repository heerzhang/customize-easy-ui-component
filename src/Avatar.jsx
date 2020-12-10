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
//头部标记
var core_1 = require("@emotion/core");
var React = require("react");
var visually_hidden_1 = require("@reach/visually-hidden");
var Text_1 = require("./Text");
var prop_types_1 = require("prop-types");
var Providers_1 = require("./Theme/Providers");
var sizes = function () { return ({
    xs: core_1.css({ width: "1.25rem", height: "1.25rem", fontSize: "0.7rem" }),
    sm: core_1.css({ width: "2.02rem", height: "2.02rem", fontSize: "0.875rem" }),
    md: core_1.css({ width: "3.27rem", height: "3.27rem", fontSize: "1.41rem" }),
    lg: core_1.css({ width: "5.29rem", height: "5.29rem", fontSize: "2.29rem" }),
    xl: core_1.css({ width: "8.57rem", height: "8.57rem", fontSize: "3.70rem" })
}); };
/**
 * Display a profile image to represent a user. Initials can be shown as a fallback
 */
exports.Avatar = function (_a) {
    var src = _a.src, name = _a.name, _b = _a.size, size = _b === void 0 ? "md" : _b, srcSet = _a.srcSet, other = __rest(_a, ["src", "name", "size", "srcSet"]);
    var theme = Providers_1.useTheme();
    var dark = theme.colors.mode === "dark";
    var colors = Object.keys(theme.colors.palette);
    var img = src || srcSet;
    var initials = getInitials(name);
    if (size === "xs")
        initials = initials.substring(0, 1);
    var color = colors[Math.abs(makeHash(name)) % colors.length];
    var _c = React.useState(false), error = _c[0], setError = _c[1];
    function onError() {
        setError(true);
    }
    return (<div css={[
        {
            display: "flex",
            alignItems: "center",
            flex: "0 0 auto",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: img
                ? theme.colors.background.tint2
                : theme.colors.palette[color][dark ? "light" : "base"]
        },
        sizes()[size]
    ]} {...other}>
      {img && !error ? (<img alt={name} src={src} srcSet={srcSet} onError={onError} css={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "50%",
        display: "block"
    }}/>) : (<div>
          <visually_hidden_1.default>{name}</visually_hidden_1.default>
          <Text_1.Text css={{
        fontWeight: size === "xs" ? 500 : 400,
        fontSize: "inherit",
        color: dark ? "rgba(0,0,0,0.75)" : "white"
    }}>
            {initials}
          </Text_1.Text>
        </div>)}
    </div>);
};
exports.Avatar.propTypes = {
    src: prop_types_1.default.string,
    name: prop_types_1.default.string,
    size: prop_types_1.default.oneOf(["xs", "sm", "md", "lg", "xl"]),
    srcSet: prop_types_1.default.string
};
function getInitials(name) {
    if (name === void 0) { name = "?"; }
    return name
        .replace(/\s+/, " ")
        .split(" ")
        .slice(0, 2)
        .map(function (v) { return v[0]; })
        .join("")
        .toUpperCase();
}
function makeHash(name) {
    if (name === void 0) { name = "?"; }
    var hash = 0, i, chr;
    if (name.length === 0)
        return hash;
    for (i = 0; i < name.length; i++) {
        chr = name.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
