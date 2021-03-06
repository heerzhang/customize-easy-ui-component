import * as React from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

export function useScrollLock(enabled?: boolean, ref?: React.RefObject<HTMLElement>) {
  if (enabled === void 0) { enabled = true; }
  var disabledRef = React.useRef(false);
  // scroll-lock uses an internal queue. we need to ensure that we only enable
  // scrolling here if we have already disabled scrolling.
  React.useEffect(function () {
    if (enabled && !disabledRef.current) {
      disablePageScroll(ref ? ref.current : undefined);
      disabledRef.current = true;
    }
    return function () {
      if (disabledRef.current) {
        enablePageScroll(ref ? ref.current : undefined);
        disabledRef.current = false;
      }
    };
  }, [enabled, ref, disabledRef]);

  //  return { bounds };
}


