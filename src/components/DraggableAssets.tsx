import { Asset } from "graphql";
import React from "react";
import styled from "styled-components";

const AssetImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;
`;

export default function DraggableAsset({ asset, ...rest }: { asset: Pick<Asset, "id" | "uri"> }) {
  return <AssetImg src={asset.uri} {...rest} />;
}
