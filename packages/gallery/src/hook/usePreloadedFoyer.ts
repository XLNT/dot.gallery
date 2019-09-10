import { preloadVideo } from "lib/preload";
import { useEffect } from "react";

export default function usePreloadedFoyer() {
  useEffect(() => {
    preloadVideo("https://cdn.bydot.app/foyer.mp4");
  }, []);
}
