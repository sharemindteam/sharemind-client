import { Flex } from 'components/Common/Flex';
import { TagA2Cartegory } from 'components/Common/TagA2Cartegory';
import styled from 'styled-components';
import { Grey1 } from 'styles/color';
import { Subtitle } from 'styles/font';
import { CartegoryState } from 'utils/type';

//
//
//

interface CounselorTypeSectionProps {
  tagList: CartegoryState[];
}

//
//
//

const CounselorTypeSection = ({ tagList }: CounselorTypeSectionProps) => {
  return (
    <Wrapper>
      <Subtitle color={Grey1} style={{ textAlign: 'left', width: '100%' }}>
        이런 분야에 자신 있어요
      </Subtitle>
      <Flex gap="0.8rem" justify="flex-start">
        {tagList.map((value) => (
          <TagA2Cartegory tagType={value} bgColorType={1} />
        ))}
      </Flex>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  padding: 1.2rem 2rem 3rem 2rem;
  margin-bottom: 5.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export default CounselorTypeSection;
