import { getReviewsCustomer } from 'api/get';
import { ReviewManageCard } from 'components/Buyer/BuyerReviewManage/ReviewManageCard';
import { ReviewManageNav } from 'components/Buyer/BuyerReviewManage/ReviewManageNav';
import { ReviewModal } from 'components/Buyer/BuyerReviewManage/ReviewModal';
import { ReviewWroteCard } from 'components/Buyer/BuyerReviewManage/ReviewWroteCard';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { BackDrop } from 'components/Common/BackDrop';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';
import { isModifyReviewState, scrollLockState } from 'utils/atom';
import { BuyerReview } from 'utils/type';

export const BuyerReviewManage = () => {
  const navigate = useNavigate();
  //리뷰 작성이면 true 남긴 리뷰면 false
  const [isReviewWrite, setIsReviewWrite] = useState<boolean>(true);
  //리뷰 작성이면 true 남긴 리뷰면 false
  const [reviewData, setReviewData] = useState<BuyerReview[]>([]);
  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] =
    useRecoilState<boolean>(isModifyReviewState);
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  //Loading
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLastElem, setIsLastElem] = useState<boolean>(false);

  const preventRef = useRef(true); // 중복 방지 옵션

  /**
   *
   */
  const fetchReviewData = async (lastReviewId: number) => {
    const params = { isCompleted: !isReviewWrite, reviewId: lastReviewId };
    try {
      const res: any = await getReviewsCustomer({ params });
      if (res.status === 200) {
        if (res.data.length !== 0) {
          if (lastReviewId === 0) {
            setReviewData(res.data);
          } else {
            const updatedReviews = [...reviewData, ...res.data];
            setReviewData(updatedReviews);
          }
        } else {
          setIsLastElem(true);
        }
      } else if (res.response.status === 404) {
        alert('존재하지 않는 회원입니다.');
      }
    } catch (e) {
      alert(e);
    } finally {
      if (lastReviewId === 0) {
        setIsLoading(false);
      }
    }
  };

  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (
      entry[0].isIntersecting &&
      !isLoading &&
      !isLastElem &&
      preventRef.current
    ) {
      preventRef.current = false;
      await fetchReviewData(reviewData[reviewData.length - 1].reviewId);
      preventRef.current = true;
    }
  };
  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
    onIntersect,
  });

  //
  //
  //
  useLayoutEffect(() => {
    setIsLastElem(false);
    setIsLoading(true);
    setReviewData([]);
    fetchReviewData(0);
  }, [isReviewWrite]);

  //
  //
  //

  if (isLoading) {
    return (
      <>
        <HeaderWrapper border={false}>
          <BackIcon
            onClick={() => {
              navigate('/mypage');
            }}
          />
          <Heading color={Grey1}>리뷰관리</Heading>
        </HeaderWrapper>
        <ReviewManageNav
          isWrite={isReviewWrite}
          setIsWrite={setIsReviewWrite}
        />
      </>
    );
  }

  return (
    <>
      <HeaderWrapper border={false}>
        <BackIcon
          onClick={() => {
            navigate('/mypage');
          }}
        />
        <Heading color={Grey1}>리뷰관리</Heading>
      </HeaderWrapper>
      <ReviewManageNav isWrite={isReviewWrite} setIsWrite={setIsReviewWrite} />
      {isReviewWrite ? (
        <CardWrapper>
          {reviewData.map((value) => {
            return (
              <ReviewManageCard key={value?.reviewId} reviewData={value} />
            );
          })}
          {!isLastElem ? (
            <div
              ref={setTarget}
              style={{
                height: '3.5rem',
                width: '10rem',
              }}
            />
          ) : (
            <div
              style={{
                height: '3.5rem',
                width: '10rem',
              }}
            />
          )}
        </CardWrapper>
      ) : (
        <CardWrapper>
          {reviewData.map((value) => {
            return <ReviewWroteCard key={value?.reviewId} reviewData={value} />;
          })}
          {!isLastElem ? (
            <div
              ref={setTarget}
              style={{
                height: '3.5rem',
                width: '10rem',
              }}
            />
          ) : (
            <div
              style={{
                height: '3.5rem',
                width: '10rem',
              }}
            />
          )}
        </CardWrapper>
      )}
      {isModalOpen ? (
        <>
          <BackDrop
            onClick={() => {
              //여기서 api 호출
              setIsModalOpen(false);
              setScrollLock(false);
            }}
          />
          <ReviewModal />
        </>
      ) : null}
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
