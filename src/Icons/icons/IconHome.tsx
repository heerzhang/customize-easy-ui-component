/** @jsxImportSource @emotion/react */
/** Do not edit this file directly. Edit the template in scripts/icon-template.ejs **/
import { jsx, css } from "@emotion/react";
import * as React from "react";
import PropTypes from "prop-types";
import { IconProps, IconSizes } from "../IconTypes";
import { useTheme } from "../../Theme/Providers";

export const IconHome: React.FunctionComponent<IconProps> = ({
  color: providedColor,
  size: providedSize = "md",
  ...other
}) => {
  const theme = useTheme();
  const size =
    typeof providedSize === "string"
      ? theme.iconSizes[providedSize]
      : providedSize;
  const color = providedColor || theme.colors.text.default;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={size}
      width={size}
      {...other}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
};

IconHome.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"] as IconSizes[]),
    PropTypes.number
  ])
};
