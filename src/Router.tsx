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
import { SellerConsult } from 'pages/Seller/SellerConsult';
import { SellerHome } from 'pages/Seller/SellerHome';
import { SellerLetter } from 'pages/Seller/SellerLetter';
import { SellerMypageModifyProfile } from 'pages/Seller/SellerMyPageModifyProfile';
import { SellerMypageViewProfile } from 'pages/Seller/SellerMyPageViewProfile';
import { SellerMypage } from 'pages/Seller/SellerMypage';
import { SellerLetterWrite } from 'pages/Seller/SellerLetterWrite';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SellerMyPageReview } from 'pages/Seller/SellerMyPageReview';
import { BuyerSignupComplete } from 'pages/Buyer/BuyerSignupComplete';
import { BuyerFindInfo } from 'pages/Buyer/BuyerFindInfo';
import { SellerVerifyMaterial } from 'pages/Seller/SellerVerifyMaterial';
import { SellerVerifyQuiz } from 'pages/Seller/SellerVerifyQuiz';
import { BuyerAccountSetting } from 'pages/Buyer/BuyerAccountSetting';
import { BuyerPwChange } from 'pages/Buyer/BuyerPwChange';
import { BuyerLogout } from 'pages/Buyer/BuyerLogout';
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
import { SellerPwChange } from 'pages/Seller/SellerPwChange';
import { SellerTerminate } from 'pages/Seller/SellerTerminate';
import { SellerLogout } from 'pages/Seller/SellerLogout';
import { Admin } from 'pages/Common/Admin';
import { BuyerChat } from 'pages/Buyer/BuyerChat';
import Service from 'pages/Common/Service';
import { BuyerQuit } from 'pages/Buyer/BuyerQuit';
import SellerChat from 'pages/Seller/SellerChat';
import BuyerOpenConsult from 'pages/Buyer/BuyerOpenConsult';
import SellerOpenConsult from 'pages/Seller/SellerOpenConsult';
import { BuyerOpenConsultRequest } from 'pages/Buyer/BuyerOpenConsultRequest';
import { BuyerOpenPaymentDetail } from 'pages/Buyer/BuyerOpenPaymentDetail';
import BuyerWriteOpenConsult from 'pages/Buyer/BuyerWriteOpenConsult';
import BuyerOpenConsultDetail from 'pages/Buyer/BuyerOpenConsultDetail';
import BuyerFinishPayment from 'pages/Buyer/BuyerFinishPayment';
import BuyerOpenConsultLikes from 'pages/Buyer/BuyerOpenConsultLikes';
import BuyerOpenConsultRecents from 'pages/Buyer/BuyerOpenConsultRecents';
import SellerProfitBankAccount from 'pages/Seller/SellerProfitBankAccount';
import ServerDown from 'pages/Common/ServerDown';
import SellerUpdateFail from 'pages/Seller/SellerUpdateFail';
import { BuyerManyLovedCounselor } from 'pages/Buyer/BuyerManyLovedCounselor';
import SellerCalculateManagement from 'pages/Seller/SellerCalculateManagement';

