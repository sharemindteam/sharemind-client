import { HeaderWrapper } from 'components/Buyer/Common/Header';
import { useNavigate } from 'react-router-dom';
import { Green, Grey1, LightGreen } from 'styles/color';
import { Body2, Heading } from 'styles/font';
import { ReactComponent as SendGraphic } from 'assets/icons/graphic-send.svg';
import { Button } from 'components/Common/Button';
import styled from 'styled-components';

import { Space } from 'components/Common/Space';
import { APP_WIDTH } from 'styles/AppStyle';

//
//
//

function BuyerFinishPayment() {
  const navigate = useNavigate();

  //
  //
  //

  return (
    <Wrapper>
      <HeaderWrapper>
        <Heading color={Grey1}>상담 신청완료</Heading>
      </HeaderWrapper>
      <div className="body">
        <SendGraphic />
        <Space height="6.5rem" />
        <Heading color={Green} margin="0 0 2.2rem 0">
          상담 신청 완료
        </Heading>
      </div>
      <div className="buttons">
        <Button
          text="홈으로 가기"
          height="5.2rem"
          width="45%"
          color={Green}
          backgroundColor={LightGreen}
          onClick={() => {
            navigate('/');
          }}
        />
        <Button
          text="상담글 작성하기"
          height="5.2rem"
          width="45%"
          onClick={() => {
            navigate('/consult?type=open-consult');
          }}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .body {
    height: calc(var(--vh, 1vh) * 100 - 5.3rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .content {
    margin-top: 15vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .buttons {
    position: fixed;
    justify-content: center;
    bottom: 1rem;
    width: 100%;
    @media (min-width: 768px) {
      width: ${APP_WIDTH};
    }
    display: flex;
    gap: 1.5rem;
  }
`;

export default BuyerFinishPayment;
