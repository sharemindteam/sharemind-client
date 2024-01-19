import { ReactComponent as CheckIcon } from 'assets/icons/icon-modal-check.svg';
import { SetStateAction, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { Green, Grey1, Grey6 } from 'styles/color';
import { Body1 } from 'styles/font';
import { isLetterModalOpenState } from 'utils/atom';
import { ReactComponent as Bar } from 'assets/icons/icon-modal-bar.svg';
interface LetterWriteModalProps {
  categoryType: number;
  setCategoryType: React.Dispatch<SetStateAction<number>>;
  categoryList: string[];
}
//최근순 인기순 별점순 모달
export const LetterWriteModal = ({
  categoryType,
  setCategoryType,
  categoryList,
}: LetterWriteModalProps) => {
  //modal 여부
  const isModalOpen = useRecoilValue(isLetterModalOpenState);
  //여기서 unmount 시 sortType 바꾸고 새로 request
  //바뀌고 unmount 될 때 sortType 바꾸기 위해 따로 정의
  const [modalCategoryType, setModalCategoryType] =
    useState<number>(categoryType);
  useEffect(() => {
    return () => {
      setCategoryType(modalCategoryType);
    };
  });
  return (
    <Wrapper visible={isModalOpen}>
      <div className="bar-wrapper">
        <BarIcon />
      </div>
      <Body1 color={Grey1} margin="0 0 1.6rem 2rem">
        상담 카테고리
      </Body1>
      <div
        className="row"
        onClick={() => {
          setModalCategoryType(0);
        }}
      >
        {modalCategoryType === 0 ? (
          <>
            <Body1 color={Green}>{categoryList[0]}</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>{categoryList[0]}</Body1>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          setModalCategoryType(1);
        }}
      >
        {modalCategoryType === 1 ? (
          <>
            <Body1 color={Green}>{categoryList[1]}</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>{categoryList[1]}</Body1>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          setModalCategoryType(2);
        }}
      >
        {modalCategoryType === 2 ? (
          <>
            <Body1 color={Green}>{categoryList[2]}</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>{categoryList[2]}</Body1>
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
const Wrapper = styled.div<{ visible: boolean }>`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  position: fixed;
  height: 24rem;
  background-color: ${Grey6};
  bottom: 0;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 2002;
  animation: ${({ visible }) => (visible ? slideIn : slideOut)} 0.3s ease-in-out;

  .bar-wrapper {
    height: 3.6rem;
    display: flex;
    justify-content: center;
  }
  .row {
    display: flex;
    box-sizing: border-box;
    padding: 1rem 2rem 0 2rem;
    height: 4.4rem;
    justify-content: space-between;
    cursor: pointer;
  }
`;
const BarIcon = styled(Bar)`
  margin-top: 0.8rem;
`;
