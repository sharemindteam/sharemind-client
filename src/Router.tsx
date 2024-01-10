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
import { BuyerSignupPw } from 'pages/Buyer/BuyerSignupPw';
import { BuyerSignupInfo } from 'pages/Buyer/BuyerSignupInfo';
import { BuyerSignupComplete } from 'pages/Buyer/BuyerSignupComplete';
import { BuyerFindInfo } from 'pages/Buyer/BuyerFindInfo';

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
      <Route path="/buyer" element={<BuyerHome />} />
      <Route path="/buyer/consult" element={<BuyerConsult />} />
      <Route path="/buyer/profile/:id" element={<BuyerCounselorProfile />} />
      <Route path="/buyer/search" element={<BuyerSearch />} />
      <Route path="/buyer/search/:id" element={<BuyerCategoryResult />} />
      <Route path="/buyer/search/result" element={<BuyerSearchResult />} />
      <Route path="/buyer/counselors" element={<BuyerAvailCounselor />} />
      <Route path="/buyer/mypage" element={<BuyerMypage />} />
      {/* 로그인 관련 페이지는 앞에 buyer seller 구분 제외했음 */}
      <Route path="/login" element={<BuyerLogin />} />
      <Route path="/signup" element={<BuyerSignup />} />
      <Route path="/signup/setting" element={<BuyerSignupPw />} />
      <Route path="/signup/info" element={<BuyerSignupInfo />} />
      <Route path="/signup/nav" element={<BuyerSignupComplete />} />
      <Route path="/find" element={<BuyerFindInfo />} />
      <Route path="/seller" element={<SellerHome />} />
      {/* 판매자 : 상담 */}

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
      ></Route>
    </Routes>
  );
};
export default Router;
