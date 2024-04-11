import { BackDrop } from 'components/Common/BackDrop';
import BottomSection from 'components/Seller/SellerOpenConsult/BottomSection';
import CommentListSection from 'components/Seller/SellerOpenConsult/CommentListSection';
import IsSendPopup from 'components/Seller/SellerOpenConsult/IsSendPopup';
import MainQuestionSection from 'components/Seller/SellerOpenConsult/MainQuestionSection';
import MainQuestion from 'components/Seller/SellerOpenConsult/MainQuestionSection';
import OpenConsultHeader from 'components/Seller/SellerOpenConsult/OpenConsultHeader';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isSendPopupOpenState } from 'utils/atom';

function SellerOpenConsult() {
  const isSendPopupOpen = useRecoilValue(isSendPopupOpenState);
  const [isReplying, setIsReplying] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setIsReplying(false);
        }}
      >
        <OpenConsultHeader />
        <MainQuestionSection />
        <CommentListSection />
      </div>
      <BottomSection isReplying={isReplying} setIsReplying={setIsReplying} />
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
