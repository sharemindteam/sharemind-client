import { HeaderWrapper } from 'components/Buyer/Common/Header';
import { useNavigate } from 'react-router-dom';
import { Green, Grey1 } from 'styles/color';
import { Body2, Heading } from 'styles/font';
import { ReactComponent as SendGraphic } from 'assets/icons/graphic-send.svg';
import { Button } from 'components/Common/Button';
import styled from 'styled-components';

import { Space } from 'components/Common/Space';
import { APP_WIDTH } from 'styles/AppStyle';
import { Flex } from 'components/Common/Flex';

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
        <Heading color={Grey1}>결제 신청 완료</Heading>
      </HeaderWrapper>
      <div className="body">
        <SendGraphic />
        <Space height="6.5rem" />
        <Heading color={Green} margin="0 0 2.2rem 0">
          결제 신청 완료!
        </Heading>
        <Flex direction="column" style={{ maxWidth: '28rem' }}>
          <Body2 color={Grey1}>
            셰어마인드는 현재 <GreenTypography>베타테스트 중</GreenTypography>
            이에요.
          </Body2>
          <Body2 color={Grey1} style={{ whiteSpace: 'pre-line' }}>
            {'모든 결제를 수동으로 승인하고 있어\n시간이 걸릴 수 있어요.'}
          </Body2>
          <Body2
            color={Grey1}
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}
          >
            결제가 완료되지 않는다면{' '}
            <GreenTypography>홈 화면 하단의 고객센터 버튼</GreenTypography>을
            눌러 문의해주세요.
          </Body2>
        </Flex>
      </div>
      <div className="button">
        <Button
          text="홈으로 가기"
          height="5.2rem"
          width="100%"
          onClick={() => {
            navigate('/');
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
  .button {
    position: fixed;
    justify-content: center;
    bottom: 1rem;
    width: 100%;

    @media (min-width: 768px) {
      width: ${APP_WIDTH};
    }
    display: flex;
    gap: 1.5rem;
    padding: 0 2rem;
    box-sizing: border-box;
  }
`;

const GreenTypography = styled.span`
  color: ${Green};
`;

export default BuyerFinishPayment;
