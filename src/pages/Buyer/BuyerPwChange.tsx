import { patchAuthPassword } from 'api/patch';
import { postPassword } from 'api/post';
import { usePwChangeInput } from 'components/Buyer/BuyerPwChange/usePwChangeInput';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import PwInput from 'components/Buyer/Common/PwInput';
import { SignupValidIcon } from 'components/Buyer/Common/SignupValidIcon';
import { Button } from 'components/Common/Button';
import { useDebounce } from 'hooks/useDebounce';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';
import styled from 'styled-components';
import { ErrorColor, Grey1, Grey3, Grey4, SafeColor } from 'styles/color';
import { Body1, Caption2, Heading } from 'styles/font';
import { removeCookie } from 'utils/cookie';
import { passwordLengthValid, passwordTypeValid } from 'utils/signupValidCheck';

//
//
//

const PW_CHECK_DEBOUNCE_DELAY = 300;

//
//
//

export const BuyerPwChange = () => {
  const navigate = useNavigate();

  //input values
  const pw = usePwChangeInput('');
  const newPw = usePwChangeInput('');
  const newPwCheck = usePwChangeInput('');

  //caption color
  const [typeColor, setTypeColor] = useState<string>(Grey4);
  const [lengthColor, setLengthColor] = useState<string>(Grey4);
  const [correctColor, setCorrectColor] = useState<string>(Grey4);

  //icon status (common valid invalid)
  const [typeState, setTypeState] = useState<string>('common');
  const [lengthState, setLengthState] = useState<string>('common');
  const [correctState, setCorrectState] = useState<string>('common');

  //final valid
  const [valid, setValid] = useState<boolean>(false);

  /**
   *
   */
  const postPasswordCheck = async (pwInput: string) => {
    const body = {
      password: pwInput,
    };
    const res: any = await postPassword(body);
    if (res.status === 200) {
      pw.setIsValid(res.data);
    } else if (res.response.status === 400) {
      pw.setIsValid(false);
    }
  };

  /**
   *
   */
  const pwDebounce = useDebounce((pwInput: string) => {
    postPasswordCheck(pwInput);
  }, PW_CHECK_DEBOUNCE_DELAY);

  /**
   *
   */
  const handlePwChangeClick = async () => {
    const body = {
      password: newPw.value,
    };
    const res: any = await patchAuthPassword(body);
    if (res.status === 200) {
      removeCookie('accessToken');
      removeCookie('refreshToken');
      navigate('/login');
    } else if (res.response.status === 400) {
      alert(res.response.data.message);
    }
  };

  useEffect(() => {
    //세 case 모두 valid할 시 다음으로 넘어감
    if (pw.isValid && newPw.typeValid && newPwCheck.isValid) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [pw.isValid, newPw.isValid, newPwCheck.isValid, newPw.typeValid]);

  /** new password and new password valid check logic */
  useUpdateEffect(() => {
    /** check which value is changed */
    const newPwChanged = newPw.prevValue !== newPw.value;
    const newPwCheckChanged = newPwCheck.prevValue !== newPwCheck.value;

    /** check if new pw's combination valid */
    if (newPwChanged) {
      if (passwordTypeValid(newPw.value)) {
        setTypeColor(SafeColor);
        setTypeState('valid');
        newPw.setTypeValid(true);
      } else {
        setTypeColor(ErrorColor);
        setTypeState('invalid');
        newPw.setTypeValid(false);
      }
    }

    /** check if new pw over 10 letters */
    if (newPwChanged) {
      if (passwordLengthValid(newPw.value)) {
        setLengthColor(SafeColor);
        setLengthState('valid');
        newPw.setLengthValid(true);
      } else {
        setLengthColor(ErrorColor);
        setLengthState('invalid');
        newPw.setLengthValid(false);
      }
    }

    /** check if new pw equal new pw check */
    if (newPwChanged || newPwCheckChanged) {
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
    }
  }, [newPw, newPw.value, newPwCheck, newPwCheck.value]);

  //
  //
  //

  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/setting');
          }}
        />
        <Heading color={Grey1}>비밀번호 변경</Heading>
      </HeaderWrapper>
      <div className="body-wrapper">
        <div>
          <div className="card-wrapper">
            <Body1 color={Grey3} margin="0.2rem 0">
              현재 비밀번호
            </Body1>
            <PwInput
              value={pw.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                pw.handleFirstChange();
                pw.setValue(e.target.value);
                pwDebounce(e.target.value);
              }}
              width="33.5rem"
              height="4.8rem"
            />
            {pw.isValid || !pw.isFocused ? null : (
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
          onClick={handlePwChangeClick}
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
