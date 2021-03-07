/** @jsxImportSource @emotion/react */
import {  css, SerializedStyles } from "@emotion/react";
import * as React from "react";
import { Text, LabelText } from "./Text";
import VisuallyHidden from "@reach/visually-hidden";
import PropTypes from "prop-types";
import { alpha } from "./Theme/colors";
import { useUid } from "./Hooks/use-uid";
import { Theme } from "./Theme";
import { useTheme } from "./Theme/Providers";
import {getHeight, focusShadow, ButtonSize} from "./Button";
import { IconAlertCircle, IconChevronDown } from "./Icons";
import { safeBind } from "./Hooks/compose-bind";
import { useMedia } from "use-media";
import  Switch from "react-switch";
import {Touchable} from "./Touchable";
import { LayoutMediaQueryFactory } from '@s-ui/react-layout-media-query'
import ResizeReporter from 'react-resize-reporter'




/*
自适应布局，容器父组件不应当设置width固定的px，否则内部组件元素{已经为屏幕宽度自适应适配的组件}都会被动拉伸宽度，失去了效果。
*/

const getInputSizes = (theme: Theme) => ({
  sm: css({
    fontSize: theme.fontSizes[0],
    padding: "0.25rem 0.5rem"
  }),
  md: css({
    fontSize: theme.fontSizes[1],
    padding: "0.5rem 0.75rem"
  }),
  lg: css({
    fontSize: theme.fontSizes[2],
    padding: "0.65rem 1rem"
  })
});

export type InputSize = "sm" | "md" | "lg";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  /** A label is required for accessibility purposes. Use `hideLabel` to hide it. */
  label: string;
  /** Visually hide the label. It remains accessible to screen readers. */
  hideLabel?: boolean;
  error?: string | React.ReactNode;
  /** Optional help text */
  helpText?: string;
  /** A single input element */
  children?: React.ReactNode;
  labelStyle?: SerializedStyles;
  labelTextStyle?: SerializedStyles;
}

interface InputGroupContextType {
  uid?: string;
  error?: string | React.ReactNode;
}

const InputGroupContext = React.createContext<InputGroupContextType>({
  uid: undefined,
  error: undefined
});

export const InputGroup: React.FunctionComponent<InputGroupProps> = ({
                                                                       id,
                                                                       label,
                                                                       children,
                                                                       error,
                                                                       helpText,
                                                                       hideLabel,
                                                                       labelStyle,
                                                                       labelTextStyle,
                                                                       ...other
                                                                     }) => {
  const uid = useUid(id);
  const theme = useTheme();
  const isDark = theme.colors.mode === "dark";
  const danger = isDark
    ? theme.colors.intent.danger.light
    : theme.colors.intent.danger.base;

  return (
    <section
      className="InputGroup"
      css={{
        marginTop: theme.spaces.md,
        "&.InputGroup:first-of-type": {
          marginTop: 0
        }
      }}
      {...other}
    >
      <Label hide={hideLabel} htmlFor={uid} css={labelStyle} textStyle={labelTextStyle} >
        {label}
      </Label>
      <InputGroupContext.Provider
        value={{
          uid,
          error
        }}
      >
        {children}
      </InputGroupContext.Provider>

      {error && typeof error === "string" ? (
        <div
          className="InputGroup__error"
          css={{
            alignItems: "center",
            marginTop: theme.spaces.sm,
            display: "flex"
          }}
        >
          <IconAlertCircle size="sm" color={danger} />
          <Text
            css={{
              display: "block",
              marginLeft: theme.spaces.xs,
              fontSize: theme.fontSizes[0],
              color: danger
            }}
          >
            {error}
          </Text>
        </div>
      ) : (
        error
      )}

      {helpText && (
        <Text
          className="InputGroup__help"
          css={{
            display: "block",
            marginTop: theme.spaces.xs,
            color: theme.colors.text.muted,
            fontSize: theme.fontSizes[0]
          }}
          variant="body"
        >
          {helpText}
        </Text>
      )}
    </section>
  );
};

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  helpText: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  id: PropTypes.string,
  children: PropTypes.node
};

function shadowBorder(color: string, opacity: number) {
  return `0 0 0 2px transparent inset, 0 0 0 1px ${alpha(
    color,
    opacity
  )} inset`;
}

