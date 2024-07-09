import styled from 'styled-components';
import { ReadyConsultCard } from '../Common/ReadyConsultCard';
import { SearchResultData } from 'utils/type';
import { AppendCategoryType } from 'utils/AppendCategoryType';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { Flex } from 'components/Common/Flex';
import CounselorCard from 'components/Common/CounselorCard';
interface CategorySearchResultsProps {
  searchData: SearchResultData[];
}

//임의로 ConsultInReady 그대로 사용
export const CategorySearchResults = ({
  searchData,
}: CategorySearchResultsProps) => {
  return (
    <Flex direction="column" gap="0.8rem" style={{ padding: '0 2rem' }}>
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
            rating={value.ratingAverage}
            totalReview={value.totalReview}
            totalConsult={value.totalConsult}
            isRealtime={value.isRealtime}
          />
        );
      })}
    </Flex>
  );
};
