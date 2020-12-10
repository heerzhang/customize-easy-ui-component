"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var prop_types_1 = require("prop-types");
var container = null;
exports.Portal = function (_a) {
    var children = _a.children;
    var target = React.useState(function () {
        if (typeof document === "undefined") {
            return null;
        }
        if (!container) {
            container = document.createElement("div");
            document.body.appendChild(container);
        }
        var div = document.createElement("div");
        container.appendChild(div);
        return div;
    })[0];
    React.useEffect(function () {
        return function () {
            if (target) {
                container.removeChild(target);
            }
        };
    }, [target]);
    return target ? ReactDOM.createPortal(children, target) : null;
};
exports.Portal.propTypes = {
    children: prop_types_1.default.node
};
