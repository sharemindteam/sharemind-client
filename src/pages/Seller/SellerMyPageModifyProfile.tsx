import { CategoryModal } from 'components/Seller/SellerMyPageModifyProfile/CategoryModal';
import { ModifyProfileHeader } from 'components/Seller/SellerMyPageModifyProfile/ModifyProfileHeader';
import { ModifyProfileMainSection } from 'components/Seller/SellerMyPageModifyProfile/ModifyProfileMainSection';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
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

      {isCategoryModalOpen ? <CategoryModal /> : null}
    </>
  );
};
