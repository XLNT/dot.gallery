import React from "react";
import { hot } from "react-hot-loader";

import { FullscreenProvider } from "context/useFullscreen";
import nest from "lib/nest";

import { createGlobalStyle } from "styled-components";

import Gallery from "./Gallery";

import "normalize.css";
const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
  }

  #root {
    height: 100%;
    background-color: white;
  }
`;

const Providers = nest([FullscreenProvider]);

function Root() {
  return (
    <>
      <GlobalStyle />
      <Providers>
        <Gallery />
      </Providers>
    </>
  );
}

export default process.env.NODE_ENV === "development" ? hot(module)(Root) : Root;
