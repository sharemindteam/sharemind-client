import styled from 'styled-components';
import OngoingCounsultBox from '../Common/OngoingCounsultBox';
import React, { useEffect, useMemo, useState } from 'react';
import { Green, Grey3, Grey5, Grey6, LightGreen, White } from 'styles/color';
import { useParams } from 'react-router-dom';
import { LetterPostModal } from './LetterPostModal';
import { LetterIsSaveModal } from './LetterIsSaveModal';
import { LetterSavePostModal } from './LetterSavePostModal';
import {
  getCustomerInfo,
  getDraftsLetter,
  getLetterMessages,
  getLetterRecentType,
} from 'api/get';
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

  // 임시저장, 편지, 불러오기 모달 활성화여부
  const [isActivePostModal, setIsActivePostModal] = useState(false);
  const [isActiveSaveModal, setIsActiveSaveModal] = useState(false);
  const [isActiveSavePostModal, setIsActiveSavePostModal] = useState(false);

  // 답안 텍스트
  const [replyText, setReplyText] = useState<string>('');
  // 임시저장 텍스트
  const [saveText, setSaveText] = useState<string>('');
  // 임시저장 시각
  const [saveDate, setSaveDate] = useState<string>('');
  // 임시저장 id
  const [saveId, setSaveId] = useState<string>('');
  // 임시저장한 데이터가 있는지 여부
  const [isSave, setIsSave] = useState<boolean>(false);

  const [messageType, setMessageType] = useState<string>('');
  const { consultid } = useParams();
  const questionMapping = {
    질문: 'first_question',
    '추가 질문': 'second_question',
  };

  useEffect(() => {
    const fetchData = async () => {
      // 편지 단계 API
      const recentLetterResponse: any = await getLetterRecentType(consultid);
      const recentType: string = recentLetterResponse.data.recentType;
      // 편지 단계 API 결과값과 메시지 타입 연동
      if (recentType === '질문') {
        setMessageType('first_reply');
      } else if (recentType === '추가 질문') {
        setMessageType('second_reply');
      }

      // 임시저장 API
      const params = {
        messageType: recentType === '질문' ? 'first_reply' : 'second_reply',
      };
      const draftsResponse: any = await getDraftsLetter({ params }, consultid);
      // 임시저장 API 결과와 임시저장 모달 띄울지 여부와 임시저장이 있는 편지인지 여부 연동
      const isSaveTextData = draftsResponse?.data?.isSaved;
      setIsActiveSaveModal(isSaveTextData);
      setIsSave(isSaveTextData);

      // 임시저장 여부에 따라 마인더가 임시저장한 요소 불러오기

      if (isSaveTextData) {
        const minderSaveResponse: any = await getLetterMessages(
          {
            params: {
              messageType:
                recentType === '질문' ? 'first_reply' : 'second_reply',
              isCompleted: false,
            },
          },
          consultid,
        );
        setSaveText(minderSaveResponse?.data?.content);
        setSaveDate(minderSaveResponse?.data?.updatedAt);
        setSaveId(minderSaveResponse?.data?.messageId);
        console.log(minderSaveResponse);
      }

      // 셰어가 최근에 보낸 질문 조회하는 API
      const letterResponse: any = await getLetterMessages(
        {
          params: {
            messageType: questionMapping[recentType],
            isCompleted: true,
          },
        },
        consultid,
      );

      // 셰어가 보낸 편지 불러오는 api
      const customerInfoResponse: any = await getCustomerInfo(consultid);
      setConsultInform({
        categoryStatus: customerInfoResponse?.data?.category,
        counselorName: customerInfoResponse?.data?.nickname,
        beforeMinutes: '5분 전', // 포매팅 필요
        counselorprofileStatus: 1, // 포매팅 필요
        newMessageCounts: 0,
        content: letterResponse?.data?.content,
        date: letterResponse?.data?.updatedAt,
      });
      console.log(letterResponse);
      console.log(customerInfoResponse);
    };
    fetchData();
  }, [isSave]);

  return (
    <LetterWriteMainSectionWrapper>
      {isActivePostModal && (
        <LetterPostModal
          setIsActive={setIsActivePostModal}
          replyText={replyText}
          setIsSend={setIsSend}
          isSave={isSave}
          messageType={messageType}
          saveId={saveId}
        />
      )}
      {isActiveSaveModal && (
        <LetterIsSaveModal
          saveText={saveText}
          setReplyText={setReplyText}
          setIsActive={setIsActiveSaveModal}
          lastModifyDate={saveDate}
        />
      )}
      {isActiveSavePostModal && (
        <LetterSavePostModal
          setIsActive={setIsActiveSavePostModal}
          replyText={replyText}
          isSave={isSave}
          messageType={messageType}
          saveId={saveId}
        />
      )}
      {isActivePostModal || isActiveSaveModal || isActiveSavePostModal ? (
        <BackDrop />
      ) : null}

      {isViewQuestion ? (
        <>
          <QuestionDate>{consultInform?.date}</QuestionDate>
          <UnfoldedTextField>{consultInform?.content}</UnfoldedTextField>
        </>
      ) : (
        <>
          <OngoingCounsultBox
            counselorName={consultInform?.counselorName}
            categoryStatus={consultInform?.categoryStatus}
            beforeMinutes={consultInform?.beforeMinutes}
            counselorprofileStatus={consultInform?.counselorprofileStatus}
            content={consultInform?.content}
            newMessageCounts={null}
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
              onClick={() => {
                setIsActiveSavePostModal(true);
              }}
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
              보내기
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
const BackDrop = styled.div`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  position: fixed;
  top: 0;
  z-index: 2001;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;
