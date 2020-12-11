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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var focus_trap_1 = require("focus-trap");
function useFocusElement(elementRef, showing, options) {
    if (options === void 0) { options = {}; }
    React.useEffect(function () {
        var trap;
        function focusElement() {
            if (!elementRef.current) {
                console.error("No element found to found");
                return;
            }
            trap = focus_trap_1.default(elementRef.current, __assign({ escapeDeactivates: false, clickOutsideDeactivates: true, fallbackFocus: '[tabindex="-1"]' }, options));
            trap.activate();
        }
        function focusTrigger() {
            if (!trap) {
                return;
            }
            trap.deactivate();
        }
        if (showing) {
            focusElement();
            return function () {
                focusTrigger();
            };
        }
    }, [showing]);
}
exports.useFocusElement = useFocusElement;
