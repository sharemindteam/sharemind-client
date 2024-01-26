import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey1, Grey4, Grey6, LightGreen, White } from 'styles/color';
import { Body2, Body3, Button2, Subtitle } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as PayedIcon } from 'assets/icons/icon-mypage-payed.svg';
import { ReactComponent as ReviewIcon } from 'assets/icons/icon-mypage-review.svg';
import { ReactComponent as SavedIcon } from 'assets/icons/icon-mypage-saved.svg';
import { useEffect, useState } from 'react';
import { Button } from 'components/Common/Button';
import { getCustomersNickname } from 'api/get';
export const BuyerMypage = () => {
  const navigate = useNavigate();
  //로그인 여부 temp
  const [IsLogin, setIsLogin] = useState<boolean>(true);
  //회원닉네임
  const [nickname, setNickname] = useState<string>('');
  useEffect(() => {
    const fetchNickname = async () => {
      const res: any = await getCustomersNickname();
      if (res.status === 200) {
        setNickname(res.data);
        setIsLogin(true);
      } else if (res.response.status === 401) {
        setIsLogin(false);
      }
    };
    fetchNickname();
  }, []);
  return (
    <Wrapper>
      <Header
        isBuyer={true}
        onClick={() => {
          navigate('/buyer');
        }}
      />
      <TabA1 isBuyer={true} initState={3} />
      {IsLogin ? (
        <>
          <UserCard>
            <div className="profile">
              <Characters number={2} width="7.9rem" height="5.8rem" />
              <Subtitle>{nickname}</Subtitle>
            </div>
            <div className="change-button">
              <ChangeButton
                onClick={() => {
                  navigate('/seller/mypage');
                }}
              >
                <Button2 color={Grey1}>마인더로 전환</Button2>
              </ChangeButton>
            </div>
          </UserCard>
          <div className="mypage-options">
            <div
              className="button"
              onClick={() => {
                navigate('/buyer/payment');
              }}
            >
              <PayedIcon />
              <Button2>결제 내역</Button2>
            </div>
            <div
              className="button"
              onClick={() => {
                navigate('/buyer/reviewManage');
              }}
            >
              <ReviewIcon />
              <Button2>리뷰 관리</Button2>
            </div>
            <div
              className="button"
              onClick={() => {
                navigate('/buyer/saved');
              }}
            >
              <SavedIcon />
              <Button2>찜 목록</Button2>
            </div>
          </div>
        </>
      ) : (
        <LoginCard>
          <div className="card-align">
            <div className="content">
              <Body3 color={Grey4}>
                로그인하지 않은 상태입니다.
                <br />
                로그인/회원가입 후 이용해주세요.
              </Body3>
            </div>
            <Button
              text="로그인 및 회원가입"
              width="33.5rem"
              height="5.2rem"
              onClick={() => {
                navigate('/login');
              }}
            />
            <div className="find-id">
              <Body2
                color={Grey4}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('/find');
                }}
              >
                아이디/비밀번호 찾기
              </Body2>
            </div>
          </div>
        </LoginCard>
      )}
      <div className="additional-box">
        <Body2 color={Grey1}>서비스 소개</Body2>
      </div>
      {IsLogin ? (
        <>
          <div className="additional-box">
            <Body2 color={Grey1}>결제 문의</Body2>
          </div>
          <div className="additional-box">
            <Body2
              color={Grey1}
              onClick={() => {
                navigate('/buyer/setting');
              }}
            >
              계정 설정
            </Body2>
          </div>
        </>
      ) : null}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .mypage-options {
    display: flex;
    justify-content: center;
    margin-bottom: 1.2rem;
    background-color: ${White};
  }
  .button {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.8rem 3.6rem 1.4rem 3.6rem;
    cursor: pointer;
  }
  .additional-box {
    padding: 1.2rem 2rem;
    background-color: ${White};
    border-bottom: 1px solid ${Grey6};
    cursor: pointer;
  }
`;
const UserCard = styled.div`
  height: 5.8rem;
  display: flex;
  justify-content: space-between;
  background-color: ${White};
  padding: 2rem;
  .profile {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .change-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const LoginCard = styled.div`
  display: flex;
  background-color: ${White};
  justify-content: center;
  margin-bottom: 1.2rem;
  .card-align {
    display: flex;
    flex-direction: column;
    padding: 2.4rem 2rem 2.4rem 2rem;
    margin-bottom: 1.2rem;
    gap: 2rem;
  }
  .find-id {
    width: 33.5rem;
    display: flex;
    justify-content: center;
  }
`;
const ChangeButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10.1rem;
  height: 4.2rem;
  border: 1px solid ${Green};
  border-radius: 1.2rem;
  cursor: pointer;
  background-color: ${LightGreen};
`;
