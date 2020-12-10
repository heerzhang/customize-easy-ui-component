"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var react_1 = require("@emotion/react");
var Alert_1 = require("../Alert");
var Theme_1 = require("../Theme");
var react_2 = require("@storybook/react");
var appearances = [
    "info",
    "success",
    "danger",
    "question",
    "warning"
];
exports.AlertStories = react_2.storiesOf("Alert", module)
    .add("color variants", function () { return (<div>
      {appearances.map(function (key) { return (<Alert_1.Alert css={{
    margin: Theme_1.default.spaces.lg
}} key={key} intent={key} title={"This is a " + key + " alert"} subtitle={"Culpa laborum nostrud dolore id duis adipisicing aliqua pariatur veniam. Ad Lorem dolor voluptate reprehenderit ullamco in incididunt eiusmod consectetur cupidatat occaecat incididunt."}/>); })}

      <Alert_1.Alert css={{
    margin: Theme_1.default.spaces.lg
}} title={"This is an alert with a close button"} subtitle={"Culpa laborum nostrud dolore id duis adipisicing aliqua pariatur veniam. Ad Lorem dolor voluptate reprehenderit ullamco in incididunt eiusmod consectetur cupidatat occaecat incididunt."} onRequestClose={function () {
    console.log("close");
}}/>
    </div>); })
    .add("close button", function () {
    return (<Alert_1.Alert css={{
        margin: Theme_1.default.spaces.lg
    }} title={"This is an alert with a close button. Ullamco magna cillum quis ipsum tempor tempor do commodo nisi eu cupidatat ex duis ea."} onRequestClose={function () {
        console.log("close");
    }}/>);
});
