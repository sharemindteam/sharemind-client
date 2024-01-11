import { BackDrop } from 'components/Common/BackDrop';
import { Space } from 'components/Common/Space';
import IsSubmitQuizModal from 'components/Seller/SellerVerifyQuiz/IsSubmitQuizModal';
import QuestionBox from 'components/Seller/SellerVerifyQuiz/QuestionBox';
import VerifyFail from 'components/Seller/SellerVerifyQuiz/VerifyFail';
import VerifyQuizButton from 'components/Seller/SellerVerifyQuiz/VerifyQuizButton';
import VerifyQuizHeader from 'components/Seller/SellerVerifyQuiz/VerifyQuizHeader';
import VerifySuccess from 'components/Seller/SellerVerifyQuiz/VerifySuccess';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Green, Grey1, Grey6, LightGreen } from 'styles/color';
import { Subtitle } from 'styles/font';
import { quizAnswerList, quizChoiceList, quizList } from 'utils/constant';

export const SellerVerifyQuiz = () => {
  const [quizLevel, setQuizLevel] = useState<number>(1);
  const [choiceNumberList, setChoiceNumberList] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [verifyStatus, setVerifyStatus] = useState<string>('인증 전');
  console.log(choiceNumberList);
  console.log(quizAnswerList);
  console.log(verifyStatus);
  return (
    <>
      <VerifyQuizHeader
        progress={quizLevel * 20 + '%'}
        verifyStatus={verifyStatus}
      />
      {verifyStatus === '인증 성공' ? (
        <VerifySuccess />
      ) : verifyStatus === '인증 실패' ? (
        <VerifyFail />
      ) : (
        <>
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
            setIsSubmitModalOpen={setIsSubmitModalOpen}
          />
        </>
      )}

      {isSubmitModalOpen && (
        <>
          <BackDrop />
          <IsSubmitQuizModal
            setVerifyStatus={setVerifyStatus}
            setIsSubmitModalOpen={setIsSubmitModalOpen}
            choiceNumberList={choiceNumberList}
          />
        </>
      )}
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
