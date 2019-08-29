import {
  Asset as AssetModel,
  Room as RoomModel,
  useCreateAssetMutation,
  useDeleteAssetMutation,
} from "operations";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { animated, useSpring } from "react-spring";
import { get } from "lodash-es";
import DragTypes from "lib/dragTypes";
import EntityId from "context/EntityId";
import GalleryRichText from "./GalleryRichText";
import PanelAction from "context/PanelAction";
import PanelContent from "context/PanelContent";
import React, { useCallback } from "react";
import WithContentTransition from "./WithContentTransition";
import contentful from "client/contentful";
import styled from "styled-components";
import usePromise from "react-use-promise";

interface RoomProps {
  room: Pick<RoomModel, "id" | "entryId" | "x" | "y"> & {
    asset: Pick<AssetModel, "id" | "uri">;
  };
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
  const [entityId] = EntityId.useContainer();
  const [result, error, state] = usePromise(
    () => contentful.getEntry<any>(room.entryId),
    [room.entryId, contentful],
  );

  const asset = {
    id: room.id,
    uri: get(result, "fields.work.fields.file.url"),
  };
  const [createAsset] = useCreateAssetMutation({
    variables: { ownerId: entityId, uri: asset.uri },
    refetchQueries: ["Entity"],
  });
  const [deleteAsset] = useDeleteAssetMutation();

  const drop = useCallback(
    item => {
      Promise.all([deleteAsset({ variables: { id: item.id } }), createAsset()]);
    },
    [createAsset, deleteAsset],
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
        <Work ref={dropRef} src={asset.uri} style={style} />
      </Container>
      <PanelAction.Source>Details&nbsp;&nbsp;</PanelAction.Source>
      <PanelContent.Source>
        <WithContentTransition>
          {state === "resolved" && (
            <GalleryRichText richText={result.fields.body} />
          )}
          {state === "rejected" && (
            <>
              <h1>Error</h1>
              <code>{error.message}</code>
            </>
          )}
        </WithContentTransition>
      </PanelContent.Source>
    </>
  );
}
