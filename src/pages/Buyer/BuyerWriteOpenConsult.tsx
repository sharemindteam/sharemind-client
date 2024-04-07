import React from 'react';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey1, Grey3, Grey6, LightGreen, White } from 'styles/color';
import { Body3, Caption2, Heading } from 'styles/font';
import { ReactComponent as DownIcon } from 'assets/icons/icon-letterwrite-down.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  isLetterModalOpenState,
  isPostPopupOpenState,
  scrollLockState,
} from 'utils/atom';
import { BackDrop } from 'components/Common/BackDrop';
import { LetterWriteModal } from 'components/Buyer/BuyerLetterWrite/LetterWriteModal';
import { Button } from 'components/Common/Button';
import { LetterPostModal } from 'components/Buyer/BuyerLetterWrite/LetterPostModal';
import { LetterLoadModal } from 'components/Buyer/BuyerLetterWrite/LetterLoadModal';
import { LetterSaveModal } from 'components/Buyer/BuyerLetterWrite/LetterSaveModal';
import Input from 'components/Common/Input';
import FinalWritePopup from 'components/Buyer/BuyerWriteOpenConsult/FianlWritePopup';

function BuyerWriteOpenConsult() {
  const navigate = useNavigate();
  const [categoryType, setCategoryType] = useState<number>(0);
  const categoryList = [
    '연애갈등',
    '이별/재회',
    '여자심리',
    '남자심리',
    '썸/연애시작',
    '짝사랑',
    '권태기',
    '기타',
  ];

  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isLetterModalOpenState,
  );

  // 제출하기 팝업
  const [isPopupOpen, setIsPopupOpen] =
    useRecoilState<boolean>(isPostPopupOpenState);
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  // 임시저장, 전송하기 버튼 활성화여부
  const [isActiveSaveButton, setIsActiveSaveButton] = useState(false);
  const [isActivePostButton, setIsActivePostButton] = useState(false);
  const [saveButtonColor, setSaveButtonColor] = useState<string>(White);
  //input 값
  const [titleInput, setTitleInput] = useState<string>('');
  const [input, setInput] = useState<string>('');

  const [isActivePostModal, setIsActivePostModal] = useState(false);
  const [isActiveSaveModal, setIsActiveSaveModal] = useState(false);
  const [isActiveLoadModal, setIsActiveLoadModal] = useState(false);
  //임시저장 메세지 있는지 없는지 여부
  const [isSaved, setIsSaved] = useState<boolean>(false);
  useEffect(() => {
    if (input === '') {
      // 비어 있으면 전송못함
      setIsActivePostButton(false);
      setIsActiveSaveButton(false);
      setSaveButtonColor(White);
    } else {
      setIsActivePostButton(true);
      setIsActiveSaveButton(true);
      setSaveButtonColor(Green);
    }
  }, [input]);
  return (
    <>
      <Wrapper>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate(`/consult`);
            }}
          />
          <Heading color={Grey1}>고민 작성</Heading>
        </HeaderWrapper>
        <div className="body">
          <CategoryDropDown
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <Body3 color={Green}>{categoryList[categoryType]}</Body3>
            <DownIcon />
          </CategoryDropDown>
          <TitleInput
            placeholder="제목"
            value={titleInput}
            onChange={(e) => {
              setTitleInput(e.target.value);
            }}
          />
          <TextArea
            value={input}
            placeholder="고민 내용을 남겨주세요."
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setInput(e.target.value);
            }}
          />
          <TextCount>
            <Caption2 color={Green}>{input.length ?? '0'}</Caption2>
            <Caption2 color={Grey3}>/1000</Caption2>
          </TextCount>
          <ButtonWrapper>
            <Button
              text="임시저장"
              width="42.66%"
              height="5.2rem"
              backgroundColor={LightGreen}
              color={saveButtonColor}
              isActive={isActiveSaveButton}
              onClick={() => {
                setIsActiveSaveModal(true);
              }}
            />
            <Button
              text="제출하기"
              width="42.66%"
              height="5.2rem"
              isActive={isActivePostButton}
              onClick={() => {
                setIsPopupOpen(true);
              }}
            />
          </ButtonWrapper>
        </div>
        {isPopupOpen && (
          <>
            <BackDrop
              onClick={() => {
                //여기서 api 호출
                setIsModalOpen(false);
                setScrollLock(false);
              }}
            />
            <FinalWritePopup
              title={titleInput}
              content={input}
              category={categoryList[categoryType]}
            />
          </>
        )}
        {isModalOpen ? (
          <>
            <BackDrop
              onClick={() => {
                //여기서 api 호출
                setIsModalOpen(false);
                setScrollLock(false);
              }}
            />
            <LetterWriteModal
              categoryType={categoryType}
              setCategoryType={setCategoryType}
              categoryList={categoryList}
              setIsModalOpen={setIsModalOpen}
            />
          </>
        ) : null}
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  width: 100%;
  position: relative;
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const CategoryDropDown = styled.div`
  padding: 0.9rem 1.6rem;
  box-sizing: border-box;
  background-color: ${LightGreen};
  width: 89.33%;
  border-radius: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
`;
const TitleInput = styled.input`
  width: 89.33%;
  border-radius: 1.2rem;
  background: ${Grey6};
  font-family: Pretendard;
  font-size: 1.6rem;
  color: ${Grey1};
  height: 4.5rem;
  padding: 1.1rem 1.6rem 1rem 1.6rem;
  box-sizing: border-box;
  margin-bottom: 1.2rem;
`;

const TextCount = styled.div`
  display: flex;
  align-self: flex-end;
  margin-top: 0.4rem;
  margin-right: 2rem;
`;
const TextArea = styled.textarea`
  resize: none;
  width: 89.33%;
  min-height: 60vh;
  &::placeholder{
    color: ${Grey3};
  }
  font-family: Pretendard;
  color:  #33333a;
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
  box-sizing: border-box;
  white-space: pre-wrap; 
  `;
const ButtonWrapper = styled.div`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  height: 7.6rem;
  background-color: ${White};
  box-sizing: border-box;
  padding: 0.8rem 0 1.6rem 0;
  gap: 1.5rem;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
`;

export default BuyerWriteOpenConsult;
