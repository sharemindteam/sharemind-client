import { BackDrop } from 'components/Common/BackDrop';
import BottomSection from 'components/Seller/SellerOpenConsult/BottomSection';
import CommentListSection from 'components/Seller/SellerOpenConsult/CommentListSection';
import IsSendPopup from 'components/Seller/SellerOpenConsult/IsSendPopup';
import MainQuestionSection from 'components/Seller/SellerOpenConsult/MainQuestionSection';
import MainQuestion from 'components/Seller/SellerOpenConsult/MainQuestionSection';
import OpenConsultHeader from 'components/Seller/SellerOpenConsult/OpenConsultHeader';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { isSendPopupOpenState } from 'utils/atom';

function SellerOpenConsult() {
  const isSendPopupOpen = useRecoilValue(isSendPopupOpenState);

  return (
    <>
      <OpenConsultHeader />
      <MainQuestionSection />
      <CommentListSection />
      <BottomSection />
      {isSendPopupOpen && (
        <>
          <IsSendPopup />
          <BackDrop />
        </>
      )}
    </>
  );
}

export default SellerOpenConsult;
