"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var react_1 = require("@emotion/react");
var React = require("react");
var Button_1 = require("../Button");
var react_2 = require("@storybook/react");
var Theme_1 = require("../Theme");
var Providers_1 = require("../Theme/Providers");
var Icons_1 = require("../Icons");
exports.ButtonStories = react_2.storiesOf("Button", module)
    .add("submit", function () {
    return (<form onSubmit={function (e) {
        e.preventDefault();
        console.log("submit");
    }}>
        <input type="text"/>
        <Button_1.Button type="submit">Submit</Button_1.Button>
      </form>);
})
    .add("variants", function () {
    var sizes = ["xs", "sm", "md", "lg", "xl"];
    var appearance = ["default", "ghost", "outline"];
    var intents = [
        "none",
        "primary",
        "success",
        "danger",
        "warning"
    ];
    return (<div>
        {appearance.map(function (appearance) { return (<div key={appearance}>
            {sizes.map(function (size) { return (<div key={size} style={{ padding: "0.5rem" }}>
                {intents.map(function (intent) { return (<Button_1.Button key={size + appearance} size={size} css={{ marginRight: "1rem", textTransform: "capitalize" }} variant={appearance} intent={intent} onPress={function () { return console.log("hello there"); }}>
                    {intent}
                  </Button_1.Button>); })}
              </div>); })}
          </div>); })}
      </div>);
})
    .add("disabled", function () {
    var variants = ["default", "ghost", "outline"];
    var intents = [
        "none",
        "primary",
        "success",
        "danger",
        "warning"
    ];
    return (<div>
        {variants.map(function (variant) {
        return (<div key={variant}>
              {intents.map(function (intent) { return (<Button_1.Button key={intent} css={{ margin: "1rem" }} intent={intent} disabled variant={variant}>
                  {intent}
                </Button_1.Button>); })}
            </div>);
    })}
      </div>);
})
    .add("with icons", function () { return (<div css={{
    "& > *": {
        margin: Theme_1.default.spaces.md
    }
}}>
      <Button_1.Button iconBefore={<Icons_1.IconArrowLeft />}>Icon before</Button_1.Button>
      <Button_1.Button iconAfter={<Icons_1.IconArrowRight />}>Icon after</Button_1.Button>
      <Button_1.Button iconBefore={<Icons_1.IconArrowLeft />} iconAfter={<Icons_1.IconArrowRight />}>
        Icon before and after
      </Button_1.Button>
      <Button_1.Button iconAfter={<Icons_1.IconArrowRight />} intent="primary">
        Icon after
      </Button_1.Button>
      <Button_1.Button component="a" href="#" iconAfter={<Icons_1.IconArrowRight />} intent="primary">
        Icon after anchor
      </Button_1.Button>
      <Button_1.Button iconAfter={<Icons_1.IconArrowRight />} intent="primary" variant="outline">
        Icon after
      </Button_1.Button>
      <Button_1.Button iconAfter={<Icons_1.IconArrowRight />} intent="primary" variant="ghost">
        Icon after
      </Button_1.Button>
      {["xs", "sm", "md", "lg", "xl"].map(function (size) {
    return (<Button_1.Button key={size} size={size} iconAfter={<Icons_1.IconArrowRight />} intent="primary" variant="outline">
            Icon after
          </Button_1.Button>);
})}
    </div>); })
    .add("block", function () {
    return (<div css={{
        margin: "1rem",
        "& > *": {
            maxWidth: "300px",
            marginTop: Theme_1.default.spaces.md
        }
    }}>
        <Button_1.Button block>Hello</Button_1.Button>
        <Button_1.Button block iconBefore={<Icons_1.IconArrowRight />}>
          with icon before
        </Button_1.Button>
        <Button_1.Button block iconAfter={<Icons_1.IconArrowRight />}>
          With icon after
        </Button_1.Button>
        <Button_1.Button block iconBefore={<Icons_1.IconArrowRight />} iconAfter={<Icons_1.IconArrowRight />}>
          Two icons
        </Button_1.Button>
        <Button_1.Button component="a" href="@" block iconAfter={<Icons_1.IconArrowRight />}>
          Anchor icon after
        </Button_1.Button>
      </div>);
})
    .add("contrast checks", function () {
    return <ContrastExample />;
});
function ContrastExample() {
    var theme = Providers_1.useTheme();
    return (<Providers_1.DarkMode>
      <React.Fragment>
        <div css={{
        padding: "2rem",
        background: theme.colors.intent.none.base,
        "& > *": { margin: "1rem" }
    }}>
          <Button_1.Button>Hello world</Button_1.Button>
          <Button_1.Button intent="primary">Primary</Button_1.Button>
          <Button_1.Button intent="success">Success</Button_1.Button>
          <Button_1.Button intent="warning">Warning</Button_1.Button>
          <Button_1.Button intent="danger">Warning</Button_1.Button>
        </div>
        <Providers_1.LightMode>
          <div css={{
        padding: "2rem",
        background: theme.colors.background.tint2,
        "& > *": { margin: "1rem" }
    }}>
            <Button_1.Button>Hello world</Button_1.Button>
            <Button_1.Button intent="primary">Primary</Button_1.Button>
            <Button_1.Button intent="success">Success</Button_1.Button>
            <Button_1.Button intent="warning">Warning</Button_1.Button>
            <Button_1.Button intent="danger">Warning</Button_1.Button>
          </div>
        </Providers_1.LightMode>

        <div css={{
        padding: "2rem",
        background: theme.colors.intent.primary.dark,
        "& > *": { margin: "1rem" }
    }}>
          <Button_1.Button>Hello world</Button_1.Button>
          <Button_1.Button intent="primary">Primary</Button_1.Button>
          <Button_1.Button intent="success">Success</Button_1.Button>
          <Button_1.Button intent="warning">Warning</Button_1.Button>
          <Button_1.Button intent="danger">Warning</Button_1.Button>
        </div>
      </React.Fragment>
    </Providers_1.DarkMode>);
}
