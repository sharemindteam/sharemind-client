import { Flex } from 'components/Common/Flex';
import { useMemo } from 'react';
import styled from 'styled-components';
import { Grey1, Grey2, Grey6, LightGreen, White } from 'styles/color';
import { Body3, Body4, Subtitle } from 'styles/font';
import { convertTimeToStringProfileInfo } from 'utils/convertTimeToString';
import { ConsultTimes } from 'utils/type';

//
//
//

interface CounselorInfoProps {
  consultType: string[];
  letterPrice: number;
  chattingPrice: number;
  consultTimes: ConsultTimes;
}

//
//
//

const COUNSELOR_INFO_GAP = '6.4rem';

const DAY_MAPPING: { [key: string]: string } = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

const ORDERED_DAY = ['월', '화', '수', '목', '금', '토', '일'];

//
//
//

export const CounselorInfo = ({
  consultType,
  letterPrice,
  chattingPrice,
  consultTimes,
}: CounselorInfoProps) => {
  const consultTimesArray = Object.entries(consultTimes);

  const filterdTimes = useMemo(
    () =>
      consultTimesArray
        .map(([day, times]) => {
          return { day: DAY_MAPPING[day], times };
        })
        .sort(
          (a, b) => ORDERED_DAY.indexOf(a.day) - ORDERED_DAY.indexOf(b.day),
        ),
    [consultTimesArray],
  );

  const getCurrentDay = () => {
    const today = new Date();
    const dayIndex = today.getDay(); // 일요일: 0, 월요일: 1, ... , 토요일: 6

    // match to the index of ORDERED_DAY
    if (dayIndex === 0) {
      return ORDERED_DAY[6];
    }

    return ORDERED_DAY[dayIndex - 1];
  };

  const currentDay = getCurrentDay();

  /**
   *
   */
  const renderConsultTimes = () => {
    return filterdTimes.map((dayItem) => {
      if (dayItem.times.length === 0 || dayItem.times === undefined) {
        return null;
      }

      const isCurrentDay = currentDay === dayItem.day;

      return (
        <Flex gap="0.8rem" align="flex-start">
          <DayTag isCurrentDay={isCurrentDay}>
            {isCurrentDay ? (
              <Body4> {dayItem.day}</Body4>
            ) : (
              <Body3>{dayItem.day}</Body3>
            )}
          </DayTag>
          <TimeTag isCurrentDay={isCurrentDay}>
            <Body3
              color={Grey1}
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'keep-all',
                textAlign: 'left',
              }}
            >
              {convertTimeToStringProfileInfo(dayItem.times)}
            </Body3>
          </TimeTag>
        </Flex>
      );
    });
  };

  //
  //
  //

  return (
    <Flex
      direction="column"
      gap="1.2rem"
      style={{ padding: '1.2rem 2rem 2rem 2rem' }}
    >
      <Subtitle color={Grey1} style={{ textAlign: 'left', width: '100%' }}>
        이렇게 상담할 수 있어요
      </Subtitle>
      <Wrapper>
        <div className="row">
          <Body4 color={Grey2}>상담 방식</Body4>
          <Flex gap="0.8rem">
            {consultType.map((type) => (
              <Flex
                key={type}
                style={{
                  backgroundColor: LightGreen,
                  boxSizing: 'border-box',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '0.5rem',
                }}
              >
                <Body4>{type}</Body4>
              </Flex>
            ))}
          </Flex>
        </div>
        <div className="row">
          <Body4 color={Grey2}>상담 시간</Body4>
          <Flex direction="column" gap="0.4rem" align="flex-start">
            {renderConsultTimes()}
          </Flex>
        </div>
        <div className="row">
          <Body4 color={Grey2}>상담 금액</Body4>
          <Flex direction="column" gap="0.4rem" align="flex-start">
            {letterPrice !== undefined ? (
              <Flex
                gap="0.4rem"
                style={{
                  padding: '0.3rem 0.8rem',
                  backgroundColor: LightGreen,
                  borderRadius: '0.5rem',
                }}
              >
                <Body3 color={Grey1}>편지 1건</Body3>
                <Body4 color={Grey1}>{letterPrice.toLocaleString()}원</Body4>
              </Flex>
            ) : null}
            {chattingPrice !== undefined ? (
              <Flex
                gap="0.4rem"
                style={{
                  padding: '0.3rem 0.8rem',
                  backgroundColor: LightGreen,
                  borderRadius: '0.5rem',
                }}
              >
                <Body3 color={Grey1}>채팅 30분당</Body3>
                <Body4 color={Grey1}>{chattingPrice.toLocaleString()}원</Body4>
              </Flex>
            ) : null}
          </Flex>
        </div>
      </Wrapper>
    </Flex>
  );
};

const Wrapper = styled.div`
  background-color: ${White};
  border-radius: 1.2rem;
  width: 100%;
  box-sizing: border-box;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-bottom: 1px solid ${Grey6};

  .row {
    display: flex;
    gap: ${COUNSELOR_INFO_GAP};
  }
`;

const DayTag = styled.div<{ isCurrentDay: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0.8rem;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.isCurrentDay ? LightGreen : Grey6)};
`;

const TimeTag = styled.div<{ isCurrentDay: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0.8rem;
  border-radius: 0.5rem;
  max-width: 15rem;
  background-color: ${(props) => (props.isCurrentDay ? LightGreen : Grey6)};
`;
