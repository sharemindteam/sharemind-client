//모든 검색 결과, 나중에는 각 검색에 대하여 각각의 검색 컴포넌트 따로 생성
import styled from 'styled-components';
import { ReadyConsultCard } from '../Common/ReadyConsultCard';
import { useState } from 'react';
import { counselorDummyData as dummy } from 'utils/buyerDummy';
import { CartegoryState } from 'utils/type';

//임의로 ConsultInReady 그대로 사용
export const SearchResults = () => {
  //찜하기 배열 init
  const initialBookmarkStates = dummy.map((data) => data.isBookmarked || false);
  const [bookmarkStates, setBookmarkStates] = useState<boolean[]>(
    initialBookmarkStates,
  );
  return (
    <Wrapper>
      {dummy.map((value, index) => {
        const tagListCast: CartegoryState[] = value.tagList as CartegoryState[];
        return (
          <ReadyConsultCard
            index={index}
            counselorId={value.counselorId}
            tagList={tagListCast}
            introduction={value.introduction}
            nickname={value.nickname}
            level={value.level}
            bookmarkStates={bookmarkStates}
            setBookmarkStates={setBookmarkStates}
            rating={value.rating}
            reviewNumber={value.reviewNumber}
            iconNumber={value.iconNumber}
            consultType={value.consultType}
            letterPrice={value.letterPrice}
            chattingPrice={value.chattingPrice}
          />
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3.5rem;
`;
