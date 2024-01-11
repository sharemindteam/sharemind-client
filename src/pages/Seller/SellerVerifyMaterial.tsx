import FirstMaterial from 'components/Seller/SellerVerifyMaterial/FirstMaterial';
import VerifyMaterialHeader from 'components/Seller/SellerVerifyMaterial/VerifyMaterialHeader';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

export const SellerVerifyMaterial = () => {
  return (
    <>
      <VerifyMaterialHeader />
      <VerifyMaterialContainer>
        <Routes>
          <Route path="first" element={<FirstMaterial />}></Route>
          <Route path="/second"></Route>
          <Route path="/third"></Route>
          <Route path="/final"></Route>
        </Routes>
      </VerifyMaterialContainer>
    </>
  );
};

const VerifyMaterialContainer = styled.div`
  padding: 0rem 2rem 16.8rem;
`;
