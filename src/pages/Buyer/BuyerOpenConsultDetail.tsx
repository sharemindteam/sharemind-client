import CommentListSection from 'components/Buyer/BuyerOpenConsultDetail/CommentListSection';
import MainQuestionSection from 'components/Buyer/BuyerOpenConsultDetail/MainQuestionSection';
import OpenConsultHeader from 'components/Buyer/BuyerOpenConsultDetail/OpenConsultHeader';
import React from 'react';

function BuyerOpenConsultDetail() {
  return (
    <>
      <OpenConsultHeader />
      <MainQuestionSection />
      <CommentListSection />
    </>
  );
}

export default BuyerOpenConsultDetail;
