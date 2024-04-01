import { BackDrop } from 'components/Common/BackDrop';
import FinalMaterial from 'components/Seller/SellerVerifyMaterial/FinalMaterial';
import FirstMaterial from 'components/Seller/SellerVerifyMaterial/FirstMaterial';
import IsTakeQuizModal from 'components/Seller/SellerVerifyMaterial/IsTakeQuizModal';
import SecondMaterial from 'components/Seller/SellerVerifyMaterial/SecondMaterial';
import ThirdMaterial from 'components/Seller/SellerVerifyMaterial/ThirdMaterial';
import VerifyMaterialHeader from 'components/Seller/SellerVerifyMaterial/VerifyMaterialHeader';
import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isTakingQuizModalOpenState } from 'utils/atom';

export const SellerVerifyMaterial = () => {
  const [isTakingQuizModalOpen, setIsTakingQuizModalOpen] = useRecoilState(
    isTakingQuizModalOpenState,
  );

  const containerRef = useRef(null);
  
  const { pathname } = useLocation();
  useEffect(() => {
    if (containerRef.current) {
      // console.log('hello');
      // containerRef.current.scrollTop = 0;
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

      <VerifyMaterialContainer ref={containerRef}>
        <div className="top-container"></div>
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
