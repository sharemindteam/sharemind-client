import { ReactComponent as CheckIcon } from 'assets/icons/icon-modal-check.svg';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isConsultModalOpenState } from 'utils/atom';
import { Green, Grey1, Grey4, Grey6 } from 'styles/color';
import { Body1 } from 'styles/font';
import styled, { keyframes } from 'styled-components';
interface SellerManagementModalProps {
  sortType: number;
  setSortType: React.Dispatch<React.SetStateAction<number>>;
}

export const SellerManagementModal = ({
  sortType,
  setSortType,
}: SellerManagementModalProps) => {
  //modal 여부
  const isModalOpen = useRecoilValue(isConsultModalOpenState);
  //여기서 unmount 시 sortType 바꾸고 새로 request
  //바뀌고 unmount 될 때 sortType 바꾸기 위해 따로 정의
  const [modalSortType, setModalSortType] = useState<number>(sortType);
  useEffect(() => {
    return () => {
      setSortType(modalSortType);
    };
  });
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
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
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