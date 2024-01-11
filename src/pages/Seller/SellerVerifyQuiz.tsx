import { Space } from 'components/Common/Space';
import QuestionBox from 'components/Seller/SellerVerifyQuiz/QuestionBox';
import VerifyQuizButton from 'components/Seller/SellerVerifyQuiz/VerifyQuizButton';
import VerifyQuizHeader from 'components/Seller/SellerVerifyQuiz/VerifyQuizHeader';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Green, Grey1, Grey6, LightGreen } from 'styles/color';
import { Subtitle } from 'styles/font';
import { quizChoiceList, quizList } from 'utils/constant';

export const SellerVerifyQuiz = () => {
  const [quizLevel, setQuizLevel] = useState<number>(1);
  const [choiceNumberList, setChoiceNumberList] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFail, setIsFail] = useState<boolean>(false);

  return (
    <>
      <VerifyQuizHeader progress={quizLevel * 20 + '%'} />
      <QuestionBox quiezText={quizList[quizLevel - 1]} level={quizLevel} />
      <Space height="4.6rem" />
      <ChoiceList>
        {quizChoiceList[quizLevel - 1].map((item, idx) => (
          <ChoiceItem
            isSelect={
              choiceNumberList[quizLevel - 1] === idx + 1 ? true : false
            }
            onClick={() => {
              let newArray = [...choiceNumberList];
              newArray[quizLevel - 1] = idx + 1;
              setChoiceNumberList(newArray);
              console.log(newArray);
            }}
          >
            {item}
          </ChoiceItem>
        ))}
      </ChoiceList>
      <VerifyQuizButton
        quizLevel={quizLevel}
        setQuizLevel={setQuizLevel}
        choiceNumberList={choiceNumberList}
        setChoiceNumberList={setChoiceNumberList}
      />
    </>
  );
};

const ChoiceList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  margin: 0 2rem;
`;

const ChoiceItem = styled.div<{ isSelect: boolean }>`
  width: 100%;
  box-sizing: border-box;
  border-radius: 0.8rem;
  background: ${(props) => (props.isSelect ? LightGreen : Grey6)};
  padding: 1.6rem 2.75rem;
  color: ${Grey1};
  outline: 1px solid ${(props) => (props.isSelect ? Green : 'none')};
  cursor: pointer;
  text-align: center;
  word-break: keep-all;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 2.4rem */
`;
