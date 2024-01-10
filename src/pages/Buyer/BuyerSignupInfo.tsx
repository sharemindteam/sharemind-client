import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import Input from 'components/Common/Input';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ErrorColor, Grey1, Grey3, Grey4, SafeColor } from 'styles/color';
import { Body1, Caption2, Heading } from 'styles/font';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'components/Common/Button';
import { useInput } from 'hooks/useInput';
export const BuyerSignupInfo = () => {
  //첫렌더 시 예외처리
  const isInitialRender = useRef(true);
  const navigate = useNavigate();
  //pw input temp
  const email = useInput('');
  const phoneNumber = useInput('');
  //email valid color
  // const emailValidColor , setEmailValidColor
  //최종 다음 valid 여부
  const [valid, setValid] = useState<boolean>(false);
  //valid check
  useEffect(() => {
    //세 case 모두 valid할 시 다음으로 넘어감
    if (email.typeValid && email.lengthValid && phoneNumber.isValid) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email.typeValid, email.lengthValid, phoneNumber.isValid]);

  useEffect(() => {
    // 첫 마운트 시에는 error 색상 안되게 처리
    if (isInitialRender.current) {
      // setTypeColor(Grey4);
      // setLengthColor(Grey4);
      // setCorrectColor(Grey4);
      isInitialRender.current = false;
      return;
    }
  }, [email.value, phoneNumber.value]);
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
        <div>
          <div className="id-wrapper">
            <Body1 color={Grey3} margin="0.2rem 0 0.6rem 0">
              복구 이메일
            </Body1>
            <div className="input-wrapper">
              <Input
                type="password"
                value={email.value}
                onChange={email.onChange}
                width="33.5rem"
                height="4.8rem"
                isBoxSizing={true}
              />
            </div>
          </div>
          <div className="caption">
            {/* <Caption2 color={typeColor}> */}
            <Caption2>
              아이디 이메일 분실 시 복구 이메일로 아이디가 발송됩니다.
              <br />
              로그인에 사용하는 이메일 주소와 다른 이메일 주소를 선택하세요.
            </Caption2>
          </div>

          <div className="id-wrapper">
            <Body1 color={Grey3} margin="0.2rem 0 0.6rem 0">
              전화번호
            </Body1>
            <Input
              type="password"
              value={phoneNumber.value}
              onChange={phoneNumber.onChange}
              width="33.5rem"
              height="4.8rem"
              isBoxSizing={true}
            />
          </div>
        </div>
        {/* <div className="next-button"> */}
        <Button
          text="다음"
          width="33.5rem"
          height="5.2rem"
          isActive={valid}
          onClick={() => {
            navigate('/signup/setting');
          }}
        />
        {/* </div> */}
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
  .id-wrapper {
    display: flex;
    flex-direction: column;
  }
  .input-wrapper {
    position: relative;
  }
  .caption {
    display: flex;
    width: 33.5rem;
    gap: 0.4rem;
    align-items: center;
    margin-bottom: 2.8rem;
  }
  .next-button {
    position: sticky;
    bottom: 0;
  }
`;