function getBaseStyles(theme: Theme) {
  const dark = theme.colors.mode === "dark";

  const baseStyles = css({
    display: "block",
    width: "100%",
    lineHeight: theme.lineHeights.body,
    color: theme.colors.text.default,
    backgroundColor: "transparent",
    backgroundImage: "none",
    backgroundClip: "padding-box",
    WebkitFontSmoothing: "antialiased",
    WebkitTapHighlightColor: "transparent",
    WebkitAppearance: "none",
    boxSizing: "border-box",
    touchAction: "manipulation",
    fontFamily: theme.fonts.base,
    border: "none",
    boxShadow: dark
      ? shadowBorder(theme.colors.palette.gray.lightest, 0.14)
      : shadowBorder(theme.colors.palette.gray.dark, 0.2),
    borderRadius: theme.radii.sm,
    transition:
      "background 0.25s cubic-bezier(0.35,0,0.25,1), border-color 0.15s cubic-bezier(0.35,0,0.25,1), box-shadow 0.15s cubic-bezier(0.35,0,0.25,1)",
    "::placeholder": {
      color: alpha(theme.colors.text.default, 0.45)
    },
    ":focus": {
      boxShadow: dark
        ? focusShadow(
          alpha(theme.colors.palette.blue.light, 0.5),
          alpha(theme.colors.palette.gray.dark, 0.4),
          alpha(theme.colors.palette.gray.light, 0.2)
        )
        : focusShadow(
          alpha(theme.colors.palette.blue.dark, 0.1),
          alpha(theme.colors.palette.gray.dark, 0.2),
          alpha(theme.colors.palette.gray.dark, 0.05)
        ),
      outline: "none"
    },
    ":disabled": {
      opacity: dark ? 0.4 : 0.8,
      background: theme.colors.background.tint1,
      cursor: "not-allowed",
      boxShadow: dark
        ? shadowBorder(theme.colors.palette.gray.lightest, 0.15)
        : shadowBorder(theme.colors.palette.gray.dark, 0.12)
    },
    ":active": {
      background: theme.colors.background.tint1
    }
  });

  return baseStyles;
}

function useActiveStyle() {
  const [active, setActive] = React.useState(false);
  return {
    bind: {
      onTouchStart: () => setActive(true),
      onTouchEnd: () => setActive(false)
    },
    active
  };
}

function useSharedStyle() {
  const theme = useTheme();
  const errorStyles = {
    boxShadow: shadowBorder(theme.colors.intent.danger.base, 0.45)
  };

  const baseStyles = React.useMemo(() => getBaseStyles(theme), [theme]);
  const inputSizes = React.useMemo(() => getInputSizes(theme), [theme]);
  const activeBackground = css({ background: theme.colors.background.tint1 });
  return {
    baseStyles,
    inputSizes,
    activeBackground,
    errorStyles
  };
}

export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The size of the input element */
  inputSize?: InputSize;
  topDivStyle?: SerializedStyles;
}

/**
 * Our basic Input element. Use this when building customized
 * forms. Otherwise, stick with InputGroup
 * 原先InputBase 改名成 InputRefBase; 比如ComboBox才会需要使用forwardRef形式的;
 */

export const InputRefBase = React.forwardRef(
    (
        { autoComplete, autoFocus, inputSize = "md",topDivStyle, ...other }: InputBaseProps,
        ref: React.Ref<HTMLInputElement>
    ) => {
        const { uid, error } = React.useContext(InputGroupContext);
        const { bind, active } = useActiveStyle();
        const {
            baseStyles,
            inputSizes,
            activeBackground,
            errorStyles
        } = useSharedStyle();
        const height = getHeight(inputSize);
        return (
            <input
                id={uid}
                className="Input"
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                {...bind}
                css={[
                    baseStyles,
                    inputSizes[inputSize],
                    active && activeBackground,
                    error && errorStyles,
                    { height }
                ]}
                {...safeBind({ ref }, other)}
            />
        );
    }
);

/**
 * 正常都不需要使用forwardRef形式的，可大大地加快速度。 InputRefBase是ref版本;
 * 性能优化，去掉了React.forwardRef 改成React.FunctionComponent
 * InputSimple普通FunctionComponent代替React.forwardRef(safeBind({ ref }就能从365ms变240ms啦。
 */
export const InputBase: React.FunctionComponent<InputBaseProps>=
(
    {
        autoComplete,
        autoFocus,
        inputSize = "md",
        topDivStyle,
        ...other
    }
) => {
    const { uid, error } = React.useContext(InputGroupContext);
    const { bind, active } = useActiveStyle();
    const {
        baseStyles,
        inputSizes,
        activeBackground,
        errorStyles
    } = useSharedStyle();
    const height = getHeight(inputSize);
    return (
        <input
            id={uid}
            className="Input"
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            {...bind}
            css={[
                baseStyles,
                inputSizes[inputSize],
                active && activeBackground,
                error && errorStyles,
                { height }
            ]}
            {...other}
        />
    );
};


