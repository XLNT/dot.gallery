import { animated, useTransition } from "react-spring";
import React, { PropsWithChildren } from "react";

export default function WithContentTransition({ children }: PropsWithChildren<{}>) {
  const contentTransitions = useTransition(React.Children.toArray(children), null, {
    initial: { transform: "translateY(2rem)", opacity: 0 },
    from: { transform: "translateY(2rem)", opacity: 0 },
    enter: { transform: "translateY(0)", opacity: 1 },
    leave: { transform: "translateY(-2rem)", opacity: 0 },
  });

  return (
    <>
      {contentTransitions.map(({ item, key, props }) => (
        <animated.div key={key} style={props}>
          {item}
        </animated.div>
      ))}
    </>
  );
}
