import * as React from "react";
import defaultTheme, { Theme, ThemeColors } from ".";
import {ToggleDarkModeProps} from "../stories/ToggleDarkMode";

/**
 * API:
 *
 * You can create custom themes using Object.assign:
 *
 *
 * Pass that theme to the theme provider. A theme should always
 * provide a dark and light color mode.
 *
 * <ThemeProvider theme={customTheme}><App /></ThemeProvider>
 *
 *
 * When you want to use a dark mode:
 *
 * function App () {
 *  return <Dark><SomeContent /></Dark>
 * }
 *
 *
 * To consume a theme, use `useTheme` hook
 *
 * const theme = useTheme()
 * // theme.colors.text.default (will be dark or light depending on the mode)
 * // theme.colors.mode === 'dark' or 'light'
 */

const ThemeContext = React.createContext(defaultTheme);

/**
 * Provide a theme to your app using React Context
 */

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Theme;
}

export const ThemeProvider = ({
  theme = defaultTheme,
  children
}: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

/**
 * A hook for consuming the theme
 */

export function useTheme() {
  return React.useContext(ThemeContext);
}

/**
 * Switch color modes (typically between light (default) and dark)
 */

type RenderCallbackType = (theme: Theme) => React.ReactNode;

export interface ColorModeProps {
  colors: ThemeColors;
  children: RenderCallbackType | React.ReactNode;
  //ref: React.Ref<any>;
}
export interface ColorRefModeProps {
  colors: ThemeColors;
  children: RenderCallbackType | React.ReactNode;
  ref: React.Ref<any>;
}

/**
 * 去掉forwardRef，改成普通函数组件。
 */
const ColorMode: React.FunctionComponent<ColorModeProps> =({ colors, children, ...other }) => {
  const theme = useTheme();
  // memo is necessary to prevent unnecessary rerenders
  // https://reactjs.org/docs/context.html#caveats
  const adjustedTheme = React.useMemo(() => mergeColors(theme, colors), [
    theme,
    colors
  ]);

  //其实这里向.Children.only(children)传递的 ref 实际没有用处；
  //本组件ThemeContext才是核心，把组件包裹下的子孙组件提供一致的 colors Theme;

  return (
    <ThemeContext.Provider value={adjustedTheme}>
      {typeof children === "function"
        ? children(adjustedTheme)
        : React.cloneElement(
            React.Children.only(children) as React.ReactElement<any>,
            {
              ...other
            }
          )}
    </ThemeContext.Provider>
  );
};

/**
 * 旧版传递 ref , 这里Ref只是接续传递，非自身必须要的；
 */
const ColorRefMode = React.forwardRef(({ colors, children, ...other }: ColorModeProps, ref) => {
  const theme = useTheme();
  // memo is necessary to prevent unnecessary rerenders
  // https://reactjs.org/docs/context.html#caveats
  const adjustedTheme = React.useMemo(() => mergeColors(theme, colors), [
    theme,
    colors
  ]);

  return (
      <ThemeContext.Provider value={adjustedTheme}>
        {typeof children === "function"
            ? children(adjustedTheme)
            : React.cloneElement(
                React.Children.only(children) as React.ReactElement<any>,
                {
                  ref,
                  ...other
                }
            )}
      </ThemeContext.Provider>
  );
});


ColorMode.displayName = "ColorMode";

function mergeColors(theme: Theme, colors: ThemeColors) {
  return {
    ...theme,
    shadows: colors.shadows,
    colors
  };
}

/**
 * Provide a light theme
 */

interface ModeProps {
  children: RenderCallbackType | React.ReactNode;
  //ref?: any;
}
interface ModeRefProps {
  children: RenderCallbackType | React.ReactNode;
  ref?: any;
}

export const LightMode: React.FunctionComponent<ModeProps> = ({ children, ...other }) => {
  const theme = useTheme();
  return (
    <ColorMode colors={theme.modes.light}  {...other}>
      {children}
    </ColorMode>
  );
};
/**
 * 旧版传递 ref, 这里Ref只是接续传递，非自身必须要的；
 */
export const LightRefMode = React.forwardRef(({ children, ...other }: ModeProps, ref) => {
  const theme = useTheme();
  return (
      <ColorRefMode colors={theme.modes.light} ref={ref} {...other}>
        {children}
      </ColorRefMode>
  );
});

LightMode.displayName = "LightMode";

/**
 * Provide a dark theme
 */

export const DarkMode: React.FunctionComponent<ModeProps> =({ children, ...other }) => {
  const theme = useTheme();
  return (
    <ColorMode colors={theme.modes.dark}  {...other}>
      {children}
    </ColorMode>
  );
};
/**
 * 旧版传递 ref, 这里Ref只是接续传递，非自身必须要的；
 */
export const DarkRefMode = React.forwardRef(({ children, ...other }: ModeProps, ref) => {
  const theme = useTheme();
  return (
      <ColorRefMode colors={theme.modes.dark} ref={ref} {...other}>
        {children}
      </ColorRefMode>
  );
});


DarkMode.displayName = "DarkMode";
