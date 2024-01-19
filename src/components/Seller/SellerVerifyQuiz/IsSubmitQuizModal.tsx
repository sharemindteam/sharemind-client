import { postIsPassQuiz } from 'api/post';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
import { quizAnswerList } from 'utils/constant';
interface IsSubmitQuizModalProps {
  setIsSubmitModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  choiceNumberList: number[];
  setVerifyStatus: React.Dispatch<React.SetStateAction<string>>;
}
function IsSubmitQuizModal({
  setIsSubmitModalOpen,
  choiceNumberList,
  setVerifyStatus,
}: IsSubmitQuizModalProps) {
  const postSuccess = async () => {
    await postIsPassQuiz(null, {
      params: {
        isEducated: true,
      },
    });

    setVerifyStatus('인증 성공');
  };
  const postFail = async () => {
    await postIsPassQuiz(null, {
      params: {
        isEducated: false,
      },
    });
    setVerifyStatus('인증 실패');
  };
  return (
    <IsSubmitQuizModalBox>
      <ModalBox>
        <Body1>퀴즈를 제출할까요?</Body1>
        <Body3 color={Grey4}>퀴즈는 24시간 내 1회만 응시가 가능해요.</Body3>
        <ButtonWrapper>
          <NoButton
            onClick={() => {
              setIsSubmitModalOpen(false);
            }}
          >
            취소
          </NoButton>
          <YesButton
            onClick={() => {
              setIsSubmitModalOpen(false);
              if (choiceNumberList.toString() === quizAnswerList.toString()) {
                postSuccess();
              } else {
                postFail();
              }
            }}
          >
            제출하기
          </YesButton>
        </ButtonWrapper>
      </ModalBox>
    </IsSubmitQuizModalBox>
  );
}
const IsSubmitQuizModalBox = styled.div`
  width: 100%;
  height: 15rem;
  z-index: 9999;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 22.3rem;
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
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
export default IsSubmitQuizModal;
