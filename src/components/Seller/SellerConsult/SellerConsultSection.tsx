import { Black, Green, Grey3, Grey5, Grey6, LightRed, Red } from 'styles/color';
import { ReactComponent as DownArrowIcon } from 'assets/icons/sorting-down-arrow.svg';
import { ReactComponent as CircleCheckIcon } from 'assets/icons/circle-check.svg';
import { Button2 } from 'styles/font';
import styled from 'styled-components';
import { useState } from 'react';
import OngoingCounsultBox from '../Common/OngoingCounsultBox';

interface ConsultTypeProps {
  isActive: boolean;
}

export const SellerConsultSection = () => {
  const [isLetterActive, setIsLetterActive] = useState<boolean>(true);
  const [isInclueCompleteConsult, setIsIncludeCompleteConsult] =
    useState<boolean>(false);
  return (
    <>
      <ConsultSortingMenu>
        <div className="row1">
          <ConsultType
            isActive={isLetterActive}
            onClick={() => {
              setIsLetterActive(true);
            }}
          >
            편지
          </ConsultType>
          <ConsultType
            isActive={!isLetterActive}
            onClick={() => {
              setIsLetterActive(false);
            }}
          >
            채팅
          </ConsultType>
          <SortingType>
            <Button2 color={Grey3}>최근순</Button2>
            <DownArrowIcon />
          </SortingType>
        </div>
        <div className="row2">
          <div
            className="row2-1"
            onClick={() => {
              setIsIncludeCompleteConsult(!isInclueCompleteConsult);
            }}
          >
            <CircleCheckIcon fill={isInclueCompleteConsult ? Grey5 : Red} />
            <Button2 color={Grey3}>완료된 상담 제외</Button2>
          </div>
        </div>
      </ConsultSortingMenu>

      <ConsultBoxList>
        <OngoingCounsultBox
          consultStatus="상담 대기"
          counselorName="연애상담마스터"
          beforeMinutes="8분 전"
          content="연애 상담마스터님께 고민 내용을 남겨주세요. 연애 상담마스터님이 어쩌구"
          newMessageCounts={1}
          counselorprofileStatus={2}
        />{' '}
        <OngoingCounsultBox
          consultStatus="상담 중"
          counselorName="연애상담마스터"
          beforeMinutes="8분 전"
          content="연애 상담마스터님께 고민 내용을 남겨주세요. 연애 상담마스터님이 어쩌구"
          newMessageCounts={1}
          counselorprofileStatus={3}
        />
        <OngoingCounsultBox
          consultStatus="상담 종료"
          counselorName="연애상담마스터"
          beforeMinutes="8분 전"
          content="연애 상담마스터님께 고민 내용을 남겨주세요. 연애 상담마스터님이 어쩌구"
          newMessageCounts={0}
          counselorprofileStatus={3}
        />
      </ConsultBoxList>
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
  height: 3.1rem;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 1.2rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  background: ${(props) => (props.isActive ? LightRed : Grey6)};
  color: ${(props) => (props.isActive ? Red : Black)};
`;
const SortingType = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 0.8rem;
  align-items: center;
  gap: 0.4rem;
`;

const ConsultBoxList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  gap: 0.8rem;
`;
