import { useState } from 'react';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-modal-check.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { Green, Grey1, Grey3, Grey4, Grey6 } from 'styles/color';
import { Body1, Body3, Body4, Button2, Caption2 } from 'styles/font';
import { isStyleModalOpenState } from 'utils/atom';

interface StyleModalProps {
  selectStyle: string;
  setSelectStyle: any;
}
export const StyleModal = ({
  selectStyle,
  setSelectStyle,
}: StyleModalProps) => {
  const [isStyleModalOpen, setIsStyleModalOpen] = useRecoilState(
    isStyleModalOpenState,
  );
  const [modalStyle, setModalStyle] = useState(selectStyle);
  const handleCompleteStyle = () => {
    setSelectStyle(modalStyle);
    setIsStyleModalOpen(false);
  };
  return (
    <Wrapper visible={isStyleModalOpen}>
      <div className="bar-wrapper">
        <Bar />
      </div>
      <div className="row1">
        <Body1>상담 스타일</Body1>
        <CompleteButton onClick={handleCompleteStyle}>완료</CompleteButton>
      </div>
      <div className="row2">
        <Caption2 color={Grey3}>하나만 선택해주세요.</Caption2>
      </div>
      <div
        className="row"
        onClick={() => {
          setModalStyle('조언');
        }}
      >
        {modalStyle === '조언' ? (
          <>
            <div>
              <Body1 color={Green}>조언</Body1>
              <Body3 color={Green}>
                셰어의 이야기를 듣고 따듯한 조언을 해줘요
              </Body3>
            </div>
            <CheckIcon />
          </>
        ) : (
          <>
            <div>
              <Body1 color={Grey1}>조언</Body1>
              <Body3>셰어의 이야기를 듣고 따듯한 조언을 해줘요</Body3>
            </div>
          </>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          setModalStyle('공감');
        }}
      >
        {modalStyle === '공감' ? (
          <>
            <div>
              <Body1 color={Green}>공감</Body1>
              <Body3 color={Green}>
                셰어의 상황에 이입하고 공감하며 대화해요
              </Body3>
            </div>
            <CheckIcon />
          </>
        ) : (
          <div>
            <Body1 color={Grey1}>공감</Body1>
            <Body3 color={Grey1}>
              셰어의 상황에 이입하고 공감하며 대화해요
            </Body3>
          </div>
        )}
      </div>
      <div
        className="row"
        onClick={() => {
          setModalStyle('팩폭');
        }}
      >
        {modalStyle === '팩폭' ? (
          <>
            <div>
              <Body1 color={Green}>팩폭</Body1>
              <Body3 color={Green}>
                셰어가 상황을 직시할 수 있도록 팩트를 전달해요
              </Body3>
            </div>
            <CheckIcon />
          </>
        ) : (
          <div>
            <Body1 color={Grey1}>팩폭</Body1>
            <Body3 color={Grey1}>
              셰어가 상황을 직시할 수 있도록 팩트를 전달해요
            </Body3>
          </div>
        )}
      </div>
    </Wrapper>
  );
};
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
  height: 34.1rem;
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
