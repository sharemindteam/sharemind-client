import { SearchResultData } from 'utils/type';
import { AppendCategoryType } from 'utils/AppendCategoryType';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { Flex } from 'components/Common/Flex';
import CounselorCard from 'components/Common/CounselorCard';
import EmptySection from 'components/Common/EmptySection';

//
//
//

interface AvailCounselorSearchResultsProps {
  searchData: SearchResultData[];
}

//
//
//

export const AvailCounselorSearchResults = ({
  searchData,
}: AvailCounselorSearchResultsProps) => {
  if (searchData.length === 0) {
    return <EmptySection title="현재 시간 기준 가능한 마인더가 없어요" />;
  }

  return (
    <Flex
      direction="column"
      gap="0.8rem"
      style={{ padding: '0 2rem 3.5rem 2rem' }}
    >
      {searchData.map((value) => {
        return (
          <CounselorCard
            key={value.counselorId}
            counselorId={value.counselorId}
            tagList={AppendCategoryType(
              value.consultCategories,
              value.consultStyle,
            )}
            consultStyle={consultStyleToCharNum(value.consultStyle)}
            introduction={value.introduction}
            nickname={value.nickname}
            level={value.level}
            isWishList={value.isWishList}
            totalConsult={value.totalConsult}
            rating={value.ratingAverage}
            totalReview={value.totalReview}
            isRealtime={value.isRealtime}
          />
        );
      })}
    </Flex>
  );
};
