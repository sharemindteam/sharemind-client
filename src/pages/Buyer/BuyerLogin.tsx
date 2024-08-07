import styled from 'styled-components';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { Body1, Heading } from 'styles/font';
import { Grey1, Grey3, Grey6, White } from 'styles/color';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/Common/Button';
import { postLogin } from 'api/post';
import { useInput } from 'hooks/useInput';
import { BackDrop } from 'components/Common/BackDrop';
import { LoginModal } from 'components/Buyer/BuyerLogin/LoginModal';
import { useState } from 'react';
import PwInput from 'components/Buyer/Common/PwInput';
import { Space } from 'components/Common/Space';
import { useStompContext } from 'contexts/StompContext';
import { setCookie } from 'utils/cookie';

//
//
//

const CUSTOMER_BANNED_ERROR_NAME = 'CUSTOMER_BANNED';

//
//
//

export const BuyerLogin = () => {
  const emailInput = useInput('');
  const pwInput = useInput('');
  const navigate = useNavigate();
  // 임시저장, 편지, 불러오기 모달 활성화여부
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
  // 모달 에러 메세지
  const [modalErrorMessage, setModalErrorMessage] = useState<string>('');

  const { connectChat } = useStompContext();

  /**
   *
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      email: emailInput.value,
      password: pwInput.value,
    };
    try {
      const res: any = await postLogin(body);

      if (res.status === 200) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          res.data;
        setCookie('accessToken', newAccessToken, { path: '/' });
        setCookie('refreshToken', newRefreshToken, { path: '/' });
        connectChat();
        navigate('/share');
      } else if (res.response.status === 400) {
        setIsActiveModal(true);
        setModalErrorMessage('비밀번호가 일치하지 않습니다.');
      } else if (
        res.response.status === 403 &&
        res.response.data.errorName === CUSTOMER_BANNED_ERROR_NAME
      ) {
        setIsActiveModal(true);
        setModalErrorMessage('로그인이 제한된 사용자입니다.');
      } else if (res.response.status === 404) {
        setIsActiveModal(true);
        setModalErrorMessage('존재하지 않는 이메일입니다.');
      }
    } catch (e) {
      alert(e);
    }
  };

  //
  //
  //

  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/mypage');
          }}
        />
        <Heading color={Grey1}>로그인</Heading>
      </HeaderWrapper>
      <form onSubmit={handleSubmit}>
        <div className="body-wrapper">
          <div className="input-wrapper">
            <Body1 color={Grey3} style={{ margin: '0.2rem 0' }}>
              아이디(이메일)
            </Body1>
            <LoginInput
              value={emailInput.value}
              onChange={emailInput.onChange}
            />
          </div>
          <div className="input-wrapper">
            <Body1 color={Grey3}>비밀번호</Body1>
            <Space height="0.4rem" />
            <PwInput
              width="33.5rem"
              height="4.8rem"
              value={pwInput.value}
              onChange={pwInput.onChange}
            />
          </div>
          <div className="submit-option">
            <Button
              type="submit"
              text="로그인"
              width="33.5rem"
              height="5.2rem"
            />
          </div>
        </div>
      </form>
      {isActiveModal && (
        <LoginModal
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

//
//
//

const Wrapper = styled.div`
  position: relative;
  .body-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.2rem;
    padding: 0.8rem 2rem;
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    padding: 0.8rem 0;
  }
  .submit-option {
    margin-top: 2.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
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

const LoginInput = styled.input<{
  type?: string;
  isError?: boolean;
}>`
  border-radius: 1rem;
  border: ${(props) => (props.isError ? '1px solid #ff002e' : '')};
  width: 33.5rem;
  height: 4.8rem;
  margin: 0.4rem 0;
  background-color: ${Grey6};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 150%;
  color: ${Grey1};
  text-indent: 0.8rem;
  &::placeholder {
  }
  &:focus {
    outline: none;
  }
  box-sizing: border-box;
`;
