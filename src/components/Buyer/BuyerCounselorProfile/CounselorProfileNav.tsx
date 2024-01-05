import styled from 'styled-components';
import { Green, Grey4, Grey6 } from 'styles/color';
import { Subtitle } from 'styles/font';
import { ReactComponent as UnderLine } from 'assets/icons/underline-counselor-info.svg';
import { useState } from 'react';
interface CounselorProfileNavProps {
  isInfo: boolean;
  setIsInfo: React.Dispatch<React.SetStateAction<boolean>>;
  reviewNumber: number;
}
export const CounselorProfileNav = ({
  isInfo,
  setIsInfo,
  reviewNumber,
}: CounselorProfileNavProps) => {
  const [infoColor, setInfoColor] = useState<string>(Green);
  const [reviewColor, setReviewColor] = useState<string>(Grey4);
  return (
    <Wrapper>
      <InfoWrapper
        onClick={() => {
          setIsInfo(true);
          setReviewColor(Grey4);
          setInfoColor(Green);
        }}
      >
        <Subtitle color={infoColor}>상담사 정보</Subtitle>
        {isInfo ? <UnderLine /> : null}
      </InfoWrapper>
      <ReviewWrapper
        onClick={() => {
          setIsInfo(false);
          setInfoColor(Grey4);
          setReviewColor(Green);
        }}
      >
        <Subtitle color={reviewColor}>후기({reviewNumber})</Subtitle>
        {!isInfo ? <UnderLine /> : null}
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
