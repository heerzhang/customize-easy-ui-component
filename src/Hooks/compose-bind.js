"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge_refs_1 = require("./merge-refs");
exports.safeBind = function () {
    var bindGroups = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        bindGroups[_i] = arguments[_i];
    }
    var groupedFns = {};
    var fns = {};
    var refs = [];
    function propFnFactory(name) {
        return function (e) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var callbacks = groupedFns[name];
            if (!e.defaultPrevented) {
                callbacks.forEach(function (cb) { return cb.apply(void 0, [e].concat(args)); });
            }
        };
    }
    bindGroups.forEach(function (bind) {
        Object.entries(bind).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (key === "ref") {
                refs.push(value);
                return;
            }
            if (typeof value !== "function") {
                fns[key] = value;
                return;
            }
            if (!groupedFns[key]) {
                groupedFns[key] = [];
            }
            groupedFns[key].push(value);
            fns[key] = propFnFactory(key);
        });
    });
    if (refs.length > 0) {
        fns.ref = merge_refs_1.mergeRefs.apply(void 0, refs);
    }
    return fns;
};
