import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReviewCard, ReviewCardProps } from './ReviewCard';
import { getMinderReviews } from 'api/get';
import { ReactComponent as NoCalculationGraphicIcon } from 'assets/icons/graphic-no-calculation.svg';
import { useNavigate } from 'react-router-dom';
import { Grey4 } from 'styles/color';

interface ReviewData {
  reviewId: string;
  nickname: string;
  consultStyle: string;
  level: string;
  ratingAverage: string;
  totalReview: string;
  consultType: string;
  consultedAt: string;
  consultCost: string;
  rating: string;
  comment: string;
}

export const SellerReviewMainSection = () => {
  const [cardList, setCardList] = useState<ReviewData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchReviewData = async () => {
      const params = {
        cursorId: 0,
        reviewId: 0,
      };
      const reviewRes: any = await getMinderReviews({ params });
      if (reviewRes?.response?.status === 403) {
        alert(
          '아직 상담 프로필이 존재하지 않거나 상담 프로필 심사가 완료되지 않았어요.',
        );
        navigate('/minder/mypage');
      }
      setCardList(reviewRes.data);
    };
    fetchReviewData();
  }, []);
  return (
    <>
      <ReviewCardList>
        {cardList?.length === 0 && (
          <NoCalculationGraphicWrapper>
            <NoCalculationGraphicIcon />
            <MainText color={Grey4}>아직 받은 리뷰가 없어요</MainText>
          </NoCalculationGraphicWrapper>
        )}
        {cardList?.map((item) => (
          <ReviewCard
            key={item.reviewId}
            id={item.reviewId}
            name={item.nickname}
            iconType={Math.floor(1 + Math.random() * 8)}
            consultType={item.consultType}
            date={item.consultedAt}
            price="8000원"
            rating={item.rating}
            review={item.comment}
          />
        ))}
      </ReviewCardList>
    </>
  );
};

const ReviewCardList = styled.div`
  margin-top: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
`;
const NoCalculationGraphicWrapper = styled.div`
  display: flex;
  margin-top: 23.7rem;
  align-items: center;
  flex-direction: column;
`;

const MainText = styled.div`
  color: #000;
  margin-top: 4.61rem;
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-weight: 600;
  line-height: 3rem;
`;
