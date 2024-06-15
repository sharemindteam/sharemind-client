import { BackDrop } from 'components/Common/BackDrop';
import BottomSection from 'components/Seller/SellerOpenConsult/BottomSection';
import CommentListSection from 'components/Seller/SellerOpenConsult/CommentListSection';
import IsSendPopup from 'components/Seller/SellerOpenConsult/IsSendPopup';
import MainQuestionSection from 'components/Seller/SellerOpenConsult/MainQuestionSection';
import NoConsultSection from 'components/Seller/SellerOpenConsult/NoConsultGraphic';
import OpenConsultHeader from 'components/Seller/SellerOpenConsult/OpenConsultHeader';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isSendPopupOpenState } from 'utils/atom';

function SellerOpenConsult() {
  const isSendPopupOpen = useRecoilValue(isSendPopupOpenState);
  const [isReplying, setIsReplying] = useState(false);
  const [text, setText] = useState<string>('');
  const { consultid } = useParams();
  return (
    <>
      <div
        style={{ height: '100vh' }}
        onClick={() => {
          setIsReplying(false);
        }}
      >
        <OpenConsultHeader />
        {consultid === 'all-adopted' ? (
          <NoConsultSection />
        ) : (
          <div
            className="scroll-container"
            style={{ height: 'calc(100vh - 10rem)', overflow: 'scroll' }}
          >
            <MainQuestionSection />
            <CommentListSection />
          </div>
        )}
      </div>
      {consultid !== 'all-adopted' && (
        <BottomSection
          isReplying={isReplying}
          setIsReplying={setIsReplying}
          text={text}
          setText={setText}
        />
      )}

      {isSendPopupOpen && (
        <>
          <IsSendPopup
            text={text}
            setText={setText}
            setIsReplying={setIsReplying}
          />
          <BackDrop />
        </>
      )}
    </>
  );
}

export default SellerOpenConsult;
