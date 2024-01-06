import { BuyerAvailCounselor } from 'pages/Buyer/BuyerAvailCounselor';
import { BuyerCategoryResult } from 'pages/Buyer/BuyerCategoryResult';
import { BuyerConsult } from 'pages/Buyer/BuyerConsult';
import { BuyerCounselorProfile } from 'pages/Buyer/BuyerCounselorProfile';
import { BuyerHome } from 'pages/Buyer/BuyerHome';
import { BuyerSearch } from 'pages/Buyer/BuyerSearch';
import { SellerCaculateManagement } from 'pages/Seller/SellerCalculateManagement';
import { SellerConsult } from 'pages/Seller/SellerConsult';
import { SellerHome } from 'pages/Seller/SellerHome';
import { SellerMypageModifyProfile } from 'pages/Seller/SellerMyPageModifyProfile';
import { SellerMypageViewProfile } from 'pages/Seller/SellerMyPageViewProfile';
import { SellerMypage } from 'pages/Seller/SellerMypage';
import { Routes, Route, useNavigate } from 'react-router-dom';

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
                navigate('/buyer/consult');
              }}
            >
              BuyerConsult
            </button>
            <button
              onClick={() => {
                navigate('/buyer/profile/0');
              }}
            >
              BuyerConsult
            </button>
            <button
              onClick={() => {
                navigate('/buyer/search');
              }}
            >
              BuyerSearch
            </button>
          </>
        }
      />
      <Route path="/buyer" element={<BuyerHome />} />
      <Route path="/buyer/consult" element={<BuyerConsult />} />
      <Route path="/buyer/profile/:id" element={<BuyerCounselorProfile />} />
      <Route path="/buyer/search" element={<BuyerSearch />} />
      <Route path="/buyer/search/:id" element={<BuyerCategoryResult />} />
      <Route path="/buyer/counselors" element={<BuyerAvailCounselor />} />
      <Route path="/seller" element={<SellerHome />} />
      {/* 판매자 : 상담 */}

      {/* 판매자 : 편지 */}
      <Route path="/seller/letter/:consultid" />

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
