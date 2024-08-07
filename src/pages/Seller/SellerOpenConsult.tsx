import { BackDrop } from 'components/Common/BackDrop';
import BottomSection from 'components/Seller/SellerOpenConsult/BottomSection';
import CommentListSection from 'components/Seller/SellerOpenConsult/CommentListSection';
import IsSendPopup from 'components/Seller/SellerOpenConsult/IsSendPopup';
import MainQuestionSection from 'components/Seller/SellerOpenConsult/MainQuestionSection';
import NoConsultSection from 'components/Seller/SellerOpenConsult/NoConsultGraphic';
import OpenConsultHeader from 'components/Seller/SellerOpenConsult/OpenConsultHeader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { APP_HEADER_HEIGHT } from 'styles/AppStyle';
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

  /** In order to solve the issue of the IOS keyboard forcibly pushing up the document to create additional space, the bottom value of the bottom section component is managed as a state when the keyboard is opened.
   ref: https://stackoverflow.com/questions/43833049/how-to-make-fixed-content-go-above-ios-keyboard */
  const [bottom, setBottom] = useState(0);

  useEffect(() => {
    const updateBottom = () => {
      if (visualViewport) {
        const newBottom =
          visualViewport.height < window.innerHeight
            ? window.innerHeight - visualViewport.height
            : 0;

        setBottom(newBottom);
      }
    };

    const handleResize = () => {
      if (
        /iPhone|iPad|iPod/.test(window.navigator.userAgent) &&
        visualViewport
      ) {
        updateBottom();
      }
    };

    if (visualViewport) {
      visualViewport.addEventListener('resize', handleResize);
    }
    return () => {
      if (visualViewport) {
        visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  //
  //
  //

  return (
    <>
      <div
        style={{ marginTop: APP_HEADER_HEIGHT }}
        onClick={() => {
          setIsReplying(false);
        }}
      >
        <OpenConsultHeader />
        {consultid === 'all-adopted' ? (
          <NoConsultSection />
        ) : (
          <div
            //FIXME: do we need this?
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
          bottom={bottom}
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
