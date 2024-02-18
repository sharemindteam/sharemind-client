import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ErrorColor, Grey1, Grey3, Grey4, SafeColor } from 'styles/color';
import { Body1, Caption2, Heading } from 'styles/font';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Button } from 'components/Common/Button';
import { UseInputResult, useInput } from 'hooks/useInput';
import { SignupValidIcon } from 'components/Buyer/Common/SignupValidIcon';
import { passwordLengthValid, passwordTypeValid } from 'utils/signupValidCheck';
import PwInput from 'components/Buyer/Common/PwInput';
import { Space } from 'components/Common/Space';
interface SignupPwProps {
  pw: UseInputResult;
  setSignupState: Dispatch<SetStateAction<number>>;
}
export const SignupPw = ({ pw, setSignupState }: SignupPwProps) => {
  //첫렌더 시 예외처리
  const isInitialRender = useRef(true);
  const navigate = useNavigate();
  //params로 넘어온 이전 페이지 valid 값, null이면 예외처리
  //pw check temp
  const pwCheck = useInput('');
  //caption color
  const [typeColor, setTypeColor] = useState<string>(Grey4);
  const [lengthColor, setLengthColor] = useState<string>(Grey4);
  const [correctColor, setCorrectColor] = useState<string>(Grey4);
  //캡션 아이콘 상태 / common valid invalid
  const [typeState, setTypeState] = useState<string>('');
  const [lengthState, setLengthState] = useState<string>('');
  const [correctState, setCorrectState] = useState<string>('');
  //최종 다음 valid 여부
  const [valid, setValid] = useState<boolean>(false);
  //valid check
  useEffect(() => {
    //세 case 모두 valid할 시 다음으로 넘어감
    if (pw.typeValid && pw.lengthValid && pwCheck.isValid) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [pw.typeValid, pw.lengthValid, pwCheck.isValid]);

  useEffect(() => {
    // 첫 마운트 시에는 error 색상 안되게 처리
    if (isInitialRender.current) {
      setTypeColor(Grey4);
      setLengthColor(Grey4);
      setCorrectColor(Grey4);
      //첫 마운트 시 icon 상태도 common
      setTypeState('common');
      setLengthState('common');
      setCorrectState('common');
      isInitialRender.current = false;
      return;
    }
    if (passwordTypeValid(pw.value)) {
      setTypeColor(SafeColor);
      setTypeState('valid');
      pw.setTypeValid(true);
    } else {
      setTypeColor(ErrorColor);
      setTypeState('invalid');
      pw.setTypeValid(false);
    }
    if (passwordLengthValid(pw.value)) {
      setLengthColor(SafeColor);
      setLengthState('valid');
      pw.setLengthValid(true);
    } else {
      setLengthColor(ErrorColor);
      setLengthState('invalid');
      pw.setLengthValid(false);
    }
    if (pw.value.trim() === pwCheck.value.trim() && pw.value.trim() !== '') {
      setCorrectColor(SafeColor);
      setCorrectState('valid');
      pwCheck.setIsValid(true);
    } else {
      setCorrectColor(ErrorColor);
      setCorrectState('invalid');
      pwCheck.setIsValid(false);
    }
  }, [pw.value, pwCheck.value]);

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
              비밀번호
            </Body1>

            <PwInput
              value={pw.value}
              onChange={pw.onChange}
              width="33.5rem"
              height="4.8rem"
            />
          </div>
          <Space height="0.4rem" />
          <div className="caption">
            <Caption2 color={typeColor}>
              영문, 숫자, 특수문자 중 2종 이상 조합
            </Caption2>
            <SignupValidIcon type={typeState} />
            <Caption2 color={lengthColor} margin="0 0 0 1.6rem">
              10자 이상
            </Caption2>
            <SignupValidIcon type={lengthState} />
          </div>

          <div className="id-wrapper">
            <Body1 color={Grey3} margin="0.2rem 0 0.6rem 0">
              비밀번호 확인
            </Body1>
            <PwInput
              value={pwCheck.value}
              onChange={pwCheck.onChange}
              width="33.5rem"
              height="4.8rem"
            />
          </div>
          <Space height="0.4rem" />
          <div className="caption">
            <Caption2 color={correctColor}>비밀번호 일치</Caption2>
            <SignupValidIcon type={correctState} />
          </div>
        </div>
        <Button
          text="다음"
          width="33.5rem"
          height="5.2rem"
          isActive={valid}
          onClick={() => {
            setSignupState(2);
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

  .caption {
    display: flex;
    width: 33.5rem;
    gap: 0.4rem;
    align-items: center;
    margin-bottom: 2.8rem;
  }
`;
