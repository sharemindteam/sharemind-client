import { getReviewsCustomer } from 'api/get';
import { ReviewManageCard } from 'components/Buyer/BuyerReviewManage/ReviewManageCard';
import { ReviewManageNav } from 'components/Buyer/BuyerReviewManage/ReviewManageNav';
import { ReviewModal } from 'components/Buyer/BuyerReviewManage/ReviewModal';
import { ReviewWroteCard } from 'components/Buyer/BuyerReviewManage/ReviewWroteCard';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useLayoutEffect, useState } from 'react';
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
  useLayoutEffect(() => {
    const fetchReviewData = async () => {
      const params = { isCompleted: !isReviewWrite, reviewId: 0 };
      const res: any = await getReviewsCustomer({ params });
      if (res.status === 200) {
        setReviewData(res.data);
      } else if (res.response.status === 404) {
        alert('존재하지 않는 회원입니다.');
      }
    };
    fetchReviewData();
  }, [isReviewWrite]);
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
          {reviewData.map((value) => {
            return <ReviewManageCard key={value.reviewId} reviewData={value} />;
          })}
        </CardWrapper>
      ) : (
        <CardWrapper>
          {reviewData.map((value) => {
            return <ReviewWroteCard key={value.reviewId} reviewData={value} />;
          })}
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

const BackDrop = styled.div`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  position: fixed;
  top: 0;
  z-index: 2001;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;
