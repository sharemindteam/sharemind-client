import styled from 'styled-components';
import { Green, Grey4, Grey6 } from 'styles/color';
import { Subtitle } from 'styles/font';
import { ReactComponent as UnderLine } from 'assets/icons/underline-counselor-info.svg';
import { useState } from 'react';
interface ReviewManageNavProps {
  isWrite: boolean;
  setIsWrite: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ReviewManageNav = ({
  isWrite,
  setIsWrite,
}: ReviewManageNavProps) => {
  const [writeColor, setWriteColor] = useState<string>(Green);
  const [historyColor, setHistoryColor] = useState<string>(Grey4);
  return (
    <Wrapper>
      <InfoWrapper
        onClick={() => {
          setIsWrite(true);
          setHistoryColor(Grey4);
          setWriteColor(Green);
        }}
      >
        <Subtitle color={writeColor}>리뷰 작성</Subtitle>
        {isWrite ? <UnderLine /> : null}
      </InfoWrapper>
      <ReviewWrapper
        onClick={() => {
          setIsWrite(false);
          setWriteColor(Grey4);
          setHistoryColor(Green);
        }}
      >
        <Subtitle color={historyColor}>남긴 리뷰</Subtitle>
        {!isWrite ? <UnderLine /> : null}
      </ReviewWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 4.4rem;
  border-bottom: 1px solid ${Grey6};
  display: flex;
`;
const InfoWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.8rem;
  cursor: pointer;
`;
const ReviewWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.8rem;
  cursor: pointer;
`;