InputBase.propTypes = {
  inputSize: PropTypes.oneOf(["sm", "md", "lg"] as InputSize[]),
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool
};


export interface InputProps 　 extends InputBaseProps {
  /** 控制是否满上宽度;
   *  需要在<input> 上 去控制大尺寸上限的width:  ，以及自适应屏幕大小后的 max-width: 缩小尺寸。
   * */
  fullWidth?: boolean;
}

/**
 * Input 比起InputBase，外面多包裹一个div以便于控制宽度和对齐。
 */
export const Input: React.FunctionComponent<InputProps> =
(
    {
    autoComplete, autoFocus,
        inputSize = "md",
    fullWidth=true,
    topDivStyle,
        ...other
    }
) => {
    const { uid, error } = React.useContext(InputGroupContext);
    const { bind, active } = useActiveStyle();
    const {
      baseStyles,
      inputSizes,
      activeBackground,
      errorStyles
    } = useSharedStyle();
    const height = getHeight(inputSize);

    return (
      <div  css={[
        {
          textAlign: 'left',
          width: "100%"
        },
        topDivStyle
      ]}
      >
        <input
          id={uid}
          className="Input"
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          {...bind}
          css={[
            baseStyles,
            inputSizes[inputSize],
            active && activeBackground,
            error && errorStyles,
            { height },
            !fullWidth &&{
              width: 'unset',
            }
          ]}
          {...other}
        />
      </div>
    );
};

/**
 * InputRefComp 是ref传递版本的Input,特别情况用
 * InputRefComp 比起 InputRefBase多个一层<div>可以注入控制样式,外面多包裹一个div以便于控制宽度和对齐。。
 */
export const InputRefComp = React.forwardRef(
    (
        { autoComplete, autoFocus, inputSize = "md",
            fullWidth=true,
            topDivStyle, ...other }: InputProps,
        ref: React.Ref<HTMLInputElement>
    ) => {
        const { uid, error } = React.useContext(InputGroupContext);
        const { bind, active } = useActiveStyle();
        const {
            baseStyles,
            inputSizes,
            activeBackground,
            errorStyles
        } = useSharedStyle();
        const height = getHeight(inputSize);
        return (
            <div  css={[
                {
                    textAlign: 'left',
                    width: "100%"
                },
                topDivStyle
            ]}
            >
                <input
                    id={uid}
                    className="Input"
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    {...bind}
                    css={[
                        baseStyles,
                        inputSizes[inputSize],
                        active && activeBackground,
                        error && errorStyles,
                        { height },
                        !fullWidth &&{
                            width: 'unset',
                        }
                    ]}
                    {...safeBind({ ref }, other)}
                />
            </div>
        );
    }
);

//export const Input = InputBase;   直接替换

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** The size of the textarea element */
  inputSize?: InputSize;
  topDivStyle?: SerializedStyles;
}

/**
 * Textarea version of InputBase
 */

export const TextArea: React.FunctionComponent<TextAreaProps> = ({
                                                                   inputSize = "md",
                                                                   topDivStyle,
                                                                   ...other
                                                                 }) => {
  const { bind, active } = useActiveStyle();
  const {
    baseStyles,
    inputSizes,
    activeBackground,
    errorStyles
  } = useSharedStyle();
  const { uid, error } = React.useContext(InputGroupContext);

  return (
    <textarea
      className="TextArea"
      id={uid}
      {...bind}
      css={[
        baseStyles,
        inputSizes[inputSize],
        {
          overflow: "auto",
          resize: "vertical",
        },
        active && activeBackground,
        error && errorStyles,
        topDivStyle
      ]}
      {...other}
    />
  );
};

TextArea.propTypes = {
  inputSize: PropTypes.oneOf(["sm", "md", "lg"] as InputSize[])
};



export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  hide?: boolean;
  htmlFor: string;
  textStyle?: SerializedStyles;
}

/**
 * A styled Label to go along with input elements
 */

export const Label: React.FunctionComponent<LabelProps> = ({
                                                             children,
                                                             hide,
                                                             textStyle,
                                                             ...other
                                                           }) => {
  const theme = useTheme();
  const child = (
    <label
      className="Label"
      css={{
        display: "inline-block",
        marginBottom: hide ? 0 : theme.spaces.sm
      }}
      {...other}
    >
      <Text className="Label__text" variant={"subtitle"} css={textStyle}>
        {children}
      </Text>
    </label>
  );

  return hide ? <VisuallyHidden>{child}</VisuallyHidden> : child;
};

