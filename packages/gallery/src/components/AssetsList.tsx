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

const StyledUndraggableAsset = styled(StaticAsset)`
  pointer-events: none;
  user-select: none;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

export default function AssetsList({
  assets = [],
  wrappable,
  draggable,
  children,
  ...rest
}: PropsWithChildren<{
  wrappable: boolean;
  draggable: boolean;
  assets: Pick<Asset, "id" | "uri">[];
  [_: string]: any;
}>) {
  return (
    <Assets wrappable={wrappable} {...rest}>
      {assets.map(asset =>
        draggable ? (
          <StyledDraggableAsset key={asset.id} asset={asset} />
        ) : (
          <StyledUndraggableAsset key={asset.id} asset={asset} />
        ),
      )}
      {children}
    </Assets>
  );
}
