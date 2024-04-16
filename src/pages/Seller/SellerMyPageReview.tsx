import { SellerReviewHeader } from 'components/Seller/SellerMyPageReview/SellerReviewHeader';
import { SellerReviewMainSection } from 'components/Seller/SellerMyPageReview/SellerReviewMainSection';

export const SellerMyPageReview = () => {
  return (
    <>
      <SellerReviewHeader />
      <div style={{ height: 'calc(100% - 5rem)', overflow: 'scroll' }}>
        <SellerReviewMainSection />
      </div>
    </>
  );
};

