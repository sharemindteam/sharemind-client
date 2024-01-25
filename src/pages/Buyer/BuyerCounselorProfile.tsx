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
import { counselorDummyData as dummy } from 'utils/buyerDummy';
import { reviewDummy } from 'utils/buyerDummy';
import { CartegoryState } from 'utils/type';
export const BuyerCounselorProfile = () => {
  const { id } = useParams();
  //Nav 버튼 toggle
  const [isInfo, setIsInfo] = useState<boolean>(true);
  if (id !== undefined) {
    const counselorId = parseInt(id, 10);
    const tagListCast: CartegoryState[] = dummy[1].tagList as CartegoryState[];
    return (
      <Wrapper>
        <CounselorProfileHeader />
        <Body>
          <CounselorProfileCard
            nickname={dummy[1].nickname}
            level={dummy[1].level}
            rating={dummy[1].rating}
            reviewNumber={dummy[1].reviewNumber}
            tagList={tagListCast}
            iconNumber={dummy[1].iconNumber}
          />
          <CounselorProfileNav
            isInfo={isInfo}
            setIsInfo={setIsInfo}
            reviewNumber={dummy[1].reviewNumber}
          />
          {isInfo ? (
            <>
              <CounselorInfo
                consultType={dummy[1].consultType}
                letterPrice={dummy[1].letterPrice}
                chattingPrice={dummy[1].chattingPrice}
              />
              <CounselorExp experience={dummy[1].experience} />
            </>
          ) : (
            <CounselorReview reviewList={reviewDummy} />
          )}
        </Body>
        <CounselorFooter isBookmarked={dummy[1].isBookmarked} />
      </Wrapper>
    );
  } else {
    return <>404 error</>;
  }
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Body = styled.div`
  min-height: calc(var(--vh, 1vh) * 100 - 12.5rem);
`;
