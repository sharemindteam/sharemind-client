import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1 } from 'styles/color';
import { Body2, Heading } from 'styles/font';
import { Button } from 'components/Common/Button';
import { ReactComponent as CompleteIcon } from 'assets/icons/icon-signup-complete.svg';
export const BuyerSignupComplete = () => {
  //첫렌더 시 예외처리
  const navigate = useNavigate();

  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/login');
          }}
        />
        <Heading color={Grey1}>회원가입</Heading>
      </HeaderWrapper>
      <div className="body-wrapper">
        <div className="center-content">
          <CompleteIcon />
          <Heading margin="2.7rem 0 0 0">회원이 되신 것을 환영합니다!</Heading>
          <Body2 margin="2.2rem 0 0 0">뫄뫄뫄</Body2>
        </div>
        <Button
          text="홈으로 가기"
          width="33.5rem"
          height="5.2rem"
          onClick={() => {
            navigate('/share');
          }}
        />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .body-wrapper {
    height: calc(var(--vh, 1vh) * 100 - 11.5rem);
    margin-top: 2.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 2rem;
  }
  .center-content {
    display: flex;
    flex-direction: column;
    height: 60vh;
    align-items: center;
    justify-content: center;
  }
`;
