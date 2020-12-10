"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var react_1 = require("@emotion/react");
var react_popper_1 = require("react-popper");
var Portal_1 = require("./Portal");
var react_spring_1 = require("react-spring");
var prop_types_1 = require("prop-types");
exports.Positioner = function (_a) {
    var target = _a.target, positionFixed = _a.positionFixed, _b = _a.isOpen, isOpen = _b === void 0 ? true : _b, children = _a.children, placement = _a.placement;
    var transitions = react_spring_1.useTransition(isOpen, {
        from: { opacity: 1 },
        // keys: item => item.key,
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { mass: 1, tension: 185, friction: 26 }
    });
    return (<react_popper_1.Manager>
      <react_popper_1.Reference>{target}</react_popper_1.Reference>
      {transitions(function (style, item) {
        return (item && <Portal_1.Portal key={1}>
            <react_popper_1.Popper placement={placement} positionFixed={positionFixed}>
              {function (props) { return children(props, style); }}
            </react_popper_1.Popper>
          </Portal_1.Portal>);
    })}

      

    </react_popper_1.Manager>);
};
exports.Positioner.propTypes = {
    isOpen: prop_types_1.default.bool,
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
    ]),
    positionFixed: prop_types_1.default.bool,
    target: prop_types_1.default.func,
    children: prop_types_1.default.func
};
