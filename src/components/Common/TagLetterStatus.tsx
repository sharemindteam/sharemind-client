import styled from 'styled-components';
import { Green, Grey5, White } from 'styles/color';
import { Caption2 } from 'styles/font';
interface TagLetterStatusProps {
  tagType: LetterState;
  isActive: boolean;
}
export const TagLetterStatus = ({
  tagType,
  isActive,
}: TagLetterStatusProps) => {
  <Wrapper background={isActive ? `${Green}` : `${Grey5}`}>
    <Caption2>{tagType}</Caption2>
  </Wrapper>;
};

const Wrapper = styled.div<{
  background: string;
}>`
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: ${White};
  align-items: center;
  padding: 0.4rem 0.8rem;
  border-radius: 0.8rem;
  background-color: ${(props) => props.background};
`;
