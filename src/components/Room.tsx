import { Room } from "graphql";

import PanelContent from "context/PanelContent";
import React from "react";
import RichText from "@madebyconnor/rich-text-to-jsx";
import WithContentTransition from "./WithContentTransition";
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

  return (
    <>
      <PanelContent.Source>
        <WithContentTransition>
          {state === "resolved" && <RichText richText={result.fields.body} />}
        </WithContentTransition>
      </PanelContent.Source>
    </>
  );
}
