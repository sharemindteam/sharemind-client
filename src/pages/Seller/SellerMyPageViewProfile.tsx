import { ReviseButton } from 'components/Seller/SellerMyPageViewProfile/ReviseButton';
import { ViewProfileHeader } from 'components/Seller/SellerMyPageViewProfile/ViewProfileHeader';
import { ViewProfileMainSection } from 'components/Seller/SellerMyPageViewProfile/ViewProfileMainSection';

export const SellerMypageViewProfile = () => {
  return (
    <>
      <ViewProfileHeader />
      <ViewProfileMainSection />
      <ReviseButton />
    </>
  );
};
