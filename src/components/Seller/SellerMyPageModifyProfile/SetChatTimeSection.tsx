import React, { useState } from 'react';
import styled from 'styled-components';
import { Green, Grey1, Grey3, Grey4, Grey5 } from 'styles/color';
import { ReactComponent as CheckIcon2SVG } from 'assets/icons/icon-check2.svg';
import { Body1 } from 'styles/font';
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
  [key: string]: number[];
}

interface IsSelected {
  [key: string]: boolean;
}
function SetChatTimeSection() {
  const [selectedTimeList, setSelectedTimeList] = useState<SelectedTimeList>({
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
    SAT: [],
    SUN: [],
  });
  const [isSelected, setIsSelected] = useState<IsSelected>({
    MON: false,
    TUE: false,
    WED: false,
    THU: false,
    FRI: false,
    SAT: false,
    SUN: false,
  });
  return (
    <Wrapper>
      <SetChatGuide>
        상담 활동이 가능한 시간대를 설정해주세요. <br />
        최소 1시간 이상 간격으로 설정해주세요.
      </SetChatGuide>
      <DayList>
        {dayList.map((item) => (
          <DayItem
            key={item}
            onClick={() => {
              setIsSelected({ ...isSelected, [item]: !isSelected[item] });
            }}
          >
            <CheckIcon2 fill={isSelected[item] ? Green : Grey5} />
            <Month>{dayEngtoKor[item]}</Month>
            {isSelected[item]
              ? ''
              : selectedTimeList[item]?.length === 0 && (
                  <NoGuide>가능한 시간 없음</NoGuide>
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
  align-items: center;
  height: 6.6rem;
  padding: 2.3rem 2rem;
  box-sizing: border-box;
`;
const NoGuide = styled.div`
  color: ${Grey4};
  margin-left: 4.1rem;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
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
