import styled from 'styled-components';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { ReactComponent as Check } from 'assets/icons/icon-signup-check.svg';
import { Body1, Button2, Caption1, Caption2, Heading } from 'styles/font';
import {
  Green,
  Grey1,
  Grey3,
  Grey4,
  Grey5,
  Grey6,
  Red,
  White,
} from 'styles/color';
import { useNavigate } from 'react-router-dom';
import Input from 'components/Common/Input';
import { useEffect, useState } from 'react';
import { Button } from 'components/Common/Button';
export const BuyerSignup = () => {
  const navigate = useNavigate();
  //입력 아이디 valid 여부
  const [idValid, setIdValid] = useState<boolean>(false);
  //인증번호 valid 여부
  const [verifyValid, setVerifyValid] = useState<boolean>(false);
  //인증 전송됨 여부
  const [isSended, setIsSended] = useState<boolean>(false);
  //id input temp
  const [input, setInput] = useState<string>('');
  //인증번호 input temp
  const [verifyInput, setVerifyInput] = useState<string>('');
  //verify button text
  const [verifyText, setVerifyText] = useState<string>('인증 요청');
  useEffect(() => {
    if (input.trim() !== '') {
      //보낼 수 있게
      if (isSended === false) {
        setIdValid(true);
      }
    } else {
      setIdValid(false);
    }
    if (verifyInput.trim() !== '') {
      //보낼 수 있게
      if (verifyValid === false) {
        setVerifyValid(true);
      }
    } else {
      setVerifyValid(false);
    }
  }, [input, verifyInput]);

  //5분 타이머
  const [remainingTime, setRemainingTime] = useState<number>(5 * 60); // 초 단위로 5분 설정
  const [minutes, setMinutes] = useState<number>(5);
  const [seconds, setSeconds] = useState<number>(6);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime > 0) {
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
            <Input
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInput(e.target.value);
              }}
              width="33.5rem"
              height="4.8rem"
              isBoxSizing={true}
            />
            <VerifyButton
              isActive={idValid}
              isSended={isSended}
              onClick={() => {
                if (idValid === true) {
                  setIsSended(true);
                  setVerifyText('재발송');
                }
              }}
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
                value={verifyInput}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setVerifyInput(e.target.value);
                }}
                width="33.5rem"
                height="4.8rem"
                isBoxSizing={true}
              />
            </div>
            <div className="caption">
              <Caption2 color={Grey1}>남은 시간</Caption2>
              <Caption1 color={Red}>
                {String(minutes).padStart(2, '0')}:
                {String(seconds).padStart(2, '0')}
              </Caption1>
            </div>
            {/* <div className="next-button"> */}
            <Button
              text="다음"
              width="33.5rem"
              height="5.2rem"
              isActive={verifyValid}
            />
            {/* </div> */}
          </>
        ) : null}
      </div>
    </Wrapper>
  );
};
// height: calc(var(--vh, 1vh) * 100);

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
