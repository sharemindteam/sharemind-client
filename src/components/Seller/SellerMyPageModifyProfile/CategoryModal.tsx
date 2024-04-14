import { useState } from 'react';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-modal-check.svg';

import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { Green, Grey1, Grey3, Grey4, Grey6 } from 'styles/color';
import { Body1, Button2, Caption2 } from 'styles/font';
import { isCategoryModalOpenState } from 'utils/atom';

interface CategoryModalProps {
  selectCategory: number[];
  setSelectCategory: any;
}

export const CategoryModal = ({
  setSelectCategory,
  selectCategory,
}: CategoryModalProps) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useRecoilState(
    isCategoryModalOpenState,
  );
  const [modalCategory, setModalCategory] = useState(selectCategory);
  const handleCategoryList = (category: number) => {
    // 카테고리 선택
    if (!modalCategory.includes(category)) {
      if (modalCategory.length === 3) {
        const updatedCategory = modalCategory.slice(
          0,
          modalCategory.length - 1,
        );
        setModalCategory([...updatedCategory, category]);
        return;
      }
      setModalCategory([...modalCategory, category]);
    }

    // 카테고리 선택해제
    else {
      const updatedCategory = modalCategory.filter((item) => item !== category);
      setModalCategory(updatedCategory);
    }
  };
  const handleCompleteCategory = () => {
    setSelectCategory(modalCategory);
    setIsCategoryModalOpen(false);
  };

  return (
    <Wrapper visible={isCategoryModalOpen}>
      <div className="bar-wrapper">
        <Bar />
      </div>
      <div className="row1">
        <Body1>상담 카테고리</Body1>
        <CompleteButton onClick={handleCompleteCategory}>완료</CompleteButton>
      </div>
      <div className="row2">
        <Caption2 color={Grey3}>최대 3개까지 선택 가능해요</Caption2>
      </div>
      <div
        className="row"
        onClick={() => {
          handleCategoryList(1);
        }}
      >
        {modalCategory.includes(1) ? (
          <>
            <Body1 color={Green}>연애갈등</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>연애갈등</Body1>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          handleCategoryList(2);
        }}
      >
        {modalCategory.includes(2) ? (
          <>
            <Body1 color={Green}>이별/재회</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>이별/재회</Body1>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          handleCategoryList(3);
        }}
      >
        {modalCategory.includes(3) ? (
          <>
            <Body1 color={Green}>여자심리</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>여자심리</Body1>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          handleCategoryList(4);
        }}
      >
        {modalCategory.includes(4) ? (
          <>
            <Body1 color={Green}>남자심리</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>남자심리</Body1>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          handleCategoryList(5);
        }}
      >
        {modalCategory.includes(5) ? (
          <>
            <Body1 color={Green}>썸/연애초기</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>썸/연애초기</Body1>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          handleCategoryList(6);
        }}
      >
        {modalCategory.includes(6) ? (
          <>
            <Body1 color={Green}>짝사랑</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>짝사랑</Body1>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          handleCategoryList(7);
        }}
      >
        {modalCategory.includes(7) ? (
          <>
            <Body1 color={Green}>권태기</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>권태기</Body1>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          handleCategoryList(8);
        }}
      >
        {modalCategory.includes(8) ? (
          <>
            <Body1 color={Green}>기타</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>기타</Body1>
        )}
      </div>
    </Wrapper>
  );
};
const slideIn = keyframes`
  from{
    transform : translateY(100%);
  }
  to{
    transform : translateY(0%);
  }
`;
const slideOut = keyframes`
  from{
    transform : translateY(0%);
  }
  to{
    transform : translateY(100%);
  }
`;

const CompleteButton = styled(Button2)`
  color: ${Green};
  cursor: pointer;
`;

const Wrapper = styled.div<{ visible: boolean }>`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  position: fixed;
  height: 48rem;
  background-color: ${Grey6};
  bottom: 0;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 2002;
  animation: ${({ visible }) => (visible ? slideIn : slideOut)} 0.3s ease-in-out;

  .bar-wrapper {
    height: 4.5rem;
    display: flex;
    justify-content: center;
  }
  .row1 {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem 0rem;
  }
  .row2 {
    padding: 0rem 2rem 1.6rem;
  }
  .row {
    display: flex;
    padding: 1rem 2rem;
    justify-content: space-between;
    cursor: pointer;
  }
`;
const Bar = styled.div`
  margin-top: 1.2rem;
  width: 3.1rem;
  height: 0.3rem;
  background-color: ${Grey4};
`;
