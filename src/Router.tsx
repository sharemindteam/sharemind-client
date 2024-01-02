import { BuyerHome } from 'pages/Buyer/BuyerHome';
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
          </>
        }
      />
      <Route path="/buyer" element={<BuyerHome />} />
    </Routes>
  );
};
export default Router;
