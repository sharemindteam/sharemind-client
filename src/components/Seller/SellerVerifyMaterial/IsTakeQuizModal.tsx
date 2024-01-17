import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
import { isTakingQuizModalOpenState } from 'utils/atom';
function IsTakeQuizModal() {
  const setIsTakingQuizModalOpen = useSetRecoilState(
    isTakingQuizModalOpenState,
  );
  const navigate = useNavigate();
  return (
    <IsTakeQuizModalBox>
      {' '}
      <ModalBox>
        <Body1>퀴즈를 응시하시겠습니까?</Body1>
        <Body3 color={Grey4}>퀴즈는 24시간 내 1회만 응시가 가능해요.</Body3>
        <ButtonWrapper>
          <NoButton
            onClick={() => {
              setIsTakingQuizModalOpen(false);
            }}
          >
            취소
          </NoButton>
          <YesButton
            onClick={() => {
              setIsTakingQuizModalOpen(false);
              navigate('/seller/quiz');
            }}
          >
            퀴즈 응시하기
          </YesButton>
        </ButtonWrapper>
      </ModalBox>
    </IsTakeQuizModalBox>
  );
}

const IsTakeQuizModalBox = styled.div`
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

export default IsTakeQuizModal;
