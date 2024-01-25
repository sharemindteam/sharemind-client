import styled from 'styled-components';
import { ReactComponent as NotArrive } from 'assets/icons/graphic-not-arrive.svg';
import { Body1, Body2, Body3 } from 'styles/font';
import { Grey3 } from 'styles/color';
import { BottomButton } from '../Common/BottomButton';
import { useNavigate, useParams } from 'react-router-dom';
interface LetterBonusQuestionStepProps {
  isArrive: boolean;
  time: string;
  questionMsg: string;
  deadline: string;
  tagActiveLevel: number;
}
export const LetterBonusQuestionStep = ({
  isArrive,
  time,
  questionMsg,
  deadline,
  tagActiveLevel,
}: LetterBonusQuestionStepProps) => {
  const { consultid } = useParams();
  const navigate = useNavigate();
  return (
    <LetterBonusQuestionWrapper>
      {isArrive ? (
        <ArriveSection>
          <Time>{time}</Time>
          <TextField>{questionMsg}</TextField>
        </ArriveSection>
      ) : (
        <NotArriveSection>
          <NotArriveGraphic />
          <NotArriveMessage>아직 추가질문이 오지 않았어요!</NotArriveMessage>
          <DeadLine>
            <Body1>
              <b>{deadline}까지 </b>
            </Body1>
            <Body2>
              추가 질문이 도착하지 않으면 <br /> 자동으로 상담이 종료됩니다.
            </Body2>
          </DeadLine>
        </NotArriveSection>
      )}
    </LetterBonusQuestionWrapper>
  );
};

const LetterBonusQuestionWrapper = styled.section`
  margin-bottom: 100px;
`;
const ArriveSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Time = styled(Body3)`
  padding: 1.2rem;
  color: ${Grey3};
`;

const TextField = styled.div`
  width: calc(100% - 8rem);
  margin: 0 auto;
  min-height: 55.6rem;
  border-radius: 1.2rem;
  background: var(--Greyscale-Grey-6, #f6f6fa);
  padding: 1.6rem;
  color: var(--greyscale-grey-1-text, #33333a);
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 2.4rem */
`;

const NotArriveSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const NotArriveGraphic = styled(NotArrive)`
  margin-top: 14.8rem;
`;
const NotArriveMessage = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3rem; /* 150% */
`;

const DeadLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
