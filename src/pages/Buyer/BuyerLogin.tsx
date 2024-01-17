import styled from 'styled-components';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { Body1, Heading } from 'styles/font';
import { Grey1, Grey3, Grey4, Grey6, White } from 'styles/color';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/Common/Button';
import { postLogin } from 'api/post';
import { useInput } from 'hooks/useInput';
export const BuyerLogin = () => {
  const emailInput = useInput('');
  const pwInput = useInput('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //TODO: submit handle
    //TODO: invalid 입력 예외처리
    const body = {
      email: emailInput.value,
      password: pwInput.value,
    };
    try {
      const response = await postLogin(body);
      console.log(response, emailInput, pwInput);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/buyer/mypage');
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
            <LoginInput
              type="password"
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
            <div className="underline-option">
              <UnderlineText
                onClick={() => {
                  navigate('/signup');
                }}
              >
                회원가입
              </UnderlineText>
              <UnderlineText
                onClick={() => {
                  navigate('/find');
                }}
              >
                아이디/비밀번호 찾기
              </UnderlineText>
            </div>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.div`
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
  .underline-option {
    display: flex;
    width: 100%;
    justify-content: space-between;
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
  text-indent: 0.5rem;
  &::placeholder {
  }
  &:focus {
    outline: none;
  }
  box-sizing: border-box;
`;
const UnderlineText = styled.div`
  color: ${Grey4};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  text-decoration-line: underline;
  cursor: pointer;
`;
