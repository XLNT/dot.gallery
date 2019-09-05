import { DragLayerMonitor, useDragLayer } from "react-dnd";
import { ZIndex } from "lib/zIndex";
import DragTypes from "lib/dragTypes";
import JourneyIcon from "components/JourneyIcon";
import Layer from "components/Layer";
import React from "react";
import StaticAsset from "components/StaticAsset";
import styled from "styled-components";

const DragLayerBackboard = styled(Layer)`
  pointer-events: none;

  z-index: ${ZIndex.DragLayer};
`;

const DragEffect = styled.div.attrs(({ pointerOffset }) => {
  if (!pointerOffset) {
    return { display: "none", transform: `translate3d(0, 0, 0)` };
  }

  const offsetX = pointerOffset.x - 72 / 2;
  const offsetY = pointerOffset.y - 72 / 2;

  return {
    style: {
      transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
    },
  };
})`
  position: absolute;
  will-change: transform;
  transform-origin: center center;
  display: inline-block;
`;

const collect = (monitor: DragLayerMonitor) => ({
  item: monitor.getItem(),
  pointerOffset: monitor.getClientOffset(),
  isDragging: monitor.isDragging(),
  itemType: monitor.getItemType(),
});

export default function MyDragLayer() {
  const { isDragging, pointerOffset, item, itemType } = useDragLayer(collect);

  return (
    <DragLayerBackboard>
      {isDragging && pointerOffset && (
        <DragEffect pointerOffset={pointerOffset} item={item}>
          {itemType === DragTypes.Asset ? (
            <StaticAsset asset={item} />
          ) : itemType === DragTypes.Journey ? (
            <JourneyIcon journey={item.journey} size={5} />
          ) : null}
        </DragEffect>
      )}
    </DragLayerBackboard>
  );
}
