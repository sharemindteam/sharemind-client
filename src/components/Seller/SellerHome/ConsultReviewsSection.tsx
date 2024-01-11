import { ContentTag } from 'pages/Seller/SellerHome';
import styled from 'styled-components';
import { Black, Grey6 } from 'styles/color';
import { Body1, Body2, Body3, Heading } from 'styles/font';
import { ReactComponent as RightArrow } from 'assets/icons/right-arrow.svg';
import { ReactComponent as ReviewHeart } from 'assets/icons/review-heart.svg';
import { useNavigate } from 'react-router-dom';
// 섹션 안에서 axios 요청
export const ConsultReviewSection = () => {
  const navigate = useNavigate();
  return (
    <>
      <ContentTag
        onClick={() => {
          navigate('/seller/mypage/review');
        }}
      >
        <Heading color={Black} margin="0px auto 0px 0px">
          상담 후기
        </Heading>
        <RightArrow />
      </ContentTag>
      <ConsultReviewList>
        {/* 1번째 상담 리뷰 */}
        <ConsultReview>
          <div className="flex-1">
            <Body1>김**</Body1>
            <Body3 margin="0 0 0 auto">12월 08일</Body3>
          </div>
          <div className="flex-2">
            <ReviewHeart />
            <ReviewHeart />
            <ReviewHeart />
            <ReviewHeart />
            <ReviewHeart />
          </div>
          <div className="content">
            <Body2>매번 친절한 상담 감사드립니다 ㅎㅎ 다음에 또 올게요</Body2>
          </div>
        </ConsultReview>
        {/* 2번째 상담 리뷰 */}
        <ConsultReview>
          <div className="flex-1">
            <Body1>김**</Body1>
            <Body3 margin="0 0 0 auto">12월 08일</Body3>
          </div>
          <div className="flex-2">
            <ReviewHeart />
            <ReviewHeart />
            <ReviewHeart />
            <ReviewHeart />
            <ReviewHeart />
          </div>
          <div className="content">
            <Body2>
              {' '}
              부정적인 표현을 하더라도 상담자의 기분을 생각해서 배려하는
              대화방식인데 대화하는 도중에 짜증나지 않는 타입입니다. 대화하는
              방식이 매우 적절하고 넘은 시간이 있어 차감하고 한번 더 상담할
              예정입니다.
            </Body2>
          </div>
        </ConsultReview>
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