Label.propTypes = {
  hide: PropTypes.bool,
  children: PropTypes.node
};


export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** The size of the select box */
  inputSize?: InputSize;
  divStyle?: SerializedStyles;
  topDivStyle?: SerializedStyles;
}

/**
 * multiple在手机上可以不展开列表了，但是选择2个以上在编辑框上面只能显示数目，不会显示选择那些必须点击进入才能看见。在电脑上面还是列表全部展开的形式。
 * 若multiple=true 导致直接拉开了，样式窗口高度都改变，失去UI一致性了『感觉不友好啊』。
 * 光光靠w3c标准也行不通, 难以通用，必须自己定制。
 * ComboBox不允许multiple；但是Select不允许自主添加新的列表项目，Select允许列表附加label描述文字代替value;
 * 若触摸屏 不能支持multiple形态的的Select，只能单选。?浏览器版本升级，但是还会有返回的数据【】集合机制问题,value=[values1,2]。
 * multiple 只是摊开选择列表，onChange  .target.value无法提供多选数组，必须额外维护可以多选的被选中状态和数据数组。
 * 原来版本是用这样复制 children 的这个 <option></option> 也能够用...other直接复制<select 的底下标签去。
 * style?: React.CSSProperties;
 */

export const Select: React.FunctionComponent<SelectProps> = (
{
    multiple,
    inputSize = "md",
    divStyle,
    topDivStyle,
    style,
    ...other
}) => {
  const theme = useTheme();
  const inputSizes = getInputSizes(theme);
  const { uid, error } = React.useContext(InputGroupContext);
  const selectSize = {
    sm: inputSizes.sm,
    md: inputSizes.md,
    lg: inputSizes.lg
  };
  const dark = theme.colors.mode === "dark";
  const height = getHeight(inputSize);
  //因需要Select组件的max-width；导致Select若放InputGroupLine下在宽松模式一行内显示Label和Select的场景，在Select组件头层div设置宽度将会使得flex无法对齐两个项目；所以再套入一个div。
  //使用<div style={ style } 注入的将会是独立的style样式；调试开闭是只能针对单一个元素开关。
  //使用<div css={[style as any  注入的将会是class样式模组。调试开闭是可以开关多个相同class的元素。 两个模式都能有效果 style css。

  return (
      <div css={{
                textAlign: 'left',
                ...style
          }}
      >
      <div
        className="Select"
        css={[
          {
            //这个position: "relative"因为其下级的position: "absolute"定位的小小图标所约束。所以只能relative或sticky其他position取值不行。
            position: "relative",
          },
          divStyle,
        ]}
      >
        <select
          className="Select__input"
          id={uid}
          css={[
            selectSize[inputSize],
            {
              WebkitAppearance: "none",
              display: "block",
              width: "100%",
              // lineHeight: theme.lineHeights.body,
              height: multiple? 'unset': height,
              color: theme.colors.text.default,
              background: "transparent",
              fontFamily: theme.fonts.base,
              boxShadow: `0 0 0 2px transparent inset, 0 0 0 1px ${
                dark
                  ? alpha(theme.colors.palette.gray.lightest, 0.14)
                  : alpha(theme.colors.palette.gray.dark, 0.2)
                } inset`,
              border: "none",
              backgroundClip: "padding-box",
              borderRadius: theme.radii.sm,
              margin: 0,
              ":disabled": {
                ":disabled": {
                  opacity: dark ? 0.4 : 0.8,
                  background: theme.colors.background.tint1,
                  cursor: "not-allowed",
                  boxShadow: `0 0 0 2px transparent inset, 0 0 0 1px ${
                    dark
                      ? alpha(theme.colors.palette.gray.lightest, 0.15)
                      : alpha(theme.colors.palette.gray.dark, 0.12)
                    } inset`
                }
              },
              ":focus": {
                borderColor: theme.colors.palette.blue.base,
                boxShadow: dark
                  ? focusShadow(
                    alpha(theme.colors.palette.blue.light, 0.5),
                    alpha(theme.colors.palette.gray.dark, 0.4),
                    alpha(theme.colors.palette.gray.light, 0.2)
                  )
                  : focusShadow(
                    alpha(theme.colors.palette.blue.dark, 0.1),
                    alpha(theme.colors.palette.gray.dark, 0.2),
                    alpha(theme.colors.palette.gray.dark, 0.05)
                  ),
                outline: 0
              }
            },
            error && {
              boxShadow: shadowBorder(theme.colors.intent.danger.base, 0.45)
            }
          ]}
          multiple={multiple}
          {...other}
        />
        {!multiple && (
          <IconChevronDown
            className="Select__icon"
            color={theme.colors.text.muted}
            css={{
              position: "absolute",
              top: "50%",
              right: "0.75rem",
              transform: "translateY(-50%)",
              pointerEvents: "none"
            }}
          />
        )}
      </div>
    </div>
  );
};


