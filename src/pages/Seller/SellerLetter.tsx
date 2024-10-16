import {
  getLetterDeadline,
  getLetterMessages,
  getLetterRecentType,
} from 'api/get';
import { BackDrop } from 'components/Common/BackDrop';
import { BottomButton } from 'components/Seller/Common/BottomButton';
import { ComplaintModal } from 'components/Seller/Common/ComplaintModal';
import { LetterBonusQuestionStep } from 'components/Seller/SellerLetter/LetterBonusQuestionStep';
import { LetterBonusReplyStep } from 'components/Seller/SellerLetter/LetterBonusReplyStep';
import { LetterComplaintMenu } from 'components/Seller/SellerLetter/LetterComplaintMenu';
import { LetterHeader } from 'components/Seller/SellerLetter/LetterHeader';
import { LetterQuestionStep } from 'components/Seller/SellerLetter/LetterQuestionStep';
import { LetterReplyStep } from 'components/Seller/SellerLetter/LetterReplyStep';
import { LetterTagListSection } from 'components/Seller/SellerLetter/LetterTagListSection';
import { useShowComplainttModal } from 'hooks/useShowComplaintModal';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import {
  isConsultModalOpenState,
  isLoadingState,
  scrollLockState,
} from 'utils/atom';

//
//
//

export const SellerLetter = () => {
  const navigate = useNavigate();
  // 상단 태그상태 -> 질문, 답장, 추가질문 , 추가답장 : 0,1,2,3
  const [tagStatus, setTagStatus] = useState<number>();
  // 현재 편지의 태그 활성화레벨, tagStatus가 tagActiveLevel보다 작으면 검은색, 같거나 크면 희색:  0 1 2 3 4
  //  질문 도착 전, 질문 도착 ,
  const [tagActiveLevel, setTagActiveLevel] = useState<number>(0);
  // 신고할 것인지 여부
  const [isActiveComplaint, setIsComplaint] = useState<boolean>(false);
  // 신고하기 팝업 뜨게할지 여부
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );

  // 신고 logic
  const { isComplaintModalOpen, handleBackDropClick, handleMoreButtonClick } =
    useShowComplainttModal();

  //
  //
  //
  const handleComplaintButtonClick = () => {
    window.open(process.env.REACT_APP_REPORT_URL);
  };

  // 모달 활성화 시 스크롤락
  const setScrollLock = useSetRecoilState(scrollLockState);
  // 각 편지 레벨에 전달할 텍스트, 데드라인, 편지 생성 시각
  const [text, setText] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [deadline, setDeadLine] = useState<string>('');

  // 하단 글쓰기 버튼의 TagActiveLevel에 따른 텍스트
  const bottomButtonText = useMemo(() => {
    return ['', '답장 작성하기', '', '추가답장 작성하기', ''];
  }, []);

  // consultid
  const { consultid } = useParams();

  const levelMap = useMemo(() => {
    return {
      질문: 1,
      답장: 2,
      '추가 질문': 3,
      '추가 답장': 4,
    };
  }, []);

  // 로딩스피너 여부
  const [isLoading, setIsLoading] = useRecoilState<boolean>(isLoadingState);
  const [isCancel, setIsCancel] = useState<boolean>();

  //
  // 처음 마운트될 떄 호출하는 API
  //
  useEffect(() => {
    const fetchLetterInfo = async () => {
      try {
        setIsLoading(true);
        const [recentTypeResponse, deadlineResponse]: [any, any] =
          await Promise.all([
            getLetterRecentType(consultid),
            getLetterDeadline(consultid),
          ]);

        if (recentTypeResponse.status && deadlineResponse.status === 200) {
          const { data } = recentTypeResponse;
          const level =
            levelMap[data?.recentType as keyof typeof levelMap] || 0;

          setTagActiveLevel(level);
          setIsCancel(data?.isCanceled);
          setTagStatus(
            level === 0
              ? 0
              : level === 1
              ? 0
              : level === 2
              ? 1
              : level === 3
              ? 2
              : 3,
          );
          setDeadLine(deadlineResponse?.data?.deadline);
          setIsLoading(false);
        }
      } catch (err) {
        alert(err);
        navigate('/minder');
      }
    };

    fetchLetterInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 태그 바뀜에 따라 getLetterMessages API 호출
  const messageTypeMap = useMemo(
    () => ({
      0: 'first_question',
      1: 'first_reply',
      2: 'second_question',
      3: 'second_reply',
    }),
    [],
  );

  //
  //
  //
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      const params = {
        messageType:
          messageTypeMap[tagStatus as keyof typeof messageTypeMap] ??
          'intended_error',
        isCompleted: true,
      };
      try {
        const res: any = await getLetterMessages({ params }, consultid);
        setText(res.data?.content);
        setDate(res.data?.updatedAt);
        setIsLoading(false);
      } catch (err) {
        alert(err);
        console.log(err);
        navigate('/minder');
      }
    };
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagStatus]);

  //
  //
  //

  return (
    <>
      <LetterHeader onMoreButtonClick={handleMoreButtonClick} />
      <LetterTagListSection
        tagStatus={tagStatus}
        setTagStatus={setTagStatus}
        tagActiveLevel={tagActiveLevel}
      />
      {isLoading ? (
        <div
          style={{
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* 질문, 답장, 추가질문, 추가답장탭 */}
          {tagStatus === 0 ? (
            <LetterQuestionStep
              isArrive={tagActiveLevel >= 1}
              time={date}
              questionMsg={text}
              tagActiveLevel={tagActiveLevel}
            />
          ) : tagStatus === 1 ? (
            <LetterReplyStep
              isArrive={tagActiveLevel >= 2}
              time={date}
              deadline={deadline}
              replyMsg={text}
              tagActiveLevel={tagActiveLevel}
            />
          ) : tagStatus === 2 ? (
            <LetterBonusQuestionStep
              isArrive={tagActiveLevel >= 3}
              time={date}
              deadline={deadline}
              questionMsg={text}
              tagActiveLevel={tagActiveLevel}
            />
          ) : (
            <LetterBonusReplyStep
              isArrive={tagActiveLevel >= 4}
              time={date}
              deadline={deadline}
              replyMsg={text}
              tagActiveLevel={tagActiveLevel}
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

          {tagActiveLevel % 2 !== 0 && (
            <BottomButton
              isActive={!isCancel}
              text={
                isCancel
                  ? '이미 취소된 상담이에요.'
                  : bottomButtonText[tagActiveLevel]
              }
              onClick={() => {
                navigate(`/minder/writeLetter/${consultid}`);
              }}
            />
          )}
        </>
      )}
      {isComplaintModalOpen && (
        <>
          <BackDrop onClick={handleBackDropClick} />
          <ComplaintModal
            handleComplaintButtonClick={handleComplaintButtonClick}
          />
        </>
      )}
    </>
  );
};
