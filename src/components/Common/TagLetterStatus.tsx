import styled from 'styled-components';
import { Black, Green, Grey5, White } from 'styles/color';
import { Button2 } from 'styles/font';
import { LetterState } from 'utils/type';

interface TagLetterStatusProps {
  tagType: LetterState;
  isActive?: boolean;
  isSelect?: boolean;
  onClick: any;
}
export const TagLetterStatus = ({
  tagType,
  isSelect,
  isActive,
  onClick,
}: TagLetterStatusProps) => {
  return (
    <Wrapper
      isSelect={isSelect}
      isActive={isActive}
      onClick={onClick}
      disabled={!isActive}
    >
      <Button2 color={isSelect ? White : isActive ? Black : White}>
        {tagType}
      </Button2>
    </Wrapper>
  );
};

const Wrapper = styled.button<{
  isActive: boolean | undefined;
  isSelect: boolean | undefined;
}>`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  padding: 0.8rem 1.6rem;
  border-radius: 1.2rem;
  background-color: ${(props) => (props.isSelect ? Green : Grey5)};
`;
