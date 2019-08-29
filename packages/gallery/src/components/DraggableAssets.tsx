import { Asset } from "operations";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import DragTypes from "lib/dragTypes";
import React, { useEffect } from "react";
import StaticAsset from "./StaticAsset";
import styled from "styled-components";

const StyledStaticAsset = styled(StaticAsset)`
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
  opacity: ${({ isDragging }) => (isDragging ? 0.3 : 1)};
`;

const collect = (monitor: DragSourceMonitor) => ({
  isDragging: monitor.isDragging(),
});

export default function DraggableAsset({ asset, ...rest }: { asset: Pick<Asset, "id" | "uri"> }) {
  const [{ isDragging }, drag, connectDragPreview] = useDrag({
    item: { type: DragTypes.Asset, id: asset.id, uri: asset.uri },
    collect,
  });

  useEffect(() => {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }, [connectDragPreview]);

  return <StyledStaticAsset ref={drag} asset={asset} isDragging={isDragging} {...rest} />;
}
