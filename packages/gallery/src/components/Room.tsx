import { DropTargetMonitor, useDrop } from "react-dnd";
import { Room as RoomModel, useCreatePlacementMutation } from "../operations";
import { Room as SWRTCRoom } from "@andyet/simplewebrtc";
import { animated, useSpring } from "react-spring";
import { contentTypeIsVideo } from "lib/contentType";
import { get } from "lodash-es";
import AnimatedPanelContent from "./AnimatedPanelContent";
import DragTypes from "lib/dragTypes";
import GalleryRichText from "./GalleryRichText";
import React, { useCallback } from "react";
import styled from "styled-components";
import useContentfulEntry from "hook/useContentfulEntry";

interface RoomProps {
  room: Pick<RoomModel, "id" | "entryId" | "x" | "y">;
}

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

const Video = styled.video`
  height: 100%;
  width: 100%;
`;

const collect = (monitor: DropTargetMonitor) => ({
  isOver: monitor.isOver(),
});

export default function Room({ room }: RoomProps) {
  const [result, error, state] = useContentfulEntry(room.entryId);

  const uri = get(result, "fields.work.fields.file.url");
  const contentType: string = get(
    result,
    "fields.work.fields.file.contentType",
  );
  const ElementType = contentType
    ? contentTypeIsVideo(contentType)
      ? Video
      : Image
    : undefined;
  const [createAsset] = useCreatePlacementMutation({
    refetchQueries: ["CurrentEntity"],
  });

  const drop = useCallback(
    async item => {
      // TODO: collect x, y like stickers
      await createAsset({
        variables: {
          assetId: item.asset.id,
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
      <SWRTCRoom name={room.id}>
        {props => {
          console.log(props);
          return (
            <>
              <Container>
                <Work ref={dropRef} style={style}>
                  {contentType && <ElementType src={uri} autoPlay loop />}
                </Work>
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
        }}
      </SWRTCRoom>
    </>
  );
}
