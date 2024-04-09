import { patchAuthSignOut } from 'api/patch';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Button } from 'components/Common/Button';
import { useStompContext } from 'contexts/StompContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey1, LightGreen } from 'styles/color';
import { Heading } from 'styles/font';
import { Characters } from 'utils/Characters';
import { getCookie, removeCookie } from 'utils/cookie';

export const SellerLogout = () => {
  const navigate = useNavigate();

  const { stompClient } = useStompContext();

  const patchSingOut = async (
    accessTokenValue: string | null,
    refreshTokenValue: string | null,
  ) => {
    if (accessTokenValue === null) {
      return;
    }

    try {
      const body = {
        accessToken: accessTokenValue,
        refreshToken: refreshTokenValue,
      };
      await patchAuthSignOut(body);
      removeCookie('accessToken');
      removeCookie('refreshToken');
      stompClient.current?.disconnect();
      navigate('/mypage');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/minder/setting');
          }}
        />
        <Heading color={Grey1}>로그아웃</Heading>
      </HeaderWrapper>
      <div className="body-wrapper">
        <div className="center-content">
          <Characters number={6} width="20.5rem" height="20.5rem" />
          <Heading margin="2.7rem 0 0 0">로그아웃 하시겠습니까?</Heading>
        </div>
        <div className="button-row">
          <Button
            text="취소"
            width="16rem"
            height="5.2rem"
            onClick={() => {
              navigate('/minder/setting');
            }}
          />
          <Button
            text="로그아웃"
            width="16rem"
            height="5.2rem"
            backgroundColor={LightGreen}
            color={Green}
            onClick={() => {
              const accessTokenValue = getCookie('accessToken');
              const refreshTokenValue = getCookie('refreshToken');
              patchSingOut(accessTokenValue, refreshTokenValue);
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
