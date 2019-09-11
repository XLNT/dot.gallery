import React, { useCallback, useRef } from "react";
import styled from "styled-components";

import { format } from "lib/exhibitionSlug";
import { humanize } from "lib/errorCodes";
import { useRedeemCouponMutation } from "operations";
import CouponInput from "components/CouponInput";
import EnterButton from "components/EnterButton";
import HelpText from "components/HelpText";
import ModalFrame from "components/ModalFrame";
import ModalHeader from "components/ModalHeader";
import ModalSubtitle from "components/ModalSubtitle";
import ModalTitle from "components/ModalTitle";
import useCurrentExhibition from "hook/useCurrentExhibition";
import useIsOpen from "hook/useIsOpen";
import useRouter from "context/useRouter";

const ModalAction = styled.div`
  margin-top: 3rem;
  justify-self: flex-end;
`;

const StyledEnterButton = styled(EnterButton)`
  font-size: 3rem;
`;

export default function CouponModal() {
  const { history } = useRouter();
  const couponInput = useRef<HTMLInputElement>();
  const { isDefinitelyOpen } = useIsOpen();

  const [redeemCoupon, { data, loading, error }] = useRedeemCouponMutation({
    refetchQueries: ["CurrentEntity"],
    awaitRefetchQueries: true,
  });

  const { exhibition, show } = useCurrentExhibition();

  const goExhibition = useCallback(
    () => history.push(`/${format(exhibition.number, show.number)}`),
    [exhibition, history, show],
  );

  const onSubmit = useCallback(async () => {
    // submit coupon
    await redeemCoupon({ variables: { code: couponInput.current.value } });
  }, [redeemCoupon]);

  return (
    <ModalFrame>
      <ModalHeader>
        <ModalTitle>I have a voucher.</ModalTitle>
        <ModalSubtitle>
          {!!data
            ? "Voucher redeemed!"
            : "Redeem your voucher for a ticket for the current exhibition."}
        </ModalSubtitle>
      </ModalHeader>
      <ModalAction>
        {!!data ? (
          <>
            {isDefinitelyOpen ? (
              <StyledEnterButton onClick={goExhibition}>
                Enter
              </StyledEnterButton>
            ) : (
              "dot.gallery is currently closed. Return here for the next showing."
            )}
          </>
        ) : (
          <>
            <CouponInput ref={couponInput} onSubmit={onSubmit} />
            {loading && <HelpText>Submitting...</HelpText>}
            {error && <HelpText>{humanize(error)}</HelpText>}
          </>
        )}
      </ModalAction>
    </ModalFrame>
  );
}
