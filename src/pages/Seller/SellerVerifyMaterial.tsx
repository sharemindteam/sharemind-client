import FinalMaterial from 'components/Seller/SellerVerifyMaterial/FinalMaterial';
import FirstMaterial from 'components/Seller/SellerVerifyMaterial/FirstMaterial';
import SecondMaterial from 'components/Seller/SellerVerifyMaterial/SecondMaterial';
import ThirdMaterial from 'components/Seller/SellerVerifyMaterial/ThirdMaterial';
import VerifyMaterialHeader from 'components/Seller/SellerVerifyMaterial/VerifyMaterialHeader';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

export const SellerVerifyMaterial = () => {
  return (
    <>
      <VerifyMaterialHeader />
      <VerifyMaterialContainer>
        <Routes>
          <Route path="first" element={<FirstMaterial />} />
          <Route path="/second" element={<SecondMaterial />} />
          <Route path="/third" element={<ThirdMaterial />} />
          <Route path="/final" element={<FinalMaterial />} />
        </Routes>
      </VerifyMaterialContainer>
    </>
  );
};

const VerifyMaterialContainer = styled.div`
  padding: 0rem 2rem 16.8rem;
`;
