import { Button } from 'components/Common/Button';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body3 } from 'styles/font';

interface VerifyQuizButtonProps {
  quizLevel: number;
  setQuizLevel: React.Dispatch<React.SetStateAction<number>>;
  choiceNumberList: number[];
  setChoiceNumberList: React.Dispatch<React.SetStateAction<number[]>>;
  setIsSubmitModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function VerifyQuizButton({
  quizLevel,
  setQuizLevel,
  choiceNumberList,
  setChoiceNumberList,
  setIsSubmitModalOpen,
}: VerifyQuizButtonProps) {
  if (quizLevel === 1) {
    return (
      <VerifyQuizButtonWrapper>
        <div className="buttons">
          <Button
            text={'이전'}
            width="100%"
            backgroundColor={LightGreen}
            color={Green}
            height="5.2rem"
            onClick={() => {
              setQuizLevel(1);
            }}
          />
          <Button
            text={'다음'}
            width="100%"
            isActive={choiceNumberList[0] ? true : false}
            backgroundColor={Green}
            height="5.2rem"
            onClick={() => {
              setQuizLevel(2);
            }}
          />
        </div>
      </VerifyQuizButtonWrapper>
    );
  } else if (quizLevel === 2) {
    return (
      <VerifyQuizButtonWrapper>
        <div className="buttons">
          <Button
            text={'이전'}
            width="100%"
            backgroundColor={LightGreen}
            color={Green}
            height="5.2rem"
            onClick={() => {
              setQuizLevel(1);
            }}
          />
          <Button
            text={'다음'}
            width="100%"
            isActive={choiceNumberList[1] ? true : false}
            backgroundColor={Green}
            height="5.2rem"
            onClick={() => {
              setQuizLevel(3);
            }}
          />
        </div>
      </VerifyQuizButtonWrapper>
    );
  } else if (quizLevel === 3) {
    return (
      <VerifyQuizButtonWrapper>
        <div className="buttons">
          <Button
            text={'이전'}
            width="100%"
            backgroundColor={LightGreen}
            color={Green}
            height="5.2rem"
            onClick={() => {
              setQuizLevel(2);
            }}
          />
          <Button
            text={'다음'}
            width="100%"
            isActive={choiceNumberList[2] ? true : false}
            backgroundColor={Green}
            height="5.2rem"
            onClick={() => {
              setQuizLevel(4);
            }}
          />
        </div>
      </VerifyQuizButtonWrapper>
    );
  } else if (quizLevel === 4) {
    return (
      <VerifyQuizButtonWrapper>
        <div className="buttons">
          <Button
            text={'이전'}
            width="100%"
            backgroundColor={LightGreen}
            color={Green}
            height="5.2rem"
            onClick={() => {
              setQuizLevel(3);
            }}
          />
          <Button
            text={'다음'}
            width="100%"
            isActive={choiceNumberList[3] ? true : false}
            backgroundColor={Green}
            height="5.2rem"
            onClick={() => {
              setQuizLevel(5);
            }}
          />
        </div>
      </VerifyQuizButtonWrapper>
    );
  } else if (quizLevel === 5) {
    return (
      <VerifyQuizButtonWrapper>
        <div className="buttons">
          <Button
            text={'이전'}
            width="100%"
            backgroundColor={LightGreen}
            color={Green}
            height="5.2rem"
            onClick={() => {
              setQuizLevel(4);
            }}
          />
          <Button
            text={'제출하기'}
            width="100%"
            isActive={choiceNumberList[4] ? true : false}
            backgroundColor={Green}
            height="5.2rem"
            onClick={() => {
              setIsSubmitModalOpen(true);
            }}
          />
        </div>
      </VerifyQuizButtonWrapper>
    );
  }
}

const VerifyQuizButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.6rem;
  margin-bottom: 1.6rem;
  background-color: ${White};
  position: fixed;
  bottom: 0;

  // 이전, 다음버튼처럼 2개일 때
  .buttons {
    display: flex;
    justify-content: center;
    gap: 0.7rem;
    width: calc(100% - 4rem);
  }
  @media (max-width: 767px) {
    width: calc(100%);
  }
  @media (min-width: 768px) {
    width: calc(375px);
  }
`;

export default VerifyQuizButton;
