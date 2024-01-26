//모든 검색 결과, 나중에는 각 검색에 대하여 각각의 검색 컴포넌트 따로 생성
import styled from 'styled-components';
import { ReadyConsultCard } from '../Common/ReadyConsultCard';
import { useState } from 'react';
import { WishlistDataType } from 'utils/type';
import { AppendCategoryType } from 'utils/AppendCategoryType';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { counselorDummyData as dummy } from 'utils/buyerDummy';
import { SavedCounselorCard } from './SavedCounselorCard';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
interface SavedCounselorResultsProps {
  wishlistData: WishlistDataType[];
}

//임의로 ConsultInReady 그대로 사용
export const SavedCounselorResults = ({
  wishlistData,
}: SavedCounselorResultsProps) => {
  const initialBookmarkStates = dummy.map((data) => data.isBookmarked || false);
  const [bookmarkStates, setBookmarkStates] = useState<boolean[]>(
    initialBookmarkStates,
  );

  return (
    <Wrapper>
      {wishlistData.map((value, index) => {
        return (
          <SavedCounselorCard
            // 나중에 id로 변경
            key={index}
            counselorId={value.counselorId}
            tagList={AppendCategoryType(
              value.consultCategories,
              value.consultStyle,
            )}
            consultStyle={consultStyleToCharNum(value.consultStyle)}
            consultTimes={value.consultTimes}
            introduction={value.introduction}
            nickname={value.nickname}
            level={value.level}
            wishlistId={value.wishlistId}
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
