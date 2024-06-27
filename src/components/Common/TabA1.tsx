import styled from 'styled-components';
import { ReactComponent as UnderLineBuyer } from 'assets/icons/underline-buyer.svg';
import { ReactComponent as UnderLineBuyerBig } from 'assets/icons/underline-big.svg';
import { Subtitle } from 'styles/font';
import { Black, Green, Grey6 } from 'styles/color';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCounselorsRandomConsult } from 'api/get';

//
//
//

interface TabA1Props {
  isBuyer: boolean;
  //넘어온 state는 홈이면 1, 상담이면 2, 내정보면 3(초깃값)
  initState: number;
}

//
//
//

export const TabA1 = ({ isBuyer, initState }: TabA1Props) => {
  const navigate = useNavigate();
  const [tabState, setTabState] = useState<number>();
  const [color, setColor] = useState<string>();
  const navigateOpenConsult = async () => {
    try {
      const res: any = await getCounselorsRandomConsult();
      if (res.status === 200) {
        if (res.data.length > 0) {
          localStorage.setItem('randomConsult', JSON.stringify(res.data));
          navigate(`/minder/open-consult/${res.data[0]}`);
        } else {
          // 서버 응답 상담 리스트가 []일 경우
          navigate('/minder/open-consult/all-adopted');
        }
        setTabState(3);
      } else if (res?.response.status === 403) {
        alert('공개 상담 페이지에 접근할 권한이 없습니다.');
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    setTabState(initState);
    if (isBuyer === true) {
      setColor(Green);
    } else {
      setColor(Green);
    }
  }, [initState, isBuyer]);
  return (
    <Wrapper>
      <TabButton
        $tabState={1}
        onClick={() => {
          setTabState(1);
          if (isBuyer) {
            navigate('/share');
          } else {
            navigate('/minder');
          }
        }}
      >
        {tabState === 1 ? (
          <>
            <Subtitle color={color}>홈</Subtitle>
            <UnderLineBuyer />
          </>
        ) : (
          <Subtitle color={Black}>홈</Subtitle>
        )}
      </TabButton>
      <TabButton
        $tabState={2}
        onClick={() => {
          setTabState(2);
          if (isBuyer) {
            navigate('/consult');
          } else {
            navigate('/minder/consult');
          }
        }}
      >
        {tabState === 2 ? (
          <>
            <Subtitle color={color}>상담</Subtitle>
            <UnderLineBuyer />
          </>
        ) : (
          <Subtitle color={Black}>상담</Subtitle>
        )}
      </TabButton>
      <TabButton
        $tabState={3}
        onClick={() => {
          if (isBuyer) {
            navigate('/open-consult');
          } else {
            navigateOpenConsult();
          }
        }}
      >
        {tabState === 3 ? (
          <>
            <Subtitle color={color}>공개상담</Subtitle>
            <UnderLineBuyerBig />
          </>
        ) : (
          <Subtitle color={Black}>공개상담</Subtitle>
        )}
      </TabButton>
      <TabButton $tabState={4}>
        {tabState === 4 ? (
          <>
            <Subtitle color={color}>내 정보</Subtitle>
            <UnderLineBuyer />
          </>
        ) : (
          <Subtitle
            color={Black}
            onClick={() => {
              setTabState(4);
              if (isBuyer) {
                navigate('/mypage');
              } else {
                navigate('/minder/mypage');
              }
            }}
          >
            내 정보
          </Subtitle>
        )}
      </TabButton>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.nav`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${Grey6};
  position: sticky;
  top: 6rem;
  background-color: white;
  z-index: 999;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
`;
const TabButton = styled.div<{ $tabState: number }>`
  display: flex;
  flex-direction: column;
  width: ${(props) =>
    props?.$tabState === 1
      ? '8.8rem'
      : props?.$tabState === 2
      ? '8.2rem'
      : props?.$tabState === 3
      ? '10.9rem'
      : '9.6rem'};
  align-items: center;
  cursor: pointer;
`;
