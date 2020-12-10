"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var id = 0;
var genId = function () { return ++id; };
/**
 * Generate a unique id for a component.
 * Useful for accessibility controls (htmlFor, describedBy)
 */
exports.useUid = function (id) {
    if (id === void 0) { id = ""; }
    var _a = react_1.useState(id || genId().toString()), generatedId = _a[0], setGeneratedId = _a[1];
    /**
    useEffect(() => setGeneratedId(id || genId().toString()), [id]);
    **/
    return generatedId;
};
