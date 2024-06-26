import { getIsPassQuiz } from 'api/get';
import { BackDrop } from 'components/Common/BackDrop';
import { Space } from 'components/Common/Space';
import IsStopQuizModal from 'components/Seller/SellerVerifyQuiz/IsStopQuizModal';
import IsSubmitQuizModal from 'components/Seller/SellerVerifyQuiz/IsSubmitQuizModal';
import QuestionBox from 'components/Seller/SellerVerifyQuiz/QuestionBox';
import VerifyFail from 'components/Seller/SellerVerifyQuiz/VerifyFail';
import VerifyQuizButton from 'components/Seller/SellerVerifyQuiz/VerifyQuizButton';
import VerifyQuizHeader from 'components/Seller/SellerVerifyQuiz/VerifyQuizHeader';
import VerifySuccess from 'components/Seller/SellerVerifyQuiz/VerifySuccess';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey1, Grey6, LightGreen } from 'styles/color';
import { quizChoiceList, quizList } from 'utils/constant';

//
//
//

export const SellerVerifyQuiz = () => {
  const navigate = useNavigate();

  // 현재 몇번쨰 문제를 나타내는 상태 (1~5)
  const [quizLevel, setQuizLevel] = useState<number>(1);

  // 사용자가 문제를 풀며 선택한 답 (리스트), 초기값 : 모두 0
  const [choiceNumberList, setChoiceNumberList] = useState<number[]>([
    0, 0, 0, 0, 0,
  ]);

  // 모달 오픈 여부에 관한 상태
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isStopModalOpen, setIsStopModalOpen] = useState<boolean>(false);

  // 하나의 컴포넌트에 인증 전, 인증 성공, 인증 실패 상태에 따른 뷰 구현을 위한 상태
  const [verifyStatus, setVerifyStatus] = useState<string>('인증 전');

  //
  //
  //
  useEffect(() => {
    const fetchIsPassQuiz = async () => {
      try {
        const res: any = await getIsPassQuiz();
        if (res.status === 200) {
          if (!res.data) {
            alert('접근 권한이 없습니다.');
            navigate('/minder/mypage');
          }
        }
      } catch (err) {
        alert(err);
        navigate('/minder/mypage');
      }
    };

    fetchIsPassQuiz();
  }, [navigate]);

  //
  //
  //

  return (
    <>
      <VerifyQuizHeader
        progress={quizLevel * 20 + '%'}
        verifyStatus={verifyStatus}
        setIsStopModalOpen={setIsStopModalOpen}
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
                }}
              >
                {item}
              </ChoiceItem>
            ))}
          </ChoiceList>
          <Space height="8rem" />
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
      {isStopModalOpen && (
        <>
          <BackDrop />
          <IsStopQuizModal setIsStopModalOpen={setIsStopModalOpen} />
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
