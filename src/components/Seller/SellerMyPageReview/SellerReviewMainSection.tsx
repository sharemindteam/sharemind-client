import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReviewCard, ReviewCardProps } from './ReviewCard';

export const SellerReviewMainSection = () => {
  const [cardList, setCardList] = useState<ReviewCardProps[]>();
  useEffect(() => {
    setCardList([
      {
        id: '12312',
        name: '정인영',
        iconType: 1,
        consultType: '편지',
        date: '2023년 10월 27일',
        price: '8000원',
        rating: 4,
        review:
          '후기가없어서 고민하다가 신청했는데 전혀 후회없었습니다. 저도 여자인데 정말 친한 언니처럼 얘기 들어주시고 조언해주시고 공감해주셔서 마음이 많이 편해졌습니다.',
      },
      {
        id: '1231212',
        name: '정해영',
        iconType: 1,
        consultType: '편지',
        date: '2023년 10월 27일',
        price: '8000원',
        rating: 2,
        review:
          '후기가없어서 고민하다가 신청했는데 전혀 후회없었습니다. 저도 여자인데 정말 친한 언니처럼 얘기 들어주시고 조언해주시고 공감해주셔서 마음이 많이 편해졌습니다.',
      },
    ]);
  }, []);
  return (
    <>
      <ReviewCardList>
        {cardList?.map((item) => (
          <ReviewCard
            key={item.id}
            name={item.name}
            iconType={1}
            consultType={item.consultType}
            date={item.date}
            price="8000원"
            rating={item.rating}
            review={item.review}
          />
        ))}
      </ReviewCardList>
    </>
  );
};

const ReviewCardList = styled.div`
  margin: 1.2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
