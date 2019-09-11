import React, { useMemo } from "react";

import ModalFrame from "components/ModalFrame";
import ModalHeader from "components/ModalHeader";
import ModalSubtitle from "components/ModalSubtitle";
import ModalTitle from "components/ModalTitle";
import useRouter from "context/useRouter";

export default function NoticeModal() {
  const { location } = useRouter();

  const params = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ]);
  const title = params.get("title");
  const subtitle = params.get("subtitle");

  return (
    <ModalFrame>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        {subtitle && <ModalSubtitle>{subtitle}</ModalSubtitle>}
      </ModalHeader>
    </ModalFrame>
  );
}
