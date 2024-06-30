import { Flex } from 'components/Common/Flex';
import styled from 'styled-components';
import { Grey1, Grey3, Grey6, White } from 'styles/color';
import { Body3, Body4, Subtitle } from 'styles/font';
import { convertTimeToString } from 'utils/convertTimeToString';
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

export const CounselorInfo = ({
  consultType,
  letterPrice,
  chattingPrice,
  consultTimes,
}: CounselorInfoProps) => {
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
        <div className="row1">
          <Body4 color={Grey3}>상담 방식</Body4>
          <Body3 color={Grey1}>{consultType.join(', ')}</Body3>
        </div>
        <div className="row2">
          <Body4 color={Grey3}>상담 시간</Body4>
          <div>
            {consultTimes.MON !== undefined && consultTimes.MON.length !== 0 ? (
              <Body3 color={Grey1}>
                월 {convertTimeToString(consultTimes.MON)}
              </Body3>
            ) : null}
            {consultTimes.TUE !== undefined && consultTimes.TUE.length !== 0 ? (
              <Body3 color={Grey1}>
                화 {convertTimeToString(consultTimes.TUE)}
              </Body3>
            ) : null}
            {consultTimes.WED !== undefined && consultTimes.WED.length !== 0 ? (
              <Body3 color={Grey1}>
                수 {convertTimeToString(consultTimes.WED)}
              </Body3>
            ) : null}
            {consultTimes.THU !== undefined && consultTimes.THU.length !== 0 ? (
              <Body3 color={Grey1}>
                목 {convertTimeToString(consultTimes.THU)}
              </Body3>
            ) : null}
            {consultTimes.FRI !== undefined && consultTimes.FRI.length !== 0 ? (
              <Body3 color={Grey1}>
                금 {convertTimeToString(consultTimes.FRI)}
              </Body3>
            ) : null}
            {consultTimes.SAT !== undefined && consultTimes.SAT.length !== 0 ? (
              <Body3 color={Grey1}>
                토 {convertTimeToString(consultTimes.SAT)}
              </Body3>
            ) : null}
            {consultTimes.SUN !== undefined && consultTimes.SUN.length !== 0 ? (
              <Body3 color={Grey1}>
                일 {convertTimeToString(consultTimes.SUN)}
              </Body3>
            ) : null}
          </div>
        </div>
        <div className="row3">
          <Body4 color={Grey3}>상담 금액</Body4>
          <div>
            {letterPrice !== undefined ? (
              <Body3 color={Grey1}>
                편지 1건 {letterPrice.toLocaleString()}원
              </Body3>
            ) : null}
            {chattingPrice !== undefined ? (
              <Body3 color={Grey1}>
                채팅 30분당 {chattingPrice.toLocaleString()}원
              </Body3>
            ) : null}
          </div>
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
  gap: 0.3rem;
  border-bottom: 1px solid ${Grey6};
  .row1 {
    display: flex;
    gap: 6rem;
  }
  .row2 {
    display: flex;
    gap: 6rem;
  }
  .row3 {
    display: flex;
    gap: 6rem;
  }
`;
