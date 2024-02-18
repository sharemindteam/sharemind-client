import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey1, Grey3, Grey6, LightGreen, White } from 'styles/color';
import { Body3, Heading } from 'styles/font';
import { ReactComponent as DownIcon } from 'assets/icons/icon-letterwrite-down.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLetterModalOpenState, scrollLockState } from 'utils/atom';
import { BackDrop } from 'components/Common/BackDrop';
import { LetterWriteModal } from 'components/Buyer/BuyerLetterWrite/LetterWriteModal';
import { Button } from 'components/Common/Button';
import { LetterPostModal } from 'components/Buyer/BuyerLetterWrite/LetterPostModal';
import { LetterLoadModal } from 'components/Buyer/BuyerLetterWrite/LetterLoadModal';
import { LetterSaveModal } from 'components/Buyer/BuyerLetterWrite/LetterSaveModal';
import {
  getCounselorCategories,
  getDraftsLetter,
  getLetterMessages,
} from 'api/get';
import { GetMessagesType } from 'utils/type';

export const BuyerLetterWrite = () => {
  const navigate = useNavigate();
  //params로 consult id 넘어오고 tag status는 location으로 넘어옴
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const tagStatus: number = state?.tagStatus;
  //id에 해당하는 상담 사의 카테고리 n가지 request, 1,2,3...로 구분, 0일 떄는 상담카테고리로 표기
  // 바뀔 때마다 useEffect로 request
  const [categoryType, setCategoryType] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isLetterModalOpenState,
  );
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  // 임시저장, 전송하기 버튼 활성화여부
  const [isActiveSaveButton, setIsActiveSaveButton] = useState(false);
  const [isActivePostButton, setIsActivePostButton] = useState(false);
  const [saveButtonColor, setSaveButtonColor] = useState<string>(White);
  //input 값
  const [input, setInput] = useState<string>('');
  // 임시저장, 편지, 불러오기 모달 활성화여부
  const [isActivePostModal, setIsActivePostModal] = useState(false);
  const [isActiveSaveModal, setIsActiveSaveModal] = useState(false);
  const [isActiveLoadModal, setIsActiveLoadModal] = useState(false);
  //임시저장 메세지 있는지 없는지 여부
  const [isSaved, setIsSaved] = useState<boolean>(false);
  // 임시 저장 메세지 get 요청 response
  const [messageResponse, setMessageResponse] = useState<GetMessagesType>({
    content: null,
    messageId: null,
    messageType: null,
    updatedAt: null,
  });

  //임시저장 확인후 모달
  const fetchDraftsData = async () => {
    let messageType: string;
    if (tagStatus === 0) {
      messageType = 'first_question';
    } else if (tagStatus === 2) {
      messageType = 'second_question';
    } else {
      messageType = '';
    }
    const params = {
      messageType: messageType,
    };
    try {
      const res: any = await getDraftsLetter({ params }, id);
      if (res.status === 200) {
        if (res.data.isSaved === true) {
          setIsSaved(true);
          setIsActiveLoadModal(true);
        } else {
          setIsSaved(false);
        }
      } else if (res.response.statue === 403) {
        alert('접근 권한이 없습니다.');
        navigate('/consult');
      } else if (res.response.statue === 404) {
        alert('존재하지 않는 상담입니다.');
        navigate('/consult');
      }
    } catch (e) {
      console.log(e);
    }
  };
  const fetchCategoriesData = async () => {
    const definedId: string = id as string;
    try {
      const res: any = await getCounselorCategories(parseInt(definedId, 10));
      if (res.status === 200) {
        const updatedCategoryList = ['상담 카테고리', ...res.data.categories];
        setCategoryList(updatedCategoryList);
      } else if (res.response.statue === 404) {
        alert('존재하지 않는 상담입니다.');
        navigate('/consult');
      }
    } catch (e) {
      console.log(e);
    }
  };
  //임시 저장된 메세지 있으면 정보받아오기, 아니면 null
  //tagStatus 1, 3일 시엔 빼야함
  const fetchSavedData = async () => {
    let messageType = '';
    if (tagStatus === 0) {
      messageType = 'FIRST_QUESTION';
    } else if (tagStatus === 2) {
      messageType = 'SECOND_QUESTION';
    }
    const params = {
      messageType: messageType,
      isCompleted: false,
    };
    try {
      const res: any = await getLetterMessages({ params }, id);
      if (res.status === 200) {
        setMessageResponse(res.data);
      } else if (res.response.status === 403) {
        alert('접근 권한이 없습니다.');
        navigate('/consult');
      } else if (res.response.status === 404) {
        alert('존재하지 않는 편지 아이디로 요청되었습니다.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  //먼저 임시저장된거 있는지 api 콜하고 그다음에 카테고리 세팅
  useEffect(() => {
    const fetchData = async () => {
      await fetchCategoriesData();
      await fetchDraftsData();
      await fetchSavedData();
    };
    if (
      tagStatus === undefined ||
      Number.isNaN(tagStatus) ||
      id === undefined
    ) {
      alert('유효하지 않은 접근입니다.');
      navigate('/consult');
    } else {
      fetchData();
    }
  }, []);
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
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate(`/letter/${id}`);
          }}
        />
        {tagStatus === 0 ? (
          <Heading color={Grey1}>질문</Heading>
        ) : (
          <Heading color={Grey1}>추가질문</Heading>
        )}
      </HeaderWrapper>
      <div className="body">
        {tagStatus === 0 ? (
          <CategoryDropDown
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <Body3 color={Green}>{categoryList[categoryType]}</Body3>
            <DownIcon />
          </CategoryDropDown>
        ) : null}
        <TextArea
          value={input}
          placeholder="고민 내용을 남겨주세요."
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setInput(e.target.value);
          }}
          tagStatus={tagStatus}
        />
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
              setIsActivePostModal(true);
            }}
          />
        </ButtonWrapper>
      </div>
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
      {isActivePostModal && (
        <LetterPostModal
          setIsActive={setIsActivePostModal}
          replyText={input}
          isSaved={isSaved}
          setIsSaved={setIsSaved}
          tagStatus={tagStatus}
          categoryType={categoryType}
          consultCategory={categoryList[categoryType]}
          consultId={id}
          messageId={messageResponse.messageId}
        />
      )}
      {isActiveLoadModal && (
        <LetterLoadModal
          savedText={messageResponse.content}
          updatedAt={messageResponse.updatedAt}
          setReplyText={setInput}
          setIsActive={setIsActiveLoadModal}
          consultId={id}
          categoryList={categoryList}
          setCategoryType={setCategoryType}
        />
      )}
      {isActiveSaveModal && (
        <LetterSaveModal
          setIsActive={setIsActiveSaveModal}
          replyText={input}
          isSaved={isSaved}
          setIsSaved={setIsSaved}
          tagStatus={tagStatus}
          categoryType={categoryType}
          consultCategory={categoryList[categoryType]}
          consultId={id}
          messageId={messageResponse.messageId}
        />
      )}
      {isActivePostModal || isActiveSaveModal || isActiveLoadModal ? (
        <BackDrop
          onClick={() => {
            setIsActivePostModal(false);
            setIsActiveLoadModal(false);
            setIsActiveSaveModal(false);
          }}
        />
      ) : null}
    </Wrapper>
  );
};
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
const TextArea = styled.textarea<{ tagStatus: number }>`
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
  ${(props) => (props.tagStatus === 2 ? 'margin-top:1.2rem' : null)};
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
