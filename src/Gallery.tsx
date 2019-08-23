import React from "react";

import useFullscreen from "context/useFullscreen";

function Gallery() {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <>
      Hello World {isFullscreen ? "fullscreen!" : "not fullscreen :("}{" "}
      <button onClick={() => toggleFullscreen()}>click me</button>
    </>
  );
}

export default Gallery;
