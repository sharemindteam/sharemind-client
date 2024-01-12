import styled from 'styled-components';
import { Green, Grey1, Grey5, White } from 'styles/color';
import { Button2 } from 'styles/font';
interface LetterTagsProps {
  tagStatus: number;
  setTagStatus: React.Dispatch<React.SetStateAction<number>>;
  active: number;
}
export const LetterTags = ({
  tagStatus,
  setTagStatus,
  active,
}: LetterTagsProps) => {
  return (
    <TagWrapper>
      <Box1
        onClick={() => {
          if (active >= 0) setTagStatus(0);
        }}
        focus={tagStatus === 0}
      >
        {active >= 0 && tagStatus !== 0 ? (
          <Button2 color={Grey1}>질문</Button2>
        ) : (
          <Button2 color={White}>질문</Button2>
        )}
      </Box1>
      <Box1
        focus={tagStatus === 1}
        onClick={() => {
          if (active >= 1) setTagStatus(1);
        }}
      >
        {active >= 1 && tagStatus !== 1 ? (
          <Button2 color={Grey1}>답장</Button2>
        ) : (
          <Button2 color={White}>답장</Button2>
        )}
      </Box1>
      <Box2
        onClick={() => {
          if (active >= 2) setTagStatus(2);
        }}
        focus={tagStatus === 2}
      >
        {active >= 2 && tagStatus !== 2 ? (
          <Button2 color={Grey1}>추가질문</Button2>
        ) : (
          <Button2 color={White}>추가질문</Button2>
        )}
      </Box2>
      <Box2
        onClick={() => {
          if (active >= 3) setTagStatus(3);
        }}
        focus={tagStatus === 3}
      >
        {active >= 3 && tagStatus !== 3 ? (
          <Button2 color={Grey1}>추가답장</Button2>
        ) : (
          <Button2 color={White}>추가답장</Button2>
        )}
      </Box2>
    </TagWrapper>
  );
};
const TagWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 0.8rem 2rem;
`;
const Box1 = styled.div<{ focus: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.7rem;
  height: 3.4rem;
  background-color: ${(props) => (props.focus ? Green : Grey5)};
  border-radius: 1.2rem;
  cursor: pointer;
`;
const Box2 = styled.div<{ focus: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8.1rem;
  height: 3.4rem;
  background-color: ${(props) => (props.focus ? Green : Grey5)};
  border-radius: 1.2rem;
  cursor: pointer;
`;
