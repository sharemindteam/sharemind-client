import BankSelectModal from 'components/Seller/SellerMyPageModifyProfile/BankSelectModal';
import { CategoryModal } from 'components/Seller/SellerMyPageModifyProfile/CategoryModal';
import { ModifyProfileHeader } from 'components/Seller/SellerMyPageModifyProfile/ModifyProfileHeader';
import { ModifyProfileMainSection } from 'components/Seller/SellerMyPageModifyProfile/ModifyProfileMainSection';
import { StyleModal } from 'components/Seller/SellerMyPageModifyProfile/StyleModal';
import { TypeModal } from 'components/Seller/SellerMyPageModifyProfile/TypeModal';
import { UpdatePopup } from 'components/Seller/SellerMyPageModifyProfile/UpdatePopup';
import { UpdateSuccess } from 'components/Seller/SellerMyPageModifyProfile/UpdateSuccess';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  isBankModalOpenState,
  isCategoryModalOpenState,
  isStyleModalOpenState,
  isSuccessUpdateState,
  isTypeOpenModalState,
  isUpdateModalOpenState,
} from 'utils/atom';

export const SellerMypageModifyProfile = () => {
  // 상담 카테고리 enum List,, 후에 POST할 때 Mapping 필요
  const [selectCategory, setSelectCategory] = useState<number[]>([]);
  // 상담 스타일 string
  const [selectStyle, setSelectStyle] = useState<string>('');
  // 상담 방식 enum List
  const [selectType, setSelectType] = useState<string[]>([]);
  // 은행
  const [selectBankType, setSelectBankType] = useState<string>('');

  // 모달 띄워주는 여부
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useRecoilState<boolean>(
    isCategoryModalOpenState,
  );
  const [isStyleModalOpen, setIsStyleModalOpen] = useRecoilState<boolean>(
    isStyleModalOpenState,
  );
  const [isTypeModalOpen, setIsTypeModalOpen] =
    useRecoilState<boolean>(isTypeOpenModalState);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useRecoilState<boolean>(
    isUpdateModalOpenState,
  );
  const [isBankModalOpen, setIsBankModalOpen] =
    useRecoilState<boolean>(isBankModalOpenState);

  const [isSucessUpdate, setIsUpdateSuccess] =
    useRecoilState<boolean>(isSuccessUpdateState);
  return (
    <>
      <ModifyProfileHeader />
      {isSucessUpdate ? (
        <UpdateSuccess />
      ) : (
        <ModifyProfileMainSection
          selectCategory={selectCategory}
          selectStyle={selectStyle}
          selectType={selectType}
          selectBankType={selectBankType}
        />
      )}

      {/* 모달 여부 True면.. */}
      {isCategoryModalOpen ||
      isStyleModalOpen ||
      isTypeModalOpen ||
      isBankModalOpen ||
      isUpdateModalOpen ? (
        <BackDrop />
      ) : null}
      {isCategoryModalOpen && (
        <CategoryModal
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
        />
      )}
      {isStyleModalOpen && (
        <StyleModal selectStyle={selectStyle} setSelectStyle={setSelectStyle} />
      )}
      {isTypeModalOpen && (
        <TypeModal selectType={selectType} setSelectType={setSelectType} />
      )}
      {isUpdateModalOpen && <UpdatePopup />}
      {isBankModalOpen && (
        <BankSelectModal setSelectBankType={setSelectBankType} />
      )}
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
