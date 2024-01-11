import React from 'react';
import styled from 'styled-components';
import { LightGreen } from 'styles/color';
interface QuestionBoxProps {
  level: number;
  quiezText: string;
}

function QuestionBox({ level, quiezText }: QuestionBoxProps) {
  return (
    <QuestionBoxWrapper>
      <QuizNumber>{level}</QuizNumber>
      <QuizText>{quiezText}</QuizText>
    </QuestionBoxWrapper>
  );
}

const QuestionBoxWrapper = styled.div`
  border-radius: 1.2rem;
  padding: 1.5rem 2.4rem 2.4rem;
  box-sizing: border-box;
  background: ${LightGreen};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  height: 12.7rem;
  margin: 0 2rem;
`;
const QuizNumber = styled.div`
  color: var(--Signature-Green, #12c0b5);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 600;
  line-height: 135%; /* 2.43rem */
`;
const QuizText = styled.div`
  text-align: center;
  color: #000;
  text-align: center;
  word-break: keep-all;
  font-family: Pretendard;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 600;
  line-height: 135%; /* 2.43rem */
`;

export default QuestionBox;
