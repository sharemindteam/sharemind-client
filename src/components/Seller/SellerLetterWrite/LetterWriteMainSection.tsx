import styled from 'styled-components';
import OngoingCounsultBox from '../Common/OngoingCounsultBox';
import React, { useEffect, useState } from 'react';
import { Grey3, Grey6 } from 'styles/color';
import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
interface LetterConsultInform {
  categoryStatus?: CartegoryState;
  counselorName: string | undefined;
  beforeMinutes: string | undefined;
  content: string | undefined;
  newMessageCounts: number | undefined;
  counselorprofileStatus: number | undefined;
}
export const LetterWriteMainSection = ({
  setIsSend,
}: {
  setIsSend: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [consultInform, setConsultInform] = useState<LetterConsultInform>({
    categoryStatus: undefined,
    counselorName: undefined,
    beforeMinutes: undefined,
    content: undefined,
    newMessageCounts: undefined,
    counselorprofileStatus: undefined,
  });

  useEffect(() => {
    setConsultInform({
      categoryStatus: '연애갈등',
      counselorName: '슬픈 토끼',
      beforeMinutes: '5분 전',
      counselorprofileStatus: 1,
      content: '안녕하세요...',
      newMessageCounts: 0,
    });
  }, []);

  const [replyText, setReplyText] = useState<string>('');
  //서버와 연결. 임시저장,제출하기
  const handleSaveReply = () => {};
  const handlePostReply = () => {
    setIsSend(true);
  };

  return (
    <LetterWriteMainSectionWrapper>
      <OngoingCounsultBox
        counselorName={consultInform.counselorName}
        categoryStatus={consultInform.categoryStatus}
        beforeMinutes={consultInform.beforeMinutes}
        counselorprofileStatus={consultInform.counselorprofileStatus}
        content={consultInform.content}
        newMessageCounts={consultInform.newMessageCounts}
      />

      <TextArea
        placeholder="답장 작성 시 서비스 운영정책을 지켜주세요."
        value={replyText}
        onChange={(e) => {
          setReplyText(e.target.value);
        }}
      />
      <BottomButtonGroup>
        <SaveButton>임시저장</SaveButton>
        <PostButton onClick={handlePostReply}>제출하기</PostButton>
      </BottomButtonGroup>
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

const SaveButton = styled.button`
  display: flex;
  width: 16rem;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  border-radius: 1.2rem;
  background: var(--Signature-Light-Green, #ecfaf9);
  color: var(--Signature-Green, #12c0b5);
  text-align: center;

  /* Button 1 */
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 2rem */
`;

const PostButton = styled.button`
  display: flex;
  width: 16rem;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  border-radius: 1.2rem;
  background: var(--Signature-Green, #12c0b5);
  color: #fff;
  text-align: center;
  /* Button 1 */
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 2rem */
`;
