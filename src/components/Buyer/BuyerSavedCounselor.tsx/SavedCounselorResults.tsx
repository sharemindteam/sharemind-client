import styled from 'styled-components';
import { WishlistDataType } from 'utils/type';
import { AppendCategoryType } from 'utils/AppendCategoryType';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import CounselorCard from 'components/Common/CounselorCard';

//
//
//

interface SavedCounselorResultsProps {
  wishlistData: WishlistDataType[];
}

//
//
//

export const SavedCounselorResults = ({
  wishlistData,
}: SavedCounselorResultsProps) => {
  return (
    <Wrapper>
      {wishlistData.map((value) => {
        return (
          <CounselorCard
            key={value.wishlistId}
            counselorId={value.counselorId}
            tagList={AppendCategoryType(
              value.consultCategories,
              value.consultStyle,
            )}
            isWishList={true}
            consultStyle={consultStyleToCharNum(value.consultStyle)}
            introduction={value.introduction}
            nickname={value.nickname}
            level={value.level}
            rating={value.ratingAverage}
            totalReview={value.totalReview}
            totalConsult={value.totalConsult}
            isSavedCounselorPage={true}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  box-sizing: border-box;
  padding: 0 2rem;
  align-items: center;
  width: 100%;
`;
