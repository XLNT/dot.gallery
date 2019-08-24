import { RouteComponentProps } from "react-router-dom";
import { parse } from "lib/exhibitionSlug";
import React, { useMemo } from "react";

export default function Exhibition({ match }: RouteComponentProps<{ slug: string }>) {
  const [exhibition, show] = useMemo(() => parse(match.params.slug), [match.params.slug]);

  return (
    <div>
      exhibition {exhibition} show {show}
    </div>
  );
}