const Router = () => {
  return (
    <Routes>
      {/* Moved to Admin Page ✅ */}
      {/* <Route
        path={`/${process.env.REACT_APP_ADMIN_UUID_URL}`}
        element={<Admin />}
      /> */}
      {/* minder(buyer) */}
      <Route path="/share" element={<BuyerHome />} />
      <Route path="/" element={<Navigate to="/share" />} />
      <Route path="/consult" element={<BuyerConsult />} />
      <Route path="/open-consult" element={<BuyerOpenConsult />} />
      <Route path="/open-consult/likes" element={<BuyerOpenConsultLikes />} />
      <Route
        path="/open-consult/recents"
        element={<BuyerOpenConsultRecents />}
      />
      <Route path="/open-consult/:id" element={<BuyerOpenConsultDetail />} />
      <Route path="/profile/:id" element={<BuyerCounselorProfile />} />
      <Route path="/search" element={<BuyerSearch />} />
      <Route path="/categorySearch" element={<BuyerCategoryResult />} />
      <Route path="/search/result" element={<BuyerSearchResult />} />
      <Route
        path="/consultRequest/:counselorId"
        element={<BuyerConsultRequest />}
      />

      <Route path="/openConsultRequest" element={<BuyerOpenConsultRequest />} />

      <Route path="/openPaymentDetail" element={<BuyerOpenPaymentDetail />} />
      <Route
        path="/writeOpenConsult/:postId"
        element={<BuyerWriteOpenConsult />}
      />

      <Route path="/paymentDetail/:id" element={<BuyerPaymentDetail />} />
      <Route path="/paymentComplete" element={<BuyerPaymentComplete />} />
      <Route path="/paymentFinish" element={<BuyerFinishPayment />} />
      <Route path="/counselors" element={<BuyerAvailCounselor />} />
      <Route path="/manyLoved" element={<BuyerManyLovedCounselor />} />
      <Route path="/mypage" element={<BuyerMypage />} />
      <Route path="/reviewManage" element={<BuyerReviewManage />} />
      <Route path="/review" element={<BuyerWriteReview />} />
      <Route path="/saved" element={<BuyerSavedCounselor />} />
      <Route path="/payment" element={<BuyerPayment />} />
      <Route path="/letter/:id" element={<BuyerLetter />} />
      <Route path="/chat/:id" element={<BuyerChat />} />
      <Route path="/writeLetter/:id" element={<BuyerLetterWrite />} />
      {/* 로그인 관련 페이지는 앞에 buyer seller 구분 제외했음 */}
      <Route path="/login" element={<BuyerLogin />} />
      <Route path="/signup" element={<BuyerSignup />} />
      <Route path="/signup/nav" element={<BuyerSignupComplete />} />
      <Route path="/find" element={<BuyerFindInfo />} />
      <Route path="/setting" element={<BuyerAccountSetting />} />
      <Route path="/setting/changePassword" element={<BuyerPwChange />} />
      <Route path="/setting/quit" element={<BuyerQuit />} />
      <Route path="/setting/logout" element={<BuyerLogout />} />

      <Route path="/minder" element={<SellerHome />} />
      {/* 판매자 설정 */}
      <Route path="/minder/setting" element={<SellerAccountSetting />} />
      <Route
        path="/minder/setting/changePassword"
        element={<SellerPwChange />}
      />
      <Route
        path="/minder/profitBankAccount"
        element={<SellerProfitBankAccount />}
      />
      <Route path="/minder/setting/terminate" element={<SellerTerminate />} />
      <Route path="/minder/setting/logout" element={<SellerLogout />} />

      {/* 판매자 : 상담 */}
      {/* 판매자 : 채팅 */}
      <Route path="/minder/chat/:id" element={<SellerChat />} />

      {/* 판매자 : 편지 */}
      {/* 질문, 답장, 추가질문 , 추가답장 탭 페이지*/}
      <Route path="/minder/letter/:consultid" element={<SellerLetter />} />
      {/* 답장쓰기, 추가답장쓰기*/}
      <Route
        path="/minder/writeLetter/:consultid"
        element={<SellerLetterWrite />}
      />

      <Route path="/minder/consult" element={<SellerConsult />} />
      <Route
        path="/minder/open-consult/:consultid"
        element={<SellerOpenConsult />}
      />
      {/* 판매자 : 프로필 정보 */}
      <Route path="/minder/mypage" element={<SellerMypage />} />
      <Route path="/minder/mypage/review" element={<SellerMyPageReview />} />
      <Route
        path="/minder/mypage/viewProfile"
        element={<SellerMypageViewProfile />}
      />

      <Route
        path="/minder/mypage/modifyProfile"
        element={<SellerMypageModifyProfile />}
      />
      <Route path="/minder/mypage/update-fail" element={<SellerUpdateFail />} />
      {/* 판매자 : 수익 관리 */}
      <Route
        path="/minder/calculatemanagement"
        element={<SellerCalculateManagement />}
      />
      {/* 판매자 : 마인더 인증 */}
      <Route path="/minder/education/*" element={<SellerVerifyMaterial />} />
      <Route path="/minder/quiz/*" element={<SellerVerifyQuiz />} />

      {/* 서비스 소개 */}
      <Route path="/service" element={<Service />} />

      {/* 서버 상태를 나타내는 페이지 */}
      <Route path="/service-unavailable" element={<ServerDown />} />
    </Routes>
  );
};
export default Router;
