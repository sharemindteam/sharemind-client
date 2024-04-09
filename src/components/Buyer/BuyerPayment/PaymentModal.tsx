import { patchPaymentsCustomers } from 'api/patch';
import { Button } from 'components/Common/Button';
import { Space } from 'components/Common/Space';
import { Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { Green, Grey1, Grey4, Grey6, LightGreen } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
import { isPaymentModalOpenState } from 'utils/atom';
import { PaymentInfo } from 'utils/type';
//최근순 읽지않은순 modal
interface PaymentModalProps {
  clickedPaymentId: number;
  paymentData: PaymentInfo[];
  setPaymentData: Dispatch<SetStateAction<PaymentInfo[]>>;
}
export const PaymentModal = ({
  clickedPaymentId,
  paymentData,
  setPaymentData,
}: PaymentModalProps) => {
  //modal 여부
  const [isModalOpen, setIsModalOpen] = useRecoilState(isPaymentModalOpenState);

  const handleCancelPayment = async () => {
    try {
      const res: any = await patchPaymentsCustomers(clickedPaymentId);
      if (res.status === 200) {
        const updatedPaymentData = paymentData.filter(
          (item) => item.paymentId !== clickedPaymentId,
        );
        setPaymentData(updatedPaymentData);
        setIsModalOpen(false);
      } else if (res.response.status === 400) {
        alert('결제 완료 상태가 아닌 결제에 대한 요청입니다.');
      } else if (res.response.status === 403) {
        alert('결제 취소 권한이 없습니다.');
      } else if (res.response.status === 404) {
        alert('결제 정보가 존재하지 않습니다.');
      }
    } catch (e) {
      alert(e);
    }
  };
  //여기서 unmount 시 sortType 바꾸고 새로 request
  return (
    <Wrapper visible={isModalOpen}>
      <Body1 color={Grey1}>해당 상담의 결제를 취소할까요?</Body1>
      <Body3 color={Grey4}>결제 취소 O일 안으로 환불이 진행됩니다.</Body3>
      <Space height="2rem" />
      <div className="button-wrapper">
        <Button
          text="닫기"
          width="14.8rem"
          height="5.2rem"
          backgroundColor={LightGreen}
          color={Green}
          onClick={() => {
            setIsModalOpen(false);
          }}
        />
        <Button
          text="결제 취소하기"
          width="14.8rem"
          height="5.2rem"
          onClick={handleCancelPayment}
        />
      </div>
    </Wrapper>
  );
};
const fadeIn = keyframes`
  from{
    opacity:0;
  }
  to{
    opacity:1;
  }
`;
const fadeOut = keyframes`
  from{
    opacity:1;
  }
  to{
    opacity:0;
  }
`;
const Wrapper = styled.div<{ visible: boolean }>`
  @media (max-width: 767px) {
    width: 90vw;
    margin-left: 5vw;
  }
  @media (min-width: 768px) {
    width: 33.5rem;
    margin-left: 2rem;
  }
  position: fixed;
  z-index: 2002;
  top: 39%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15rem;
  background-color: ${Grey6};

  border-radius: 1.2rem;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);

  /*animation: ${({ visible }) =>
    visible ? fadeIn : fadeOut} 0.2s ease-in-out;*/
  padding: 1.6rem;
  .button-wrapper {
    display: flex;
    gap: 0.7rem;
  }
  box-sizing: border-box;
`;
