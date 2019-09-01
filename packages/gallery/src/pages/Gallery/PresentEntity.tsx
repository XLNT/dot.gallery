import { CurrentEntityQuery } from "../../operations";
import DraggableAsset from "components/DraggableAssets";
import React, { PropsWithChildren } from "react";
import StaticAsset from "components/StaticAsset";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Name = styled.div``;

const Assets = styled.div`
  display: flex;
  flex-direction: row;

  flex-wrap: ${({ wrappable }) => (wrappable ? "wrap" : "no-wrap")};
`;

const StyledDraggableAsset = styled(DraggableAsset)`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StyledStaticAsset = styled(StaticAsset)`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

export default function PresentEntity({
  entity,
  draggable = true,
  wrappable = false,
  children,
  ...rest
}: PropsWithChildren<{
  draggable?: boolean;
  wrappable?: boolean;
  entity: CurrentEntityQuery["currentEntity"];
}>) {
  return (
    <Container {...rest}>
      <Name>{entity.handle}</Name>
      <Assets wrappable={wrappable}>
        {entity.tradableAssets.map(asset =>
          draggable ? (
            <StyledDraggableAsset key={asset.id} asset={asset} />
          ) : (
            <StyledStaticAsset key={asset.id} asset={asset} />
          ),
        )}
        {children}
      </Assets>
    </Container>
  );
}
