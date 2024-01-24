import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Green, Grey1, Grey3, Grey4, Grey5 } from 'styles/color';
import { ReactComponent as CheckIcon2SVG } from 'assets/icons/icon-check2.svg';
import { ReactComponent as PlusIconSVG } from 'assets/icons/icon-plus.svg';
import { ReactComponent as MinusIconSVG } from 'assets/icons/icon-minus.svg';
import { Body1 } from 'styles/font';
import Input from 'components/Common/Input';
import TimeSelectModal from './TimeSelectModal';
import { useRecoilState } from 'recoil';
import { isTimeModalOpenState } from 'utils/atom';
import { BackDrop } from 'components/Common/BackDrop';
const dayEngtoKor: Record<string, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};
const dayList: string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
interface SelectedTimeList {
  [key: string]: string[];
}

interface IsSelected {
  [key: string]: boolean;
}
function SetChatTimeSection() {
  const dummyData = { MON: ['14~15', '15~20'], WED: ['11~13'] };
  const [selectedTimeList, setSelectedTimeList] = useState<SelectedTimeList>({
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
    SAT: [],
    SUN: [],
  });
  // 현재 선택이 된 (언제나 유일한 하나)
  const [isSelected, setIsSelected] = useState<IsSelected>({
    MON: false,
    TUE: false,
    WED: false,
    THU: false,
    FRI: false,
    SAT: false,
    SUN: false,
  });
  // 현재 체크표시가 되어있는
  const [isActive, setIsActive] = useState<IsSelected>({
    MON: false,
    TUE: false,
    WED: false,
    THU: false,
    FRI: false,
    SAT: false,
    SUN: false,
  });

  const [isTimeModalOpen, setIsTimeModalOpen] =
    useRecoilState(isTimeModalOpenState);

  console.log(selectedTimeList['THU'][0]);
  console.log(selectedTimeList);
  return (
    <Wrapper>
      {isTimeModalOpen && (
        <>
          <TimeSelectModal
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            selectedTimeList={selectedTimeList}
            setSelectedTimeList={setSelectedTimeList}
            setIsActive={setIsActive}
          />
          <BackDrop />
        </>
      )}

      <SetChatGuide>
        상담 활동이 가능한 시간대를 설정해주세요. <br />
        최소 1시간 이상 간격으로 설정해주세요.
      </SetChatGuide>
      <DayList>
        {dayList.map((item) => (
          <DayItem key={item}>
            <DayIndicator
              onClick={() => {
                if (isActive[item]) {
                  setSelectedTimeList({ ...selectedTimeList, [item]: [] });
                  setIsActive({ ...isActive, [item]: false });
                } else {
                  setIsSelected({ ...isSelected, [item]: true });
                  setIsTimeModalOpen(true);
                }
              }}
            >
              <CheckIcon2
                fill={isSelected[item] || isActive[item] ? Green : Grey5}
              />
              <Month>{dayEngtoKor[item]}</Month>
            </DayIndicator>
            {selectedTimeList[item]?.length === 0 ? (
              isSelected[item] ? (
                <TimeList>
                  <TimeItem>
                    <Input height="5rem" isBoxSizing={true} />
                    <PlusIcon />
                  </TimeItem>
                </TimeList>
              ) : (
                <NoGuide>가능한 시간 없음</NoGuide>
              )
            ) : selectedTimeList[item]?.length === 1 ? (
              <TimeList>
                {selectedTimeList[item].map((str) => (
                  <TimeItem>
                    <Input alignCenter={true} height="5rem" value={str} />
                    <PlusIcon
                      onClick={() => {
                        setIsSelected({ ...isSelected, [item]: true });
                        setIsTimeModalOpen(true);
                      }}
                    />
                  </TimeItem>
                ))}
              </TimeList>
            ) : selectedTimeList[item]?.length === 2 ? (
              <TimeList>
                {selectedTimeList[item].map((str) => (
                  <TimeItem>
                    <Input
                      width="100%"
                      height="5rem"
                      alignCenter={true}
                      value={str}
                    />
                    <MinusIcon
                      onClick={() => {
                        const copySelectedTimeList = selectedTimeList;
                        setSelectedTimeList({
                          ...selectedTimeList,
                          [item]: copySelectedTimeList[item].filter((item) => {
                            return item !== str;
                          }),
                        });
                      }}
                    />
                  </TimeItem>
                ))}
              </TimeList>
            ) : (
              ''
            )}
          </DayItem>
        ))}
      </DayList>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background-color: white;
`;
const SetChatGuide = styled.div`
  color: ${Grey1};
  font-family: Pretendard;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 155%;
  padding: 1.8rem 2rem 1.2rem;
`;

const DayList = styled.div`
  display: flex;
  flex-direction: column;
`;

const DayItem = styled.div`
  display: flex;
  padding: 2.3rem 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const TimeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: -1.4rem;
  margin-left: 2rem;
`;

const PlusIcon = styled(PlusIconSVG)`
  cursor: pointer;
`;
const MinusIcon = styled(MinusIconSVG)`
  cursor: pointer;
`;

const TimeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const NoGuide = styled.div`
  color: ${Grey4};
  margin-left: 4.1rem;
  margin-top: -0.4rem;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const DayIndicator = styled.div`
  display: flex;
`;

const Month = styled.div`
  color: ${Grey3};
  font-family: Pretendard;
  margin-left: 1rem;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
`;

const CheckIcon2 = styled(CheckIcon2SVG)`
  cursor: pointer;
`;

export default SetChatTimeSection;
