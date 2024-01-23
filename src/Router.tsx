import { BuyerAvailCounselor } from 'pages/Buyer/BuyerAvailCounselor';
import { BuyerCategoryResult } from 'pages/Buyer/BuyerCategoryResult';
import { BuyerConsult } from 'pages/Buyer/BuyerConsult';
import { BuyerCounselorProfile } from 'pages/Buyer/BuyerCounselorProfile';
import { BuyerHome } from 'pages/Buyer/BuyerHome';
import { BuyerLogin } from 'pages/Buyer/BuyerLogin';
import { BuyerMypage } from 'pages/Buyer/BuyerMypage';
import { BuyerSearch } from 'pages/Buyer/BuyerSearch';
import { BuyerSearchResult } from 'pages/Buyer/BuyerSearchResult';
import { BuyerSignup } from 'pages/Buyer/BuyerSignup';
import { SellerCaculateManagement } from 'pages/Seller/SellerCalculateManagement';
import { SellerConsult } from 'pages/Seller/SellerConsult';
import { SellerHome } from 'pages/Seller/SellerHome';
import { SellerLetter } from 'pages/Seller/SellerLetter';
import { SellerMypageModifyProfile } from 'pages/Seller/SellerMyPageModifyProfile';
import { SellerMypageViewProfile } from 'pages/Seller/SellerMyPageViewProfile';
import { SellerMypage } from 'pages/Seller/SellerMypage';
import { SellerLetterWrite } from 'pages/Seller/SellerLetterWrite';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { SellerMyPageReview } from 'pages/Seller/SellerMyPageReview';
import { BuyerSignupComplete } from 'pages/Buyer/BuyerSignupComplete';
import { BuyerFindInfo } from 'pages/Buyer/BuyerFindInfo';
import { SellerVerifyMaterial } from 'pages/Seller/SellerVerifyMaterial';
import { SellerVerifyQuiz } from 'pages/Seller/SellerVerifyQuiz';
import { BuyerAccountSetting } from 'pages/Buyer/BuyerAccountSetting';
import { BuyerPwChange } from 'pages/Buyer/BuyerPwChange';
import { BuyerLogout } from 'pages/Buyer/BuyerLogout';
import { BuyerTerminate } from 'pages/Buyer/BuyerTerminate';
import { BuyerReviewManage } from 'pages/Buyer/BuyerReviewManage';
import { BuyerWriteReview } from 'pages/Buyer/BuyerWriteReview';
import { BuyerSavedCounselor } from 'pages/Buyer/BuyerSavedCounselor';
import { BuyerPayment } from 'pages/Buyer/BuyerPayment';
import { BuyerLetter } from 'pages/Buyer/BuyerLetter';
import { BuyerLetterWrite } from 'pages/Buyer/BuyerLetterWrite';
import { BuyerConsultRequest } from 'pages/Buyer/BuyerConsultRequest';
import { BuyerPaymentDetail } from 'pages/Buyer/BuyerPaymentDetail';
import { BuyerPaymentComplete } from 'pages/Buyer/BuyerPaymentComplete';
import SellerAccountSetting from 'pages/Seller/SellerAccountSetting';
import SellerRefundBankAccount from 'pages/Seller/SellerRefundBankAccount';
import SellerChat from 'pages/Seller/SellerChat';
import { SellerPwChange } from 'pages/Seller/SellerPwChange';
import { SellerTerminate } from 'pages/Seller/SellerTerminate';
import { SellerLogout } from 'pages/Seller/SellerLogout';
import { Admin } from 'pages/Common/Admin';
const Router = () => {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <button
              onClick={() => {
                navigate('/buyer');
              }}
            >
              BuyerHome
            </button>
            <button
              onClick={() => {
                navigate('/seller');
              }}
            >
              SellerHome
            </button>
          </>
        }
      />
      {/* admin */}
      <Route path="/admin" element={<Admin />} />
      {/* minder(buyer) */}
      <Route path="/buyer" element={<BuyerHome />} />
      <Route path="/buyer/consult" element={<BuyerConsult />} />
      <Route path="/buyer/profile/:id" element={<BuyerCounselorProfile />} />
      <Route path="/buyer/search" element={<BuyerSearch />} />
      <Route path="/buyer/search/:id" element={<BuyerCategoryResult />} />
      <Route path="/buyer/search/result" element={<BuyerSearchResult />} />
      <Route path="/buyer/consultRequest" element={<BuyerConsultRequest />} />
      <Route path="/buyer/paymentDetail" element={<BuyerPaymentDetail />} />
      <Route path="/buyer/paymentComplete" element={<BuyerPaymentComplete />} />
      <Route path="/buyer/counselors" element={<BuyerAvailCounselor />} />
      <Route path="/buyer/mypage" element={<BuyerMypage />} />
      <Route path="/buyer/reviewManage" element={<BuyerReviewManage />} />
      <Route path="/buyer/review" element={<BuyerWriteReview />} />
      <Route path="/buyer/saved" element={<BuyerSavedCounselor />} />
      <Route path="/buyer/payment" element={<BuyerPayment />} />
      <Route path="/buyer/letter/:id" element={<BuyerLetter />} />
      <Route path="/buyer/writeLetter/:id" element={<BuyerLetterWrite />} />
      {/* 로그인 관련 페이지는 앞에 buyer seller 구분 제외했음 */}
      <Route path="/login" element={<BuyerLogin />} />
      <Route path="/signup" element={<BuyerSignup />} />
      <Route path="/signup/nav" element={<BuyerSignupComplete />} />
      <Route path="/find" element={<BuyerFindInfo />} />
      <Route path="/buyer/setting" element={<BuyerAccountSetting />} />
      <Route path="/setting/changePassword" element={<BuyerPwChange />} />
      <Route path="/setting/terminate" element={<BuyerTerminate />} />
      <Route path="/setting/logout" element={<BuyerLogout />} />

      <Route path="/seller" element={<SellerHome />} />
      {/* 판매자 설정 */}
      <Route path="/seller/setting" element={<SellerAccountSetting />} />
      <Route
        path="/seller/setting/changePassword"
        element={<SellerPwChange />}
      />
      <Route
        path="/setting/refundBankAccount"
        element={<SellerRefundBankAccount />}
      />
      <Route path="/seller/setting/terminate" element={<SellerTerminate />} />
      <Route path="/seller/setting/logout" element={<SellerLogout />} />

      {/* 판매자 : 상담 */}
      {/* 판매자 : 채팅 */}
      <Route path="/seller/chat/:consultid" element={<SellerChat />} />

      {/* 판매자 : 편지 */}
      {/* 질문, 답장, 추가질문 , 추가답장 탭 페이지*/}
      <Route path="/seller/letter/:consultid" element={<SellerLetter />} />
      {/* 답장쓰기, 추가답장쓰기*/}
      <Route
        path="/seller/writeLetter/:consultid"
        element={<SellerLetterWrite />}
      />

      <Route path="/seller/consult" element={<SellerConsult />} />
      {/* 판매자 : 프로필 정보 */}
      <Route path="/seller/mypage" element={<SellerMypage />} />

      <Route path="/seller/mypage/review" element={<SellerMyPageReview />} />
      <Route
        path="/seller/mypage/viewProfile"
        element={<SellerMypageViewProfile />}
      />

      <Route
        path="/seller/mypage/modifyProfile"
        element={<SellerMypageModifyProfile />}
      />
      {/* 판매자 : 수익 관리 */}
      <Route
        path="/seller/calculatemanagement"
        element={<SellerCaculateManagement />}
      />
      {/* 판매자 : 마인더 인증 */}
      <Route path="/seller/education/*" element={<SellerVerifyMaterial />} />
      <Route path="/seller/quiz/*" element={<SellerVerifyQuiz />} />
    </Routes>
  );
};
export default Router;
