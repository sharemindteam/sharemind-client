import { Space } from 'components/Common/Space';
import styled from 'styled-components';
import { Grey1, White } from 'styles/color';
import { Body1, Body2, Subtitle } from 'styles/font';

//
//
//

interface CounselorExpProps {
  experience: string;
  introduction: string;
}

//
//
//

export const CounselorExp = ({
  experience,
  introduction,
}: CounselorExpProps) => {
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

  //
  //
  //

  return (
    <Wrapper>
      <Subtitle color={Grey1} style={{ textAlign: 'left', width: '100%' }}>
        마인더를 소개해요
      </Subtitle>
      <ExpBox>
        <Body1 color={Grey1}>{introduction}</Body1>
        <Space height="2.4rem" />
        <Body2 color={Grey1}>{formattedMessage(experience)}</Body2>
      </ExpBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1.2rem 2rem 2rem 2rem;
`;

const ExpBox = styled.div`
  padding: 1.6rem;
  background-color: ${White};
  border-radius: 1.2rem;
  margin-top: 1.2rem;
`;
