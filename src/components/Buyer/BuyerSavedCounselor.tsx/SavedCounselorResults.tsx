import styled from 'styled-components';
import { WishlistDataType } from 'utils/type';
import { AppendCategoryType } from 'utils/AppendCategoryType';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { SavedCounselorCard } from './SavedCounselorCard';
interface SavedCounselorResultsProps {
  wishlistData: WishlistDataType[];
}

//임의로 ConsultInReady 그대로 사용
export const SavedCounselorResults = ({
  wishlistData,
}: SavedCounselorResultsProps) => {
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
`;
