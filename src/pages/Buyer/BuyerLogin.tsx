import styled from 'styled-components';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { Body1, Heading } from 'styles/font';
import { Grey1, Grey3, Grey4, Grey6, White } from 'styles/color';
import { useNavigate } from 'react-router-dom';
import Input from 'components/Common/Input';
import { Button } from 'components/Common/Button';
export const BuyerLogin = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        <Heading color={Grey1}>로그인</Heading>
      </HeaderWrapper>
      <div className="body-wrapper">
        <div className="id-wrapper">
          <Body1 color={Grey3}>아이디(이메일)</Body1>
          <Input margin="0.4rem 0" width="33.5rem" height="4.8rem" />
        </div>
        <div className="pw-wrapper">
          <Body1 color={Grey3}>비밀번호</Body1>
          <Input
            type="password"
            margin="0.4rem 0"
            width="33.5rem"
            height="4.8rem"
          />
        </div>
        <div className="submit-option">
          <Button text="로그인" width="33.5rem" height="5.2rem" />
          <div className="underline-option">
            <UnderlineText>회원가입</UnderlineText>
            <UnderlineText>아이디/비밀번호 찾기</UnderlineText>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .body-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .id-wrapper {
    display: flex;
    padding: 0.8rem 2rem;
    flex-direction: column;
  }
  .pw-wrapper {
    display: flex;
    padding: 0.8rem 2rem;
    flex-direction: column;
  }
  .submit-option {
    margin-top: 2.8rem;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  }
  .underline-option {
    display: flex;
    justify-content: space-between;
  }
`;
const HeaderWrapper = styled.div`
  height: 5.2rem;
  background-color: ${White};
  position: relative;
  border-bottom: 1px solid ${Grey6};
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;
const BackIcon = styled(Back)`
  position: absolute;
  top: 1.2rem;
  left: 2rem;
  cursor: pointer;
`;
const UnderlineText = styled.div`
  color: ${Grey4};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  text-decoration-line: underline;
  cursor: pointer;
`;
