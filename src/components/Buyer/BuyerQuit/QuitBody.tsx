import styled from 'styled-components';

import { Heading } from 'styles/font';
import { Characters } from 'utils/Characters';
import { quitReasons } from 'utils/constant';

import { QuitReasonsBox } from './QuitReasonsBox';
interface QuitBodyProps {
  reasonSelected: boolean;
}
export const QuitBody = ({ reasonSelected }: QuitBodyProps) => {
  if (reasonSelected) {
    return (
      <Wrapper>
        <Characters number={6} width="20.5rem" height="20.5rem" />
        <Heading margin="2.7rem 0 0 0">정말로 회원을 탈퇴하시겠습니까?</Heading>
      </Wrapper>
    );
  } else {
    return (
      <SelectWrapper>
        <div className="reasons-wrapper">
          {quitReasons.map((_, index) => {
            return <QuitReasonsBox key={index} index={index} />;
          })}
        </div>
      </SelectWrapper>
    );
  }
};
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 60vh;
  align-items: center;
  justify-content: center;
`;
const SelectWrapper = styled.section`
  display: flex;
  flex-direction: column;
  .reasons-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
`;