Select.propTypes = {
  inputSize: PropTypes.oneOf(["sm", "md", "lg"]),
  multiple: PropTypes.bool
};


export interface CheckProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** A label for the checkmark. */
  label: string;
  topDivStyle?: SerializedStyles;
}

export const Check: React.FunctionComponent<CheckProps> = ({
                                                             label,
                                                             id,
                                                             disabled,
                                                             topDivStyle,
                                                             ...other
                                                           }) => {
  const uid = useUid(id);
  const theme = useTheme();

  return (
    <div  className="Check"
          css={[
            {
              //  textAlign: 'left',
              display: "flex",
              alignItems: "center",
              //  width: "100%",
            },
            topDivStyle
          ]}
          {...other}
    >
      <input
        disabled={disabled}
        className="Check__input"
        type="checkbox"
        id={uid}
        css={[
          {
            height: '2rem',
            width: '2rem',
            display: 'inline-flex',
            paddingLeft: '1rem',
          },
        ]}
        {...other}
      />
      <label
        className="Check__label"
        css={{
          opacity: disabled ? 0.6 : undefined,
          marginLeft: theme.spaces.xs
        }}
        htmlFor={uid}
      >
        <Text>{label}</Text>
      </label>
    </div>
  );
};

Check.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool
};


//带单位标注的输入框
export interface SuffixInputProps
  extends InputBaseProps {
  textStyle?: SerializedStyles;
}

/** SuffixInput 带单位标注的输入框
 * A styled Label to go along with input elements
 * 若children有，就是有附带单位后缀串的模式；
 * 带单位后缀的说明，70%给输入框，后面30%给叙述单位字串{空格也算}
 * 输入的 单位说明 字符串 放在 <Text className="Suffix__text"  >
 * 没有ref注入的版本；
 */
export const SuffixInput: React.FunctionComponent<SuffixInputProps> = (
    {
        children,
        textStyle,
        inputSize,
        topDivStyle,
        ...other
    }
) => {
  //const theme = useTheme();
  //children可以是非字符串的, 按钮等。
  return (
    <div  css={[
      {
        textAlign: 'left'
        //display: "inline-block",
      },
      topDivStyle
    ]}
    >
        <InputBase inputSize={inputSize}
             css={{
               display: "inline-block",
               width:  children? "70%" : '100%',
             }}
             {...other}
        />
        {typeof children === "string" ? (
            <Text className="Suffix__text" variant={"subtitle"}
                  css={[
                      {
                          display: children? "inline-flex" : 'none',
                          paddingLeft: '0.2rem'
                      },
                      textStyle
                  ]}
            >
                {children}
            </Text>
        ) : (
            children
        )}
    </div>
  );
};

SuffixInput.propTypes = {
  children: PropTypes.node
};


