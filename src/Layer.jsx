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
var Spinner_1 = require("./Spinner");
var prop_types_1 = require("prop-types");
var Providers_1 = require("./Theme/Providers");
exports.Layer = React.forwardRef(function (_a, ref) {
    var _b = _a.elevation, elevation = _b === void 0 ? "md" : _b, children = _a.children, other = __rest(_a, ["elevation", "children"]);
    var theme = Providers_1.useTheme();
    return (<div ref={ref} css={{
        position: "relative",
        background: theme.colors.background.layer,
        boxShadow: theme.shadows[elevation],
        borderRadius: theme.radii.lg
    }} {...other}>
        {children}
      </div>);
});
exports.Layer.displayName = "Layer";
exports.Layer.propTypes = {
    elevation: prop_types_1.default.oneOf(["xs", "sm", "md", "lg", "xl"]),
    children: prop_types_1.default.node
};
exports.LayerLoading = function (_a) {
    var loading = _a.loading, label = _a.label, other = __rest(_a, ["loading", "label"]);
    var theme = Providers_1.useTheme();
    var isDark = theme.colors.mode === "dark";
    return (<div css={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        borderRadius: theme.radii.lg,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isDark ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.7)",
        zIndex: 5,
        transition: "opacity 0.3s ease",
        pointerEvents: loading ? "auto" : "none",
        opacity: loading ? 1 : 0
    }} {...other}>
      <Spinner_1.Spinner label={label}/>
    </div>);
};
exports.LayerLoading.propTypes = {
    loading: prop_types_1.default.bool,
    label: prop_types_1.default.string
};
