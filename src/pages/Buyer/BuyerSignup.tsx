import styled from 'styled-components';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { Body1, Button2, Heading } from 'styles/font';
import { Green, Grey1, Grey3, Grey5, Grey6, White } from 'styles/color';
import { useNavigate } from 'react-router-dom';
import Input from 'components/Common/Input';
import { useState } from 'react';
export const BuyerSignup = () => {
  const navigate = useNavigate();
  //입력 아이디 valid 여부
  const [idValid, setIdValid] = useState<boolean>(false);
  //인증 전송됨 여부
  const [isSended, setIsSended] = useState<boolean>(false);
  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        <Heading color={Grey1}>회원가입</Heading>
      </HeaderWrapper>
      <div className="body-wrapper">
        <div className="id-wrapper">
          <Body1 color={Grey3} margin="0.2rem 0 0.6rem 0">
            아이디(이메일)
          </Body1>
          <div className="input-wrapper">
            <Input width="33.5rem" height="4.8rem" />
            <VerifyButton isActive={idValid}>
              {/* TODO: 버튼 폰트 색상 idValid에 따라 달라져야함 */}
              <Button2 color={White}>인증 요청</Button2>
            </VerifyButton>
          </div>
        </div>

        {/* <div className="submit-option">
          <Button text="로그인" width="33.5rem" height="5.2rem" />
          <div className="underline-option">
            <UnderlineText>회원가입</UnderlineText>
            <UnderlineText>아이디/비밀번호 찾기</UnderlineText>
          </div>
        </div> */}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .body-wrapper {
    margin-top: 2.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.8rem 2rem;
  }
  .id-wrapper {
    display: flex;
    flex-direction: column;
  }
  .input-wrapper {
    position: relative;
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
const VerifyButton = styled.button<{ isActive: boolean }>`
  position: absolute;
  top: 14.58%;
  left: 73.43%;
  cursor: pointer;
  width: 8.2rem;
  height: 71%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  background-color: ${(props) => (props.isActive ? Green : Grey5)};
`;
