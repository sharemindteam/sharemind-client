import { BuyerConsult } from 'pages/Buyer/BuyerConsult';
import { BuyerHome } from 'pages/Buyer/BuyerHome';
import { BuyerMypage } from 'pages/Buyer/BuyerMypage';
import { SellerHome } from 'pages/Seller/SellerHome';
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
          </>
        }
      />
      <Route path="/buyer" element={<BuyerHome />} />
      <Route path="/buyer/consult" element={<BuyerConsult />} />
      <Route path="/seller" element={<SellerHome />} />
      <Route path="/seller/mypage" element={<SellerMypage />} />
    </Routes>
  );
};
export default Router;
