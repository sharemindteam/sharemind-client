import { CategoryModal } from 'components/Seller/SellerMyPageModifyProfile/CategoryModal';
import { ModifyProfileHeader } from 'components/Seller/SellerMyPageModifyProfile/ModifyProfileHeader';
import { ModifyProfileMainSection } from 'components/Seller/SellerMyPageModifyProfile/ModifyProfileMainSection';
import { StyleModal } from 'components/Seller/SellerMyPageModifyProfile/StyleModal';
import { TypeModal } from 'components/Seller/SellerMyPageModifyProfile/TypeModal';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  isCategoryModalOpenState,
  isStyleModalOpenState,
  isTypeOpenModalState,
} from 'utils/atom';

export const SellerMypageModifyProfile = () => {
  // 상담 카테고리 enum List
  const [selectCategory, setSelectCategory] = useState([]);
  // 상담 스타일 enum List
  const [selectStyle, setSelectStyle] = useState([]);
  // 상담 방식 enum List
  const [selectType, setSelectType] = useState([]);

  // 모달 띄워주는 여부
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useRecoilState<boolean>(
    isCategoryModalOpenState,
  );
  const [isStyleModalOpen, setIsStyleModalOpen] = useRecoilState<boolean>(
    isStyleModalOpenState,
  );
  const [isTypeModalOpen, setIsTypeModalOpen] =
    useRecoilState<boolean>(isTypeOpenModalState);
  return (
    <>
      <ModifyProfileHeader />
      <ModifyProfileMainSection />
      {/* 모달 여부 True면.. */}
      {isCategoryModalOpen || isStyleModalOpen || isTypeModalOpen ? (
        <BackDrop />
      ) : null}
      {isCategoryModalOpen ? (
        <CategoryModal
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
        />
      ) : null}
      {isStyleModalOpen ? <StyleModal /> : null}
      {isTypeModalOpen ? <TypeModal /> : null}
    </>
  );
};
const BackDrop = styled.div`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  position: fixed;
  top: 0;
  z-index: 2001;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;
