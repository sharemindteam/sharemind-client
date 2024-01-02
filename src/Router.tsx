import { BuyerHome } from 'pages/Buyer/BuyerHome';
import { Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route path="/buyer" element={<BuyerHome />} />
    </Routes>
  );
};
export default Router;
