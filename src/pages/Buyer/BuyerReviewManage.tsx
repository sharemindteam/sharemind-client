import { ReviewManageCard } from 'components/Buyer/BuyerReviewManage/ReviewManageCard';
import { ReviewManageNav } from 'components/Buyer/BuyerReviewManage/ReviewManageNav';
import { ReviewWroteCard } from 'components/Buyer/BuyerReviewManage/ReviewWroteCard';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';
import { reviewDummyData as dummy } from 'utils/counselorDummy';
import { wroteReviewDummyData as wroteDummy } from 'utils/counselorDummy';
export const BuyerReviewManage = () => {
  const navigate = useNavigate();
  //리뷰 작성이면 true 남긴 리뷰면 false
  const [isReviewWrite, setIsReviewWrite] = useState<boolean>(true);
  return (
    <>
      <HeaderWrapper border={false}>
        <BackIcon
          onClick={() => {
            navigate('/buyer/mypage');
          }}
        />
        <Heading color={Grey1}>리뷰관리</Heading>
      </HeaderWrapper>
      <ReviewManageNav isWrite={isReviewWrite} setIsWrite={setIsReviewWrite} />
      {isReviewWrite ? (
        <CardWrapper>
          {dummy.map((value) => {
            return (
              <ReviewManageCard
                counselorId={value.counselorId}
                nickname={value.nickname}
                level={value.level}
                ratingAverage={value.rating_average}
                reviewNumber={value.reviewNumber}
                iconNumber={value.iconNumber}
                consultType={value.consultType}
                price={value.price}
                date={value.date}
              />
            );
          })}
        </CardWrapper>
      ) : (
        <CardWrapper>
          {wroteDummy.map((value) => {
            return (
              <ReviewWroteCard
                counselorId={value.counselorId}
                nickname={value.nickname}
                level={value.level}
                ratingAverage={value.rating_average}
                reviewNumber={value.reviewNumber}
                iconNumber={value.iconNumber}
                consultType={value.consultType}
                price={value.price}
                date={value.date}
                rating={value.rating}
                comment={value.comment}
              />
            );
          })}
        </CardWrapper>
      )}
    </>
  );
};
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1.2rem;
`;
