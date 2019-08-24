import { Room } from "graphql";
import { animated, useTransition } from "react-spring";
import PanelContent from "context/PanelContent";
import React from "react";
import RichText from "@madebyconnor/rich-text-to-jsx";
import contentful from "client/contentful";
import usePromise from "react-use-promise";

interface RoomProps {
  room: Pick<Room, "id" | "entryId" | "x" | "y">;
}

export default function Room({ room }: RoomProps) {
  const [result, error, state] = usePromise(() => contentful.getEntry<any>(room.entryId), [
    room.entryId,
    contentful,
  ]);

  const contentTransitions = useTransition(!error && state === "resolved", null, {
    initial: { transform: "translateY(0)", opacity: 1 },
    from: { transform: "translateY(2rem)", opacity: 0 },
    enter: { transform: "translateY(0)", opacity: 1 },
    leave: { transform: "translateY(-2rem)", opacity: 0 },
  });

  return (
    <>
      <PanelContent.Source>
        {contentTransitions.map(({ item, key, props }) => (
          <animated.div key={key} style={props}>
            {item ? <RichText richText={result.fields.body} /> : <div></div>}
          </animated.div>
        ))}
      </PanelContent.Source>
    </>
  );
}
