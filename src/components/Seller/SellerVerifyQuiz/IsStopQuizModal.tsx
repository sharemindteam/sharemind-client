import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { APP_WIDTH } from 'styles/AppStyle';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
//
//
//
interface IsStopQuizModalProps {
  setIsStopModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
//
//
//
function IsStopQuizModal({ setIsStopModalOpen }: IsStopQuizModalProps) {
  const navigate = useNavigate();
  return (
    <>
      <IsSubmitQuizModalBox>
        <ModalBox>
          <Body1>마인더 인증을 중단하시겠어요?</Body1>
          <Body3 color={Grey4}>
            내용이 저장되지 않고 처음부터 다시 인증해야 해요.
          </Body3>
          <ButtonWrapper>
            <NoButton
              onClick={() => {
                setIsStopModalOpen(false);
              }}
            >
              취소
            </NoButton>
            <YesButton
              onClick={() => {
                setIsStopModalOpen(false);
                navigate('/minder/mypage');
              }}
            >
              중단하기
            </YesButton>
          </ButtonWrapper>
        </ModalBox>
      </IsSubmitQuizModalBox>
    </>
  );
}
const IsSubmitQuizModalBox = styled.div`
  width: 100%;
  height: 15rem;
  z-index: 9999;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 36vh;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }
`;
const ModalBox = styled.div`
  background: ${White};
  padding: 2rem;
  border-radius: 1.2rem;
  box-sizing: border-box;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 0.7rem;
  font-size: 1.6rem;
`;

const NoButton = styled.div`
  display: flex;
  width: 14.8rem;
  height: 5.2rem;
  cursor: pointer;
  border-radius: 0.8rem;
  padding: 1.7rem 0rem 1.5rem 0rem;
  justify-content: center;
  align-items: center;
  color: ${Green};
  background-color: ${LightGreen};
  box-sizing: border-box;
`;

const YesButton = styled.div`
  display: flex;
  width: 14.8rem;
  height: 5.2rem;
  border-radius: 0.8rem;
  padding: 1.7rem 0rem 1.5rem 0rem;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: ${White};
  background-color: ${Green};
  box-sizing: border-box;
`;
export default IsStopQuizModal;
