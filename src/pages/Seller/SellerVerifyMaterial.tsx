import { BackDrop } from 'components/Common/BackDrop';
import FinalMaterial from 'components/Seller/SellerVerifyMaterial/FinalMaterial';
import FirstMaterial from 'components/Seller/SellerVerifyMaterial/FirstMaterial';
import IsTakeQuizModal from 'components/Seller/SellerVerifyMaterial/IsTakeQuizModal';
import SecondMaterial from 'components/Seller/SellerVerifyMaterial/SecondMaterial';
import ThirdMaterial from 'components/Seller/SellerVerifyMaterial/ThirdMaterial';
import VerifyMaterialHeader from 'components/Seller/SellerVerifyMaterial/VerifyMaterialHeader';
import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isTakingQuizModalOpenState } from 'utils/atom';

export const SellerVerifyMaterial = () => {
  const isTakingQuizModalOpen = useRecoilValue(isTakingQuizModalOpenState);

  const topRef = useRef<HTMLDivElement | null>(null);

  const { pathname } = useLocation();
  useEffect(() => {
    if (topRef.current) {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [pathname]);

  return (
    <>
      <VerifyMaterialHeader />
      {isTakingQuizModalOpen && (
        <>
          <BackDrop />
          <IsTakeQuizModal />
        </>
      )}

      <VerifyMaterialContainer>
        <div className="top-container" ref={topRef}></div>
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
