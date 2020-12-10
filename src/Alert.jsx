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
var alert_1 = require("@reach/alert");
var Text_1 = require("./Text");
var IconButton_1 = require("./IconButton");
var prop_types_1 = require("prop-types");
var Providers_1 = require("./Theme/Providers");
var IconWrapper_1 = require("./IconWrapper");
var Icons_1 = require("./Icons");
var alertIntentions = function (theme) { return ({
    info: theme.colors.intent.none,
    success: theme.colors.intent.success,
    question: theme.colors.intent.primary,
    danger: theme.colors.intent.danger,
    warning: theme.colors.intent.warning
}); };
var icons = {
    info: <Icons_1.IconInfo />,
    success: <Icons_1.IconCheckCircle />,
    warning: <Icons_1.IconAlertCircle />,
    danger: <Icons_1.IconAlertOctagon />,
    question: <Icons_1.IconHelpCircle />
};
/**
 * Use an alert to inform users of important information.
 * To display an alert in a toast notification, use the toast module.
 */
exports.Alert = function (_a) {
    var children = _a.children, title = _a.title, id = _a.id, subtitle = _a.subtitle, component = _a.component, _b = _a.elevation, elevation = _b === void 0 ? "xs" : _b, onRequestClose = _a.onRequestClose, _c = _a.intent, intent = _c === void 0 ? "info" : _c, other = __rest(_a, ["children", "title", "id", "subtitle", "component", "elevation", "onRequestClose", "intent"]);
    var theme = Providers_1.useTheme();
    var intentions = React.useMemo(function () { return alertIntentions(theme); }, [theme]);
    var dark = theme.colors.mode === "dark";
    var color = intentions[intent];
    var accent = dark ? color.light : color.base;
    if (dark && intent === "info") {
        accent = color.light;
    }
    var icon = icons[intent];
    var contents = title ? (<div className="Alert__title" css={{ display: "flex", alignItems: "flex-start" }}>
      <div css={{ flex: "0 0 auto", marginTop: "2px" }}>
        <IconWrapper_1.IconWrapper size="md" color={accent}>
          {icon}
        </IconWrapper_1.IconWrapper>
      </div>
      <div className="Alert__text-content" css={{ marginLeft: theme.spaces.md }}>
        <Text_1.Text className="Alert__title-text" id={id} css={{ margin: 0 }} variant="h6">
          {title}
        </Text_1.Text>
        {subtitle && (<Text_1.Text className="Alert__title-subtitle" muted css={{
        fontSize: theme.fontSizes[0]
    }}>
            {subtitle}
          </Text_1.Text>)}
        {children}
      </div>
    </div>) : (children);
    var Component = component || alert_1.default;
    return (<Component className="Alert" css={{
        backgroundColor: dark
            ? theme.colors.background.tint1
            : theme.colors.background.default,
        overflow: "hidden",
        position: "relative",
        boxShadow: theme.shadows[elevation],
        borderRadius: theme.radii.md
    }} {...other}>
      <div>
        <div className="Alert__bar" css={{
        width: theme.radii.md,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: accent
    }}/>
        <div className="Alert__content" css={{
        display: "flex",
        alignItems: "flex-start",
        padding: theme.spaces.md + " " + theme.spaces.md,
        paddingRight: onRequestClose ? "3.5rem" : undefined
    }}>
          {contents}
          {onRequestClose && (<IconButton_1.CloseButton css={{
        marginTop: "-0.45rem",
        right: theme.spaces.sm,
        position: "absolute"
    }} onClick={onRequestClose}/>)}
        </div>
      </div>
    </Component>);
};
exports.Alert.displayName = "Alert";
exports.Alert.propTypes = {
    onRequestClose: prop_types_1.default.func,
    subtitle: prop_types_1.default.string,
    title: prop_types_1.default.string,
    id: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.number]),
    children: prop_types_1.default.node,
    intent: prop_types_1.default.oneOf([
        "info",
        "success",
        "warning",
        "danger",
        "question"
    ]),
    elevation: prop_types_1.default.oneOf(["xs", "sm", "md", "lg", "xl"]),
    component: prop_types_1.default.elementType
};
