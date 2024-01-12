import styled from 'styled-components';
import { ReactComponent as NotWrite } from 'assets/icons/graphic-not-write.svg';
import { Body1, Body2 } from 'styles/font';
import { Grey1 } from 'styles/color';
import { Button } from 'components/Common/Button';
import { Space } from 'components/Common/Space';
import { useNavigate } from 'react-router-dom';
interface LetterMainSectionProps {
  tagStatus: number;
}
export const LetterMainSection = ({ tagStatus }: LetterMainSectionProps) => {
  const navigate = useNavigate();
  return (
    <SectionWrapper>
      <div className="body-wrapper">
        <NotWrite />
        <BodyText>고민 내용을 남겨주세요</BodyText>
        <Body2 color={Grey1}>연애상담마스터 님이</Body2>
        <div className="text-wrapper">
          <Body1 color={Grey1}>24시간 이내</Body1>
          <Body2 color={Grey1}>에 답장을 드릴 거예요.</Body2>
        </div>
      </div>

      <ButtonWrapper>
        <Button
          text="질문 작성하기"
          width="89.33%"
          height="5.2rem"
          onClick={() => {
            navigate('/buyer/writeLetter/0');
          }}
        />
        <Space height="3.2rem" />
      </ButtonWrapper>
    </SectionWrapper>
  );
};
const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .text-wrapper {
    display: flex;
  }
  .body-wrapper {
    display: flex;
    margin-top: 18vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const BodyText = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3rem;
`;
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
`;