export interface InputGroupLineProps extends InputGroupProps {
  //对一整行的控制
  lineStyle?: SerializedStyles;
  //根据换行px数 ，来切换显示2个显示模式。 缺省>=360px 正常模式，否则紧凑模式。
  switchPx?: number;
  //是否开启宽度紧凑模式的局部布局，意味着无法满足最小宽度要求了。
    fitable?: boolean;
}
/**
自适应屏幕flexBox布局：不要设置固定的width和min-width，可以设置max-width；根据屏幕宽策划1列2列还是更多列的并列，或是更高层次嵌套或隐藏或显示一小半边天区域。
不要对InputGroupLine的上一级div定义固定宽度，自适应和固定width: px只能二者选其一；宽度定了对小屏幕场景就有滚动条，而不是自适应缩小flexBox布局。
修改InputGroup排版模式; 并排模式，根据屏幕自适应。支持 2 个模式的布局安排结构。
 性能优化，旧版本InputGroupLine=680ms; 新的InputLine=600ms;
这两个布局占位参数 error, helpText感觉意义不大。
 InputGroupContext才是最关键的，子孙组件uid和LabelText标签挂接。
*/
export const InputLine: React.FunctionComponent<InputGroupLineProps> = ({
    id,
    label,
    children,
    error,
    helpText,
    hideLabel,
    labelTextStyle,
    lineStyle,
    switchPx=360,
    ...other
}) => {
    const uid = useUid(id);
    const theme = useTheme();
    const isDark = theme.colors.mode === "dark";
    const danger = isDark
        ? theme.colors.intent.danger.light
        : theme.colors.intent.danger.base;

    //根据外部程序制定的px数，来决定用哪一个模式布局。紧凑的是2行显示；宽松的是并列在同一行。
    const fitable = useMedia({ minWidth: `${switchPx}px` });
    //InputGroupLine包裹的下层的顶级组件的样式修改：下层顶级元素的display: block还算兼容可用; 但width: 100%影响较大。
    const childNodeVar = (
        <InputGroupContext.Provider
            value={{
                uid,
                error
            }}
        >
            {
                React.cloneElement(children as React.ReactElement<any>, {
                    topDivStyle: { flex: '1 1 60%' },
                    //style: { flex: '1 1 60%' },      左边的项目文字描述　40%　右边输入框(含单位字符)占用60%
                })
            }
        </InputGroupContext.Provider>
    );

    //这里htmlFor={uid}，标签label 和 input很可能分别属于不同div底下的。
    const titleVar = (
        <LabelText className="Label__text"  htmlFor={uid}
                   css={[
                       {
                           //display: "inline-flex",
                           textAlign: fitable? "right" : "left",
                           flex: '1 1 40%',
                           paddingRight: '0.8rem',
                           marginBottom: hideLabel ? 0 : theme.spaces.sm
                       },
                       labelTextStyle
                   ]}
        >
            {label}
        </LabelText>
    );

    return (
        <section
            className="InputLine"
            css={{
                marginTop: theme.spaces.md,
                "&.InputLine:first-of-type": {
                    marginTop: 0
                },
                textAlign: 'center'
            }}
            {...other}
        >
            <div  css={[
                {
                    alignItems: "center",
                    justifyContent: "space-around",
                    display: "flex",
                    // flexWrap: 'wrap',
                    maxWidth: '950px',
                    margin: '0 auto',
                    paddingRight: fitable? '0.5rem' :  'unset',
                },
                lineStyle
            ]}
            >
                {hideLabel ? <VisuallyHidden>{titleVar}</VisuallyHidden> : titleVar}

                { fitable &&   childNodeVar  }
            </div>

            { !fitable &&   childNodeVar  }

            {error && typeof error === "string" ? (
                <div
                    className="InputGroup__error"
                    css={{
                        alignItems: "center",
                        marginTop: theme.spaces.sm,
                        display: "flex",
                        justifyContent: 'center'
                    }}
                >
                    <IconAlertCircle size="sm" color={danger} />
                    <Text
                        css={{
                            display: "block",
                            marginLeft: theme.spaces.xs,
                            fontSize: theme.fontSizes[0],
                            color: danger
                        }}
                    >
                        {error}
                    </Text>
                </div>
            ) : (
                error
            )}

            {helpText && (
                <Text
                    className="InputGroup__help"
                    css={{
                        display: "inline-flex",
                        marginTop: theme.spaces.xs,
                        color: theme.colors.text.muted,
                        fontSize: theme.fontSizes[0]
                    }}
                    variant="body"
                >
                    {helpText}
                </Text>
            )}
        </section>
    );
};

InputLine.propTypes = {
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  helpText: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  id: PropTypes.string,
  switchPx: PropTypes.number,
  children: PropTypes.node
};

/**
一般<section>出现在文档文章大纲中。一般通过是否包含一个标题 <h1>-<h6>作为子节点 来辨识<section>。
 只能支持下面有唯一一个儿子组件的。 可以使用<div>包裹多个孙子组件。 举例如下：
     <div>
         <Check label="Male" checked />
         <Check label="Female" />
     </div>
 */
//第二版本： 回调函数转成 大写字母。
//这是单个输入包裹组件，外部再多搞一层布局组件L2Column来配合。

