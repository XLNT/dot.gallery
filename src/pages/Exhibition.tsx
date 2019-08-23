import { RouteComponentProps } from "react-router-dom";
import React, { useMemo } from "react";
import parseExhibitionSlug from "lib/parseExhibitionSlug";

export default function Exhibition({ match }: RouteComponentProps<{ slug: string }>) {
  const [exhibition, show] = useMemo(() => parseExhibitionSlug(match.params.slug), [
    match.params.slug,
  ]);

  return (
    <div>
      exhibition {exhibition} show {show}
    </div>
  );
}
