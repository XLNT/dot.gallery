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
      <AssetsList
        assets={entity.tradableAssets}
        wrappable={wrappable}
        draggable={draggable}
      >
        {children}
      </AssetsList>
    </Container>
  );
}
