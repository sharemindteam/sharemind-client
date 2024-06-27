import { ReadyConsultCard } from '../Common/ReadyConsultCard';
import { SearchResultData } from 'utils/type';
import { AppendCategoryType } from 'utils/AppendCategoryType';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { Flex } from 'components/Common/Flex';

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
  return (
    <Flex
      direction="column"
      gap="0.8rem"
      style={{ padding: '0 2rem 3.5rem 2rem' }}
    >
      {searchData.map((value, index) => {
        return (
          <ReadyConsultCard
            // 나중에 id로 변경
            key={value.counselorId}
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
            isWishList={value.isWishList}
            totalConsult={value.totalConsult}
            rating={value.ratingAverage}
            totalReview={value.totalReview}
            consultType={value.consultTypes}
            letterPrice={value.consultCosts.편지}
            chattingPrice={value.consultCosts.채팅}
          />
        );
      })}
    </Flex>
  );
};
