import { getConselorLetters } from 'api/get';
import { ConsultModal } from 'components/Buyer/BuyerConsult/ConsultModal';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { isConsultModalOpenState, scrollLockState } from 'utils/atom';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { ConsultInfoList } from 'utils/type';
import OngoingCounsultBox from '../Common/OngoingCounsultBox';
import { ReactComponent as NoConsultGraphicIcon } from 'assets/icons/graphic-no-calculation.svg';
import { LoadingSpinner } from 'utils/LoadingSpinner';

interface SellerConsultProps {
  sortType: number;
  setSortType: React.Dispatch<React.SetStateAction<number>>;
  isIncludeCompleteConsult: boolean;
}

function SellerLetterList({
  sortType,
  isIncludeCompleteConsult,
  setSortType,
}: SellerConsultProps) {
  const [consultInfo, setConsultInfo] = useState<ConsultInfoList>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );
  const setScrollLock = useSetRecoilState(scrollLockState);
  const navigate = useNavigate();
  const fetchLetterData = useCallback(async () => {
    setIsLoading(true);
    const params = {
      filter: !isIncludeCompleteConsult,
      sortType: sortType === 0 ? 'latest' : 'unread',
    };
    let res: any;
    try {
      res = await getConselorLetters({ params });
      if (res.status === 200) {
        const data: ConsultInfoList = res.data;
        setConsultInfo(data);
      } else if (res?.response?.status === 403) {
        // 판매 정보를 등록하지 않았을 경우
        alert('판매 정보를 등록해주세요.');
        navigate('/minder/mypage/viewProfile');
      } else {
        console.error('Failed to fetch data:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isIncludeCompleteConsult, navigate, setIsLoading, sortType]);
  useEffect(() => {
    fetchLetterData();
  }, [fetchLetterData]);
  return (
    <>
      {isLoading ? (
        <div
          style={{
            height: 'calc(100vh - 50rem)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <ConsultBoxList>
          {consultInfo?.length === 0 ? (
            <NoConsultSection>
              <NoConsultGraphicIcon />
              <NoConsultText>아직 진행한 상담이 없어요</NoConsultText>
            </NoConsultSection>
          ) : (
            consultInfo?.map((item: any) => (
              <OngoingCounsultBox
                consultStatus={item?.status}
                counselorName={item?.opponentNickname}
                beforeMinutes={item?.latestMessageUpdatedAt}
                content={
                  item?.status === '질문 대기'
                    ? '셰어의 질문이 도착할 때까지 조금만 기다려주세요! '
                    : item?.lastMessageContent
                }
                key={item?.id}
                counselorprofileStatus={consultStyleToCharNum(
                  item?.consultStyle,
                )}
                newMessageCounts={item?.unreadMessageCount}
                onClick={() => {
                  navigate(`/minder/letter/${item?.id}`);
                }}
              />
            ))
          )}
          {isModalOpen ? (
            <>
              <BackDrop
                onClick={() => {
                  setIsModalOpen(false);
                  setScrollLock(false);
                }}
              />
              <ConsultModal sortType={sortType} setSortType={setSortType} />
            </>
          ) : null}
        </ConsultBoxList>
      )}
    </>
  );
}
const ConsultBoxList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  gap: 0.8rem;
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
const NoConsultSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.6rem;
  margin-top: 17.8rem;
`;

const NoConsultText = styled.div`
  color: #000;
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3rem;
`;
export default SellerLetterList;
