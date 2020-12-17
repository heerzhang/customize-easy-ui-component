/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import * as React from "react";
import { Button } from "../Button";
import { storiesOf } from "@storybook/react";
import { useToast } from "../Toast";
import { ToggleDarkMode } from "./ToggleDarkMode";

function Example() {
  const toast = useToast();
  return (
    <Button
      onClick={() => {
        toast({
          duration: 2500,
          title: "Hello world",
          subtitle: "Excepteur exercitation 停留 2500 ms."
        });
      }}
    >
      Show toast
    </Button>
  );
}

export const ToastStories = storiesOf("Toast", module).add("basic", () => {
  return (
    <div css={{ PADDING: "3REM" }}>
      <Example />
    </div>
  );
});
