import { BLOCKS } from "@contentful/rich-text-types";
import React, { PropsWithChildren } from "react";
import RichText from "@madebyconnor/rich-text-to-jsx";
import styled from "styled-components";

const Heading1 = styled.h1`
  margin-top: 0;
`;

export default function GalleryRichText(props: PropsWithChildren<{}>) {
  return (
    <RichText
      {...props}
      overrides={{
        [BLOCKS.HEADING_1]: {
          component: Heading1,
        },
      }}
    />
  );
}
