import styled from 'styled-components';
import { Grey1, Grey3, Grey6 } from 'styles/color';
import { Body3 } from 'styles/font';
import { consultTypeList } from 'utils/constant';
interface CounselorInfoProps {
  consultType: number;
  letterPrice: number;
  chattingPrice: number;
}
export const CounselorInfo = ({
  consultType,
  letterPrice,
  chattingPrice,
}: CounselorInfoProps) => {
  const availableConsult = consultTypeList[consultType];
  return (
    <Wrapper>
      <div className="row1">
        <Body3 color={Grey3}>상담 방식</Body3>
        <Body3 color={Grey1}>{availableConsult}</Body3>
      </div>
      <div className="row2">
        <Body3 color={Grey3}>상담 시간</Body3>
        <Body3 color={Grey1}>
          월-금 21:00-24:00
          <br />
          토-일 09:00-22:00
        </Body3>
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
