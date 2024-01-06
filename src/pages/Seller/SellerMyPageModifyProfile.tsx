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
  // 상담 카테고리 enum List,, 후에 POST할 때 Mapping 필요
  const [selectCategory, setSelectCategory] = useState<number[]>([]);
  // 상담 스타일 string
  const [selectStyle, setSelectStyle] = useState<string>('');
  // 상담 방식 enum List
  const [selectType, setSelectType] = useState<string[]>([]);

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
      <ModifyProfileMainSection
        selectCategory={selectCategory}
        selectStyle={selectStyle}
        selectType={selectType}
      />
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
      {isStyleModalOpen ? (
        <StyleModal selectStyle={selectStyle} setSelectStyle={setSelectStyle} />
      ) : null}
      {isTypeModalOpen ? (
        <TypeModal selectType={selectType} setSelectType={setSelectType} />
      ) : null}
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
