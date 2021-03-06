/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { storiesOf } from "@storybook/react";
import { Text } from "../Text";
import { Link } from "../Link";
import React, { useState } from 'react';
//抛弃/Hooks/use-positioner，改成直接使用外部的react-popper。
import { usePopper } from 'react-popper';

function Example() {
    //const { target, popover, arrow } = usePositioner();
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    });

  return (
    <div>
      <button css={{ position: "absolute", left: "200px" }}
              ref={setReferenceElement}>Attach to me
      </button>
      <div
        ref={setPopperElement}
        style={styles.popper}
        css={{
          width: "300px",
          height: "300px",
          background: "red"
        }}

        {...attributes.popper}
      >
        <div>hi</div>{" "}
        <div css={{ width: "5px" }} style={styles.arrow} ref={setArrowElement} />
      </div>
    </div>
  );
}

export const PositionsExample = storiesOf("Positions", module).add(
  "Basic",
  () => <Example />
);
