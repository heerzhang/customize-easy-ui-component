/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import {Button, ButtonRefComp} from "../Button";
import { Tooltip } from "../Tooltip";
import { storiesOf } from "@storybook/react";
import {IconButton, IconRefButton} from "../IconButton";
import { IconArrowRight } from "../Icons";
import {DarkMode, DarkRefMode, LightRefMode} from "../Theme/Providers";

export const TooltipStories = storiesOf("Tooltip", module)
  .add("basic", () => {
    return (
      <div css={{ padding: "100px" }}>
        <Tooltip content="This is some tooltip content">
          <Button>Hello world. Hover me!!</Button>
        </Tooltip>
      </div>
    );
  })
  .add("修正ref传递", () => {
        return (
            <div css={{ padding: "100px" }}>
                <Tooltip content="This is some tooltip content">
                    <ButtonRefComp>Hello world. Hover me!!</ButtonRefComp>
                </Tooltip>
            </div>
        );
    })
  .add("hover effects remain", () => {
    return (
      <div css={{ padding: "100px" }}>
        <Tooltip content="This is some tooltip content">
          <IconRefButton variant="ghost" label="hello" icon={<IconArrowRight />} />
        </Tooltip>
      </div>
    );
  })
  .add("dark mode 跨2级传递Ref", () => {
    return (
      <div css={{ padding: "100px" }}>
        <Tooltip content="This is some tooltip content">
          <LightRefMode>
            <IconRefButton variant="outline"
              label="hello"
              icon={<IconArrowRight />}
            />
          </LightRefMode>
        </Tooltip>
      </div>
    );
  })
  .add("无法跨div接续传递Ref的", () => {
        return (
            <div css={{ padding: "100px" }}>
                <Tooltip content="This is some tooltip content">
                    <LightRefMode>
                        <div>
                            <IconRefButton variant="outline"
                                       label="hello"
                                       icon={<IconArrowRight />}
                            />
                        </div>
                    </LightRefMode>
                </Tooltip>
            </div>
        );
    })
  .add("对照dark mode", () => {
        return (
            <div css={{ padding: "100px" }}>
                <Tooltip content="This is some tooltip content">
                        <IconRefButton
                            variant="ghost"
                            label="hello"
                            icon={<IconArrowRight />}
                        />
                </Tooltip>
            </div>
        );
    })
  .add("delay show / hide", () => {
    return (
      <div css={{ padding: "100px" }}>
        <Tooltip
          delayIn={1000}
          delayOut={800}
          content="This is some tooltip content"
        >
          <ButtonRefComp>Hello world. Hover me!!</ButtonRefComp>
        </Tooltip>
      </div>
    );
  });
