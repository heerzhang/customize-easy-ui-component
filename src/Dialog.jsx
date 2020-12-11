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
var Text_1 = require("./Text");
var IconButton_1 = require("./IconButton");
var react_spring_1 = require("react-spring");
var Overlay_1 = require("./Overlay");
var use_focus_trap_1 = require("./Hooks/use-focus-trap");
var prop_types_1 = require("prop-types");
var use_scroll_lock_1 = require("use-scroll-lock");
var Providers_1 = require("./Theme/Providers");
/**
 * A dialog is useful for displaying infomation that
 * commands the user's attention.
 */
exports.Dialog = function (_a) {
    var isOpen = _a.isOpen, onRequestClose = _a.onRequestClose, mobileFullscreen = _a.mobileFullscreen, title = _a.title, children = _a.children, other = __rest(_a, ["isOpen", "onRequestClose", "mobileFullscreen", "title", "children"]);
    var theme = Providers_1.useTheme();
    // [TransitionFn<Item, State & object>, SpringStartFn<State>, SpringStopFn<State>]
    var transitions = react_spring_1.useTransition(isOpen, {
        from: { opacity: 0, transform: "scale(0.9)" },
        enter: { opacity: 1, transform: "scale(1)" },
        leave: { opacity: 0, transform: "scale(0.9)" },
        config: { mass: 1, tension: 185, friction: 26 }
    });
    var scrollableRef = React.useRef(null);
    var ref = React.useRef(null);
    use_focus_trap_1.useFocusElement(ref, isOpen);
    use_scroll_lock_1.default(isOpen, scrollableRef);
    return (<React.Fragment>
      <Overlay_1.Overlay onRequestClose={onRequestClose} isOpen={isOpen}>
        <React.Fragment>
          {transitions(function (style, item) {
        var _a, _b;
        return (item && <react_spring_1.animated.div key={1} className="Dialog" aria-modal="true" ref={ref} tabIndex={-1} onClick={function (e) {
            e.stopPropagation();
        }} style={{
            opacity: style.opacity,
            transform: style.transform
        }} css={[
            (_a = {
                    zIndex: theme.zIndices.modal,
                    background: theme.colors.background.default,
                    boxShadow: theme.shadows.md,
                    borderRadius: theme.radii.lg,
                    margin: "16px",
                    width: "calc(100% - 32px)",
                    outline: "none"
                },
                _a[theme.mediaQueries.md] = {
                    maxWidth: "500px",
                    margin: "30px auto"
                },
                _a[theme.mediaQueries.lg] = {
                    maxWidth: "650px",
                    margin: "30px auto"
                },
                _a),
            mobileFullscreen && (_b = {
                    maxWidth: "none",
                    margin: 0,
                    width: "100vw",
                    height: "100vh",
                    borderRadius: 0,
                    boxShadow: "none"
                },
                _b[theme.mediaQueries.md] = {
                    maxWidth: "500px",
                    margin: "30px auto",
                    height: "auto",
                    boxShadow: theme.shadows.md,
                    borderRadius: theme.radii.lg,
                    width: "calc(100% - 32px)"
                },
                _b)
        ]} {...other}>
                <React.Fragment>
                  {title && (<exports.DialogHeader className="Dialog__header" css={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: theme.spaces.lg + " " + theme.spaces.lg + " 0 " + theme.spaces.lg
        }} title={title} onRequestClose={onRequestClose}/>)}
                  <div ref={scrollableRef}>{children}</div>
                </React.Fragment>
              </react_spring_1.animated.div>);
    })}
        </React.Fragment>
      </Overlay_1.Overlay>
    </React.Fragment>);
};
exports.Dialog.propTypes = {
    isOpen: prop_types_1.default.bool.isRequired,
    onRequestClose: prop_types_1.default.func.isRequired,
    title: prop_types_1.default.string,
    mobileFullscreen: prop_types_1.default.bool,
    children: prop_types_1.default.node
};
exports.DialogHeader = function (_a) {
    var title = _a.title, onRequestClose = _a.onRequestClose, other = __rest(_a, ["title", "onRequestClose"]);
    return (<div {...other}>
    <Text_1.Text wrap={false} variant="h4">
      {title}
    </Text_1.Text>
    {onRequestClose && <IconButton_1.CloseButton onClick={onRequestClose}/>}
  </div>);
};
exports.DialogHeader.propTypes = {
    title: prop_types_1.default.string.isRequired,
    onRequestClose: prop_types_1.default.func
};
