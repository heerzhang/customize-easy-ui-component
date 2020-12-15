/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import * as React from "react";
import {
  Manager,
  Reference,
  Popper,
  ReferenceChildrenProps,
  PopperChildrenProps
} from "react-popper";
import * as PopperJS from '@popperjs/core';
import { Portal } from "./Portal";
import { useTransition } from "react-spring";
import PropTypes from "prop-types";

export type Placements =
  | "auto-start"
  | "auto"
  | "auto-end"
  | "top-start"
  | "top"
  | "top-end"
  | "right-start"
  | "right"
  | "right-end"
  | "bottom-end"
  | "bottom"
  | "bottom-start"
  | "left-end"
  | "left"
  | "left-start";


interface PositionsProps {
  /** Whether the item being positioned is visible */
  isOpen?: boolean;
  /** The placement of children */
  placement?: PopperJS.Placement;
  /** Use fixed positioning strategy= "absolute" | "fixed"; */
  strategy?: PopperJS.PositioningStrategy;
  /** The element our positioner is targetting (eg, Button) */
  target: (props: ReferenceChildrenProps) => React.ReactNode;
  /** The render callback which contains positioning and animation info */
  children: (
    props: PopperChildrenProps,
    state: any
  ) => React.ReactNode;
}

export const Positioner: React.FunctionComponent<PositionsProps> = ({
  target,
  strategy,
  isOpen = true,
  children,
  placement
}) => {
  const transitions = useTransition(isOpen,  {
    from: { opacity: 1 },
   // keys: item => item.key,
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { mass: 1, tension: 185, friction: 26 }
  });

  return (
    <Manager>
      <Reference>{target}</Reference>
      {transitions((style, item) => {
        return (
          item &&  <Portal key={1}>
            <Popper placement={placement} strategy={strategy}>
              {props => children(props, style as any)}
            </Popper>
          </Portal>
        )
      })}

      {/*
      {transitions.map(
        ({ item, key, props: animatedProps }) =>
          item && (
            <Portal key={key}>
              <Popper placement={placement} strategy={strategy}>
                {props => children(props, animatedProps as any)}
              </Popper>
            </Portal>
          )
      )}
   */}

    </Manager>
  );
};

Positioner.propTypes = {
  isOpen: PropTypes.bool,
  placement: PropTypes.oneOf([
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
  ] as Placements[]),
 // strategy: PropTypes.bool, PopperJS.PositioningStrategy;= "absolute" | "fixed";
  target: PropTypes.func,
  children: PropTypes.func
};
