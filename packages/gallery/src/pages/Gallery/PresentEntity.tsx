import { get } from "lodash-es";
import React, { PropsWithChildren } from "react";
import styled from "styled-components";

import { CurrentEntityQuery, useKnownEntityQuery } from "../../operations";
import AssetsList from "components/AssetsList";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Handle = styled.div`
  margin-left: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const StyledAssetsList = styled(AssetsList)`
  padding-left: 1rem;
  padding-right: 5rem;
`;

export default function PresentEntity({
  id,
  handle,
  assets,
  draggable = false,
  wrappable = false,
  children,
  ...rest
}: PropsWithChildren<{
  draggable?: boolean;
  wrappable?: boolean;
  id: string;
  handle: string;
  assets?: CurrentEntityQuery["currentEntity"]["assets"];
}>) {
  const providedAssets = !!assets && !!assets.length;
  const { data } = useKnownEntityQuery({
    variables: { id },
    skip: providedAssets,
  });

  const displayAssets = providedAssets
    ? assets
    : get(data, ["knownEntity", "assets"], []);

  return (
    <Container {...rest}>
      {/* <Handle>{handle || "Anonymous"}</Handle> */}
      <StyledAssetsList
        assets={displayAssets}
        wrappable={wrappable}
        draggable={draggable}
      >
        {children}
      </StyledAssetsList>
    </Container>
  );
}
