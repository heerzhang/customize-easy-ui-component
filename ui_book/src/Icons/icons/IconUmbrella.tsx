/** @jsxImportSource @emotion/react */
/** Do not edit this file directly. Edit the template in scripts/icon-template.ejs **/
import { jsx, css } from "@emotion/react";
import * as React from "react";
import PropTypes from "prop-types";
import { IconProps, IconSizes } from "../IconTypes";
import { useTheme } from "../../Theme/Providers";

export const IconUmbrella: React.FunctionComponent<IconProps> = ({
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
      <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7" />
    </svg>
  );
};

IconUmbrella.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"] as IconSizes[]),
    PropTypes.number
  ])
};
