import { PaymentCard } from 'components/Buyer/BuyerPayment/PaymentCard';
import { PaymentModal } from 'components/Buyer/BuyerPayment/PaymentModal';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Green, Grey1, Grey5, White } from 'styles/color';
import { Button2, Heading } from 'styles/font';
import { isPaymentModalOpenState, scrollLockState } from 'utils/atom';
import { paymentDummy as dummy } from 'utils/buyerDummy';
// TODO: 찜한 마인더 없을 시 페이지 추후 백 연동 시 구현
export const BuyerPayment = () => {
  const navigate = useNavigate();
  const [pageType, setPageType] = useState<number>(0);
  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isPaymentModalOpenState,
  );
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  return (
    <>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/mypage');
          }}
        />
        <Heading color={Grey1}>결제 내역</Heading>
      </HeaderWrapper>
      <ToggleWrapper>
        <ToggleButton
          focus={pageType === 0}
          onClick={() => {
            setPageType(0);
          }}
        >
          <Button2 color={White}>결제완료</Button2>
        </ToggleButton>
        <ToggleButton
          focus={pageType === 1}
          onClick={() => {
            setPageType(1);
          }}
        >
          <Button2 color={White}>환불예정</Button2>
        </ToggleButton>
        <ToggleButton
          focus={pageType === 2}
          onClick={() => {
            setPageType(2);
          }}
        >
          <Button2 color={White}>환불완료</Button2>
        </ToggleButton>
      </ToggleWrapper>
      <CardWrapper>
        {dummy.map((value) => {
          return (
            <PaymentCard
              counselorId={value.counselorId}
              nickname={value.nickname}
              consultType={value.consultType}
              consultState={value.consultState}
              price={value.price}
              consultDate={value.consultDate}
              payDate={value.payDate}
              payment={value.payment}
              isPayComplete={pageType === 0}
            />
          );
        })}
      </CardWrapper>
      {isModalOpen ? (
        <>
          <BackDrop
            onClick={() => {
              //여기서 api 호출
              setIsModalOpen(false);
              setScrollLock(false);
            }}
          />
          <PaymentModal />
        </>
      ) : null}
    </>
  );
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1.2rem;
  margin-bottom: 7rem;
`;
const ToggleWrapper = styled.div`
  display: flex;
  margin: 0.8rem 2rem;
  gap: 0.8rem;
`;
const ToggleButton = styled.div<{ focus: boolean }>`
  width: 8.1rem;
  height: 3.4rem;
  border-radius: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.focus ? Green : Grey5)};
  cursor: pointer;
`;
const BackDrop = styled.div`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  position: fixed;
  top: 0;
  z-index: 2001;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;
