import styled from 'styled-components';
import { ReactComponent as Check } from 'assets/icons/icon-signup-check.svg';
import { Body1, Button2, Caption1, Caption2, Heading } from 'styles/font';
import { Green, Grey1, Grey3, Grey4, Grey5, Red, White } from 'styles/color';
import { useNavigate } from 'react-router-dom';
import Input from 'components/Common/Input';
import { useEffect, useState } from 'react';
import { Button } from 'components/Common/Button';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useInput } from 'hooks/useInput';
import { postEmails, postEmailsCode } from 'api/post';

export const BuyerSignup = () => {
  const navigate = useNavigate();
  const idInput = useInput('');
  const verifyInput = useInput('');

  //최종 다음 valid 여부
  const [valid, setValid] = useState<boolean>(false);
  //인증 전송됨 여부
  const [isSended, setIsSended] = useState<boolean>(false);

  //verify button text
  const [verifyText, setVerifyText] = useState<string>('인증 요청');
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
  const handleVerifyClick = async () => {
    const body = { email: idInput.value };
    try {
      const res: any = await postEmails(body);
      if (res.status === 200) {
        setIsSended(true);
        setVerifyText('재발송');
        setRemainingTime(5 * 60);
      }
    } catch (ex) {
      alert('이메일 인증 과정에서 오류가 발생했습니다.');
    }
  };
  const handleNextClick = async () => {
    const body = { email: idInput.value, code: verifyInput.value };
    try {
      const res: any = await postEmailsCode(body);
      if (res.status === 200) {
        navigate('/signup/setting', { state: { valid, email: idInput.value } });
      } else if (res.response.status === 400) {
        alert('틀림');
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
            <div className="input-wrapper">
              <Input
                value={idInput.value}
                onChange={idInput.onChange}
                width="33.5rem"
                height="4.8rem"
                isBoxSizing={true}
                maxLength={23}
                textIndent="1rem"
              />
              <VerifyButton
                isActive={idInput.isValid}
                isSended={isSended}
                onClick={handleVerifyClick}
              >
                <Button2 color={White}>{verifyText}</Button2>
              </VerifyButton>
            </div>
          </div>
          <div className="caption">
            <Caption2 color={Grey4}>
              *최초 인증 및 비밀번호 분실시 안내 메일이 발송됩니다.
            </Caption2>
            <Check />
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

const VerifyButton = styled.button<{ isActive: boolean; isSended: boolean }>`
  position: absolute;
  top: 14.58%;
  left: ${(props) => (props.isSended ? '77.91%' : '73.43%')};
  cursor: pointer;
  padding: 0 1.5rem;
  height: 71%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  background-color: ${(props) => (props.isActive ? Green : Grey5)};
`;