export const InputLineL: React.FunctionComponent<InputGroupLineProps> = (
{
    id,
    label,
    children,
    error,
    helpText,
    hideLabel,
    labelTextStyle,
    lineStyle,
     fitable=true,
    ...other
}) => {
    const uid = useUid(id);
    const theme = useTheme();
    const isDark = theme.colors.mode === "dark";
    const danger = isDark
        ? theme.colors.intent.danger.light
        : theme.colors.intent.danger.base;



    //InputGroupLine包裹的下层的顶级组件的样式修改：下层顶级元素的display: block还算兼容可用; 但width: 100%影响较大。
    //topDivStyle方式： 会不被识别认得，底下的<div>不懂得该如何处理。
    //假如底下是div 加上 element.style {   flex: 1 1 60%;  }；
    const childNodeVar = (
        <InputGroupContext.Provider
            value={{
                uid,
                error
            }}
        >
            {
                //只能支持一个儿子的。 可以为底下的<div>自动添加样式。
                //style: { flex: '1 1 60%' },      左边的项目文字描述　40%　右边输入框(含单位字符)占用60%
                React.cloneElement(
                    React.Children.only(children) as React.ReactElement<any>,
                    {
                        ///topDivStyle: { flex: '1 1 60%' },
                        style: {flex: '1 1 60%' }
                    }
                )
            }
        </InputGroupContext.Provider>
    );

    //这里htmlFor={uid}，标签label 和 input很可能分别属于不同div底下的。
    //const titleVar = (        );
    const TitleVar= <LabelText className="Label__text"  htmlFor={uid}
                       css={[
                           {
                               //display: "inline-flex",
                               textAlign: fitable? "right" : "left",
                               flex: '1 1 40%',
                               paddingRight: '0.8rem',
                               marginBottom: hideLabel ? 0 : theme.spaces.sm
                           },
                           labelTextStyle
                       ]}
                       >
                        {label}
                </LabelText>;

    //子孙的宽度没有固定px的，布局组件的子孙都是可在宽度上做自适应的。只有目标多少列排列是敲定固定的，也就是预期最大父窗口宽度场合可以安排最多几个列的元素。
    //布局子孙都是平等的，宽度都平均分配，预期高度在同一行排列也是均衡整齐或高度一致的，
    //输入Line组件的断线折腰宽度在布局组件上就的设置switchPx参数。
    //这外部还得搞个布局组件嵌套，布局组件来传递进来布局紧凑与否参数fitable。也就是遇到最小最小的父窗口宽度情形，在只安排单列元素场合下的，给输入Line组件紧凑提示。
   // checkParent(React.Children.only(children) as any);

    return (
        <div
            className="InputLine"
            css={{
                marginTop: theme.spaces.md,
                "&.InputLine:first-of-type": {
                    marginTop: 0
                },
                textAlign: 'center'
            }}
            {...other}
        >

            <div  css={[
              {
                  alignItems: "center",
                  justifyContent: "space-around",
                  display: "flex",
                  // flexWrap: 'wrap',
                  maxWidth: '950px',
                  margin: '0 auto',
                  paddingRight:  'unset',
              },
              lineStyle
            ]}
            >
              {hideLabel ? <VisuallyHidden>{ TitleVar }</VisuallyHidden>
                  : TitleVar }

              {fitable && childNodeVar }
            </div>

            {!fitable && childNodeVar }

            {error && typeof error === "string" ? (
                <div
                    className="InputGroup__error"
                    css={{
                        alignItems: "center",
                        marginTop: theme.spaces.sm,
                        display: "flex",
                        justifyContent: 'center'
                    }}
                >
                    <IconAlertCircle size="sm" color={danger} />
                    <Text
                        css={{
                            display: "block",
                            marginLeft: theme.spaces.xs,
                            fontSize: theme.fontSizes[0],
                            color: danger
                        }}
                    >
                        {error}
                    </Text>
                </div>
            ) : (
                error
            )}

            {helpText && (
                <Text
                    className="InputGroup__help"
                    css={{
                        display: "inline-flex",
                        marginTop: theme.spaces.xs,
                        color: theme.colors.text.muted,
                        fontSize: theme.fontSizes[0]
                    }}
                    variant="body"
                >
                    {helpText}
                </Text>
            )}
        </div>
    );
};



export interface InputDatalistProps 　 extends InputBaseProps {
    /** 控制是否满上宽度;
     *  需要在<input> 上 去控制大尺寸上限的width:  ，以及自适应屏幕大小后的 max-width: 缩小尺寸。
     * */
    fullWidth?: boolean;
    //已经知道的列表
    datalist?: any[];
    //为了和ComboBoxDatalist保证参数一致才引入的。 接替onChange(); 直接用底层onChange可行的
    onListChange: (value: string) => void;
}

/**底层浏览器已经做了现成的支持ComboBox，何必自己再搞那么麻烦呢。
 * 直接用W3C浏览器提供的<datalist标签？list做关联id,来做组合输入框，代替ComboBox组件
 *<datalist id=""> 实际上可以脱离<input 而存在的，比如作为全局的不改动的<datalist集合放在一起。 管理？分离掉了；
 * 还是自己包含<datalist维护好了。
 * InputDatalist对比ComboBox组件的弱点1非空编辑不能点击就显示所有列表2手机上列表展开位置与窗口大小太矮了3<option的label与value都显示出来感觉不好。
 * ，但比ComboBox有个有优势：1能够记住当前用户输入用过的以后再用。
 * 不过一般输入完成后再做点击修改的概率也不大，手机版本显示区域太小问题以后浏览器版本可能改进的。
 */
