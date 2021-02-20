//旧的直接超别的包 export * from "touchable-hook";

/**
 * The state machine used here is based on the one provided
 * in react-native-web:
 *
 * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/Touchable/index.js
 */

import * as React from "react";
import { isHoverEnabled } from "./hover-enabled";
//类型ResponderEvent自动添加进来的
import {ResponderEvent, useGestureResponder} from "react-gesture-responder";
//自动添加进来的，Partial<> 代表一部分可选的参数对象集合。
import {Partial} from "rollup-plugin-typescript2/dist/partial";

/**
 * useTouchable
 *
 * useTouchable is a hook that attempt to emulate native touch behaviour for things
 * like list items, buttons, etc.
 *
 * const { bind, active } = useTouchable({
 *   onPress: () => console.log('hello'),
 *   disabled: false,
 *   delay: 120
 * })
 *
 */

const HIGHLIGHT_DELAY_MS = 100;
const PRESS_EXPAND_PX = 20;
const LONG_PRESS_DELAY = 500 - HIGHLIGHT_DELAY_MS;

//初始化或者完全清空的： state.current === "NOT_RESPONDER"

type States =
    | "ERROR"
    | "NOT_RESPONDER"
    | "RESPONDER_ACTIVE_IN"
    | "RESPONDER_ACTIVE_OUT"
    | "RESPONDER_PRESSED_IN"
    | "RESPONDER_PRESSED_OUT"
    | "RESPONDER_LONG_PRESSED_IN";

//触摸行为开始的=RESPONDER_GRANT；   触摸含义终止=RESPONDER_TERMINATED
//完全清空{或者按钮函数执行完了之后}=RESPONDER_RELEASE；  矩形区域进出=ENTER_PRESS_RECT

type Events =
    | "DELAY"
    | "RESPONDER_GRANT"
    | "RESPONDER_RELEASE"
    | "RESPONDER_TERMINATED"
    | "ENTER_PRESS_RECT"
    | "LEAVE_PRESS_RECT"
    | "LONG_PRESS_DETECTED";

type TransitionsType = { [key in States]: TransitionType };

type TransitionType = { [key in Events]: States };

//状态+事件：矩阵：  NOT_RESPONDER 意思： 没事情无效果。
//直接利用旧的矩阵：
const transitions = {
    NOT_RESPONDER: {
        DELAY: "NOT_RESPONDER",
        RESPONDER_GRANT: "RESPONDER_ACTIVE_IN",
        RESPONDER_RELEASE: "NOT_RESPONDER",
        RESPONDER_TERMINATED: "NOT_RESPONDER",
        ENTER_PRESS_RECT: "NOT_RESPONDER",
        LEAVE_PRESS_RECT: "NOT_RESPONDER",
        LONG_PRESS_DETECTED: "NOT_RESPONDER"
    },
    RESPONDER_ACTIVE_IN: {
        DELAY: "RESPONDER_PRESSED_IN",
        RESPONDER_GRANT: "ERROR",
        RESPONDER_RELEASE: "NOT_RESPONDER",
        RESPONDER_TERMINATED: "NOT_RESPONDER",
        ENTER_PRESS_RECT: "RESPONDER_ACTIVE_IN",
        LEAVE_PRESS_RECT: "RESPONDER_ACTIVE_OUT",
        LONG_PRESS_DETECTED: "ERROR"
    },
    RESPONDER_ACTIVE_OUT: {
        DELAY: "RESPONDER_PRESSED_OUT",
        RESPONDER_GRANT: "ERROR",
        RESPONDER_RELEASE: "NOT_RESPONDER",
        RESPONDER_TERMINATED: "NOT_RESPONDER",
        ENTER_PRESS_RECT: "RESPONDER_ACTIVE_IN",
        LEAVE_PRESS_RECT: "RESPONDER_ACTIVE_OUT",
        LONG_PRESS_DETECTED: "ERROR"
    },
    RESPONDER_PRESSED_IN: {
        DELAY: "ERROR",
        RESPONDER_GRANT: "ERROR",
        RESPONDER_RELEASE: "NOT_RESPONDER",
        RESPONDER_TERMINATED: "NOT_RESPONDER",
        ENTER_PRESS_RECT: "RESPONDER_PRESSED_IN",
        LEAVE_PRESS_RECT: "RESPONDER_PRESSED_OUT",
        LONG_PRESS_DETECTED: "RESPONDER_LONG_PRESSED_IN"
    },
    RESPONDER_PRESSED_OUT: {
        DELAY: "ERROR",
        RESPONDER_GRANT: "ERROR",
        RESPONDER_RELEASE: "NOT_RESPONDER",
        RESPONDER_TERMINATED: "NOT_RESPONDER",
        ENTER_PRESS_RECT: "RESPONDER_PRESSED_IN",
        LEAVE_PRESS_RECT: "RESPONDER_PRESSED_OUT",
        LONG_PRESS_DETECTED: "ERROR"
    },
    RESPONDER_LONG_PRESSED_IN: {
        DELAY: "ERROR",
        RESPONDER_GRANT: "ERROR",
        RESPONDER_RELEASE: "NOT_RESPONDER",
        RESPONDER_TERMINATED: "NOT_RESPONDER",
        ENTER_PRESS_RECT: "RESPONDER_PRESSED_IN",
        LEAVE_PRESS_RECT: "RESPONDER_PRESSED_OUT",
        LONG_PRESS_DETECTED: "RESPONDER_LONG_PRESSED_IN"
    },
    ERROR: {
        DELAY: "NOT_RESPONDER",
        RESPONDER_GRANT: "RESPONDER_ACTIVE_IN",
        RESPONDER_RELEASE: "NOT_RESPONDER",
        RESPONDER_TERMINATED: "NOT_RESPONDER",
        ENTER_PRESS_RECT: "NOT_RESPONDER",
        LEAVE_PRESS_RECT: "NOT_RESPONDER",
        LONG_PRESS_DETECTED: "NOT_RESPONDER"
    }
} as TransitionsType;



