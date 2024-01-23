import { Space } from 'components/Common/Space';
import React, { SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { Green, Grey3, Grey4, Grey6 } from 'styles/color';
import { Body1, Button2, Caption2 } from 'styles/font';
import { isTimeModalOpenState } from 'utils/atom';
// 0부터 24까지 배열 생성
const hourList = Array.from({ length: 25 }, (_, index) => index);

interface TimeSelectModalProps {}
function TimeSelectModal({}: TimeSelectModalProps) {
  const [isTimeModalOpen, setIsTimeModalOpen] =
    useRecoilState(isTimeModalOpenState);
  const handleCompleteTime = () => {};
  return (
    <Wrapper visible={isTimeModalOpen}>
      <div className="bar-wrapper">
        <Bar />
      </div>
      <div className="row1">
        <Body1>상담 시간</Body1>
        <CompleteButton onClick={handleCompleteTime}>완료</CompleteButton>
      </div>
      <div className="row2">
        <Caption2 color={Grey3}>
          시작시간과 종료시간을 1시간 이상 간격으로 설정해주세요
        </Caption2>
      </div>
      <Space height="1.6rem" />
      <HourButtonList>
        {hourList.map((hour) => (
          <HourButton key={hour}>
            <Button2>{hour < 10 ? `0${hour}` : hour}시</Button2>
          </HourButton>
        ))}
        <Caption2 color={Grey3}>
          24시 이후에 종료하고 싶은 경우, 다음 요일의 <br />
          항목에서 시작과 종료를 별도로 설정해주세요
        </Caption2>
      </HourButtonList>
    </Wrapper>
  );
}
const HourButtonList = styled.div`
  display: flex;
  gap: 2.4rem;
  margin: 0 3.15rem;
  flex-wrap: wrap;
`;

const HourButton = styled.div`
  display: flex;
  cursor: pointer;
  background-color: white;
  width: 6rem;
  height: 3.4rem;
  justify-content: center;
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
  color: ${Green};
  cursor: pointer;
`;

const Wrapper = styled.div<{ visible: boolean }>`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
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
