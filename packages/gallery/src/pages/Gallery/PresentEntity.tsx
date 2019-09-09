import React, { PropsWithChildren } from "react";
import styled from "styled-components";

import { CurrentEntityQuery } from "../../operations";

import AssetsList from "components/AssetsList";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Name = styled.div``;

const StyledAssetsList = styled(AssetsList)`
  padding-left: 1rem;
  padding-right: 5rem;
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
      <StyledAssetsList
        assets={entity.tradableAssets}
        wrappable={wrappable}
        draggable={draggable}
      >
        {children}
      </StyledAssetsList>
    </Container>
  );
}
