import { Asset as AssetModel, Room as RoomModel } from "graphql";
import PanelAction from "context/PanelAction";
import PanelContent from "context/PanelContent";
import React from "react";
import RichText from "@madebyconnor/rich-text-to-jsx";
import WithContentTransition from "./WithContentTransition";
import contentful from "client/contentful";
import styled from "styled-components";
import usePromise from "react-use-promise";

interface RoomProps {
  room: Pick<RoomModel, "id" | "entryId" | "x" | "y"> & { asset: Pick<AssetModel, "id" | "uri"> };
}

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Work = styled.div`
  background-image: ${({ src }) => `url(${src})`};
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

export default function Room({ room }: RoomProps) {
  const [result, error, state] = usePromise(() => contentful.getEntry<any>(room.entryId), [
    room.entryId,
    contentful,
  ]);

  console.log(result, error, state, state === "resolved");

  return (
    <>
      <Container>
        <Work src={room.asset.uri} />
      </Container>
      <PanelAction.Source>Details&nbsp;&nbsp;</PanelAction.Source>
      <PanelContent.Source>
        <WithContentTransition>
          {state === "resolved" && <RichText richText={result.fields.body} />}
        </WithContentTransition>
      </PanelContent.Source>
    </>
  );
}
