import { HeaderWrapper } from 'components/Buyer/Common/Header';
import { useNavigate } from 'react-router-dom';
import { Green, Grey1 } from 'styles/color';
import { Body2, Heading } from 'styles/font';
import { ReactComponent as ProcessGraphic } from 'assets/icons/graphic-payment-inprocess.svg';
import { Button } from 'components/Common/Button';
import styled from 'styled-components';
//일단 결제 진행 중으로 띄우기
export const BuyerPaymentComplete = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <HeaderWrapper>
        <Heading color={Grey1}>상담 신청하기</Heading>
      </HeaderWrapper>
      <div className="body">
        <div className="content">
          <ProcessGraphic />
          <Heading color={Green} margin="0 0 2.2rem 0">
            결제 진행 중
          </Heading>
          <Body2 color={Grey1}>주문 중이던 웹 브라우저로 이동하면</Body2>{' '}
          <Body2 color={Grey1}>결제가 완료됩니다.</Body2>
        </div>
        <Button
          text="확인"
          width="89.33%"
          height="5.2rem"
          margin="0 0 1.9rem 0"
          onClick={() => {
            navigate('/buyer');
          }}
        />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .body {
    height: calc(var(--vh, 1vh) * 100 - 5.3rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .content {
    margin-top: 15vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
