import { Black, Green, Grey3, Grey5, Grey6, LightGreen } from 'styles/color';
import { ReactComponent as DownArrowIcon } from 'assets/icons/sorting-down-arrow.svg';
import { ReactComponent as CircleCheckIcon } from 'assets/icons/circle-check.svg';
import { Button2 } from 'styles/font';
import styled from 'styled-components';

import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { isConsultModalOpenState } from 'utils/atom';
import SellerLetterList from './SellerLetterList';
import SellerChatList from './SellerChatList';
import { useConsultParams } from 'hooks/useConsultParams';
interface ConsultTypeProps {
  isActive: boolean;
}

export const SellerConsultSection = () => {
  const {
    isLetter,
    sortType,
    setSortType,
    handleLetterClick,
    handleChatClick,
    searchParams,
    setSearchParams,
    // isChecked,
    // setIsChecked,
  } = useConsultParams();

  // 완료된 상담 제외, 포함
  const [isIncludeCompleteConsult, setIsIncludeCompleteConsult] =
    useState<boolean>(false);
  // 모달 열지 말지
  const setIsModalOpen = useSetRecoilState<boolean>(isConsultModalOpenState);
  return (
    <>
      <ConsultSortingMenu>
        <div className="row1">
          <ConsultType isActive={isLetter} onClick={handleLetterClick}>
            편지
          </ConsultType>
          <ConsultType isActive={!isLetter} onClick={handleChatClick}>
            채팅
          </ConsultType>
          <SortingType
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <Button2 color={Grey3}>
              {sortType === 0 ? '최근순' : '읽지않은순'}
            </Button2>
            <DownArrowIcon />
          </SortingType>
        </div>
        <div className="row2">
          <div
            className="row2-1"
            onClick={() => {
              setIsIncludeCompleteConsult(!isIncludeCompleteConsult);
            }}
            style={{
              cursor: 'pointer',
            }}
          >
            <CircleCheckIcon fill={isIncludeCompleteConsult ? Grey5 : Green} />
            <Button2 color={Grey3}>종료/취소된 상담 제외</Button2>
          </div>
        </div>
      </ConsultSortingMenu>
      {isLetter ? (
        <SellerLetterList
          sortType={sortType}
          setSortType={setSortType}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          isIncludeCompleteConsult={isIncludeCompleteConsult}
        />
      ) : (
        <SellerChatList
          sortType={sortType}
          setSortType={setSortType}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          isIncludeCompleteConsult={isIncludeCompleteConsult}
        />
      )}
    </>
  );
};
const ConsultSortingMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.8rem 2rem 1.2rem;
  gap: 1.2rem;
  .row1 {
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }
  .row2 {
    align-self: flex-start;
  }
  .row2-1 {
    display: flex;
    cursor: pointer;
    gap: 0.4rem;
    align-items: center;
  }
`;

const ConsultType = styled.div<ConsultTypeProps>`
  display: flex;
  width: 5.7rem;
  height: 3.4rem;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 1.2rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  background: ${(props) => (props.isActive ? LightGreen : Grey6)};
  color: ${(props) => (props.isActive ? Green : Black)};
`;
const SortingType = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 0.8rem;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
`;
