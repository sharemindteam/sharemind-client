import { Button } from 'components/Common/Button';
import { Space } from 'components/Common/Space';
import { TagA2Consult } from 'components/Common/TagA2Consult';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Green, Grey1, Grey3, Grey6, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
import { isPaymentModalOpenState } from 'utils/atom';
interface PaymentCardProps {
  counselorId: number;
  nickname: string;
  consultType: string;
  consultState: string;
  price: number;
  consultDate: string;
  payDate: string;
  payment: string;
  isPayComplete: boolean;
}
export const PaymentCard = ({
  counselorId,
  nickname,
  consultType,
  consultState,
  price,
  consultDate,
  payDate,
  payment,
  isPayComplete,
}: PaymentCardProps) => {
  const tagType = consultState as ConsultState;
  const [buttonToggle, setButtonToggle] = useState<boolean>(false);
  // Modal 여부(recoil)
  const setIsModalOpen = useSetRecoilState<boolean>(isPaymentModalOpenState);
  return (
    <CardWrapper
      onClick={() => {
        setButtonToggle(!buttonToggle);
      }}
      isPaymentComplete={isPayComplete}
    >
      <div className="upper-wrapper">
        <Body1 color={Grey1} margin="0 0 0 1.5rem">
          {nickname}
        </Body1>
        <TagA2Consult tagType={tagType} />
      </div>
      <div className="lower-wrapper">
        <div className="row-start">
          <Body3 color={Grey3}>상담유형</Body3>
          <Body3 color={Grey1}>{consultType}</Body3>
        </div>
        <div className="row">
          <Body3 color={Grey3}>상담일자</Body3>
          <Body3 color={Grey1}>{consultDate}</Body3>
        </div>
        <div className="row">
          <Body3 color={Grey3}>상담가격</Body3>
          <Body3 color={Grey1}>{price}원</Body3>
        </div>
        <div className="row">
          <Body3 color={Grey3}>구매일자</Body3>
          <Body3 color={Grey1}>{payDate}</Body3>
        </div>
        <div className="row-end">
          <Body3 color={Grey3}>결제수단</Body3>
          <Body3 color={Grey1}>{payment}</Body3>
        </div>
        {isPayComplete && buttonToggle ? (
          <>
            <Space height="0.4rem" />
            <div className="button-wrapper">
              <Button
                text="결제 취소하기"
                width="90.44%"
                height="4.2rem"
                backgroundColor={White}
                color={Green}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              />
            </div>
            <Space height="1.6rem" />
          </>
        ) : null}
      </div>
    </CardWrapper>
  );
};
const CardWrapper = styled.div<{ isPaymentComplete: boolean }>`
  background-color: ${Grey6};
  width: 89.33%;
  border-radius: 0.8rem;
  .upper-wrapper {
    display: flex;
    align-items: center;
    height: 4.8rem;
    border-bottom: 1px solid ${White};
    gap: 1.2rem;
  }
  .lower-wrapper {
    .row-start {
      display: flex;
      gap: 2rem;
      margin-left: 1.6rem;
      margin-top: 1.2rem;
    }
    .row-end {
      display: flex;
      gap: 2rem;
      margin-left: 1.6rem;
      margin-bottom: 1.6rem;
    }
    .row {
      display: flex;
      gap: 2rem;
      margin-left: 1.6rem;
    }
  }
  .button-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  cursor: ${(props) => (props.isPaymentComplete ? 'pointer' : 'auto')};
`;
