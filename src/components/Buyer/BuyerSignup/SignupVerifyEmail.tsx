import styled from 'styled-components';
import { Body1, Caption1, Caption2, Heading } from 'styles/font';
import { ErrorColor, Grey1, Grey3, Grey4, Red } from 'styles/color';
import { useNavigate } from 'react-router-dom';
import Input from 'components/Common/Input';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from 'components/Common/Button';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { UseInputResult, useInput } from 'hooks/useInput';
import { postEmails, postEmailsCode } from 'api/post';
import { BackDrop } from 'components/Common/BackDrop';
import { SignupModal } from './SignupModal';
import { Space } from 'components/Common/Space';
import SignupVerifyInput from './SignupVerifyInput';

//
//
//
interface SignupVerifyEmailProps {
  idInput: UseInputResult;
  setSignupState: Dispatch<SetStateAction<number>>;
}
export const SignupVerifyEmail = ({
  idInput,
  setSignupState,
}: SignupVerifyEmailProps) => {
  const navigate = useNavigate();
  //인증코드 input
  const verifyInput = useInput('');
  //최종 다음 valid 여부
  const [valid, setValid] = useState<boolean>(false);
  //인증 전송됨 여부
  const [isSended, setIsSended] = useState<boolean>(false);
  //이메일 에러 메세지
  const [errorMessage, setErrorMessage] = useState<string>(
    ' *최초 인증 및 비밀번호 분실시 안내 메일이 발송됩니다.',
  );
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [errorMessageColor, setErrorMessageColor] = useState<string>(Grey4);
  //verify button text
  const [verifyText, setVerifyText] = useState<string>('인증 요청');
  //처음 인증요청보내는건지 체크
  const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true);
  // 임시저장, 편지, 불러오기 모달 활성화여부
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  // 모달 에러 메세지
  const [modalErrorMessage, setModalErrorMessage] = useState<string>('');

  useEffect(() => {
    if (idInput.value.trim() !== '') {
      if (idInput.isValid === false) {
        idInput.setIsValid(true);
      }
    } else {
      idInput.setIsValid(false);
    }
    //TODO:(인증번호) 추후 valid 체크 후 true처리
    if (verifyInput.value.trim() !== '') {
      if (verifyInput.isValid === false) {
        verifyInput.setIsValid(true);
      }
    } else {
      verifyInput.setIsValid(false);
    }
  }, [idInput.value, verifyInput.value]);

  useEffect(() => {
    if (idInput.value.trim() !== '') {
      if (idInput.isValid === false) {
        idInput.setIsValid(true);
      }
    } else {
      idInput.setIsValid(false);
    }
    //TODO:(인증번호) 추후 valid 체크 후 true처리
    if (verifyInput.value.trim() !== '') {
      if (verifyInput.isValid === false) {
        verifyInput.setIsValid(true);
      }
    } else {
      verifyInput.setIsValid(false);
    }
  }, [idInput.value, verifyInput.value]);

  // 다음 button valid 체크
  useEffect(() => {
    if (idInput.isValid && verifyInput.isValid) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [idInput.isValid, verifyInput.isValid]);

  /**
   * 다음 button valid 체크
   */
  const handleVerifyClick = async () => {
    const body = { email: idInput.value };
    try {
      const res: any = await postEmails(body);
      if (res.status === 200) {
        setIsSended(true);
        //이메일 입력 캡션
        setErrorMessageColor(Grey4);
        setErrorMessage(
          '*최초 인증 및 비밀번호 분실시 안내 메일이 발송됩니다.',
        );
        setIsEmailError(false);
        //전송 5회 카운트
        //버튼 텍스트랑 남은시간
        setVerifyText('재발송');
        //최초 전송시에만 5분으로 설정
        if (isFirstRequest) {
          setRemainingTime(5 * 60);
          setIsFirstRequest(false);
        }
      } else if (res.response.status === 400) {
        setErrorMessageColor(ErrorColor);
        setIsEmailError(true);
        if (res.response.data.errorName === 'BAD_REQUEST') {
          setErrorMessage(res.response.data.message + '.');
        } else if (
          res.response.data.errorName === 'CODE_REQUEST_COUNT_EXCEED'
        ) {
          setErrorMessage(res.response.data.message.split(' : ')[0]);
        }
      } else if (res.response.status === 409) {
        setErrorMessageColor(ErrorColor);
        setIsEmailError(true);
        if (res.response.data.errorName === 'EMAIL_ALREADY_EXIST') {
          setErrorMessage(res.response.data.message.split(' : ')[0]);
        }
      }
    } catch (ex) {
      alert('이메일 인증 과정에서 오류가 발생했습니다.');
    }
  };

  /**
   *
   */
  const handleNextClick = async () => {
    const body = { email: idInput.value, code: verifyInput.value };
    try {
      const res: any = await postEmailsCode(body);
      if (res.status === 200) {
        setSignupState(1);
      } else if (res.response.status === 400) {
        if (res.response.data.errorName === 'CODE_MISMATCH') {
          setModalErrorMessage('인증번호가 일치하지 않습니다');
        } else if (res.response.data.errorName === 'BAD_REQUEST') {
          setModalErrorMessage('올바른 형식의 이메일 주소여야 합니다');
        }
        setIsActiveModal(true);
      }
    } catch (ex) {
      alert('인증 번호 확인 과정에서 오류가 발생했습니다.');
    }
  };

  //5분 타이머
  const [remainingTime, setRemainingTime] = useState<number>(0); // 초 단위로 5분 설정
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime >= 0) {
        setRemainingTime((prevTime) => prevTime - 1);
        setMinutes(Math.floor(remainingTime / 60));
        setSeconds(remainingTime % 60);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainingTime]);

  //
  //
  //

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
              아이디(이메일)
            </Body1>
            <SignupVerifyInput
              value={idInput.value}
              isActive={idInput.isValid}
              verifyText={verifyText}
              onClick={handleVerifyClick}
              onChange={idInput.onChange}
            />
          </div>
          <Space height="0.4rem" />

          <div className="caption">
            {isEmailError ? (
              <>
                <Caption2 color={errorMessageColor}>{errorMessage}</Caption2>
              </>
            ) : (
              <>
                <Caption2 color={errorMessageColor}>{errorMessage}</Caption2>
              </>
            )}
          </div>
          {isSended ? (
            <>
              <div className="id-wrapper">
                <Body1 color={Grey3} margin="0.2rem 0 0.6rem 0">
                  인증번호 입력
                </Body1>
                <Input
                  value={verifyInput.value}
                  onChange={verifyInput.onChange}
                  width="33.5rem"
                  height="4.8rem"
                  isBoxSizing={true}
                  textIndent="1rem"
                />
              </div>
              <Space height="0.4rem" />
              <div className="caption">
                <Caption2 color={Grey1}>남은 시간</Caption2>
                <Caption1 color={Red}>
                  {String(minutes).padStart(2, '0')}:
                  {String(seconds).padStart(2, '0')}
                </Caption1>
              </div>
            </>
          ) : null}
        </div>
        <Button
          text="다음"
          width="33.5rem"
          height="5.2rem"
          isActive={valid}
          onClick={handleNextClick}
        />
      </div>
      {isActiveModal && (
        <SignupModal
          setIsActive={setIsActiveModal}
          errorMessage={modalErrorMessage}
        />
      )}
      {isActiveModal ? (
        <BackDrop
          onClick={() => {
            setIsActiveModal(false);
          }}
        />
      ) : null}
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
  .next-button {
    position: sticky;
    bottom: 0;
  }
`;
