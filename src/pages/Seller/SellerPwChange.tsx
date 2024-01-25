import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import PwInput from 'components/Buyer/Common/PwInput';
import { SignupValidIcon } from 'components/Buyer/Common/SignupValidIcon';
import { Button } from 'components/Common/Button';
import { useInput } from 'hooks/useInput';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ErrorColor, Grey1, Grey3, Grey4, SafeColor } from 'styles/color';
import { Body1, Caption2, Heading } from 'styles/font';
import { passwordLengthValid, passwordTypeValid } from 'utils/signupValidCheck';

export const SellerPwChange = () => {
  //첫렌더 시 예외처리
  const isInitialRender = useRef(true);
  const navigate = useNavigate();
  //비밀번호 변경
  const pw = useInput('');
  const newPw = useInput('');
  const newPwCheck = useInput('');
  //caption color
  const [typeColor, setTypeColor] = useState<string>(Grey4);
  const [lengthColor, setLengthColor] = useState<string>(Grey4);
  const [correctColor, setCorrectColor] = useState<string>(Grey4);
  //각 input caption icon의 상태 / common valid invalid
  const [typeState, setTypeState] = useState<string>('');
  const [lengthState, setLengthState] = useState<string>('');
  const [correctState, setCorrectState] = useState<string>('');
  //최종 완료 valid 여부
  const [valid, setValid] = useState<boolean>(false);
  useEffect(() => {
    //세 case 모두 valid할 시 다음으로 넘어감
    if (pw.isValid && newPw.typeValid && newPwCheck.isValid) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [pw.isValid, newPw.isValid, newPwCheck.isValid]);

  useEffect(() => {
    if (pw.value.trim() !== '') {
      pw.setIsValid(true);
    } else {
      pw.setIsValid(false);
    }
  }, [pw.value]);
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
      pw.setIsValid(true);
      isInitialRender.current = false;
      return;
    }
    if (passwordTypeValid(newPw.value)) {
      setTypeColor(SafeColor);
      setTypeState('valid');
      newPw.setTypeValid(true);
    } else {
      setTypeColor(ErrorColor);
      setTypeState('invalid');
      newPw.setTypeValid(false);
    }
    if (passwordLengthValid(newPw.value)) {
      setLengthColor(SafeColor);
      setLengthState('valid');
      newPw.setLengthValid(true);
    } else {
      setLengthColor(ErrorColor);
      setLengthState('invalid');
      newPw.setLengthValid(false);
    }
    if (
      newPw.value.trim() === newPwCheck.value.trim() &&
      newPw.value.trim() !== ''
    ) {
      setCorrectColor(SafeColor);
      setCorrectState('valid');
      newPwCheck.setIsValid(true);
    } else {
      setCorrectColor(ErrorColor);
      setCorrectState('invalid');
      newPwCheck.setIsValid(false);
    }
  }, [newPw.value, newPwCheck.value]);

  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/seller/setting');
          }}
        />
        <Heading color={Grey1}>비밀번호 변경</Heading>
      </HeaderWrapper>
      <div className="body-wrapper">
        <div>
          {/* 비밀번호 일치 여부는 추후 setTimeout으로 api 호출로 확인 */}
          <div className="card-wrapper">
            <Body1 color={Grey3} margin="0.2rem 0">
              현재 비밀번호
            </Body1>
            <PwInput
              value={pw.value}
              onChange={pw.onChange}
              width="33.5rem"
              height="4.8rem"
              isBoxSizing={true}
              textIndent="1rem"
            />
            {pw.isValid ? null : (
              <div className="caption">
                <Caption2 color={ErrorColor}>비밀번호 불일치</Caption2>
              </div>
            )}
          </div>

          <div className="card-wrapper">
            <Body1 color={Grey3} margin="0.2rem 0">
              새 비밀번호
            </Body1>
            <PwInput
              value={newPw.value}
              onChange={newPw.onChange}
              width="33.5rem"
              height="4.8rem"
              isBoxSizing={true}
              textIndent="1rem"
              padding="0.4rem 0"
            />
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
          </div>

          <div className="card-wrapper">
            <Body1 color={Grey3} margin="0.2rem 0">
              새 비밀번호 확인
            </Body1>
            <PwInput
              value={newPwCheck.value}
              onChange={newPwCheck.onChange}
              width="33.5rem"
              height="4.8rem"
              textIndent="1rem"
              isBoxSizing={true}
              padding="0.4rem 0"
            />
            <div className="caption">
              <Caption2 color={correctColor}>비밀번호 일치</Caption2>
              <SignupValidIcon type={correctState} />
            </div>
          </div>
        </div>
        <Button
          text="완료"
          width="33.5rem"
          height="5.2rem"
          isActive={valid}
          onClick={() => {
            navigate('/login');
          }}
        />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .body-wrapper {
    height: calc(var(--vh, 1vh) * 100 - 8.7rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .card-wrapper {
    display: flex;
    padding: 0.8rem 0;
    flex-direction: column;
  }
  .caption {
    display: flex;
    gap: 0.4rem;
    align-items: center;
  }
`;
