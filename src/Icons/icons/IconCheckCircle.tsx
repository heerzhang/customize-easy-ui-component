//头部标记
/** Do not edit this file directly. Edit the template in scripts/icon-template.ejs **/
import { jsx } from "@emotion/core";
import * as React from "react";
import PropTypes from "prop-types";
import { IconProps } from "../IconTypes";
import { useTheme } from "../../Theme/Providers";

export const IconCheckCircle: React.FunctionComponent<IconProps> = ({
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
};

IconCheckCircle.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
