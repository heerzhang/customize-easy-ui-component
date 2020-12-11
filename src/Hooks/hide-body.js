"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function useHideBody(showing) {
    var overlayRef = React.useRef(null);
    var returnRef = React.useRef(null);
    function setElementsHidden() {
        var els = document.querySelectorAll("body > *");
        var originals = [];
        els.forEach(function (el) {
            if (el.contains(overlayRef.current)) {
                return;
            }
            var hidden = el.getAttribute("aria-hidden");
            if (hidden !== "true") {
                originals.push({ el: el, attr: hidden });
                el.setAttribute("aria-hidden", "true");
            }
        });
        return function () {
            originals.forEach(function (_a) {
                var el = _a.el, attr = _a.attr;
                attr === null
                    ? el.removeAttribute("aria-hidden")
                    : el.setAttribute("aria-hidden", attr);
            });
        };
    }
    React.useEffect(function () {
        if (showing) {
            returnRef.current = setElementsHidden();
        }
        else if (returnRef.current) {
            returnRef.current();
        }
    }, [showing]);
    // unmount
    React.useEffect(function () {
        if (returnRef.current) {
            returnRef.current();
        }
    }, []);
    return {
        bind: { ref: overlayRef }
    };
}
exports.useHideBody = useHideBody;
