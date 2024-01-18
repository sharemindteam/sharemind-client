import { Black, Green, Grey3, Grey5, Grey6, LightGreen } from 'styles/color';
import { ReactComponent as DownArrowIcon } from 'assets/icons/sorting-down-arrow.svg';
import { ReactComponent as CircleCheckIcon } from 'assets/icons/circle-check.svg';
import { Button2 } from 'styles/font';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import OngoingCounsultBox from '../Common/OngoingCounsultBox';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isConsultModalOpenState, scrollLockState } from 'utils/atom';
import { ConsultModal } from 'components/Buyer/BuyerConsult/ConsultModal';
import { useNavigate } from 'react-router-dom';
import { getLetters } from 'api/get';

interface ConsultTypeProps {
  isActive: boolean;
}

export const SellerConsultSection = () => {
  const [consultInfo, setConsultInfo] = useState<ConsultInfoList>([]);
  const [isLetterActive, setIsLetterActive] = useState<boolean>(true);
  const [isInclueCompleteConsult, setIsIncludeCompleteConsult] =
    useState<boolean>(false);
  //0 : 최신순 1:읽지 않은 순
  // 바뀔 때마다 useEffect로 request
  const [sortType, setSortType] = useState<number>(0);
  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchConsultData = async () => {
      const params = {
        filter: !isInclueCompleteConsult,
        isCustomer: false,
        sortType: sortType === 0 ? 'latest' : 'unread',
      };
      const res: any = await getLetters({ params });
      if (res.status === 200) {
        const consultData: ConsultInfoList = res.data;
        setConsultInfo(consultData);
      }
    };
    fetchConsultData();
  }, [isInclueCompleteConsult, isLetterActive, sortType]);
  return (
    <>
      <ConsultSortingMenu>
        <div className="row1">
          <ConsultType
            isActive={isLetterActive}
            onClick={() => {
              setIsLetterActive(true);
            }}
          >
            편지
          </ConsultType>
          <ConsultType
            isActive={!isLetterActive}
            onClick={() => {
              setIsLetterActive(false);
            }}
          >
            채팅
          </ConsultType>
          <SortingType
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <Button2 color={Grey3}>
              {sortType === 0 ? '최근순' : '읽지 않은 순'}
            </Button2>
            <DownArrowIcon />
          </SortingType>
        </div>
        <div className="row2">
          <div
            className="row2-1"
            onClick={() => {
              setIsIncludeCompleteConsult(!isInclueCompleteConsult);
            }}
          >
            <CircleCheckIcon fill={isInclueCompleteConsult ? Grey5 : Green} />
            <Button2 color={Grey3}>완료된 상담 제외</Button2>
          </div>
        </div>
      </ConsultSortingMenu>

      <ConsultBoxList>
        {consultInfo?.map((item) => (
          <OngoingCounsultBox
            consultStatus={item.letterStatus}
            counselorName={item.opponentName}
            beforeMinutes={item.updatedAt}
            content={item.recentContent}
            key={item?.letterId}
            counselorprofileStatus={2}
            newMessageCounts={0}
            onClick={() => {
              navigate(`/seller/letter/${item?.letterId}`);
            }}
          />
        ))}

        {isModalOpen ? (
          <>
            <BackDrop
              onClick={() => {
                //여기서 api 호출
                setIsModalOpen(false);
                setScrollLock(false);
              }}
            />
            <ConsultModal sortType={sortType} setSortType={setSortType} />
          </>
        ) : null}
      </ConsultBoxList>
    </>
  );
};

const ConsultSortingMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.8rem 2rem 1.2rem;
  gap: 1.2rem;
  .row1 {
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }
  .row2 {
    align-self: flex-start;
  }
  .row2-1 {
    display: flex;
    cursor: pointer;
    gap: 0.4rem;
    align-items: center;
  }
`;
const ConsultType = styled.div<ConsultTypeProps>`
  display: flex;
  width: 5.7rem;
  height: 3.1rem;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 1.2rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  background: ${(props) => (props.isActive ? LightGreen : Grey6)};
  color: ${(props) => (props.isActive ? Green : Black)};
`;
const SortingType = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 0.8rem;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
`;

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
