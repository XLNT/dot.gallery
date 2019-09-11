import React, { useMemo } from "react";

import ModalFrame from "components/ModalFrame";
import ModalHeader from "components/ModalHeader";
import ModalSubtitle from "components/ModalSubtitle";
import ModalTitle from "components/ModalTitle";
import useRouter from "context/useRouter";

export default function LoginModal() {
  const { location } = useRouter();

  const params = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ]);
  const title = params.get("title") || "Login";
  const subtitle = params.get("subtitle") || "Enter your email to log in.";

  return (
    <ModalFrame>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <ModalSubtitle>{subtitle}</ModalSubtitle>
      </ModalHeader>
    </ModalFrame>
  );
}
