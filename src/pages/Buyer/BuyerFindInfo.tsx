import Input from 'components/Common/Input';
import { FindInfoNav } from 'components/Buyer/BuyerFindInfo/FindInfoNav';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useInput } from 'hooks/useInput';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey3, Grey4 } from 'styles/color';
import { Body1, Caption2, Heading } from 'styles/font';
import { Button } from 'components/Common/Button';
import { FindInfoIdModal } from 'components/Buyer/BuyerFindInfo/FindInfoIdModal';
import { BackDrop } from 'components/Common/BackDrop';
import { patchAuthFindId, patchAuthFindPassword } from 'api/patch';

//
//
//

export const BuyerFindInfo = () => {
  const navigate = useNavigate();
  const [isId, setIsId] = useState<boolean>(true);
  const recoveryEmail = useInput('');
  const email = useInput('');
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  // 모달 에러 메세지
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   *
   */
  const patchFindId = async () => {
    setIsLoading(true);
    setIsActiveModal(false);
    if (isLoading) {
      return;
    }
    try {
      const body = {
        recoveryEmail: recoveryEmail.value,
      };
      const res: any = await patchAuthFindId(body);
      if (res.status === 200) {
        setModalMessage('이메일로 아이디 정보가 전송되었습니다.');
        setIsActiveModal(true);
      } else if (res.response.status === 400) {
        setModalMessage('올바르지 않은 복구 이메일 형식입니다.');
        setIsActiveModal(true);
      } else if (res.response.status === 404) {
        setModalMessage('존재하지 않는 복구 이메일입니다.');
        setIsActiveModal(true);
      }
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   *
   */
  const patchFindPassword = async () => {
    setIsLoading(true);
    setIsActiveModal(false);
    if (isLoading) {
      return;
    }
    try {
      const body = {
        email: email.value,
      };
      const res: any = await patchAuthFindPassword(body);
      if (res.status === 200) {
        setModalMessage('이메일로 아이디 정보가 전송되었습니다.');
        setIsActiveModal(true);
      } else if (res.response.status === 400) {
        setModalMessage('올바르지 않은 이메일 형식입니다.');
        setIsActiveModal(true);
      } else if (res.response.status === 404) {
        setModalMessage('존재하지 않는 복구 이메일입니다.');
        setIsActiveModal(true);
      }
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  //
  //
  //
  useEffect(() => {
    //TODO:(아이디) 추후 valid 체크 후 true처리
    //현재는 입력만 들어오면 valid true
    if (recoveryEmail.value.trim() !== '') {
      recoveryEmail.setIsValid(true);
    } else {
      recoveryEmail.setIsValid(false);
    }
    if (email.value.trim() !== '') {
      email.setIsValid(true);
    } else {
      email.setIsValid(false);
    }
  }, [recoveryEmail.value, email.value]);

  //
  //
  //

  return (
    <Wrapper>
      <HeaderWrapper border={false}>
        <BackIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        <Heading color={Grey1}>로그인 정보 찾기</Heading>
      </HeaderWrapper>
      <FindInfoNav isId={isId} setIsId={setIsId} />

      <div className="body-wrapper">
        {isId ? (
          <>
            <div>
              <div className="id-wrapper">
                <Body1 color={Grey3} margin="0.2rem 0 0.6rem 0">
                  복구 이메일
                </Body1>
                <div className="input-wrapper">
                  <Input
                    value={recoveryEmail.value}
                    onChange={recoveryEmail.onChange}
                    width="33.5rem"
                    height="4.8rem"
                    isBoxSizing={true}
                    textIndent="1rem"
                  />
                </div>
              </div>
              <div className="caption">
                <Caption2 color={Grey4} margin="0.4rem 0 0 0">
                  등록된 복구 이메일로 아이디를 확인할 수 있습니다.
                </Caption2>
              </div>
            </div>
            <Button
              text="다음"
              width="33.5rem"
              height="5.2rem"
              isActive={recoveryEmail.isValid && !isLoading}
              onClick={() => {
                patchFindId();
              }}
            />
          </>
        ) : (
          <>
            <div>
              <div className="id-wrapper">
                <Body1 color={Grey3} margin="0.2rem 0 0.6rem 0">
                  아이디(이메일)
                </Body1>
                <div className="input-wrapper">
                  <Input
                    value={email.value}
                    onChange={email.onChange}
                    width="33.5rem"
                    height="4.8rem"
                    isBoxSizing={true}
                    textIndent="1rem"
                  />
                </div>
              </div>
            </div>
            <Button
              text="다음"
              width="33.5rem"
              height="5.2rem"
              isActive={email.isValid && !isLoading}
              onClick={() => {
                patchFindPassword();
              }}
            />
          </>
        )}
      </div>
      {isActiveModal && (
        <FindInfoIdModal
          setIsActive={setIsActiveModal}
          message={modalMessage}
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
  .body-wrapper {
    height: calc(var(--vh, 1vh) * 100 - 15.9rem);
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
