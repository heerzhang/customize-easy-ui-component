"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var react_1 = require("@emotion/react");
var React = require("react");
var Button_1 = require("../Button");
var Providers_1 = require("../Theme/Providers");
var Toolbar_1 = require("../Toolbar");
exports.ToggleDarkMode = function (_a) {
    var children = _a.children;
    var _b = React.useState("light"), mode = _b[0], setMode = _b[1];
    var Component = mode === "dark" ? Providers_1.DarkMode : Providers_1.LightMode;
    return (<Component>
      {function (theme) { return (<div>
          <react_1.Global styles={{
        body: {
            margin: 0,
            padding: 0,
            background: theme.colors.background.default
        }
    }}/>
          <Toolbar_1.Toolbar css={{
        borderBottom: "1px solid",
        borderColor: theme.colors.border.default
    }}>
            <Button_1.Button onClick={function () { return setMode(mode === "light" ? "dark" : "light"); }}>
              Toggle Mode
            </Button_1.Button>
          </Toolbar_1.Toolbar>
          <div css={{
        background: mode === "dark"
            ? theme.modes.dark.palette.gray.dark
            : theme.modes.light.background.default
    }}>
            {children}
          </div>
        </div>); }}
    </Component>);
};
