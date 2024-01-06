//모든 검색 결과, 추후 props로 결과 종류 넘기고, 그에 따라 get 요청
import styled from 'styled-components';
import { ReadyConsultCard } from '../Common/ReadyConsultCard';
import { useState } from 'react';
import { counselorDummyData as dummy } from 'utils/counselorDummy';

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
        const tagListCast: CartegoryStateArray =
          value.tagList as CartegoryStateArray;
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
