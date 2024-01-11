import VerifyQuizHeader from 'components/Seller/SellerVerifyQuiz/VerifyQuizHeader';
import { useState } from 'react';
import styled from 'styled-components';
import { Green } from 'styles/color';
import { Subtitle } from 'styles/font';

export const SellerVerifyQuiz = () => {
  const [quizLevel, setQuizLevel] = useState<number>(1);
  return (
    <>
      <VerifyQuizHeader progress={quizLevel * 25 + '%'} />
      <QuestionBox>
        <Subtitle color={Green}>{quizLevel}</Subtitle>
        <Subtitle>다음 중 상담자</Subtitle>
      </QuestionBox>
    </>
  );
};

const QuestionBox = styled.div``;
