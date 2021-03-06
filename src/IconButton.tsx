/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import * as React from "react";
import {Button, ButtonProps, ButtonRefComp, ButtonSize, getHeight} from "./Button";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";
import { IconWrapper } from "./IconWrapper";
import { IconX } from "./Icons";
import { useTheme } from "./Theme/Providers";

export interface IconButtonProps extends Partial<ButtonProps> {
  /** A label required for accessibility  */
  label: string;
  /** The name of the icon you wish to render */
  icon?: React.ReactNode;
  /** Change the colour */
  color?: string;
  children?: React.ReactNode;
}

/**
 * A component which composes Button and Icon to provide
 * interactive icon elements.
 */
export const IconButton: React.FunctionComponent<IconButtonProps> =(
    {
      label,
      size = "md" as ButtonSize,
      icon,
      onPress,
      color = "currentColor",
      ...other
    }
  ) => {
    const theme = useTheme();
    return (
      <Button
        size={size}
        css={{
          padding: 0,
          [theme.mediaQueries.sm]: {
            padding: 0,
          },
          [theme.mediaQueries.lg]: {
            padding: 0,    //底层Button有设置[theme.xx.lg],这里就也得加[theme.xx.lg]，不然会被无情颠覆。优先级毛病？
          },
          width: getHeight(size)
        }}
        onPress={onPress}
        {...other}
      >
        <VisuallyHidden>{label}</VisuallyHidden>
        <IconWrapper color={color} size={size}>
          {icon}
        </IconWrapper>
      </Button>
    );
  };

/**
 * 旧版本 可传递 ref
 */
export const IconRefButton = React.forwardRef(
    (
        {
            label,
            size = "md" as ButtonSize,
            icon,
            onPress,
            color = "currentColor",
            ...other
        }: IconButtonProps,
        ref
    ) => {
        const theme = useTheme();
        return (
            <ButtonRefComp
                ref={ref}
                size={size}
                css={{
                    padding: 0,
                    [theme.mediaQueries.sm]: {
                        padding: 0,
                    },
                    [theme.mediaQueries.lg]: {
                        padding: 0,    //底层Button有设置[theme.xx.lg],这里就也得加[theme.xx.lg]，不然会被无情颠覆。优先级毛病？
                    },
                    width: getHeight(size)
                }}
                onPress={onPress}
                {...other}
            >
                <VisuallyHidden>{label}</VisuallyHidden>
                <IconWrapper color={color} size={size}>
                    {icon}
                </IconWrapper>
            </ButtonRefComp>
        );
    }
);


IconButton.displayName = "IconButton";

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["outline", "default", "ghost"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
};

interface CloseButtonProps extends Partial<ButtonProps> {
  /** An optional label for the close button */
  label?: string;
  /** Change the colour */
  color?: string;
}

export const CloseButton: React.FunctionComponent<CloseButtonProps> = ({
  label = "Close",
  ...other
}) => {
  return (
    <IconButton variant="ghost" label={label} icon={<IconX />} {...other} />
  );
};

CloseButton.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.oneOf(["outline", "default", "ghost"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
};
