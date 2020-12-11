"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var react_1 = require("@emotion/react");
var React = require("react");
var react_spring_1 = require("react-spring");
var Portal_1 = require("./Portal");
var hide_body_1 = require("./Hooks/hide-body");
var prop_types_1 = require("prop-types");
var Providers_1 = require("./Theme/Providers");
exports.Overlay = React.forwardRef(function (_a, ref) {
    var isOpen = _a.isOpen, onRequestClose = _a.onRequestClose, children = _a.children;
    var theme = Providers_1.useTheme();
    var transitions = react_spring_1.useTransition(isOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });
    var bind = hide_body_1.useHideBody(isOpen).bind;
    return (<Portal_1.Portal>
        {transitions(function (style, item) {
        // @ts-ignore
        return (item && <div key={1} ref={ref} {...bind} onClick={function (e) {
            e.stopPropagation();
            onRequestClose();
        }} onKeyDown={function (e) {
            if (e.key === "Escape") {
                e.stopPropagation();
                onRequestClose();
            }
        }} css={{
            bottom: 0,
            left: 0,
            overflow: "auto",
            width: "100vw",
            height: "100vh",
            zIndex: theme.zIndices.overlay,
            position: "fixed",
            content: "''",
            right: 0,
            top: 0,
            WebkitTapHighlightColor: "transparent"
        }}>
              <react_spring_1.animated.div style={{ opacity: style.opacity }} css={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.colors.background.overlay
        }}/>

              {children}
            </div>);
    })}
      </Portal_1.Portal>);
});
exports.Overlay.displayName = "Overlay";
exports.Overlay.propTypes = {
    isOpen: prop_types_1.default.bool.isRequired,
    onRequestClose: prop_types_1.default.func.isRequired,
    children: prop_types_1.default.node
};
