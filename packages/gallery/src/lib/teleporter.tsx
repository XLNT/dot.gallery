import { createPortal } from "react-dom";
import React, { PropsWithChildren, useEffect } from "react";
import useForceUpdate from "use-force-update";

export default () => {
  let _forceUpdate: () => void;
  let el: any;

  function Source({ children }: PropsWithChildren<{}>) {
    _forceUpdate = useForceUpdate();

    if (!el) {
      return null;
    }

    return createPortal(children, el);
  }

  function Target({
    as: As = "div",
    ...props
  }: PropsWithChildren<{ as: any }>) {
    useEffect(() => {
      _forceUpdate && _forceUpdate();
    }, []);

    return <As ref={ref => (el = ref)} {...props} />;
  }

  return {
    Source,
    Target,
  };
};
