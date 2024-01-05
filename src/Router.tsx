import { BuyerConsult } from 'pages/Buyer/BuyerConsult';
import { BuyerCounselorProfile } from 'pages/Buyer/BuyerCounselorProfile';
import { BuyerHome } from 'pages/Buyer/BuyerHome';
import { BuyerMypage } from 'pages/Buyer/BuyerMypage';
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
                navigate('/seller');
              }}
            >
              seller
            </button>
          </>
        }
      />
      <Route path="/buyer" element={<BuyerHome />} />
      <Route path="/buyer/consult" element={<BuyerConsult />} />
      <Route path="/buyer/profile/:id" element={<BuyerCounselorProfile />} />
      {/* 판매자 : 홈 */}
      <Route path="/seller" element={<SellerHome />} />
      {/* 판매자 : 상담 */}
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
