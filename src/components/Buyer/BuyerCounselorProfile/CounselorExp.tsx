import styled from 'styled-components';
import { Grey1, Grey3 } from 'styles/color';
import { Body1, Body2 } from 'styles/font';
interface CounselorExpProps {
  experience: string;
}

export const CounselorExp = ({ experience }: CounselorExpProps) => {
  const formattedMessage = (message: string | null): JSX.Element[] | null => {
    return message
      ? message.split('\n').map((item, key) => (
          <span key={key}>
            {item}
            <br />
          </span>
        ))
      : null;
  };
  return (
    <Wrapper>
      <Body1 color={Grey3}>경험 소개</Body1>
      <ExpBox>
        <Body2 color={Grey1}>{formattedMessage(experience)}</Body2>
      </ExpBox>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 1.2rem 2rem 3rem 2rem;
  margin-bottom: 5.2rem;
`;
const ExpBox = styled.div`
  padding: 1.6rem;
  background-color: rgba(242, 241, 248, 0.8);
  border-radius: 1.2rem;
  margin-top: 1.2rem;
`;
