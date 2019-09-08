import { DropTargetMonitor, useDrop } from "react-dnd";
import { Room as RoomModel, useCreatePlacementMutation } from "../operations";
import { animated, useSpring } from "react-spring";
import { get } from "lodash-es";
import AnimatedPanelContent from "./AnimatedPanelContent";
import DragTypes from "lib/dragTypes";
import GalleryRichText from "./GalleryRichText";
import React, { useCallback } from "react";
import styled from "styled-components";
import useContentful from "hook/useContentful";

interface RoomProps {
  room: Pick<RoomModel, "id" | "entryId" | "x" | "y">;
}

const Container = styled.div`
  flex: 1;
  perspective: 1000px;
`;

const Work = styled(animated.div)`
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

export default function Room({ room }: RoomProps) {
  const [result, error, state] = useContentful(room.entryId);

  const uri = get(result, "fields.work.fields.file.url");
  const contentType: string = get(
    result,
    "fields.work.fields.file.contentType",
  );
  const workElement = contentType
    ? contentType.startsWith("video")
      ? "video"
      : "img"
    : undefined;
  const [createAsset] = useCreatePlacementMutation({
    refetchQueries: ["CurrentEntity"],
  });

  const drop = useCallback(
    async item => {
      // TODO: collect x, y like stickers
      await createAsset({
        variables: {
          assetId: item.id,
          roomId: room.id,
          x: 500,
          y: 500,
        },
      });
    },
    [createAsset, room.id],
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
        {contentType && (
          <Work
            as={workElement}
            ref={dropRef}
            src={uri}
            style={style}
            autoPlay
            loop
          />
        )}
      </Container>
      <AnimatedPanelContent>
        {state === "resolved" && (
          <GalleryRichText richText={result.fields.body} />
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
