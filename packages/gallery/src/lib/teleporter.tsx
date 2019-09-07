import { createPortal } from "react-dom";
import React, { PropsWithChildren, useEffect } from "react";
import useForceUpdate from "use-force-update";

export default (id: string) => {
  let _forceUpdate: () => void;
  let el: any;

  function Source({ children }: PropsWithChildren<{}>) {
    _forceUpdate = useForceUpdate();

    if (!el) {
      return null;
    }

    return createPortal(children, document.getElementById(id));
  }

  function Target({
    as: As = "div",
    ...props
  }: PropsWithChildren<{ as?: any; [_: string]: any }>) {
    useEffect(() => {
      _forceUpdate && _forceUpdate();
    }, []);

    return <As id={id} ref={ref => (el = ref)} {...props} />;
  }

  return {
    Source,
    Target,
  };
};
