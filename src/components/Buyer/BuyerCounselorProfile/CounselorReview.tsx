import { getReviews } from 'api/get';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey4, Grey6 } from 'styles/color';
import { Body1, Body2, Body3, Heading } from 'styles/font';
import { HeartRate } from 'utils/HeartRate';
import { Review } from 'utils/type';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import { useRecoilState } from 'recoil';
import { isLoadingState } from 'utils/atom';
import { LoadingSpinner } from 'utils/LoadingSpinner';
interface CounselorReviewProps {
  counselorId: number;
}
export const CounselorReview = ({ counselorId }: CounselorReviewProps) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  useEffect(() => {
    const fetchReviewData = async () => {
      setIsLoading(true);
      const params = {
        cursorId: 0,
      };
      const res: any = await getReviews(counselorId, { params });
      if (res.status === 200) {
        setReviews(res.data);
      } else if (res.response.status === 404) {
        alert('존재하지 않는 상담사의 리뷰 요청입니다.');
        navigate('/buyer');
      }
      console.log(isLoading);
      setIsLoading(false);
    };
    fetchReviewData();
  }, []);
  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  } else {
    if (reviews.length === 0) {
      return (
        <EmptyWrapper>
          <EmptyIcon />
          <Heading>아직 후기가 없어요.</Heading>
        </EmptyWrapper>
      );
    } else {
      return (
        <Wrapper>
          {reviews.map((value) => {
            return (
              <ReviewCard>
                <div className="row1">
                  <Body1 color={Grey1}>{value.nickname}</Body1>
                  <Body3 color={Grey1}>{value.updateAt}</Body3>
                </div>
                <div className="row2">
                  <HeartRate rating={value.rating}></HeartRate>
                </div>
                <div className="row3">
                  <Body2>{value.comment}</Body2>
                </div>
              </ReviewCard>
            );
          })}
        </Wrapper>
      );
    }
  }
};
const Wrapper = styled.div`
  padding: 1.2rem 2rem 2rem 2rem;
  margin-bottom: 5.2rem;
`;
const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ReviewCard = styled.div`
  padding: 1.6rem;
  border-radius: 1.2rem;
  background-color: ${Grey6};
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
  .row1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const EmptyIcon = styled(Empty)`
  margin-top: 5vh;
  padding: 4.7rem 4.413rem 4.603rem 4.5rem;
`;