export const InputDatalist: React.FunctionComponent<InputDatalistProps> = (
    {
        autoComplete, autoFocus, inputSize = "md",
        fullWidth=true,
        datalist=[],
        topDivStyle,
        onListChange,
        ...other
    }
) => {
    const { uid, error } = React.useContext(InputGroupContext);
    const { bind, active } = useActiveStyle();
    const {
        baseStyles,
        inputSizes,
        activeBackground,
        errorStyles
    } = useSharedStyle();
    const height = getHeight(inputSize);
    //这个版本：不需要React.forwardRef(()=>{})的，注入ref性能损失， {...safeBind({ ref }, other)}
    return (
        <div  css={[
            {
                textAlign: 'left',
                width: "100%"
            },
            topDivStyle
        ]}
        >
            <datalist id={`list${uid}`}>
                { datalist.map((one,i) => {
                    return <option key={i} value={one} />;
                }) }
            </datalist>
            <input
                id={uid}
                className="Input"
                autoComplete={autoComplete}
                autoFocus={autoFocus}
                {...bind}
                css={[
                    baseStyles,
                    inputSizes[inputSize],
                    active && activeBackground,
                    error && errorStyles,
                    { height },
                    !fullWidth &&{
                        width: 'unset',
                    }
                ]}
                {...other}
                list={`list${uid}`}
                onChange={e => onListChange( e.currentTarget.value||undefined ) }
            />
        </div>
    );
};


const getSwitchHeight = (size: ButtonSize) => {
    if (size === "xs") return 16;
    else if (size === "sm") return 22;
    else if (size === "lg") return 36;
    else if (size === "xl") return 44;
    else return 28;
};

export interface CheckSwitchProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    topDivStyle?: SerializedStyles;
    /** The size of the Switch. 多大高度方向的尺寸 */
    hsize?: ButtonSize;
}

/**
 * 从‘react-switch’导入组件,做个可替代Check的更加美观的开关组件。
 * @param disabled
 * @param topDivStyle
 */
export const CheckSwitch: React.FunctionComponent<CheckSwitchProps> = ({
        id,
        disabled,
        topDivStyle,
        checked,
        onChange,
        hsize = "md" as ButtonSize,
        ...other
    }) => {
    const { uid } = React.useContext(InputGroupContext);
    //不能用这个React.useCallback((checked,event,id) => {， 状态无法切换, 外面传递进来的onChange()还是旧的数据，无法更新成新数值。
    //onHandleChange用了 useCallback（,[]）: 就是捕获函数， onChange就无法变化了,所以被锁住更新。
    const onHandleChange = (checked) => {
        onChange(checked);
    };

    return (
        <div  className="Switch"
              css={[
                  {
                      display: "flex",
                      alignItems: "center",
                  },
                  topDivStyle
              ]}
              {...other}
        >
            <Switch id={uid}
               checked={checked}
               onChange={onHandleChange}
               disabled={disabled}
               height={getSwitchHeight(hsize)}
               width={getSwitchHeight(hsize)*2}
            />
        </div>
    );
};

CheckSwitch.propTypes = {
    id: PropTypes.string,
    disabled: PropTypes.bool,
    hsize: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
};


//测试
function checkParent(parent: Element | null) {
    if (!parent) {
        console.error(new Error('empty parent element'))
        return
    }

    switch (parent.tagName) {
        case 'area':
        case 'base':
        case 'br':
        case 'col':
        case 'embed':
        case 'hr':
        case 'img':
        case 'input':
        case 'keygen':
        case 'link':
        case 'menuitem':
        case 'meta':
        case 'param':
        case 'source':
        case 'track':
        case 'wbr':
        case 'script':
        case 'style':
        case 'textarea':
        case 'title':
            console.error(
                new Error(
                    'Unsupported parent tag name ' +
                    parent.tagName.toLowerCase() +
                    '.' +
                    parent.className.replace(/\s+/, '.') +
                    ' . Change the tag or wrap it in a supported tag(e.g. div).'
                )
            )
    }

    const parentStyles = window.getComputedStyle(parent)
    if (parentStyles && parentStyles.getPropertyValue('position') === 'static') {
        console.warn(
            new Error(
                'LineColumn: ' +
                "The 'position' CSS property of element " +
                parent.tagName.toLowerCase() +
                '.' +
                parent.className.replace(/\s+/, '.') +
                " should not be 'static'."
            )
        )
    }
}


