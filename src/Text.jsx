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
var prop_types_1 = require("prop-types");
var Providers_1 = require("./Theme/Providers");
exports.getVariantStyles = function (theme, variant) {
    var _a, _b, _c;
    switch (variant) {
        case "uppercase":
            return core_1.css({
                textTransform: "uppercase",
                fontSize: theme.fontSizes[0],
                fontWeight: 600,
                color: theme.colors.text.muted,
                letterSpacing: "-0.02em"
            });
        case "body":
            return core_1.css({
                fontSize: theme.fontSizes[1]
            });
        case "paragraph":
            return core_1.css({
                fontSize: theme.fontSizes[1],
                marginBottom: theme.spaces.md
            });
        case "subtitle":
            return core_1.css({
                fontSize: theme.fontSizes[0],
                fontWeight: 400,
                color: theme.colors.text.muted,
                lineHeight: theme.lineHeights.body
            });
        case "lead":
            return core_1.css({
                fontWeight: 400,
                fontSize: theme.fontSizes[2]
            });
        case "h6":
            return core_1.css({
                color: theme.colors.text.heading,
                fontWeight: theme.fontWeights.heading,
                lineHeight: 1.5,
                fontSize: theme.fontSizes[1],
                marginBottom: theme.spaces.sm
            });
        case "h5":
            return core_1.css({
                color: theme.colors.text.heading,
                fontWeight: theme.fontWeights.heading,
                fontSize: theme.fontSizes[2],
                lineHeight: theme.lineHeights.heading,
                marginBottom: theme.spaces.sm
            });
        case "h4":
            return core_1.css({
                color: theme.colors.text.heading,
                fontWeight: theme.fontWeights.heading,
                fontSize: theme.fontSizes[3],
                lineHeight: theme.lineHeights.heading,
                marginBottom: theme.spaces.sm,
                letterSpacing: "-0.2px"
            });
        case "h3":
            return core_1.css({
                color: theme.colors.text.heading,
                fontWeight: theme.fontWeights.heading,
                fontSize: theme.fontSizes[4],
                lineHeight: theme.lineHeights.heading,
                marginBottom: theme.spaces.sm
            });
        case "h2":
            return core_1.css({
                color: theme.colors.text.heading,
                fontWeight: theme.fontWeights.heading,
                fontSize: theme.fontSizes[5],
                lineHeight: theme.lineHeights.heading,
                marginBottom: theme.spaces.sm,
                letterSpacing: "-0.2px"
            });
        case "h1":
            return core_1.css({
                color: theme.colors.text.heading,
                fontWeight: theme.fontWeights.heading,
                fontSize: theme.fontSizes[6],
                lineHeight: theme.lineHeights.heading,
                marginBottom: theme.spaces.sm,
                letterSpacing: "-0.2px"
            });
        case "display3":
            return core_1.css((_a = {
                    color: theme.colors.text.heading,
                    fontWeight: theme.fontWeights.display,
                    fontSize: theme.fontSizes[5],
                    lineHeight: theme.lineHeights.heading,
                    marginBottom: theme.spaces.sm
                },
                _a[theme.mediaQueries.lg] = {
                    fontSize: theme.fontSizes[6]
                },
                _a));
        case "display2":
            return core_1.css((_b = {
                    color: theme.colors.text.heading,
                    fontWeight: theme.fontWeights.display,
                    fontSize: theme.fontSizes[6],
                    lineHeight: theme.lineHeights.heading,
                    marginBottom: theme.spaces.sm
                },
                _b[theme.mediaQueries.lg] = {
                    fontSize: theme.fontSizes[7]
                },
                _b));
        case "display1":
            return core_1.css((_c = {
                    color: theme.colors.text.heading,
                    fontWeight: theme.fontWeights.display,
                    fontSize: theme.fontSizes[7],
                    lineHeight: theme.lineHeights.heading,
                    marginBottom: theme.spaces.sm
                },
                _c[theme.mediaQueries.lg] = {
                    fontSize: theme.fontSizes[8]
                },
                _c));
    }
};
var element = {
    display1: "h1",
    display2: "h1",
    display3: "h1",
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    uppercase: "div",
    subtitle: "div",
    body: "span",
    paragraph: "p",
    hidden: "span",
    lead: "p"
};
var basicStyles = function (theme) { return ({
    base: core_1.css({
        boxSizing: "border-box",
        margin: 0,
        fontWeight: theme.fontWeights.body,
        lineHeight: theme.lineHeights.body,
        fontFamily: theme.fonts.base,
        fontSize: theme.fontSizes[1],
        color: theme.colors.text.default,
        WebkitFontSmoothing: "antialiased",
        WebkitTextSizeAdjust: "none"
    }),
    noGutter: core_1.css({
        marginBottom: 0
    }),
    noWrap: core_1.css({
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    }),
    muted: core_1.css({
        color: theme.colors.text.muted
    })
}); };
exports.Text = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? "body" : _b, _c = _a.wrap, wrap = _c === void 0 ? true : _c, _d = _a.gutter, gutter = _d === void 0 ? true : _d, muted = _a.muted, component = _a.component, other = __rest(_a, ["variant", "wrap", "gutter", "muted", "component"]);
    var Component = component || element[variant];
    var theme = Providers_1.useTheme();
    var variantStyles = React.useMemo(function () { return exports.getVariantStyles(theme, variant); }, [
        theme,
        variant
    ]);
    var styles = React.useMemo(function () { return basicStyles(theme); }, [theme]);
    return (<Component css={[
        styles.base,
        !wrap && styles.noWrap,
        muted && styles.muted,
        variantStyles,
        !gutter && styles.noGutter
    ]} {...other}/>);
};
exports.Text.propTypes = {
    variant: prop_types_1.default.oneOf([
        "uppercase",
        "hidden",
        "body",
        "paragraph",
        "subtitle",
        "lead",
        "h6",
        "h5",
        "h4",
        "h3",
        "h2",
        "h1",
        "display3",
        "display2",
        "display1"
    ]),
    wrap: prop_types_1.default.bool,
    muted: prop_types_1.default.bool,
    gutter: prop_types_1.default.bool,
    component: prop_types_1.default.elementType
};
