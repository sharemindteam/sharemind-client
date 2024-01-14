import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey1, LightGreen } from 'styles/color';
import { Body2, Heading } from 'styles/font';
import { Characters } from 'utils/Characters';

export const SellerTerminate = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/seller/setting');
          }}
        />
        <Heading color={Grey1}>회원 탈퇴</Heading>
      </HeaderWrapper>
      <div className="body-wrapper">
        <div className="center-content">
          <Characters number={6} width="20.5rem" height="20.5rem" />
          <Heading margin="2.7rem 0 0 0">
            정말로 회원을 탈퇴하시겠습니까?
          </Heading>
          <Body2 margin="2.2rem 0 0 0">탈퇴하시면 ~~~~ 내용 필요</Body2>
        </div>
        <div className="button-row">
          <Button
            text="취소"
            width="16rem"
            height="5.2rem"
            onClick={() => {
              navigate('/seller/setting');
            }}
          />
          <Button
            text="탈퇴하기"
            width="16rem"
            height="5.2rem"
            backgroundColor={LightGreen}
            color={Green}
            onClick={() => {
              navigate('/buyer/mypage');
            }}
          />
        </div>
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
  .center-content {
    display: flex;
    flex-direction: column;
    height: 60vh;
    align-items: center;
    justify-content: center;
  }
  .button-row {
    display: flex;
    gap: 1.5rem;
  }
`;
