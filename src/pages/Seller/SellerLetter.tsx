import {
  getDraftsLetter,
  getLetterDeadline,
  getLetterMessages,
  getLetterRecentType,
} from 'api/get';
import { LetterBonusQuestionStep } from 'components/Seller/SellerLetter/LetterBonusQuestionStep';
import { LetterBonusReplyStep } from 'components/Seller/SellerLetter/LetterBonusReplyStep';
import { LetterComplaintMenu } from 'components/Seller/SellerLetter/LetterComplaintMenu';
import { LetterHeader } from 'components/Seller/SellerLetter/LetterHeader';
import { LetterQuestionStep } from 'components/Seller/SellerLetter/LetterQuestionStep';
import { LetterReplyStep } from 'components/Seller/SellerLetter/LetterReplyStep';
import { LetterTagListSection } from 'components/Seller/SellerLetter/LetterTagListSection';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isConsultModalOpenState, scrollLockState } from 'utils/atom';

export const SellerLetter = () => {
  // 질문, 답장, 추가질문 , 추가답장 : 0,1,2,3
  const [tagStatus, setTagStatus] = useState<number>(0);
  // 태그 활성화되어있는 (검은색)
  // 태그 활성화레벨보다 작으면 검은색으로
  const [tagActiveLevel, setTagActiveLevel] = useState<number>(0);
  // 신고하기 활성화 여부
  const [isActiveComplaint, setIsComplaint] = useState<boolean>(false);
  // 신고하기 팝업 뜨게할지 여부
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );

  // 편지 ID
  // 모달 활성화 시 스크롤락
  const setScrollLock = useSetRecoilState(scrollLockState);
  // 각 편지 레벨에 전달할 텍스트
  const [text, setText] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [deadline, setDeadLine] = useState<string>('');
  const { consultid } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res: any = await getLetterRecentType(consultid);
      const res2: any = await getLetterDeadline(consultid);

      if (res.status === 200) {
        const { data } = res;
        if (data?.recentType === '질문') {
          setTagActiveLevel(1);
        } else if (data?.recentType === '답장') {
          setTagActiveLevel(2);
        } else if (data?.recentType === '추가질문') {
          setTagActiveLevel(3);
        } else if (data?.recentType === '추가답변') {
          setTagActiveLevel(4);
        } else {
          setTagActiveLevel(0);
        }
        setDeadLine(res2?.data?.deadline);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const params = {
        messageType:
          tagStatus === 0
            ? 'first_question'
            : tagStatus === 1
            ? 'first_reply'
            : tagStatus === 2
            ? 'second_question'
            : 'second_reply',
        isCompleted: true,
      };
      const params2 = {
        messageType:
          tagStatus === 0
            ? 'first_question'
            : tagStatus === 1
            ? 'first_reply'
            : tagStatus === 2
            ? 'second_question'
            : 'second_reply',
      };

      const res: any = await getLetterMessages({ params }, consultid);
      setText(res.data.content);
      setDate(res.data.updatedAt);
    };
    fetchMessages();
  }, [tagStatus]);

  return (
    <>
      <LetterHeader />
      <LetterTagListSection
        tagStatus={tagStatus}
        setTagStatus={setTagStatus}
        tagActiveLevel={tagActiveLevel}
      />
      {/* 질문, 답장, 추가질문, 추가답장탭 */}
      {tagStatus === 0 ? (
        <LetterQuestionStep
          isArrive={tagActiveLevel >= 1}
          time={date}
          questionMsg={text}
        />
      ) : tagStatus === 1 ? (
        <LetterReplyStep
          isArrive={tagActiveLevel >= 2}
          time={date}
          deadline={deadline}
          replyMsg={text}
        />
      ) : tagStatus === 2 ? (
        <LetterBonusQuestionStep
          isArrive={tagActiveLevel >= 3}
          time={date}
          deadline={deadline}
          questionMsg={text}
        />
      ) : (
        <LetterBonusReplyStep
          isArrive={tagActiveLevel >= 4}
          time={date}
          deadline={deadline}
          replyMsg={text}
        />
      )}

      {isModalOpen ? (
        <>
          <BackDrop
            onClick={() => {
              setIsModalOpen(false);
              setScrollLock(false);
            }}
          />
          <LetterComplaintMenu
            isActiveComplaint={isActiveComplaint}
            setIsActiveComplaint={setIsComplaint}
          />
        </>
      ) : null}
    </>
  );
};
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
