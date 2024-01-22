import styled from 'styled-components';
import { ReactComponent as NotWrite } from 'assets/icons/graphic-not-write.svg';
import { Body3 } from 'styles/font';
import { Grey3 } from 'styles/color';
import { BottomButton } from '../Common/BottomButton';
import { useNavigate, useParams } from 'react-router-dom';

interface LetterReplyStepProps {
  isArrive: boolean;
  time: string;
  deadline: string;
  replyMsg: string;
  tagActiveLevel:number;
}
export const LetterReplyStep = ({
  isArrive,
  time,
  deadline,
  replyMsg,
  tagActiveLevel
}: LetterReplyStepProps) => {
  const { consultid } = useParams();
  const navigate = useNavigate();
  return (
    <LetterReplyStepWrapper>
      {isArrive ? (
        <ArriveSection>
          <Time>{time}</Time>
          <TextField>{replyMsg}</TextField>
        </ArriveSection>
      ) : (
        <NotWriteSection>
          <NotWriteGraphic />
          <div>
            <NotWriteMessage>아직 답장을 작성하지 않았어요!</NotWriteMessage>
            <AlertMessage>
              <span style={{ fontWeight: '600' }}>{deadline}</span> 이전에{' '}
              <br /> 답장을 보내주셔야 해요.
            </AlertMessage>
          </div>
          <BottomButton
            text="답안 작성하기"
            onClick={() => {
              navigate(`/seller/writeLetter/${consultid}`);
            }}
          />
        </NotWriteSection>
      )}
    </LetterReplyStepWrapper>
  );
};
const LetterReplyStepWrapper = styled.section`
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
const NotWriteSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;
const AlertMessage = styled.div`
  font-family: Pretendard;
  margin-top: 1.2rem;
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const NotWriteGraphic = styled(NotWrite)`
  margin-top: 16.4rem;
`;
const NotWriteMessage = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3rem; /* 150% */
`;
