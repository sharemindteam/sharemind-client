import { BackDrop } from 'components/Common/BackDrop';
import BottomSection from 'components/Seller/SellerOpenConsult/BottomSection';
import CommentListSection from 'components/Seller/SellerOpenConsult/CommentListSection';
import IsSendPopup from 'components/Seller/SellerOpenConsult/IsSendPopup';
import MainQuestionSection from 'components/Seller/SellerOpenConsult/MainQuestionSection';
import NoConsultSection from 'components/Seller/SellerOpenConsult/NoConsultGraphic';
import OpenConsultHeader from 'components/Seller/SellerOpenConsult/OpenConsultHeader';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { APP_HEADER_HEIGHT, APP_HEIGHT } from 'styles/AppStyle';
import { isSendPopupOpenState } from 'utils/atom';

//
//
//

export const OPEN_CONSULT_FOOTER_ID = 'bottom-section-wrapper';

//
//
//

function SellerOpenConsult() {
  const { consultid } = useParams();

  const isSendPopupOpen = useRecoilValue(isSendPopupOpenState);

  const [isReplying, setIsReplying] = useState(false);
  const [text, setText] = useState<string>('');

  //
  //
  //

  return (
    <>
      <div
        style={{
          paddingTop: APP_HEADER_HEIGHT,
          height: `${APP_HEIGHT} - ${APP_HEADER_HEIGHT})`,
        }}
        onClick={() => {
          setIsReplying(false);
        }}
      >
        <OpenConsultHeader />
        {consultid === 'all-adopted' ? (
          <NoConsultSection />
        ) : (
          <>
            <MainQuestionSection />
            <CommentListSection />
          </>
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
