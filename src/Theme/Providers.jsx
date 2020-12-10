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
var React = require("react");
var _1 = require(".");
/**
 * API:
 *
 * You can create custom themes using Object.assign:
 *
 *
 * Pass that theme to the theme provider. A theme should always
 * provide a dark and light color mode.
 *
 * <ThemeProvider theme={customTheme}><App /></ThemeProvider>
 *
 *
 * When you want to use a dark mode:
 *
 * function App () {
 *  return <Dark><SomeContent /></Dark>
 * }
 *
 *
 * To consume a theme, use `useTheme` hook
 *
 * const theme = useTheme()
 * // theme.colors.text.default (will be dark or light depending on the mode)
 * // theme.colors.mode === 'dark' or 'light'
 */
var ThemeContext = React.createContext(_1.default);
exports.ThemeProvider = function (_a) {
    var _b = _a.theme, theme = _b === void 0 ? _1.default : _b, children = _a.children;
    return (<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>);
};
/**
 * A hook for consuming the theme
 */
function useTheme() {
    return React.useContext(ThemeContext);
}
exports.useTheme = useTheme;
var ColorMode = React.forwardRef(function (_a, ref) {
    var colors = _a.colors, children = _a.children, other = __rest(_a, ["colors", "children"]);
    var theme = useTheme();
    // memo is necessary to prevent unnecessary rerenders
    // https://reactjs.org/docs/context.html#caveats
    var adjustedTheme = React.useMemo(function () { return mergeColors(theme, colors); }, [
        theme,
        colors
    ]);
    return (<ThemeContext.Provider value={adjustedTheme}>
      {typeof children === "function"
        ? children(adjustedTheme)
        : React.cloneElement(React.Children.only(children), __assign({ ref: ref }, other))}
    </ThemeContext.Provider>);
});
ColorMode.displayName = "ColorMode";
function mergeColors(theme, colors) {
    return __assign({}, theme, { shadows: colors.shadows, colors: colors });
}
exports.LightMode = React.forwardRef(function (_a, ref) {
    var children = _a.children, other = __rest(_a, ["children"]);
    var theme = useTheme();
    return (<ColorMode colors={theme.modes.light} ref={ref} {...other}>
      {children}
    </ColorMode>);
});
exports.LightMode.displayName = "LightMode";
/**
 * Provide a dark theme
 */
exports.DarkMode = React.forwardRef(function (_a, ref) {
    var children = _a.children, other = __rest(_a, ["children"]);
    var theme = useTheme();
    return (<ColorMode colors={theme.modes.dark} ref={ref} {...other}>
      {children}
    </ColorMode>);
});
exports.DarkMode.displayName = "DarkMode";
