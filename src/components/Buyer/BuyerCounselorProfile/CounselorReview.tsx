import { getReviews } from 'api/get';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey6 } from 'styles/color';
import { Body1, Body2, Body3, Heading } from 'styles/font';
import { HeartRate } from 'utils/HeartRate';
import { Review } from 'utils/type';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import { useRecoilState } from 'recoil';
import { isLoadingState } from 'utils/atom';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
interface CounselorReviewProps {
  counselorId: number;
}
export const CounselorReview = ({ counselorId }: CounselorReviewProps) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [isLastElem, setIsLastElem] = useState<boolean>(false);
  //pending 함수
  const testFetch = (delay = 6000) =>
    new Promise((res) => setTimeout(res, delay));
  const fetchReviewData = async (lastReviewId: number) => {
    setIsLoading(true);
    const params = {
      reviewId: lastReviewId,
    };
    try {
      const res: any = await getReviews(counselorId, { params });
      if (res.status === 200) {
        if (res.data.length !== 0) {
          if (lastReviewId === 0) {
            setReviews(res.data);
          } else {
            const updatedReviews = [...reviews, ...res.data];
            setReviews(updatedReviews);
          }
        } else {
          setIsLastElem(true);
        }
      } else if (res.response.status === 404) {
        alert('존재하지 않는 상담사의 리뷰 요청입니다.');
        navigate('/');
      }
    } catch (e) {
      alert(e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1);
    }
  };
  const onIntersect: IntersectionObserverCallback = async (entry, observer) => {
    //&& !isLoading
    if (entry[0].isIntersecting) {
      observer.unobserve(entry[0].target);
      await fetchReviewData(reviews[reviews.length - 1].reviewId);
      await testFetch();
      observer.observe(entry[0].target);
    }
  };
  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1,
    onIntersect,
  });
  //첫 렌더 시에 data fetch
  useLayoutEffect(() => {
    fetchReviewData(0);
  }, []);

  // if (isLoading) {
  //   return (
  //     <>
  //       <LoadingSpinner />
  //     </>
  //   );
  // } else {
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
            <ReviewCard key={value.reviewId}>
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
        {!isLastElem ? (
          <div ref={setTarget} style={{ height: '5rem' }} />
        ) : null}
      </Wrapper>
    );
  }
};
// };
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
