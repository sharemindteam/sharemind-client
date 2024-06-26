import { ReactComponent as CheckIcon } from 'assets/icons/icon-modal-check.svg';
import { SetStateAction, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { Green, Grey1, Grey6 } from 'styles/color';
import { Body1 } from 'styles/font';
import { isConsultModalOpenState, scrollLockState } from 'utils/atom';
import { ReactComponent as Bar } from 'assets/icons/icon-modal-bar.svg';
import { SetURLSearchParams } from 'react-router-dom';
import { APP_WIDTH } from 'styles/AppStyle';

//
//
//

interface SortModalProps {
  sortType: number;
  setSortType: React.Dispatch<SetStateAction<number>>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

//
//
//

//최근순 읽지않은순 modal
export const ConsultModal = ({
  sortType,
  setSortType,
  searchParams,
  setSearchParams,
}: SortModalProps) => {
  //modal 여부
  const [isModalOpen, setIsModalOpen] = useRecoilState(isConsultModalOpenState);

  const [modalSortType, setModalSortType] = useState<number>(sortType);
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);

  //
  //
  //

  return (
    <Wrapper visible={isModalOpen}>
      <div className="bar-wrapper">
        <BarIcon />
      </div>
      <div
        className="row"
        onClick={() => {
          setSortType(0);
          searchParams.set('sort', 'latest');
          setSearchParams(searchParams);
          setIsModalOpen(false);
          setScrollLock(false);
        }}
      >
        {modalSortType === 0 ? (
          <>
            <Body1 color={Green}>최근순</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>최근순</Body1>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          setSortType(1);
          searchParams.set('sort', 'unread');
          setSearchParams(searchParams);
          setIsModalOpen(false);
          setScrollLock(false);
        }}
      >
        {modalSortType === 1 ? (
          <>
            <Body1 color={Green}>읽지않은순</Body1>
            <CheckIcon />
          </>
        ) : (
          <Body1 color={Grey1}>읽지않은순</Body1>
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
  width: 100%;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }
  position: fixed;
  height: 14.3rem;
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
    padding: 1rem 2rem 0 2rem;
    height: 4.4rem;
    justify-content: space-between;
    cursor: pointer;
    box-sizing: border-box;
  }
`;
const BarIcon = styled(Bar)`
  margin-top: 0.8rem;
`;
