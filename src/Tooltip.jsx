"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var Positions_1 = require("./Positions");
var Text_1 = require("./Text");
var react_spring_1 = require("react-spring");
var prop_types_1 = require("prop-types");
var is_mobile_1 = require("is-mobile");
var use_uid_1 = require("./Hooks/use-uid");
var Providers_1 = require("./Theme/Providers");
exports.arrowStyles = function (color) {
    return react_1.css("\n  position: absolute;\n  width: 3em;\n  height: 3em;\n  &[data-placement*='bottom'] {\n    bottom: 100%;\n    left: 0;\n    margin-top: 0em;\n    width: 1em;\n    height: 0.25em;\n    &::before {\n      width: 10px;\n      border: none;\n      height: 10px;\n      background: " + color + ";\n      border-top: 1px solid " + (color === "white" ? " #dee2e685" : color) + ";\n      border-right: 1px solid " + (color === "white" ? "#dee2e685" : color) + ";\n      transform: rotate(-45deg);\n      border-radius: 2px;\n      margin-top: -1px;\n    }\n  }\n  &[data-placement*='top'] {\n    top: 100%;\n    left: 0;\n    margin-bottom: 0;\n    width: 1em;\n    height: 0.25em;\n    &::before {\n      border-width: 0.25em 0.25em 0 0.25em;\n      border-color: " + color + " transparent transparent transparent;\n    }\n  }\n  &[data-placement*='right'] {\n    right: 100%;\n    height: 1em;\n    width: 0.25em;\n    &::before {\n      border-width: 0.25em 0.25em 0.25em 0;\n      border-color: transparent " + color + " transparent transparent;\n    }\n  }\n  &[data-placement*='left'] {\n    left: 100%;\n    height: 1em;\n    width: 0.25em;\n    &::before {\n      border-width: 0.25em 0 0.25em 0.25em;\n      border-color: transparent transparent transparent " + color + ";\n    }\n  }\n  &::before {\n    content: '';\n    margin: auto;\n    display: block;\n    width: 0;\n    height: 0;\n    border-style: solid;\n  }\n");
};
exports.Tooltip = function (_a) {
    var placement = _a.placement, children = _a.children, content = _a.content, _b = _a.delayIn, delayIn = _b === void 0 ? 0 : _b, _c = _a.delayOut, delayOut = _c === void 0 ? 0 : _c, _d = _a.hover, enableHover = _d === void 0 ? true : _d, _e = _a.maxWidth, maxWidth = _e === void 0 ? "300px" : _e, other = __rest(_a, ["placement", "children", "content", "delayIn", "delayOut", "hover", "maxWidth"]);
    var id = use_uid_1.useUid();
    var theme = Providers_1.useTheme();
    var dark = theme.colors.mode === "dark";
    var _f = React.useState(false), show = _f[0], setShow = _f[1];
    var _g = React.useState(false), hovering = _g[0], setHovering = _g[1];
    var _h = React.useState(false), delayShow = _h[0], setDelayShow = _h[1];
    function renderTrigger(_a) {
        var ref = _a.ref;
        // We don't want tooltips to show on touch based devices
        // so we just return the child without the event handlers.
        // Really not sure if this is the best way to do this.
        if (is_mobile_1.isMobile()) {
            return children;
        }
        var child = React.Children.only(children);
        // Enable on non-mobile devices
        return React.cloneElement(child, {
            ref: ref,
            "aria-describedby": id,
            onMouseEnter: function () {
                if (!show)
                    setShow(true);
            },
            onMouseLeave: function () {
                if (show)
                    setShow(false);
            },
            onFocus: function () {
                if (!show)
                    setShow(true);
            },
            onBlur: function () {
                if (show)
                    setShow(false);
            }
        });
    }
    function onMouseLeave() {
        setHovering(false);
    }
    function onMouseEnter() {
        setHovering(true);
    }
    React.useEffect(function () {
        var timeoutIn;
        var timeoutOut;
        if (show) {
            timeoutIn = setTimeout(function () {
                setDelayShow(true);
            }, delayIn);
        }
        else {
            timeoutOut = setTimeout(function () {
                setDelayShow(false);
            }, delayOut);
        }
        return function () {
            if (timeoutIn) {
                clearInterval(timeoutIn);
            }
            if (timeoutOut) {
                clearInterval(timeoutOut);
            }
        };
    }, [delayIn, delayOut, show]);
    return (<Positions_1.Positioner placement={placement} isOpen={delayShow || (hovering && enableHover)} target={renderTrigger}>
      {function (_a, state) {
        var placement = _a.placement, ref = _a.ref, style = _a.style, arrowProps = _a.arrowProps;
        return (<react_spring_1.animated.div id={id} data-placement={placement} role="tooltip" className="Tooltip" ref={ref} style={__assign({}, style, { opacity: state.opacity })} css={{
            zIndex: theme.zIndices.tooltip,
            margin: theme.spaces.xs
        }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} {...other}>
          <div className="Tooltip__content" data-placement={placement} css={exports.arrowStyles(dark
            ? theme.colors.background.tint1
            : theme.colors.palette.gray.dark)} ref={arrowProps.ref} style={arrowProps.style}/>
          <Text_1.Text className="Tooltip__text" variant="body" css={[
            {
                fontSize: theme.fontSizes[0],
                display: "inline-block",
                margin: 0,
                textAlign: "center",
                maxWidth: maxWidth,
                boxShadow: theme.shadows.md,
                borderRadius: theme.radii.sm,
                padding: theme.spaces.xs + " " + theme.spaces.md,
                color: "white",
                background: dark
                    ? theme.colors.background.tint1
                    : theme.colors.palette.gray.dark
            }
        ]}>
            {content}
          </Text_1.Text>
        </react_spring_1.animated.div>);
    }}
    </Positions_1.Positioner>);
};
exports.Tooltip.propTypes = {
    content: prop_types_1.default.node.isRequired,
    children: prop_types_1.default.node.isRequired,
    hover: prop_types_1.default.bool,
    delayIn: prop_types_1.default.number,
    delayOut: prop_types_1.default.number,
    placement: prop_types_1.default.oneOf([
        "auto-start",
        "auto",
        "auto-end",
        "top-start",
        "top",
        "top-end",
        "right-start",
        "right",
        "right-end",
        "bottom-end",
        "bottom",
        "bottom-start",
        "left-end",
        "left",
        "left-start"
    ])
};
