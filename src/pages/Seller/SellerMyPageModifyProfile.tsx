import { ModifyProfileHeader } from 'components/Seller/SellerMyPageModifyProfile/ModifyProfileHeader';
import { ModifyProfileMainSection } from 'components/Seller/SellerMyPageModifyProfile/ModifyProfileMainSection';
import { SaveButton } from 'components/Seller/SellerMyPageModifyProfile/SaveButton';

export const SellerMypageModifyProfile = () => {
  return (
    <>
      <ModifyProfileHeader />
      <ModifyProfileMainSection />
      <SaveButton />
    </>
  );
};
