import { ThemeProvider } from "styled-components";
import { get } from "lodash-es";
import { useCurrentExhibitionQuery } from "graphql";
import React, { PropsWithChildren } from "react";
import theme from "./theme";

export default function ExhibitionThemeProvider(props: PropsWithChildren<{}>) {
  const { loading, error, data } = useCurrentExhibitionQuery();
  const exhibitionTheme = get(data, ["exhibitions", 0, "theme"], {});

  const currentTheme = loading || error ? theme : { ...theme, ...exhibitionTheme };

  return <ThemeProvider theme={currentTheme} {...props} />;
}
