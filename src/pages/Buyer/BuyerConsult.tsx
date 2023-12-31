import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useState } from 'react';
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
import { consultDummy } from 'utils/counselorDummy';
import { ConsultCard } from 'components/Buyer/Common/ConsultCard';
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
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  return (
    <Wrapper>
      <Header
        isBuyer={true}
        onClick={() => {
          navigate('/buyer');
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
        <div className="exception-toggle">
          {isChecked ? (
            <CheckIcon
              onClick={() => {
                setIsChecked(false);
              }}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <NonCheckIcon
              onClick={() => {
                setIsChecked(true);
              }}
              style={{ cursor: 'pointer' }}
            />
          )}
          <Body3 color={Grey3}>완료된 상담 제외</Body3>
        </div>
      </div>
      <CardWrapper>
        {consultDummy.map((value) => {
          const state = value.consultState as ConsultState;
          return (
            <ConsultCard
              name={value.name}
              consultState={state}
              time={value.time}
              content={value.content}
              unread={value.unread}
            />
          );
        })}
      </CardWrapper>

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
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .options {
    height: 8rem;
    padding: 0.4rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    border-bottom: 1px solid ${Grey6};
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
