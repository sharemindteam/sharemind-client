import { TagLetterStatus } from 'components/Common/TagLetterStatus';
import { useEffect } from 'react';
import styled from 'styled-components';
interface LetterTagListSectionProps {
  tagStatus?: number;
  setTagStatus: React.Dispatch<React.SetStateAction<number>>;
  tagActiveLevel: number;
}
export const LetterTagListSection = ({
  tagStatus,
  setTagStatus,
  tagActiveLevel,
}: LetterTagListSectionProps) => {
  // 1,2,3,4,5,6,...
  //질문이 왔을 때는 답장탭까지 활성화, 답장이 왔을 때는 추가 질문까지 활성화 
  return (
    <LetterTagListSectionWrapper>
      <TagLetterStatus
        tagType="질문"
        onClick={() => {
          setTagStatus(0);
        }}
        // isActive: 태그에 따른 탭 활성화 되었는지, isSelect: 태그에 따른 탭이 선택되었는지
        isActive={true}
        isSelect={tagStatus === 0 ? true : false}
      />
      <TagLetterStatus
        tagType="답장"
        onClick={() => {
          setTagStatus(1);
        }}
        // isActive: 태그에 따른 탭 활성화 되었는지, isSelect: 태그에 따른 탭이 선택되었는지
        isActive={tagActiveLevel >= 1}
        isSelect={tagStatus === 1 ? true : false}
      />
      <TagLetterStatus
        tagType="추가질문"
        onClick={() => {
          setTagStatus(2);
        }}
        // isActive: 태그에 따른 탭 활성화 되었는지, isSelect: 태그에 따른 탭이 선택되었는지
        isActive={tagActiveLevel >= 2}
        isSelect={tagStatus === 2 ? true : false}
      />
      <TagLetterStatus
        tagType="추가답장"
        onClick={() => {
          setTagStatus(3);
        }}
        // isActive: 태그에 따른 탭 활성화 되었는지, isSelect: 태그에 따른 탭이 선택되었는지
        isActive={tagActiveLevel >= 3}
        isSelect={tagStatus === 3 ? true : false}
      />
    </LetterTagListSectionWrapper>
  );
};

const LetterTagListSectionWrapper = styled.div`
  display: flex;
  height: 5rem;
  align-items: center;
  margin-left: 2rem;
  gap: 1.2rem;
  border-bottom: 1px solid var(--Greyscale-Grey-6, #f6f6fa);
`;
