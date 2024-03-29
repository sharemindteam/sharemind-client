import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Green, Grey1, Grey3, Grey6, LightGreen } from 'styles/color';
import { Body3, Button2, Heading } from 'styles/font';
import { isConsultModalOpenState, scrollLockState } from 'utils/atom';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-complete-check.svg';
import { ReactComponent as NonCheckIcon } from 'assets/icons/icon-complete-non-check.svg';
import { ConsultModal } from 'components/Buyer/BuyerConsult/ConsultModal';
import { ConsultCard } from 'components/Buyer/Common/ConsultCard';
import { getChatsCustomers, getLettersCustomers } from 'api/get';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import { LoadingSpinner } from 'utils/LoadingSpinner';
interface consultApiObject {
  consultStyle: string;
  id: number;
  latestMessageContent: string | null;
  latestMessageIsCustomer: boolean | null;
  latestMessageUpdatedAt: string | null;
  opponentNickname: string;
  status: string;
  unreadMessageCount: number | null;
  reviewCompleted: boolean | null;
  consultId: number | null;
}
export const BuyerConsult = () => {
  const navigate = useNavigate();
  const sortList = ['최근순', '읽지않은순'];
  //편지 채팅 여부
  const [isLetter, setIsLetter] = useState<boolean>(true);
  const [letterColor, setLetterColor] = useState<string>(Green);
  const [chattingColor, setChattingColor] = useState<string>(Grey1);
  //완료 제외 체크 여부
  const [isChecked, setIsChecked] = useState<boolean>(false);
  //0 : 최신순 1:읽지 않은 순
  // 바뀔 때마다 useEffect로 request
  const [sortType, setSortType] = useState<number>(0);
  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );
  //card에 넘길 데이터
  const [cardData, setCardData] = useState<consultApiObject[]>([]);
  //로딩 state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  useLayoutEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (isLetter) {
        try {
          let sortTypeText: string;
          if (sortType === 0) {
            sortTypeText = 'latest';
          } else {
            sortTypeText = 'unread';
          }
          const params = {
            filter: isChecked,
            sortType: sortTypeText,
          };
          const res: any = await getLettersCustomers({ params });
          if (res.status === 200) {
            setCardData(res.data);
          } else if (res.response.status === 404) {
            alert('존재하지 않는 정렬 방식입니다.');
          }
        } catch (e) {
          alert(e);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          let sortTypeText: string;
          if (sortType === 0) {
            sortTypeText = 'latest';
          } else {
            sortTypeText = 'unread';
          }
          const params = {
            filter: isChecked,
            sortType: sortTypeText,
          };
          const res: any = await getChatsCustomers({ params });
          if (res.status === 200) {
            setCardData(res.data);
          } else if (res.response.status === 404) {
            alert('존재하지 않는 정렬 방식입니다.');
          }
        } catch (e) {
          alert(e);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [sortType, isChecked, isLetter]);

  if (isLoading) {
    return (
      <>
        <Header
          isBuyer={true}
          onClick={() => {
            navigate('/share');
          }}
        />
        <TabA1 isBuyer={true} initState={2} />
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
      </>
    );
  } else {
    return (
      <Wrapper>
        <Header
          isBuyer={true}
          onClick={() => {
            navigate('/share');
          }}
        />
        <TabA1 isBuyer={true} initState={2} />
        <div className="options">
          <div className="select">
            <div className="select-button">
              <SelectButton
                isSelected={isLetter}
                onClick={() => {
                  setIsLetter(true);
                  setLetterColor(Green);
                  setChattingColor(Grey1);
                }}
              >
                <Button2 color={letterColor}>편지</Button2>
              </SelectButton>
              <SelectButton
                isSelected={!isLetter}
                onClick={() => {
                  setIsLetter(false);
                  setLetterColor(Grey1);
                  setChattingColor(Green);
                }}
              >
                <Button2 color={chattingColor}>채팅</Button2>
              </SelectButton>
            </div>
            <div
              className="select-wrapper"
              onClick={() => {
                setIsModalOpen(true);
                setScrollLock(true);
              }}
            >
              <Button2 color={Grey3}>{sortList[sortType]}</Button2>
              <Down />
            </div>
          </div>

          <div
            className="exception-toggle"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setIsChecked(!isChecked);
            }}
          >
            {isChecked ? <CheckIcon /> : <NonCheckIcon />}
            <Body3 color={Grey3}>종료/취소된 상담 제외</Body3>
          </div>
        </div>
        {cardData.length !== 0 ? (
          <CardWrapper>
            {cardData.map((value) => {
              return (
                <ConsultCard
                  consultStyle={value.consultStyle}
                  id={value.id}
                  latestMessageContent={value.latestMessageContent}
                  latestMessageIsCustomer={value.latestMessageIsCustomer}
                  latestMessageUpdatedAt={value.latestMessageUpdatedAt}
                  opponentNickname={value.opponentNickname}
                  status={value.status}
                  unreadMessageCount={value.unreadMessageCount}
                  reviewCompleted={value.reviewCompleted}
                  consultId={value.consultId}
                  isLetter={isLetter}
                />
              );
            })}
          </CardWrapper>
        ) : (
          <EmptyWrapper>
            <EmptyIcon />
            <Heading>아직 진행한 상담이 없어요</Heading>
          </EmptyWrapper>
        )}

        {isModalOpen ? (
          <>
            <BackDrop
              onClick={() => {
                setIsModalOpen(false);
              }}
            />
            <ConsultModal sortType={sortType} setSortType={setSortType} />
          </>
        ) : null}
      </Wrapper>
    );
  }
};
const Wrapper = styled.div`
  .options {
    height: 8rem;
    padding: 0.4rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .select {
    display: flex;
    height: 3.6rem;
    align-items: center;
    justify-content: space-between;
  }
  .select-wrapper {
    display: flex;
    gap: 0.4rem;
    cursor: pointer;
  }
  .select-button {
    display: flex;
    gap: 1.2rem;
  }
  .exception-toggle {
    display: flex;
    gap: 0.4rem;
  }
`;
const SelectButton = styled.div<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? LightGreen : Grey6)};
  cursor: pointer;
  padding: 0.8rem 1.6rem;
  border-radius: 1.2rem;
  margin-top: 0.2rem;
`;
const CardWrapper = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  padding: 1.2rem 0;
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

const EmptyIcon = styled(Empty)`
  padding: 4.7rem 4.41rem 4.603rem 4.5rem;
`;
const EmptyWrapper = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
