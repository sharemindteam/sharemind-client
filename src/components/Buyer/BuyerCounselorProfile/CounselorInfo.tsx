import styled from 'styled-components';
import { Grey1, Grey3, Grey6 } from 'styles/color';
import { Body3 } from 'styles/font';
import { consultTypeList } from 'utils/constant';
import { convertTimeToString } from 'utils/convertTimeToString';
import { ConsultTimes } from 'utils/type';
interface CounselorInfoProps {
  consultType: string[];
  letterPrice: number;
  chattingPrice: number;
  consultTimes: ConsultTimes;
}
export const CounselorInfo = ({
  consultType,
  letterPrice,
  chattingPrice,
  consultTimes,
}: CounselorInfoProps) => {
  return (
    <Wrapper>
      <div className="row1">
        <Body3 color={Grey3}>상담 방식</Body3>
        <Body3 color={Grey1}>{consultType.join(', ')}</Body3>
      </div>
      <div className="row2">
        <Body3 color={Grey3}>상담 시간</Body3>
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
        <Body3 color={Grey3}>상담료</Body3>
        <Body3 color={Grey1}>
          편지 1건 {letterPrice}원<br />
          실시간 30분당 {chattingPrice}원
        </Body3>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 1.6rem 2rem 1.2rem 5%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  border-bottom: 1px solid ${Grey6};
  .row1 {
    display: flex;
    gap: 6.8rem;
  }
  .row2 {
    display: flex;
    gap: 6.8rem;
  }
  .row3 {
    display: flex;
    gap: 8.3rem;
  }
`;
