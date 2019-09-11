/* eslint-disable react/display-name */
import { BLOCKS, Document, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { get } from "lodash-es";
import React from "react";
import styled from "styled-components";

export const Heading1 = styled.h1`
  margin-top: 1rem;
  margin-bottom: 0;
  word-wrap: break-word;
`;

export const Blockquote = styled.blockquote`
  margin: 0;
  font-style: italic;

  & > p {
    margin-top: 0;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const A = styled.a`
  color: inherit;
`;

export const P = styled.p`
  line-height: 1.3rem;
  margin-top: 0;
  margin-bottom: 0;
  color: inherit;
`;

const Video = styled.video`
  width: 100%;
  height: auto;
`;

const Audio = styled.video`
  width: 100%;
  height: auto;
`;

const assetRenderers = {
  image: ({ fields: { file, title } }: any) => (
    <Image src={file.url} alt={title} />
  ),
  video: ({ fields: { file } }: any) => (
    <Video controls>
      <source src={file.url} type={file.contentType} />
      <p>
        Your browser does not support HTML5 video. Here is a{" "}
        <a href={file.url} download>
          link to the video
        </a>{" "}
        instead.
      </p>
    </Video>
  ),
  audio: ({ fields: { file } }: any) => (
    <Audio controls>
      <source src={file.url} type={file.contentType} />
      <p>
        Your browser does not support HTML5 audio. Here is a{" "}
        <a href={file.url} download>
          link to the audio file
        </a>{" "}
        instead.
      </p>
    </Audio>
  ),
};

export default function GalleryRichText({ richText }: { richText: Document }) {
  return (
    <>
      {documentToReactComponents(richText, {
        // renderMark: {},
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => <P>{children}</P>,
          [BLOCKS.QUOTE]: (node, children) => (
            <Blockquote>{children}</Blockquote>
          ),
          [BLOCKS.HEADING_1]: (node, children) => (
            <Heading1>{children}</Heading1>
          ),
          [BLOCKS.EMBEDDED_ASSET]: ({ data }, children) => {
            const mimeType = get(data, "target.fields.file.contentType", "");
            const mimeTypeGroup = mimeType.split("/")[0];

            if (!mimeTypeGroup) {
              return children;
            }

            const renderer = assetRenderers[mimeTypeGroup];

            return renderer(data.target);
          },
          [INLINES.HYPERLINK]: (node, children) => <A>{children}</A>,
        },
        renderText: text => {
          return text.split("\n").reduce((children, textSegment, index) => {
            return [...children, index > 0 && <br key={index} />, textSegment];
          }, []);
        },
      })}
    </>
  );
}
