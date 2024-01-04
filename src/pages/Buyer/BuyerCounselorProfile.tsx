import {
  CounselorExp,
  CounselorFooter,
  CounselorInfo,
  CounselorProfileCard,
  CounselorProfileHeader,
  CounselorProfileNav,
  CounselorReview,
} from 'components/Buyer/BuyerCounselorProfile';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { counselorDummyData as dummy } from 'utils/counselorDummy';
import { reviewDummy } from 'utils/counselorDummy';
export const BuyerCounselorProfile = () => {
  const { id } = useParams();
  //Nav 버튼 toggle
  const [isInfo, setIsInfo] = useState<boolean>(true);
  if (id !== undefined) {
    const counselorId = parseInt(id, 10);
    const tagListCast: CartegoryStateArray = dummy[counselorId]
      .tagList as CartegoryStateArray;
    return (
      <Wrapper>
        <CounselorProfileHeader />
        <CounselorProfileCard
          nickname={dummy[counselorId].nickname}
          level={dummy[counselorId].level}
          rating={dummy[counselorId].rating}
          reviewNumber={dummy[counselorId].reviewNumber}
          tagList={tagListCast}
          iconNumber={dummy[counselorId].iconNumber}
        />
        <CounselorProfileNav
          isInfo={isInfo}
          setIsInfo={setIsInfo}
          reviewNumber={dummy[counselorId].reviewNumber}
        />
        {isInfo ? (
          <>
            <CounselorInfo
              consultType={dummy[counselorId].consultType}
              letterPrice={dummy[counselorId].letterPrice}
              chattingPrice={dummy[counselorId].chattingPrice}
            />
            <CounselorExp experience={dummy[counselorId].experience} />
          </>
        ) : (
          <CounselorReview reviewList={reviewDummy} />
        )}
        <CounselorFooter isBookmarked={dummy[counselorId].isBookmarked} />
      </Wrapper>
    );
  } else {
    return <>404 error</>;
  }
};
const Wrapper = styled.div``;
