import styled from 'styled-components';
import { ReadyConsultCard } from '../Common/ReadyConsultCard';
import { useState } from 'react';
import { SearchResultData } from 'utils/type';
import { AppendCategoryType } from 'utils/AppendCategoryType';
interface SearchResultsProps {
  searchData: SearchResultData[];
}

//임의로 ConsultInReady 그대로 사용
export const CategorySearchResults = ({ searchData }: SearchResultsProps) => {
  //찜하기 배열 init
  const initialBookmarkStates = searchData.map(
    (data) => data.isWishList || false,
  );
  const [bookmarkStates, setBookmarkStates] = useState<boolean[]>(
    initialBookmarkStates,
  );
  return (
    <Wrapper>
      {searchData.map((value, index) => {
        return (
          <ReadyConsultCard
            index={index}
            counselorId={1}
            tagList={AppendCategoryType(
              value.consultCategories,
              value.consultStyle,
            )}
            introduction={value.introduction}
            nickname={value.nickname}
            level={value.level}
            bookmarkStates={bookmarkStates}
            setBookmarkStates={setBookmarkStates}
            rating={value.ratingAverage}
            totalReview={value.totalReview}
            consultType={value.consultTypes}
            letterPrice={value.consultCosts.편지}
            chattingPrice={value.consultCosts.채팅}
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
