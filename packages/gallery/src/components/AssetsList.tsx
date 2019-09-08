import React, { PropsWithChildren } from "react";
import styled from "styled-components";

import { Asset } from "../operations";
import DraggableAsset from "./DraggableAssets";
import StaticAsset from "./StaticAsset";

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

export default function AssetsList({
  assets = [],
  wrappable,
  draggable,
  children,
}: PropsWithChildren<{
  wrappable: boolean;
  draggable: boolean;
  assets: Pick<Asset, "id" | "uri">[];
}>) {
  return (
    <Assets wrappable={wrappable}>
      {assets.map(asset =>
        draggable ? (
          <StyledDraggableAsset key={asset.id} asset={asset} />
        ) : (
          <StyledStaticAsset key={asset.id} asset={asset} />
        ),
      )}
      {children}
    </Assets>
  );
}
