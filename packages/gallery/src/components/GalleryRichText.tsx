import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import React, { ComponentProps, PropsWithChildren } from "react";
import RichText from "@madebyconnor/rich-text-to-jsx";
import styled from "styled-components";

export const Heading1 = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
`;

export const Blockquote = styled.blockquote`
  margin: 0;
  font-style: italic;

  & > p {
    margin-top: 0;
  }
`;

export const A = styled.a`
  color: inherit;
`;

export const P = styled.p`
  line-height: 1.3rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  color: inherit;
`;

export default function GalleryRichText(
  props: PropsWithChildren<ComponentProps<RichText>>,
) {
  return (
    <RichText
      {...props}
      overrides={{
        [BLOCKS.PARAGRAPH]: { component: P },
        [BLOCKS.QUOTE]: { component: Blockquote },
        [BLOCKS.HEADING_1]: { component: Heading1 },
        [INLINES.HYPERLINK]: { component: A },
      }}
    />
  );
}
