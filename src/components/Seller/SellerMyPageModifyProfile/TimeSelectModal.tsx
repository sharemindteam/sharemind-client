import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { APP_WIDTH } from 'styles/AppStyle';
import {
  Black,
  Green,
  Grey3,
  Grey4,
  Grey5,
  Grey6,
  LightGreen,
  White,
} from 'styles/color';
import { Body1, Button2, Caption2 } from 'styles/font';
import { isTimeModalOpenState } from 'utils/atom';

//
//
//

// 0부터 24까지 배열 생성
const hourList = Array.from({ length: 25 }, (_, index) => index);

//
//
//

interface SelectedTimeList {
  [key: string]: string[];
}
interface ActiveDay {
  [key: string]: boolean;
}
interface TimeSelectModalProps {
  isSelected: any;
  selectedTimeList: SelectedTimeList;
  setSelectedTimeList: React.Dispatch<React.SetStateAction<SelectedTimeList>>;
  setIsActive: React.Dispatch<React.SetStateAction<ActiveDay>>;
  setIsSelected: React.Dispatch<React.SetStateAction<ActiveDay>>;
}

//
//
//

function TimeSelectModal({
  isSelected,
  selectedTimeList,
  setSelectedTimeList,
  setIsActive,
  setIsSelected,
}: TimeSelectModalProps) {
  // 이미 선택한 시간의 범위
  const [blockRange, setBlockRange] = useState<number[]>();
  // 어떤 요일에 대한 시간 설정인지
  const foundDayKey: any = Object.keys(isSelected).find(
    (key) => isSelected[key] === true,
  );

  useEffect(() => {
    if (selectedTimeList[foundDayKey][0]) {
      const [startNumber, endNumber] = selectedTimeList[foundDayKey][0]
        ?.split('~')
        ?.map(Number);
      setBlockRange([startNumber, endNumber]);
    }
  }, [foundDayKey]);

  // 모달 오픈 여부
  const [isTimeModalOpen, setIsTimeModalOpen] =
    useRecoilState(isTimeModalOpenState);
  // 모달에서 선택한 시간
  const [selectedArray, setSelectedArray] = useState<number[]>([]);
  // 모달에서 시간을 클릭했을 때 trigger되는 함수
  const handleClickHour = (hour: number) => {
    if (selectedArray.length === 0) {
      setSelectedArray([hour]);
    } else if (selectedArray.length === 1) {
      if (selectedArray.includes(hour)) {
        const copyArray = [...selectedArray];
        setSelectedArray(copyArray.filter((item) => item !== hour));
      } else {
        if (blockRange) {
          if (selectedArray[0] < blockRange[0]) {
            if (hour < blockRange[0]) {
              const copyArray = [...selectedArray];
              copyArray.push(hour);
              copyArray.sort((a, b) => a - b);
              setSelectedArray([...copyArray]);
            } else {
              return;
            }
          } else if (selectedArray[0] > blockRange[0]) {
            if (hour > blockRange[0]) {
              const copyArray = [...selectedArray];
              copyArray.push(hour);
              copyArray.sort((a, b) => a - b);
              setSelectedArray([...copyArray]);
            } else {
              return;
            }
          }
          return;
        }

        const copyArray = [...selectedArray];
        copyArray.push(hour);
        copyArray.sort((a, b) => a - b);
        setSelectedArray([...copyArray]);
      }
    } else if (selectedArray.length === 2) {
      if (selectedArray.includes(hour)) {
        const copyArray = selectedArray.filter((item) => item !== hour);
        setSelectedArray([...copyArray]);
      } else {
        setSelectedArray([hour]);
      }
    }
  };

  // 모달에서 완료버튼을 눌렀을 때 trigger되는 함수
  const handleCompleteTime = () => {
    if (foundDayKey) {
      const pushedString = selectedArray[0] + '~' + selectedArray[1];
      setSelectedTimeList((prevSelectedTimeList) => {
        return {
          ...prevSelectedTimeList,
          [foundDayKey]: [...prevSelectedTimeList[foundDayKey], pushedString],
        };
      });

      setIsTimeModalOpen(false);
      setIsSelected({
        MON: false,
        TUE: false,
        WED: false,
        THU: false,
        FRI: false,
        SAT: false,
        SUN: false,
      });
      setIsActive((prev) => {
        return {
          ...prev,
          [foundDayKey]: true,
        };
      });
    } else {
      console.error('No day selected.'); // 선택된 요일이 없는 경우 에러 처리
    }
  };

  //
  //
  //

  return (
    <Wrapper visible={isTimeModalOpen}>
      <div className="bar-wrapper">
        <Bar />
      </div>
      <div className="row1">
        <Body1>상담 시간</Body1>
        <CompleteButton
          color={selectedArray.length === 2 ? Green : Grey3}
          onClick={() => {
            if (selectedArray.length === 2) {
              handleCompleteTime();
            } else {
              setIsSelected({
                MON: false,
                TUE: false,
                WED: false,
                THU: false,
                FRI: false,
                SAT: false,
                SUN: false,
              });
              setIsTimeModalOpen(false);
            }
          }}
        >
          완료
        </CompleteButton>
      </div>
      <div className="row2">
        <Caption2 color={Grey3}>
          시작시간과 종료시간을 1시간 이상 간격으로 설정해주세요
        </Caption2>
      </div>
      <HourButtonList>
        {hourList.map((hour) => (
          <HourButton
            key={hour}
            isActive={selectedArray.includes(hour)}
            isBetween={
              selectedArray.length === 2
                ? hour > selectedArray[0] && hour < selectedArray[1]
                  ? true
                  : false
                : false
            }
            isBlock={
              !blockRange
                ? false
                : hour >= blockRange[0] && hour <= blockRange[1]
                ? true
                : false
            }
            onClick={() => {
              if (blockRange) {
                if (hour >= blockRange[0] && hour <= blockRange[1]) {
                  return;
                }
              }
              handleClickHour(hour);
            }}
          >
            {hour < 10 ? `0${hour}` : hour}시
          </HourButton>
        ))}
        <div className="guide-message" style={{ alignSelf: 'center' }}>
          <Caption2 color={Grey3}>
            24시 이후에 종료하고 싶은 경우, 다음 요일의 <br />
            항목에서 시작과 종료를 별도로 설정해주세요
          </Caption2>
        </div>
      </HourButtonList>
    </Wrapper>
  );
}
const HourButtonList = styled.div`
  display: flex;
  margin: 0 2rem;
  flex-wrap: wrap;
`;

const HourButton = styled.div<{
  isActive: boolean;
  isBetween: boolean;
  isBlock: boolean;
}>`
  display: flex;
  cursor: pointer;
  background-color: ${({ isActive, isBetween, isBlock }) =>
    isActive ? Green : isBetween ? LightGreen : isBlock ? Grey5 : White};
  color: ${({ isActive, isBetween, isBlock }) =>
    isActive ? White : isBetween ? Black : isBlock ? White : Black};
  width: 18%;
  margin: 3.5%;
  font-size: 1.4rem;
  height: 3.4rem;
  justify-content: center;
  font-family: 'Pretendard';
  align-items: center;
  border-radius: 1.2rem;
`;

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
  cursor: pointer;
`;

const Wrapper = styled.div<{ visible: boolean }>`
  width: 100%;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }

  position: fixed;
  height: 51.7rem;
  background-color: ${Grey6};
  bottom: 0;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 2002;
  animation: ${({ visible }) => (visible ? slideIn : slideOut)} 0.3s ease-in-out;
  .bar-wrapper {
    height: 2.7rem;
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
export default TimeSelectModal;
