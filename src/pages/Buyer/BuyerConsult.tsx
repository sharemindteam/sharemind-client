import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Green, Grey1, Grey3, Grey6, LightGreen } from 'styles/color';
import { Body3, Button2 } from 'styles/font';
import { isConsultModalOpenState, scrollLockState } from 'utils/atom';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-complete-check.svg';
import { ReactComponent as NonCheckIcon } from 'assets/icons/icon-complete-non-check.svg';
import { ConsultModal } from 'components/Buyer/BuyerConsult/ConsultModal';
import { BuyerConsultChatSection } from 'components/Buyer/BuyerConsult/BuyerConsultChatSection';
import { BuyerConsultLetterSection } from 'components/Buyer/BuyerConsult/BuyerConsultLetterSection';
import { useConsultParams } from 'hooks/useConsultParams';
import BuyerOpenConsultSection from 'components/Buyer/BuyerConsult/BuyerOpenConsultSection';

//
//
//

const SORT_LIST = ['최근순', '읽지않은순'];

//
//
//

export interface consultApiObject {
  consultStyle: string;
  consultCategory: string;
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

export interface openConsultApiObject {
  postId: number;
  postScrapId: number;
  title: string;
  content: string;
  isPublic: boolean;
  isCompleted: null | boolean;
  isLiked: boolean;
  totalLike: number;
  publishedAt: string;
  isChosen: boolean;
  isScrapped: boolean;
  scrappedAt: string;
  totalScrap: number;
  totalComment: number;
  updatedAt: string;
  finishedAt: string;
  consultCategory?: string;
}

//
//
//

export const BuyerConsult = () => {
  const navigate = useNavigate();

  const {
    consultType,
    sortType,
    setSortType,
    handleLetterClick,
    handleOpenConsultClick,
    handleChatClick,
    searchParams,
    setSearchParams,
    isChecked,
    setIsChecked,
  } = useConsultParams();

  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  ); // Modal 여부(recoil)

  const setScrollLock = useSetRecoilState(scrollLockState);

  /**
   *
   */
  const renderCheckBox = () => {
    return (
      <div
        className="exception-toggle"
        style={{ cursor: 'pointer' }}
        onClick={() => {
          setIsChecked(!isChecked);
          searchParams.set('check', String(!isChecked));
          setSearchParams(searchParams);
        }}
      >
        {isChecked ? <CheckIcon /> : <NonCheckIcon />}
        <Body3 color={Grey3}>종료/취소된 상담 제외</Body3>
      </div>
    );
  };

  /**
   *
   */
  const renderConsultSection = () => {
    switch (consultType) {
      case 'letter':
        return (
          <BuyerConsultLetterSection
            sortType={sortType}
            isChecked={isChecked}
          />
        );
      case 'chat':
        return (
          <BuyerConsultChatSection sortType={sortType} isChecked={isChecked} />
        );
      case 'open-consult':
        return <BuyerOpenConsultSection isChecked={isChecked} />;
      default:
        return null;
    }
  };

  /**
   *
   */
  const renderSortModal = () => {
    if (!isModalOpen) {
      return null;
    }

    return (
      <>
        <BackDrop
          onClick={() => {
            setIsModalOpen(false);
          }}
        />
        <ConsultModal
          sortType={sortType}
          setSortType={setSortType}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </>
    );
  };

  //
  //
  //

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
              $isSelected={consultType === 'letter'}
              onClick={handleLetterClick}
            >
              <Button2 color={consultType === 'letter' ? Green : Grey1}>
                편지
              </Button2>
            </SelectButton>
            <SelectButton
              $isSelected={consultType === 'chat'}
              onClick={handleChatClick}
            >
              <Button2 color={consultType === 'chat' ? Green : Grey1}>
                채팅
              </Button2>
            </SelectButton>
            <SelectButton
              $isSelected={consultType === 'open-consult'}
              onClick={handleOpenConsultClick}
            >
              <Button2 color={consultType === 'open-consult' ? Green : Grey1}>
                공개상담
              </Button2>
            </SelectButton>
          </div>
          {consultType !== 'open-consult' && (
            <div
              className="select-wrapper"
              onClick={() => {
                setIsModalOpen(true);
                setScrollLock(true);
              }}
            >
              <Button2 color={Grey3}>{SORT_LIST[sortType]}</Button2>
              <Down />
            </div>
          )}
        </div>
        {renderCheckBox()}
      </div>
      {renderConsultSection()}
      {renderSortModal()}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  .options {
    padding: 0.8rem 2rem 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    position: sticky;
    top: 10.5rem;
    background-color: white;
    z-index: 10;
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
const SelectButton = styled.div<{ $isSelected: boolean; $isLong?: boolean }>`
  background-color: ${(props) => (props.$isSelected ? LightGreen : Grey6)};
  cursor: pointer;
  padding: 0.8rem 1.6rem;
  border-radius: 1.2rem;
  margin-top: 0.2rem;
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
