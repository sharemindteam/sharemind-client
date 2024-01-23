import React, { SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { Green, Grey3, Grey4, Grey6 } from 'styles/color';
import { Body1, Button2, Caption2 } from 'styles/font';
import { isTimeModalOpenState } from 'utils/atom';
// 0부터 24까지 배열 생성
const hours = Array.from({ length: 25 }, (_, index) => index); 

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
    </Wrapper>
  );
}
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
    height: 4.5rem;
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
