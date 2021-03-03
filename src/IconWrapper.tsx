import * as React from "react";

type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IconWrapperProps {
  size?: IconSize;
  color?: string;
  children: React.ReactNode;
  className?: string;
}

/** 仅仅修改传递的参数，就搞出一个新组件。只是把儿子备份组件做了个定制参数，
 * 包裹子组件，把几个子组件的props参数改了。添加样式style: { display: "block" }
 * This wrapper allows us to also render non-sancho icons. It should probably
 * remain a private component.
 */

export const IconWrapper: React.FunctionComponent<IconWrapperProps> = ({
  size = "md",
  color,
  children,
  ...other
}) => {
  return React.cloneElement(children as React.ReactElement<any>, {
    size,
    color,
    "aria-hidden": true,
    style: { display: "block" },
    ...other
  });
};
