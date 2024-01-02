import styled from 'styled-components';
import { ReactComponent as UnderLineBuyer } from 'assets/icons/underline-buyer.svg';
import { ReactComponent as UnderLineSeller } from 'assets/icons/underline-seller.svg';
import { Subtitle } from 'styles/font';
import { Black, Green, Red } from 'styles/color';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface TabA1Props {
  isBuyer: boolean;
  //넘어온 state는 홈이면 1, 상담이면 2, 내정보면 3(초깃값)
  initState: number;
}
export const TabA1 = ({ isBuyer, initState }: TabA1Props) => {
  const navigate = useNavigate();
  const [tabState, setTabState] = useState<number>();
  const [color, setColor] = useState<string>();
  useEffect(() => {
    setTabState(initState);
    if (isBuyer === true) {
      setColor(Green);
    } else {
      setColor(Red);
    }
  }, []);
  return (
    <Wrapper>
      <TabButton>
        {tabState === 1 ? (
          <>
            <Subtitle color={color}>홈</Subtitle>
            {isBuyer ? <UnderLineBuyer /> : <UnderLineSeller />}
          </>
        ) : (
          <Subtitle
            color={Black}
            onClick={() => {
              setTabState(1);
              if (isBuyer) {
                navigate('/buyer');
              } else {
                navigate('/seller');
              }
            }}
          >
            홈
          </Subtitle>
        )}
      </TabButton>
      <TabButton>
        {tabState === 2 ? (
          <>
            <Subtitle color={color}>상담</Subtitle>
            {isBuyer ? <UnderLineBuyer /> : <UnderLineSeller />}
          </>
        ) : (
          <Subtitle
            color={Black}
            onClick={() => {
              setTabState(2);
              if (isBuyer) {
                navigate('/buyer/consult');
              } else {
                navigate('/seller/consult');
              }
            }}
          >
            상담
          </Subtitle>
        )}
      </TabButton>
      <TabButton>
        {tabState === 3 ? (
          <>
            <Subtitle color={color}>내 정보</Subtitle>
            {isBuyer ? <UnderLineBuyer /> : <UnderLineSeller />}
          </>
        ) : (
          <Subtitle
            color={Black}
            onClick={() => {
              setTabState(3);
              if (isBuyer) {
                navigate('/buyer/mypage');
              } else {
                navigate('/seller/mypage');
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
const Wrapper = styled.div`
  width: 100%;
  height: 4.4rem;
  display: flex;
  justify-content: center;
  gap: 4.5rem;
  border-bottom: 1px solid #f6f6fa;
`;
const TabButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 6.5rem;
  align-items: center;
  cursor: pointer;
`;
