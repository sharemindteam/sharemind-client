import styled from 'styled-components';
import OngoingCounsultBox from '../Common/OngoingCounsultBox';
import React, { useEffect, useState } from 'react';
import { Green, Grey3, Grey5, Grey6, LightGreen, White } from 'styles/color';
import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { PostModal } from './PostModal';
import { SaveModal } from './SaveModal';
interface LetterConsultInform {
  categoryStatus?: CartegoryState;
  counselorName: string | undefined;
  beforeMinutes: string | undefined;
  content: string | undefined;
  newMessageCounts: number | undefined;
  counselorprofileStatus: number | undefined;
  date: string | undefined;
}
export const LetterWriteMainSection = ({
  setIsSend,
  isViewQuestion,
  setIsViewQuestion,
}: {
  setIsSend: React.Dispatch<React.SetStateAction<boolean>>;
  isViewQuestion: boolean;
  setIsViewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [consultInform, setConsultInform] = useState<LetterConsultInform>({
    categoryStatus: undefined,
    counselorName: undefined,
    beforeMinutes: undefined,
    content: undefined,
    newMessageCounts: undefined,
    counselorprofileStatus: undefined,
    date: undefined,
  });
  // 임시저장, 전송하기 버튼 활성화여부
  const [isActiveSaveButton, setIsActiveSaveButton] = useState(false);
  const [isActivePostButton, setIsActivePostButton] = useState(false);

  // 모달 활성화여부
  const [isActivePostModal, setIsActivePostModal] = useState(false);
  const [isActiveSaveModal, setIsActiveSaveModal] = useState(false);

  // 답안 텍스트
  const [replyText, setReplyText] = useState<string>('');

  // 여기서 API 요청
  useEffect(() => {
    setConsultInform({
      categoryStatus: '연애갈등',
      counselorName: '슬픈 토끼',
      beforeMinutes: '5분 전',
      counselorprofileStatus: 1,
      newMessageCounts: 0,
      content:
        'ㅋㅋㅋㅋㅋ 실험입니다 궁금해서 줄넘는지 써보고있어요 하하하 키키키 어떻게되나요',
      date: '2023년 10월 23일 오후 12시 34분',
    });
  }, []);

  useEffect(() => {
    setIsActiveSaveModal(true);
    // 후에 의존성 배열에 서버에서 fetch한값
  }, [consultInform]);

  const navigate = useNavigate();
  //후에 서버와 연결. 임시저장,제출하기 여기에 구현
  const handleSaveReply = () => {
    navigate('/seller');
  };
  const handlePostReply = () => {
    setIsSend(true);
  };

  return (
    <LetterWriteMainSectionWrapper>
      {isActivePostModal && (
        <PostModal setIsActive={setIsActivePostModal} replyText={replyText} />
      )}
      {isActiveSaveModal && (
        <SaveModal
          setReplyText={setReplyText}
          setIsActive={setIsActiveSaveButton}
          lastModifyDate={consultInform?.date}
        />
      )}
      {isViewQuestion ? (
        <>
          <QuestionDate>{consultInform?.date}</QuestionDate>
          <UnfoldedTextField>{consultInform?.content}</UnfoldedTextField>
        </>
      ) : (
        <>
          <OngoingCounsultBox
            counselorName={consultInform.counselorName}
            categoryStatus={consultInform.categoryStatus}
            beforeMinutes={consultInform.beforeMinutes}
            counselorprofileStatus={consultInform.counselorprofileStatus}
            content={consultInform.content}
            newMessageCounts={consultInform.newMessageCounts}
            onClick={() => {
              setIsViewQuestion(true);
            }}
          />

          <TextArea
            placeholder="답장 작성 시 서비스 운영정책을 지켜주세요."
            value={replyText}
            onChange={(e) => {
              setIsActivePostButton(true);
              setIsActiveSaveButton(true);
              setReplyText(e.target.value);
              if (e.target.value === '') {
                // 비어 있으면 전송못함
                setIsActivePostButton(false);
                setIsActiveSaveButton(false);
              }
            }}
          />
          <BottomButtonGroup>
            <SaveButton
              onClick={handleSaveReply}
              isActive={isActiveSaveButton}
              disabled={isActiveSaveButton ? false : true}
            >
              임시저장
            </SaveButton>
            <PostButton
              onClick={() => {
                setIsActivePostModal(true);
              }}
              isActive={isActiveSaveButton}
              disabled={isActivePostButton ? false : true}
            >
              제출하기
            </PostButton>
          </BottomButtonGroup>
        </>
      )}
    </LetterWriteMainSectionWrapper>
  );
};

const LetterWriteMainSectionWrapper = styled.section`
  margin-top: 1.2rem;
  outline: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  position: relative;
  line-height: 150%; /* 2.4rem */
`;

const QuestionDate = styled.div`
  color: var(--Greyscale-Grey-3, #95959b);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 2.17rem */
`;

const UnfoldedTextField = styled.div`
  width: calc(100% - 8rem);
  margin: 0 auto;
  min-height: 55.6rem;
  border-radius: 1.2rem;
  background: var(--Greyscale-Grey-6, #f6f6fa);
  padding: 1.6rem;
  color: var(--greyscale-grey-1-text, #33333a);
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 2.4rem */
`;

const TextArea = styled.textarea`
  resize: none;
  margin: 0 2rem;
  min-height: 48.1rem;
  &::placeholder{
    color: ${Grey3};
  }
  color: var(--greyscale-grey-1-text, #33333A);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 2.4rem */
  border: none;
  &:focus {
    outline: none;
  }
  padding: 1.6rem;
  border-radius: 1.2rem;
  rgba(242, 241, 248, 0.8);
  background: ${Grey6};
`;

const BottomButtonGroup = styled.div`
  height: 5.2rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.6rem;
  @media (max-width: 767px) {
    position: fixed;
    bottom: 1rem;
    width: 100%;
  }
  @media (min-width: 768px) {
    position: fixed;
    bottom: 1rem;
    width: 375px;
  }
`;

const SaveButton = styled.button<{ isActive: boolean }>`
  display: flex;
  width: 16rem;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  border-radius: 1.2rem;
  background: ${(props) => (props.isActive ? LightGreen : Grey5)};
  color: ${(props) => (props.isActive ? Green : '#fff')};
  text-align: center;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 2rem */
`;

const PostButton = styled.button<{ isActive: boolean }>`
  display: flex;
  width: 16rem;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  border-radius: 1.2rem;
  background: ${(props) => (props.isActive ? Green : Grey5)};
  color: ${(props) => (props.isActive ? White : '#fff')};
  text-align: center;
  /* Button 1 */
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 2rem */
`;
