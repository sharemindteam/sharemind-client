import { TagA2Cartegory } from 'components/Common/TagA2Cartegory';
import styled from 'styled-components';

export const LetterTagListSection = () => {
  return (
    <LetterTagListSectionWrapper>
      <TagA2Cartegory />
    </LetterTagListSectionWrapper>
  );
};

const LetterTagListSectionWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
`;
