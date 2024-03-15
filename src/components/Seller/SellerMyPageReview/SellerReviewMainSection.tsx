import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReviewCard, ReviewCardProps } from './ReviewCard';
import { getMinderReviews } from 'api/get';
import { ReactComponent as NoCalculationGraphicIcon } from 'assets/icons/graphic-no-calculation.svg';
import { useNavigate } from 'react-router-dom';
import { Grey4 } from 'styles/color';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

interface ReviewData {
  reviewId: number;
  nickname: string;
  consultStyle: string;
  level: string;
  ratingAverage: string;
  totalReview: string;
  consultType: string;
  consultedAt: string;
  consultCost: string;
  rating: number;
  comment: string;
}

export const SellerReviewMainSection = () => {
  const navigate = useNavigate();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLastElem, setIsLastElem] = useState<boolean>(false);
  const [cardList, setCardList] = useState<ReviewData[]>([]);

  const preventRef = useRef(true);

  const fetchReviewData = async (lastId: number) => {
    const params = {
      reviewId: lastId,
    };
    const reviewRes: any = await getMinderReviews({ params });
    if (reviewRes?.status === 200) {
      if (reviewRes.data.length !== 0) {
        if (lastId === 0) {
          setCardList(reviewRes.data);
        } else {
          const updatedReviews = [...cardList, ...reviewRes.data];
          setCardList(updatedReviews);
        }
      } else {
        setIsLastElem(true);
      }
    } else if (reviewRes?.response?.status === 403) {
      alert(
        '아직 상담 프로필이 존재하지 않거나 상담 프로필 심사가 완료되지 않았어요.',
      );
      navigate('/minder/mypage');
    }
  };
  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (entry[0].isIntersecting && !isLastElem && preventRef.current) {
      preventRef.current = false;
      await fetchReviewData(cardList[cardList.length - 1]?.reviewId);
      preventRef.current = true;
    }
  };
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
    onIntersect,
  });
  useEffect(() => {
    fetchReviewData(0);
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
            price={item.consultCost}
            rating={item.rating}
            review={item.comment}
          />
        ))}
      </ReviewCardList>
      {!isLastElem ? (
        <div ref={setTarget} style={{ height: '3.5rem' }} />
      ) : (
        <div style={{ height: '3.5rem' }} />
      )}
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
