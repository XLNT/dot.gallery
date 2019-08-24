import { ThemeProvider } from "styled-components";
import { get } from "lodash-es";
import React, { PropsWithChildren } from "react";
import theme from "./theme";
import useCurrentExhibition from "hook/useCurrentExhibition";

export default function ExhibitionThemeProvider(props: PropsWithChildren<{}>) {
  const { exhibition, loading, error } = useCurrentExhibition();
  const exhibitionTheme = get(exhibition, "theme", {});

  const currentTheme = loading || error ? theme : { ...theme, ...exhibitionTheme };

  return <ThemeProvider theme={currentTheme} {...props} />;
}
