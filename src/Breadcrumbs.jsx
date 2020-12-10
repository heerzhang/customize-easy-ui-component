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
//头部标记
var core_1 = require("@emotion/core");
var React = require("react");
var Text_1 = require("./Text");
var prop_types_1 = require("prop-types");
var Providers_1 = require("./Theme/Providers");
var Icons_1 = require("./Icons");
var hideScrollbar = core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ::-webkit-scrollbar {\n    height: 0;\n    width: 0;\n  }\n"], ["\n  ::-webkit-scrollbar {\n    height: 0;\n    width: 0;\n  }\n"])));
/**
 * Breadcrumbs are useful to orient the user on your site,
 * especially when working with hierarchies of content.
 */
exports.Breadcrumbs = function (_a) {
    var children = _a.children, _b = _a.size, size = _b === void 0 ? "md" : _b, overflowX = _a.overflowX, other = __rest(_a, ["children", "size", "overflowX"]);
    var theme = Providers_1.useTheme();
    return (<nav className="Breadcrumbs" aria-label="breadcrumb" css={[
        {
            maxWidth: "100%",
            overflow: overflowX ? "scroll" : "hidden",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            borderRadius: theme.radii.sm,
            msOverflowStyle: "none"
        },
        hideScrollbar
    ]} {...other}>
      <ol className="Breadcrumbs__list" css={{
        listStyle: "none",
        whiteSpace: "nowrap",
        display: "inline-flex",
        boxSizing: "border-box",
        overflow: "hidden",
        maxWidth: overflowX ? undefined : "100%",
        margin: 0,
        padding: theme.spaces.sm + " " + theme.spaces.md,
        borderRadius: theme.radii.md
    }}>
        {React.Children.map(children, function (child, i) {
        if (!React.isValidElement(child)) {
            return child;
        }
        return React.cloneElement(child, {
            size: size,
            "aria-current": i === validChildrenCount(children) - 1 ? "page" : undefined
        });
    })}
      </ol>
    </nav>);
};
exports.Breadcrumbs.propTypes = {
    children: prop_types_1.default.node,
    size: prop_types_1.default.oneOf(["md", "lg"]),
    overflowX: prop_types_1.default.bool
};
function validChildrenCount(children) {
    return React.Children.toArray(children).filter(function (child) {
        return React.isValidElement(child);
    }).length;
}
/**
 *  Each item in a list of breadcrumbs.
 */
exports.BreadcrumbItem = function (_a) {
    var children = _a.children, _b = _a.size, size = _b === void 0 ? "md" : _b, other = __rest(_a, ["children", "size"]);
    var current = other["aria-current"];
    return (<li className="BreadcrumbItem" css={{
        flex: "0 1 auto",
        overflow: "hidden",
        display: "flex",
        alignItems: "center"
    }} {...other}>
      <Text_1.Text className="BreadcrumbItem__text" wrap={false} component="div" variant={size === "md" ? "body" : "h5"} gutter={false} css={{
        "& > a": {
            textDecoration: "none"
        }
    }}>
        {children}
      </Text_1.Text>
      {!current && <BreadcrumbDivider />}
    </li>);
};
exports.BreadcrumbItem.propTypes = {
    children: prop_types_1.default.node,
    size: prop_types_1.default.oneOf(["md", "lg"])
};
var BreadcrumbDivider = function () {
    var theme = Providers_1.useTheme();
    return (<Icons_1.IconChevronRight className="BreadcrumbDivider" color={theme.colors.text.muted} css={{
        flex: "0 0 auto",
        margin: "0 " + theme.spaces.sm
    }}/>);
};
BreadcrumbDivider.propTypes = {
    inverted: prop_types_1.default.bool
};
var templateObject_1;
