import styled from 'styled-components';
import { ReactComponent as NotArrive } from 'assets/icons/graphic-not-arrive.svg';
import { Body3 } from 'styles/font';
import { Grey3 } from 'styles/color';
import { formattedMessage } from 'utils/formattedMessage';

//
//
//

interface LetterQuestionStepProps {
  isArrive: boolean;
  time: string;
  questionMsg: string;
  tagActiveLevel: number;
}
export const LetterQuestionStep = ({
  isArrive,
  time,
  questionMsg,
  tagActiveLevel,
}: LetterQuestionStepProps) => {
  return (
    <LetterQuestionWrapper>
      {isArrive ? (
        <ArriveSection>
          <Time>{time}</Time>
          <TextField>{formattedMessage(questionMsg)}</TextField>
        </ArriveSection>
      ) : (
        <NotArriveSection>
          <NotArriveGraphic />
          <NotArriveMessage>아직 질문이 도착하지 않았어요!</NotArriveMessage>
        </NotArriveSection>
      )}
    </LetterQuestionWrapper>
  );
};

const LetterQuestionWrapper = styled.section`
  padding-bottom: 10rem;
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
  gap: 4rem;
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
