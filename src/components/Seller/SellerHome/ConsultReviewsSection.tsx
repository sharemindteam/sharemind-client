import { ContentTag } from 'pages/Seller/SellerHome';
import styled from 'styled-components';
import { Black, Grey3, Grey6, Red } from 'styles/color';
import { Body1, Body2, Body3, Subtitle } from 'styles/font';
import { ReactComponent as RightArrow } from 'assets/icons/right-arrow.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMinderReviewsHome } from 'api/get';
import { HeartRate } from 'utils/HeartRate';

interface ReviewData {
  comment: string;
  nickname: string;
  rating: number;
  reviewId: string;
  updatedAt: string;
}
export const ConsultReviewSection = () => {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  useEffect(() => {
    const fetchHomeReview = async () => {
      const reviweRes: any = await getMinderReviewsHome();
      setReviewData(reviweRes.data);
    };
    fetchHomeReview();
  }, []);
  return (
    <>
      <ContentTag
        onClick={() => {
          navigate('/minder/mypage/review');
        }}
      >
        {reviewData?.length === 0 ? (
          <>
            <Subtitle color={Black}>받은 리뷰</Subtitle>
            <Body1 color={Red} margin="0px auto 0px 0px">
              0
            </Body1>
          </>
        ) : (
          <Subtitle color={Black} margin="0px auto 0px 0px">
            받은 리뷰
          </Subtitle>
        )}
        <RightArrow />
      </ContentTag>
      <ConsultReviewList>
        {/* 1번째 상담 리뷰 */}
        {reviewData?.length === 0 ? (
          <Body3 color={Grey3}>아직 받은 리뷰가 없어요</Body3>
        ) : (
          reviewData?.map((item) => (
            <ConsultReview
              key={item.reviewId}
              onClick={() => {
                navigate('/minder/mypage/review');
              }}
            >
              <div className="flex-1">
                <Body1>{item.nickname}</Body1>
                <Body3 margin="0 0 0 auto">{item.updatedAt}</Body3>
              </div>
              <div className="flex-2">
                <HeartRate rating={item.rating} />
              </div>
              <div className="content">
                <Body2>{item.comment}</Body2>
              </div>
            </ConsultReview>
          ))
        )}
      </ConsultReviewList>
    </>
  );
};

const ConsultReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 2rem;
`;

const ConsultReview = styled.div`
  padding: 2.2rem 1.6rem;
  background-color: ${Grey6};
  display: flex;
  border-radius: 1.2rem;
  flex-direction: column;
  gap: 1rem;
  .flex-1 {
    display: flex;
  }
  .flex-2 {
    display: flex;
    gap: 0.6rem;
  }
  .content {
  }
`;
