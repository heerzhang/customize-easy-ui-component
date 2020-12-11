import React from "react";

export type TsComponentProps = {
  /**
   * Some thing
   */
  thing: "this" | "that";
}

export const TsComponent: React.FC<TsComponentProps> = ({ thing, children }) => (
  React.createElement("div", { style: {color: "red"} }, children)
);
