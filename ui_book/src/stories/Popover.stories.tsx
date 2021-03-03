/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import * as React from "react";
import { Popover, ResponsivePopover } from "../Popover";
import {Button, ButtonRefComp} from "../Button";
import { MenuList, MenuItem, MenuDivider } from "../Menu";
import {IconButton, IconRefButton} from "../IconButton";
import { storiesOf } from "@storybook/react";
import { Placement } from "@popperjs/core";
import {
  IconMoreHorizontal,
  IconUser,
  IconPackage,
  IconMapPin,
  IconActivity,
  IconArrowUpRight
} from "../Icons";
import {useLocation} from "wouter";
import {useToast} from "../Toast";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

/**
 * 使用 React.forwardRef 可以注入ref 但是有性能负担；假如绝大多数都用不上ref的话，浪费了。
 * React.forwardRef 不要过度使用：
 有需要直接触达和 操作子孙组件 实例或者操作 子dom元素 的情况，这时候应该使用React？use? Ref。
 */
const Link = React.forwardRef((props: LinkProps, ref: React.Ref<any>) => (
  <div
    ref={ref}
    css={{
      ":focus": {
        backgroundColor: "blue"
      }
    }}
    {...props}
  >
    {props.children}
  </div>
));

export const PopoverStories = storiesOf("Popover", module)
  .add("子组件必须能传递ref", () => {
    return (
      <div>
        <div css={{ padding: "300px", background: "#eee" }}>
          <Popover
            content={
              <div css={{ padding: "2rem" }}>
                <Button>I should focus不用传ref</Button>
              </div>
            }
          >
            <ButtonRefComp>Hello要传ref world!</ButtonRefComp>
          </Popover>
        </div>
      </div>
    );
  })
  .add("positions", () => {
    return (
      <div>
        {[
          "auto-start",
          "auto",
          "auto-end",
          "top-start",
          "top",
          "top-end",
          "right-start",
          "right",
          "right-end",
          "bottom-end",
          "bottom",
          "bottom-start",
          "left-end",
          "left",
          "left-start"
        ].map(placement => (
          <div css={{ marginTop: "1rem", textAlign: "center" }} key={placement}>
            <Popover
              placement={placement as Placement}
              content={
                <MenuList>
                  <MenuItem onSelect={() => alert("Hello 1")}>
                    I will trigger an alert
                  </MenuItem>
                  <MenuItem component="a" href="/bacon">
                    I'm a link
                  </MenuItem>

                  <MenuDivider />
                  <MenuItem>Item three</MenuItem>
                </MenuList>
              }
            >
              <Button>{placement}</Button>
            </Popover>
          </div>
        ))}
      </div>
    );
  })
  .add("Dropdown menu", () => {
    return (
      <div css={{ padding: "300px", minHeight: "80vh" }}>
        <Popover
          content={
            <MenuList>
              <MenuItem onPress={() => alert("Hello 1")}>
                I will trigger an alert
              </MenuItem>
              <MenuItem component="a" href="/bacon">
                I'm a goTo link
              </MenuItem>

              <MenuDivider />
              <MenuItem>Item three</MenuItem>
            </MenuList>
          }
        >
          <ButtonRefComp>I should trigger popover</ButtonRefComp>
        </Popover>
      </div>
    );
  })
  .add("Triggered with an icon button", () => {
    return (
      <div css={{ padding: "300px", minHeight: "150vh", background: "#eee" }}>
        <Popover
          content={
            <MenuList>
              <MenuItem onSelect={() => alert("Hello 1")}>Item one</MenuItem>
              <MenuItem>Item three</MenuItem>
              <MenuDivider />
              <MenuItem>Item three</MenuItem>
              <MenuItem>Item three</MenuItem>
              <MenuItem>Item three</MenuItem>
            </MenuList>
          }
        >
          <IconRefButton
            variant="ghost"
            icon={<IconMoreHorizontal />}
            label="show more"
          />
        </Popover>
      </div>
    );
  })
  .add("ResponsivePopover", () => {
      const toast = useToast();
      const [, setLocation] = useLocation();
    return (
      <div css={{ padding: "1rem" }}>
        <ResponsivePopover
          content={
            <MenuList>
                <MenuItem contentBefore={<IconPackage />}
                      onPress={async () => {
                          await toast({title: "提交一个网页链接"});
                          setLocation(`/?path=/story/popover--positions`);
                      } }
                >
                 提交审核
                </MenuItem>
                <MenuDivider />
              <MenuItem
                contentBefore={<IconUser />}
                onPress={() => alert("Hello 1")}
              >
                Drink coffee
              </MenuItem>
              <MenuItem contentBefore={<IconPackage />}>Eat pancakes</MenuItem>
              <MenuDivider />
              <MenuItem contentBefore={<IconMapPin />}>Make pizza</MenuItem>
              <MenuItem contentBefore={<IconActivity />}>
                Dance my heart out
              </MenuItem>
              <MenuItem contentBefore={<IconArrowUpRight />}>
                Anything you ask
              </MenuItem>
            </MenuList>
          }
        >
          <IconRefButton
            variant="ghost"
            icon={<IconMoreHorizontal />}
            label="show more"
          />
        </ResponsivePopover>
      </div>
    );
  });
