import { Contract, Wallet, providers } from "ethers";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { ExhibitionProps } from "./ExhibitionProps";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useCreateAssetMutation, useEntityQuery } from "graphql";
import DragTypes from "lib/dragTypes";
import EntityId from "context/EntityId";
import Fullscreen from "context/Fullscreen";
import Journey from "context/Journey";
import JourneyIcon from "components/JourneyIcon";
import LoadingAsset from "components/LoadingAsset";
import PresentEntity from "./Gallery/PresentEntity";
import PrivateKey from "context/PrivateKey";
import React, { useCallback, useEffect, useRef, useState } from "react";
import fromTheme from "theme/fromTheme";
import styled from "styled-components";
import timeout from "lib/timeout";
import useEnforcePanelVisibility from "hook/useEnforcePanelVisibility";
import useRouter from "context/useRouter";
import useSuggestedPanelState from "hook/useSuggestedPanelState";

const contractAddress = "0x2237ED17E7B5973Fd5e855BE7A1fA4a57D2da0cF";

const abi = ["function awardItem(address visitor, string tokenURI) public returns (uint256)"];

const provider = new providers.JsonRpcProvider({
  url: "https://ethberlin01.skalenodes.com:10183",
  allowInsecure: true,
});

const wallet = Wallet.fromMnemonic(
  "ritual pioneer maze shine retreat mother salute height walk alien mail chat",
).connect(provider);

const contract = new Contract(contractAddress, abi, wallet);

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 2rem 5rem;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GiftContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AssetsContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
`;

const Header = styled.h2`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.span``;

const LeaveButton = styled.span`
  font-size: 3rem;
  font-weight: bold;
  color: ${fromTheme("secondary")};
  text-transform: uppercase;
  cursor: pointer;
`;

const connectDrag = (monitor: DragSourceMonitor) => ({ isDragging: monitor.isDragging() });
const collectDrop = (monitor: DropTargetMonitor) => ({ isOver: monitor.isOver({ shallow: true }) });

export default function GiftShop({ exhibition, show }: ExhibitionProps<void>) {
  useEnforcePanelVisibility(false);
  useSuggestedPanelState(false);

  const svgRef = useRef<SVGElement>();
  const [privateKey] = PrivateKey.useContainer();

  const [journey] = Journey.useContainer();
  const { setFullscreen } = Fullscreen.useContainer();
  const { history } = useRouter();

  const [createAsset, { data: createAssetData }] = useCreateAssetMutation({
    refetchQueries: ["Entity"],
  });
  const [entityId] = EntityId.useContainer();
  const { data } = useEntityQuery({
    variables: { id: entityId },
    pollInterval: 5000,
  });

  const goHome = useCallback(async () => {
    if (process.env.NODE_ENV !== "development") {
      setFullscreen(false);
      await timeout(1000);
    }

    history.replace("/");
  }, [history, setFullscreen]);

  const [didDrag, setDidDrag] = useState(false);

  const [{ isDragging }, drag, connectDragPreview] = useDrag({
    item: { type: DragTypes.Journey, journey },
    collect: connectDrag,
  });

  const onDrop = useCallback(
    async item => {
      setDidDrag(true);
      const data = new XMLSerializer().serializeToString(svgRef.current);
      const b64 = btoa(data);
      const uri = `data:image/svg+xml;base64,${b64}`;

      const address = new Wallet(privateKey).address;

      try {
        const tx = await contract.awardItem(address, uri);
        await tx.wait();
        await createAsset({ variables: { ownerId: entityId, uri } });
      } catch (error) {
        console.error(error);
      }
    },
    [createAsset, entityId, privateKey],
  );

  useEffect(() => {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }, [connectDragPreview]);

  const [{ isOver }, drop] = useDrop({
    accept: DragTypes.Journey,
    collect: collectDrop,
    drop: onDrop,
  });

  return (
    <Column>
      <Container>
        <StepsContainer>
          <Header>We hope you enjoyed your walk.</Header>
          <Subtitle>
            Take home your personalized journey by dragging it into your collection.
          </Subtitle>
        </StepsContainer>
        <GiftContainer>
          {didDrag ? (
            <LeaveButton onClick={goHome}>Exit</LeaveButton>
          ) : (
            <JourneyIcon
              ref={drag}
              size={5}
              journey={journey}
              style={{ opacity: isDragging ? 0.2 : 1 }}
            />
          )}
        </GiftContainer>
      </Container>
      <hr style={{ width: "100%" }} />
      <AssetsContainer ref={drop}>
        {data.entity && (
          <PresentEntity entity={data.entity} draggable={false} wrappable>
            {(() => {
              if (isOver) {
                return <JourneyIcon svgRef={svgRef} size={5} journey={journey} />;
              }

              if (didDrag && !createAssetData) {
                return <LoadingAsset />;
              }

              return null;
            })()}
          </PresentEntity>
        )}
      </AssetsContainer>
    </Column>
  );
}
