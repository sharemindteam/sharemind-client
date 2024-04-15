import CommentListSection from 'components/Buyer/BuyerOpenConsultDetail/CommentListSection';
import MainQuestionSection from 'components/Buyer/BuyerOpenConsultDetail/MainQuestionSection';
import OpenConsultHeader from 'components/Buyer/BuyerOpenConsultDetail/OpenConsultHeader';
import { Space } from 'components/Common/Space';
import React from 'react';

function BuyerOpenConsultDetail() {
  return (
    <>
      <OpenConsultHeader />
      <Space height="5.2rem" />
      <MainQuestionSection />
      <CommentListSection />
    </>
  );
}

export default BuyerOpenConsultDetail;
