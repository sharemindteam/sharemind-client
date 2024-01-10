import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import Input from 'components/Common/Input';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ErrorColor, Grey1, Grey3, Grey4 } from 'styles/color';
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
  // emali error state
  //TODO 중복 체크 api로 중복 시 error
  const [errorState, setErrorState] = useState<boolean>(false);
  //최종 다음 valid 여부
  const [valid, setValid] = useState<boolean>(false);
  //valid check
  useEffect(() => {
    //세 case 모두 valid할 시 다음으로 넘어감
    if (email.isValid && phoneNumber.isValid) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [email.isValid, phoneNumber.isValid]);

  useEffect(() => {
    // 첫 마운트 시에는 error 색상 안되게 처리
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    //TODO:(아이디) 추후 valid 체크 후 true처리
    //현재는 입력만 들어오면 valid true
    if (email.value.trim() !== '') {
      email.setIsValid(true);
    } else {
      email.setIsValid(false);
    }
    //TODO:(인증번호) 추후 valid 체크 후 true처리
    if (phoneNumber.value.trim() !== '') {
      phoneNumber.setIsValid(true);
    } else {
      phoneNumber.setIsValid(false);
    }
  }, [email.value, phoneNumber.value]);
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
        <div>
          <div className="id-wrapper">
            <Body1 color={Grey3} margin="0.2rem 0 0.6rem 0">
              복구 이메일
            </Body1>
            <div className="input-wrapper">
              <Input
                isError={errorState}
                value={email.value}
                onChange={email.onChange}
                width="33.5rem"
                height="4.8rem"
                isBoxSizing={true}
              />
            </div>
          </div>
          <div className="caption">
            {errorState ? (
              <Caption2 color={ErrorColor}>중복된 이메일입니다.</Caption2>
            ) : (
              <Caption2 color={Grey4}>
                아이디 이메일 분실 시 복구 이메일로 아이디가 발송됩니다.
                <br />
                로그인에 사용하는 이메일 주소와 다른 이메일 주소를 선택하세요.
              </Caption2>
            )}
          </div>

          <div className="id-wrapper">
            <Body1 color={Grey3} margin="0.2rem 0 0.6rem 0">
              전화번호
            </Body1>
            <Input
              value={phoneNumber.value}
              onChange={phoneNumber.onChange}
              width="33.5rem"
              height="4.8rem"
              isBoxSizing={true}
            />
          </div>
        </div>
        <Button
          text="다음"
          width="33.5rem"
          height="5.2rem"
          isActive={valid}
          onClick={() => {
            navigate('/signup/nav');
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
