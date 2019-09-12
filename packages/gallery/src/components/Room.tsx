import { DropTargetMonitor, useDrop } from "react-dnd";
import { Room as RoomModel, useCreatePlacementMutation } from "../operations";

import { animated, useSpring } from "react-spring";
import { contentTypeIsVideo } from "lib/contentType";
import { get } from "lodash-es";
import AnimatedPanelContent from "./AnimatedPanelContent";
import ControlledVideo from "./ControlledVideo";
import CurrentRoomId from "context/CurrentRoomId";
import DragTypes from "lib/dragTypes";
import GalleryRichText from "./GalleryRichText";
import React, { useCallback, useContext } from "react";
import styled from "styled-components";
import useContentfulEntry from "hook/useContentfulEntry";

const RichTextContainer = styled.div`
  padding-bottom: 8rem;
`;

const Container = styled.div`
  flex: 1;
  perspective: 1000px;
`;

const Work = styled(animated.div)`
  width: 100%;
  height: 100%;
`;

const Image = styled.div`
  background-image: ${({ src }) => `url(${src})`};
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

const collect = (monitor: DropTargetMonitor) => ({
  isOver: monitor.isOver(),
});

export default function Room({
  room,
  createPlacement,
}: {
  room: Pick<RoomModel, "id" | "entryId" | "x" | "y">;
  createPlacement: ReturnType<typeof useCreatePlacementMutation>[0];
}) {
  const currentRoomId = CurrentRoomId.useContainer();
  const [result, error, state] = useContentfulEntry(room.entryId);

  const uri = get(result, "fields.work.fields.file.url");
  const contentType: string = get(
    result,
    "fields.work.fields.file.contentType",
  );

  const ElementType = contentType
    ? contentTypeIsVideo(contentType)
      ? ControlledVideo
      : Image
    : undefined;

  const drop = useCallback(
    async item => {
      // TODO: collect x, y like stickers
      await createPlacement({
        variables: {
          assetId: item.asset.id,
          roomId: room.id,
          x: 500,
          y: 500,
        },
      });
    },
    [createPlacement, room.id],
  );

  const [{ isOver }, dropRef] = useDrop({
    accept: DragTypes.Asset,
    drop,
    collect,
  });

  const style = useSpring({
    transform: `translateZ(${isOver ? "100px" : "0px"})`,
  });

  return (
    <>
      <Container>
        <Work ref={dropRef} style={style}>
          {contentType && (
            <ElementType src={uri} loop playing={currentRoomId === room.id} />
          )}
        </Work>
      </Container>
      <AnimatedPanelContent>
        {state === "resolved" && (
          <RichTextContainer>
            <GalleryRichText richText={result.fields.body} />
          </RichTextContainer>
        )}
        {state === "rejected" && (
          <>
            <h1>Error</h1>
            <code>{error.message}</code>
          </>
        )}
      </AnimatedPanelContent>
    </>
  );
}
