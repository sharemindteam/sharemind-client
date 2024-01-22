import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReviewCard, ReviewCardProps } from './ReviewCard';
import { getMinderReviews } from 'api/get';

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
  const [cardList, setCardList] = useState<ReviewData[]>();
  useEffect(() => {
    const fetchReviewData = async () => {
      const params = {
        cursorId: 0,
      };
      const reviewRes: any = await getMinderReviews({ params });
      setCardList(reviewRes.data);
    };
    fetchReviewData();
    // setCardList([
    //   {
    //     id: '12312',
    //     name: '정인영',
    //     iconType: 1,
    //     consultType: '편지',
    //     date: '2023년 10월 27일',
    //     price: '8000원',
    //     rating: 4,
    //     review:
    //       '후기가없어서 고민하다가 신청했는데 전혀 후회없었습니다. 저도 여자인데 정말 친한 언니처럼 얘기 들어주시고 조언해주시고 공감해주셔서 마음이 많이 편해졌습니다.',
    //   },
    //   {
    //     id: '1231212',
    //     name: '정해영',
    //     iconType: 1,
    //     consultType: '편지',
    //     date: '2023년 10월 27일',
    //     price: '8000원',
    //     rating: 2,
    //     review:
    //       '후기가없어서 고민하다가 신청했는데 전혀 후회없었습니다. 저도 여자인데 정말 친한 언니처럼 얘기 들어주시고 조언해주시고 공감해주셔서 마음이 많이 편해졌습니다.',
    //   },
    // ]);
  }, []);
  return (
    <>
      <ReviewCardList>
        {cardList?.map((item) => (
          <ReviewCard
            key={item.reviewId}
            id={item.reviewId}  
            name={item.nickname}
            iconType={Math.floor(Math.random() * 8)}
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
