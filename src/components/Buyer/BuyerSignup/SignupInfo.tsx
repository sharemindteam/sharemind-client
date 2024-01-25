import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import Input from 'components/Common/Input';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ErrorColor, Grey1, Grey3, Grey4, SafeColor } from 'styles/color';
import { Body1, Caption2, Heading } from 'styles/font';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Button } from 'components/Common/Button';
import { UseInputResult } from 'hooks/useInput';
import { postSingup } from 'api/post';
import { SignupModal } from './SignupModal';
import { BackDrop } from 'components/Common/BackDrop';
import { SignupValidIcon } from '../Common/SignupValidIcon';
interface SignupInfoProps {
  idInput: UseInputResult;
  pw: UseInputResult;
  email: UseInputResult;
  phoneNumber: UseInputResult;
  setSignupState: Dispatch<SetStateAction<number>>;
}
export const SignupInfo = ({
  idInput,
  pw,
  email,
  phoneNumber,
  setSignupState,
}: SignupInfoProps) => {
  const navigate = useNavigate();
  // email error state
  const [emailErrorState, setEmailErrorState] = useState<boolean>(false);
  const [emailErrorCaption, setEmailErrorCaption] = useState<string>('');
  // phoneNumber error state
  const [phoneErrorState, setPhoneErrorState] = useState<boolean>(false);
  //phonnumber caption color
  const [phoneCaptionColor, setPhoneCaptionColor] = useState<string>(Grey4);
  //phonnumber check icon state
  const [phoneIconState, setPhoneIconState] = useState<string>('common');
  //최종 다음 valid 여부
  const [valid, setValid] = useState<boolean>(false);
  //phone number 포맷 함수
  // 전화번호를 하이픈이 추가된 형태로 포맷하는 함수
  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, ''); // 숫자 이외의 문자 제거
    const matchTemp = cleaned.match(/^(\d{3})(\d{4})$/);
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    } else if (matchTemp) {
      return `${matchTemp[1]}-${matchTemp[2]}`;
    }

    return input;
  };
  function checkPhoneNumberFormat(phoneNumber: string): boolean {
    // 정규 표현식을 사용하여 유효한 패턴 체크
    const pattern = /^(\d{2,3}-)?\d{3,4}-\d{4}$/;

    if (!pattern.test(phoneNumber)) {
      return false; // 패턴이 맞지 않으면 유효하지 않음
    }
    // 하이픈(-)을 제외한 숫자만 추출
    const numericValue = phoneNumber.replace(/-/g, '');

    // 추출한 숫자의 길이가 10 또는 11이어야 함
    if (numericValue.length < 10 || numericValue.length > 11) {
      return false; // 길이 조건을 만족하지 않으면 유효하지 않음
    }

    return true; // 모든 조건을 만족하면 유효함
  }
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
    if (email.value.trim() !== '') {
      email.setIsValid(true);
    } else {
      email.setIsValid(false);
    }
    // 전화번호 포맷팅 로직
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber.value);
    phoneNumber.setValue(formattedPhoneNumber);

    if (phoneNumber.value.trim() === '') {
      setPhoneIconState('common');
      setPhoneCaptionColor(Grey4);
      setPhoneErrorState(false);
      phoneNumber.setIsValid(false);
    } else if (checkPhoneNumberFormat(formattedPhoneNumber)) {
      setPhoneIconState('valid');
      setPhoneCaptionColor(SafeColor);
      setPhoneErrorState(false);
      phoneNumber.setIsValid(true);
    } else {
      setPhoneIconState('invalid');
      setPhoneCaptionColor(ErrorColor);
      setPhoneErrorState(true);
      phoneNumber.setIsValid(false);
    }
  }, [email.value, phoneNumber.value]);
  const handleNextButton = async () => {
    const body = {
      email: idInput.value,
      password: pw.value,
      phoneNumber: phoneNumber.value,
      recoveryEmail: email.value,
    };
    try {
      const res: any = await postSingup(body);
      if (res.status === 201) {
        navigate('/signup/nav');
      } else if (res.response.status === 400) {
        console.log(res.response.data);
        if (res.response.data.errorName === 'INVALID_RECOVERY_EMAIL') {
          setEmailErrorState(true);
          setEmailErrorCaption(res.response.data.message);
        } else if (res.response.data.errorName === 'BAD_REQUEST') {
          if (
            res.response.data.message ===
            '전화번호는 하이픈(-)을 포함한 10~11자리이어야 합니다.'
          ) {
            setPhoneIconState('invalid');
            setPhoneCaptionColor(ErrorColor);
            setPhoneErrorState(true);
          } else {
            setEmailErrorState(true);
            setEmailErrorCaption(res.response.data.message);
          }
        }
      }
    } catch (ex) {
      alert('인증 번호 확인 과정에서 오류가 발생했습니다.');
    }
  };
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
                isError={emailErrorState}
                value={email.value}
                onChange={email.onChange}
                width="33.5rem"
                height="4.8rem"
                isBoxSizing={true}
                textIndent="1rem"
              />
            </div>
          </div>
          <div className="caption">
            {!emailErrorState ? (
              <Caption2 color={Grey4}>
                아이디 이메일 분실 시 복구 이메일로 아이디가 발송됩니다.
                <br />
                로그인에 사용하는 이메일 주소와 다른 이메일 주소를 선택하세요.
              </Caption2>
            ) : (
              <Caption2 color={ErrorColor}>{emailErrorCaption}</Caption2>
            )}
          </div>

          <div className="id-wrapper">
            <Body1 color={Grey3} margin="0.2rem 0 0.6rem 0">
              전화번호
            </Body1>
            <Input
              isError={phoneErrorState}
              value={phoneNumber.value}
              onChange={phoneNumber.onChange}
              width="33.5rem"
              height="4.8rem"
              isBoxSizing={true}
              textIndent="1rem"
            />
          </div>
          <div className="caption">
            <Caption2 color={phoneCaptionColor}>
              전화번호는 하이픈(-)을 포함한 10~11자리이어야 합니다.
            </Caption2>
            <SignupValidIcon type={phoneIconState} />
          </div>
        </div>
        <Button
          text="다음"
          width="33.5rem"
          height="5.2rem"
          isActive={valid}
          onClick={handleNextButton}
        />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
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
`;