export type OnPressFunction = (
    e?: React.TouchEvent | React.MouseEvent | React.KeyboardEvent | Event
) => void;

export interface TouchableOptions {
    delay: number;
    longPressDelay: number;
    pressExpandPx: number;
    behavior: "button" | "link";
    disabled: boolean;
    terminateOnScroll: boolean;
    onPress?: OnPressFunction;
    onLongPress?: OnPressFunction;
}

const defaultOptions: TouchableOptions = {
    delay: HIGHLIGHT_DELAY_MS,
    pressExpandPx: PRESS_EXPAND_PX,
    longPressDelay: LONG_PRESS_DELAY,
    behavior: "button",
    disabled: false,
    terminateOnScroll: true,
    onPress: undefined,
    onLongPress: undefined
};

/**
 * Hook：原版乃是touchable-hook这个包的。
 * @param options
 * 本函数返回的类型声明的近20个参数对象实际是自动生成的代码，非人工编辑的。
 */

export function useTouchable(options: Partial<TouchableOptions> = {}):
{
    hover: boolean;
    bind: {
        onTouchStart: (e: ResponderEvent) => void;
        onKeyDown: (e: React.KeyboardEvent) => void;
        onKeyUp: (e: React.KeyboardEvent) => void;
        ref: React.MutableRefObject<any>;
        onTouchMove: (e: ResponderEvent) => void;
        onTouchEnd: (e: ResponderEvent) => void;
        onTouchMoveCapture: (e: ResponderEvent) => void;
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseDown?: ((e: React.MouseEvent<Element, MouseEvent>) => void) | undefined;
        onTouchStartCapture: (e: ResponderEvent) => void;
        onMouseDownCapture?: ((e: React.MouseEvent<Element, MouseEvent>) => void) | undefined
    };
    active: boolean
} {
    const {
        onPress,
        onLongPress,
        longPressDelay,
        terminateOnScroll,
        delay,
        behavior,
        disabled: localDisabled
    } = {
        ...defaultOptions,
        ...options
    };
    const disabled = localDisabled;
    const ref = React.useRef<HTMLAnchorElement | HTMLDivElement | any>(null);
    const delayTimer = React.useRef<number>();
    const longDelayTimer = React.useRef<number>();
    const bounds = React.useRef<ClientRect>();
    //这两个完全不是一个含义， hover是鼠标点位置进 出来。
    const [hover, setHover] = React.useState(false);
    //开始触摸的反馈showHover正常都是true,触摸点击的才会，相反掉。
    const [showHover, setShowHover] = React.useState(true);
    //active表示被触摸选中了。
    const [active, setActive] = React.useState(false);

    //直接用React.useReducer替换旧的机制（useRef<States>("NOT_RESPONDER"), function dispatch(event: Events) {）
    //原先是nextState = transitions[state.current][event];  state.current = nextState
    //如今[{ responder }, dispatch] = React.useReducer( ；这里{ responder }, 实际代表state[旧代码是state.current];  dispatch({type:'Event',addParms:{} });

    const [{ responder }, dispatch] = React.useReducer( (state, action) => {
        const newResponder = transitions[state.responder][action.type];
        if(newResponder === "RESPONDER_PRESSED_IN" || newResponder === "RESPONDER_LONG_PRESSED_IN" ) {
            setActive(true);
        } else {
            //状态机事件触发前后都是"NOT_RESPONDER"的说明组件可能已经卸载了！
            //首先 RESPONDER_RELEASE: 后面又来了 RESPONDER_TERMINATED:
            if(newResponder!=="ERROR" || (action.type !=="RESPONDER_RELEASE" && action.type !=="RESPONDER_TERMINATED") )
                setActive(false);
        }

        if (newResponder === "NOT_RESPONDER") {
            clearTimeout(delayTimer.current);
            clearTimeout(longDelayTimer.current);
        }

        switch (action.type as Events) {
            default:
                return {
                    ...state,
                    responder: newResponder
                };
        }
    }, {
        responder: "NOT_RESPONDER" as States,
    });


    //旧代码useRef方式
    //const state = React.useRef<States>("NOT_RESPONDER");
    /*
     Transition from one state to another
         * @param event dispatch({ type: 'increment', someNews: { } });
    function dispatch_old(event: Events) {
        const nextState = transitions[state.current][event];
        state.current = nextState;

        if (
            nextState === "RESPONDER_PRESSED_IN" ||
            nextState === "RESPONDER_LONG_PRESSED_IN"
        ) {
            setActive(true);
        } else {
            //状态机事件触发前后都是"NOT_RESPONDER"的说明组件可能已经卸载了！
            //首先 RESPONDER_RELEASE: 后面又来了 RESPONDER_TERMINATED:
            if(state.current!=="ERROR" || (event !=="RESPONDER_RELEASE" && event !=="RESPONDER_TERMINATED") )
                setActive(false);
        }

        if (nextState === "NOT_RESPONDER") {
            clearTimeout(delayTimer.current);
            clearTimeout(longDelayTimer.current);
        }
    }
    */


    // create a pan responder to handle mouse / touch gestures
    const { bind, terminateCurrentResponder } = useGestureResponder({
        onStartShouldSet: () => true,
        onGrant: () => {
            onStart(isHoverEnabled() ? 0 : undefined);
        },
        onRelease: (_state, e) => onEnd(e),
        onMove: (_state, e) => onTouchMove(e),
        onTerminate: _state => onTerminate()
    });

    /**
     * Emit a press event if not disabled
     * @param e
     */

    function emitPress(
        e: React.TouchEvent | React.MouseEvent | React.KeyboardEvent | Event
    ) {
        if (!disabled && onPress) {
            onPress(e);
        }
    }

    function emitLongPress() {
        if (!disabled && onLongPress) {
            onLongPress();
        }
    }

    function bindScroll() {
        if (terminateOnScroll) {
            document.addEventListener("scroll", onScroll, true);
        }
    }

    function unbindScroll() {
  //addEventListener() 添加的事件处理程序只能使用 removeEventListener() 来移除；移除时传入的参数与添加处理程序时使用的参数相同。这也就意味着通过 addEventListener() 添加的匿名函数将无法移除。
       //第三个参数useCapture：true，即事件捕获阶段会触发事件, 属性为false，即事件冒泡阶段才会触发, 捕获阶段是大的首先执行，后面才进入了冒泡阶段，相反div顺序触发。
        document.removeEventListener("scroll", onScroll, true);
    }

    function afterDelay() {
        dispatch({ type: "DELAY" });
    }

    /**
     * Get our initial bounding box clientRect and set any delay
     * timers if necessary.
     * @param delayPressMs
     */

    function onStart(delayPressMs = delay) {
        dispatch({ type: "RESPONDER_GRANT" });
        bounds.current = ref.current!.getBoundingClientRect();
        delayTimer.current =
            delayPressMs > 0
                ? window.setTimeout(afterDelay, delayPressMs)
                : undefined;

        if (delayPressMs === 0) {
            dispatch({ type: "DELAY" });
        }

        longDelayTimer.current = window.setTimeout(afterLongDelay, longPressDelay);

        bindScroll();
        setShowHover(false);
    }

    function afterLongDelay() {
        dispatch({ type: "LONG_PRESS_DETECTED" });
        emitLongPress();
    }

    // onTerminate should be disambiguated from onRelease
    // because it should never trigger onPress events.
    function onTerminate() {
        if (responder === "NOT_RESPONDER") {
            return;
        }

        dispatch({ type: "RESPONDER_RELEASE" });
        setShowHover(true);
        unbindScroll();
    }

    function onEnd(
        e?: React.TouchEvent | React.MouseEvent | React.KeyboardEvent | Event
    ) {
        // consider unbinding the end event instead
        if (responder === "NOT_RESPONDER") {
            return;
        }

        if (
            e &&
            (responder === "RESPONDER_ACTIVE_IN" ||
                responder === "RESPONDER_PRESSED_IN")
        ) {
            emitPress(e);
        }

        dispatch({ type: "RESPONDER_RELEASE" });

        //状态机事件触发前后都是"NOT_RESPONDER"的说明组件可能已经卸载了！
        //首先 RESPONDER_RELEASE: 后面又来了 RESPONDER_TERMINATED:
       if(responder!=="ERROR" && !showHover){
            setShowHover(true);
       }
        unbindScroll();
    }

    function isWithinActiveBounds(
        clientX: number,
        clientY: number,
        rect: ClientRect,
        expandPx: number = PRESS_EXPAND_PX
    ) {
        return (
            clientX > rect.left - expandPx &&
            clientY > rect.top - expandPx &&
            clientX < rect.right + expandPx &&
            clientY < rect.bottom + expandPx
        );
    }

    /**
     * Determine if the touch remains in the active bounds
     * @param e
     */

    function onTouchMove(e: any) {
        if (responder === "NOT_RESPONDER" || responder === "ERROR") {
            return;
        }

        clearTimeout(longDelayTimer.current);

        const { clientX, clientY } = e.touches && e.touches[0] ? e.touches[0] : e;
        const withinBounds = isWithinActiveBounds(
            clientX,
            clientY,
            bounds.current!
        );

        if (withinBounds) {
            dispatch({ type: "ENTER_PRESS_RECT" });
        } else {
            dispatch({ type: "LEAVE_PRESS_RECT" });
        }
    }

    /**
     * Scrolling cancels all responder events. This enables
     * the user to scroll without selecting something
     */

    function onScroll() {
        unbindScroll();
        //组件已经卸载？
        if (responder === "ERROR") {
            return;
        }
        dispatch({ type: "RESPONDER_TERMINATED" });
    }

    /**
     * If our mouse leaves we terminate our responder,
     * even if our press remains down. This emulates
     * native mouse behaviour.
     * @param e
     */

    function onMouseLeave() {
        if (hover) {
            setHover(false);
        }
        if (!showHover) {
            setShowHover(true);
        }
        if (responder !== "NOT_RESPONDER") {
            terminateCurrentResponder();
        }
    }

    function onMouseEnter() {
        if (!hover) {
            setHover(true);
        }
    }


    /** 组件卸载了该怎么办？
     * Handle timer and disabled side-effects
     */

    React.useEffect(() => {
        return () => {
            //老是报错 unmounted, 特殊状态。
            //state.current = "NOT_RESPONDER";
            dispatch
            //       responder = "ERROR";
            clearTimeout(delayTimer.current);
            clearTimeout(longDelayTimer.current);
            unbindScroll();
        };
    }, []);

    React.useEffect(() => {
        if (disabled && responder !== "NOT_RESPONDER") {
            dispatch({ type: "RESPONDER_TERMINATED" });
            setShowHover(true);
        }
    }, [disabled]);

    /**
     * Keyboard support
     * button:
     *   onEnterDown -> onPress
     *   onSpaceUp -> onPress
     * Prevent default.
     *
     * link: Don't prevent default
     */

    function onKey(e: React.KeyboardEvent) {
        const ENTER = 13;
        const SPACE = 32;

        if (e.type === "keydown" && e.which === SPACE) {
            onStart(0);
        } else if (e.type === "keydown" && e.which === ENTER) {
            emitPress(e);
        } else if (e.type === "keyup" && e.which === SPACE) {
            onEnd(e);
        } else {
            return;
        }

        e.stopPropagation();

        if (!(e.which === ENTER && behavior === "link")) {
            e.preventDefault();
        }
    }

    return {
        bind: {
            ...bind,
            onKeyUp: onKey,
            onKeyDown: onKey,
            onMouseEnter,
            onMouseLeave,
            ref
        },
        active: !disabled && active,
        hover: isHoverEnabled() && !disabled && hover && showHover
    };
}

