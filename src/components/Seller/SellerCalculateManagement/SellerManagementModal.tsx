import { ReactComponent as CheckIcon } from 'assets/icons/icon-modal-check.svg';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isConsultModalOpenState } from 'utils/atom';
import { Green, Grey1, Grey4, Grey6 } from 'styles/color';
import { Body1 } from 'styles/font';
import styled, { keyframes } from 'styled-components';
import { APP_WIDTH } from 'styles/AppStyle';

//
//
//

interface SellerManagementModalProps {
  sortType: number;
  setSortType: React.Dispatch<React.SetStateAction<number>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//
//
//

export const SellerManagementModal = ({
  sortType,
  setSortType,
  setIsModalOpen,
}: SellerManagementModalProps) => {
  //modal 여부
  const isModalOpen = useRecoilValue(isConsultModalOpenState);
  const [modalSortType, setModalSortType] = useState<number>(sortType);

  return (
    <>
      {' '}
      <Wrapper visible={isModalOpen}>
        <div className="bar-wrapper">
          <Bar />
        </div>
        <div
          className="row"
          onClick={() => {
            setModalSortType(0);
            setSortType(0);
            setIsModalOpen(false);
          }}
        >
          {modalSortType === 0 ? (
            <>
              <Body1 color={Green}>최근 일주일</Body1>
              <CheckIcon />
            </>
          ) : (
            <Body1 color={Grey1}>최근 일주일</Body1>
          )}
        </div>
        <div
          className="row"
          onClick={() => {
            setModalSortType(1);
            setSortType(1);
            setIsModalOpen(false);
          }}
        >
          {modalSortType === 1 ? (
            <>
              <Body1 color={Green}>최근 1개월</Body1>
              <CheckIcon />
            </>
          ) : (
            <Body1 color={Grey1}>최근 1개월</Body1>
          )}
        </div>
        <div
          className="row"
          onClick={() => {
            setModalSortType(2);
            setSortType(2);
            setIsModalOpen(false);
          }}
        >
          {modalSortType === 2 ? (
            <>
              <Body1 color={Green}>전체</Body1>
              <CheckIcon />
            </>
          ) : (
            <Body1 color={Grey1}>전체</Body1>
          )}
        </div>
      </Wrapper>
    </>
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
  width: 100%;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }

  position: fixed;
  height: 21.6rem;
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
  .row {
    display: flex;
    padding: 1rem 2rem 0 2rem;
    height: 4.4rem;
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
