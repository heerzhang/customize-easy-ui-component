"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeRefs = function () {
    var refs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        refs[_i] = arguments[_i];
    }
    return function (ref) {
        refs.forEach(function (resolvableRef) {
            if (typeof resolvableRef === "function") {
                resolvableRef(ref);
            }
            else if (resolvableRef) {
                resolvableRef.current = ref;
            }
        });
    };
};
