import { useState } from 'react';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-modal-check.svg';

import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { Green, Grey1, Grey3, Grey4, Grey6 } from 'styles/color';
import { Body1, Button2, Caption2 } from 'styles/font';
import { isTypeOpenModalState } from 'utils/atom';
import { APP_WIDTH } from 'styles/AppStyle';
interface TypeModalProps {
  selectType: string[];
  setSelectType: any;
}

export const TypeModal = ({ selectType, setSelectType }: TypeModalProps) => {
  const [isTypeModalOpen, setIsTypeModalOpen] =
    useRecoilState(isTypeOpenModalState);
  const [modalType, setModalType] = useState(selectType);

  const handleTypeList = (type: string) => {
    if (!modalType.includes(type)) {
      setModalType([...modalType, type]);
    } else {
      const updatedCategory = modalType.filter((item) => item !== type);
      setModalType(updatedCategory);
    }
  };

  const handleCompleteType = () => {
    setSelectType(modalType);
    setIsTypeModalOpen(false);
  };
  return (
    <Wrapper visible={isTypeModalOpen}>
      <div className="bar-wrapper">
        <Bar />
      </div>
      <div className="row1">
        <Body1>상담 방식</Body1>
        <CompleteButton onClick={handleCompleteType}>완료</CompleteButton>
      </div>
      <div className="row2">
        <Caption2 color={Grey3}>최대 2개까지 선택 가능해요.</Caption2>
      </div>
      <div
        className="row"
        onClick={() => {
          handleTypeList('편지');
        }}
      >
        {modalType.includes('편지') ? (
          <>
            <Body1 color={Green}>편지</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>편지</Body1>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          handleTypeList('채팅');
        }}
      >
        {modalType.includes('채팅') ? (
          <>
            <Body1 color={Green}>채팅</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>채팅</Body1>
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
  width: 100%;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
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
