import React from "react";

export type TsxComponentProps = {
  /**
   * Some thing
   */
  thing: "this" | "that";
}

export const TsxComponent: React.FC<TsxComponentProps> = ({ thing, children }) => (
  <div style={{color: "green"}}>{children}</div>
);
