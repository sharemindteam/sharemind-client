import { SellerReviewHeader } from 'components/Seller/SellerMyPageReview/SellerReviewHeader';
import { SellerReviewMainSection } from 'components/Seller/SellerMyPageReview/SellerReviewMainSection';
import styled from 'styled-components';

export const SellerMyPageReview = () => {
  return (
    <>
      <SellerReviewHeader />
      <SellerReviewMainSection />
    </>
  );
};

const SellerMyPageReviewWrapper = styled.div``;
