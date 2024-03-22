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
import SellerOpenConsultList from './SellerOpenConsultList';
interface ConsultTypeProps {
  isActive: boolean;
  isLong?: boolean;
}

export const SellerConsultSection = () => {
  // 편지 탭, 채팅 탭, 공개상담탭 -> 0, 1, 2
  const [consultTabStatus, setConsultTabStatus] = useState<number>(0);
  // 완료된 상담 제외, 포함
  const [isIncludeCompleteConsult, setIsIncludeCompleteConsult] =
    useState<boolean>(false);
  // 최근순, 읽지 않은 순
  const [sortType, setSortType] = useState<number>(0);
  // 모달 열지 말지
  const setIsModalOpen = useSetRecoilState<boolean>(isConsultModalOpenState);
  return (
    <>
      <ConsultSortingMenu>
        <div className="row1">
          <ConsultType
            isActive={consultTabStatus === 0}
            onClick={() => {
              setConsultTabStatus(0);
            }}
          >
            편지
          </ConsultType>
          <ConsultType
            isActive={consultTabStatus === 1}
            onClick={() => {
              setConsultTabStatus(1);
            }}
          >
            채팅
          </ConsultType>
          <ConsultType
            isLong={true}
            isActive={consultTabStatus === 2}
            onClick={() => {
              setConsultTabStatus(2);
            }}
          >
            공개상담
          </ConsultType>
          <SortingType
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <Button2 color={Grey3}>
              {sortType === 0 ? '최근순' : '읽지 않은 순'}
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
            {consultTabStatus !== 2 && (
              <>
                <CircleCheckIcon
                  fill={isIncludeCompleteConsult ? Grey5 : Green}
                />
                <Button2 color={Grey3}>종료/취소된 상담 제외</Button2>
              </>
            )}
          </div>
        </div>
      </ConsultSortingMenu>
      {consultTabStatus === 0 ? (
        <SellerLetterList
          sortType={sortType}
          setSortType={setSortType}
          isIncludeCompleteConsult={isIncludeCompleteConsult}
        />
      ) : consultTabStatus === 1 ? (
        <SellerChatList
          sortType={sortType}
          setSortType={setSortType}
          isIncludeCompleteConsult={isIncludeCompleteConsult}
        />
      ) : (
        <SellerOpenConsultList />
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
  width: ${(props) => (props.isLong ? '8rem' : '5.6rem')};
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
