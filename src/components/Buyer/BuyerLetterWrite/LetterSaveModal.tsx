import { patchLetterMessage, patchLetterMessageFirstQustion } from 'api/patch';
import { postLetterMessage, postLetterMessageFirstQustion } from 'api/post';
import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
import { convertCategoryEnum } from 'utils/convertCategoryEnum';
//tagStatus가 0이면 첫번째 질문, 2면 추가질문
interface LetterSaveModalProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  replyText: string;
  isSaved: boolean;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  tagStatus: number;
  categoryType: number;
  consultCategory: string;
  messageId: number | null;
  consultId: string | undefined;
}
// 임시저장 할까요? 모달
export const LetterSaveModal = ({
  setIsActive,
  replyText,
  isSaved,
  setIsSaved,
  tagStatus,
  categoryType,
  consultCategory,
  messageId,
  consultId,
}: LetterSaveModalProps) => {
  const navigate = useNavigate();

  const handleSaveMessageClick = async () => {
    //임시 저장 메세지 없는 경우에 first or not(patch)
    if (!isSaved) {
      if (tagStatus === 0) {
        // console.log('임시저장 메세지 없을 시 first Q');
        const body = {
          letterId: consultId,
          consultCategory: convertCategoryEnum(consultCategory),
          content: replyText,
          isCompleted: false,
        };
        //카테고리 안정했을 때
        if (categoryType === 0) {
          alert('상담 카테고리를 정해주세요.');
          setIsActive(false);
        } else {
          //첫번째 질문 임시저장 X 메세지 임시저장 생성
          try {
            const res: any = await postLetterMessageFirstQustion(body);
            if (res.status === 201) {
              //모달 끄고 isSaved true
              setIsActive(false);
              setIsSaved(true);
            } else if (res.response.status === 400) {
              alert('이미 답장을 했거나 올바른 순서의 접근이 아닙니다.');
            } else if (res.response.status === 403) {
              alert('접근 권한이 없습니다.');
            } else if (res.response.status === 404) {
              alert('존재하지 않는 편지 아이디로 요청되었습니다.');
            }
          } catch (e) {
            console.log(e);
          }
        }
      } else if (tagStatus === 2) {
        // console.log('여기로 들어와야함');
        //임시저장 없는 추가질문
        const body = {
          letterId: consultId,
          messageType: 'second_question',
          content: replyText,
          isCompleted: false,
        };
        //추가 질문 임시저장 X 메세지 임시저장 생성
        try {
          const res: any = await postLetterMessage(body);
          if (res.status === 201) {
            //모달 끄고 isSaved true
            setIsActive(false);
            setIsSaved(true);
          } else if (res.response.status === 400) {
            alert('이미 답장을 했거나 올바른 순서의 접근이 아닙니다.');
          } else if (res.response.status === 403) {
            alert('접근 권한이 없습니다.');
          } else if (res.response.status === 404) {
            alert('존재하지 않는 편지 아이디로 요청되었습니다.');
          }
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      //임시 저장 메세지 있는 경우에 first or not(patch)
      if (tagStatus === 0) {
        const body = {
          messageId: messageId,
          consultCategory: convertCategoryEnum(consultCategory),
          content: replyText,
          isCompleted: false,
        };
        //카테고리 안정했을 때
        if (categoryType === 0) {
          alert('상담 카테고리를 정해주세요.');
          setIsActive(false);
        } else {
          //첫번째 질문 임시저장 O 메세지 임시저장 수정
          try {
            const res: any = await patchLetterMessageFirstQustion(body);
            if (res.status === 200) {
              //모달 끄고 isSaved true
              setIsActive(false);
              setIsSaved(true);
            } else if (res.response.status === 400) {
              alert('이미 답장을 했거나 올바른 순서의 접근이 아닙니다.');
            } else if (res.response.status === 403) {
              alert('접근 권한이 없습니다.');
            } else if (res.response.status === 404) {
              alert('존재하지 않는 편지 아이디로 요청되었습니다.');
            }
          } catch (e) {
            console.log(e);
          }
        }
      } else if (tagStatus === 2) {
        // console.log('임시저장 메세지 있을 시 second Q');
        const body = {
          messageId: messageId,
          content: replyText,
          isCompleted: false,
        };

        //추가 질문 임시저장 O 메세지 임시저장 수정
        try {
          const res: any = await patchLetterMessage(body);
          if (res.status === 200) {
            //모달 끄고 isSaved true
            setIsActive(false);
            setIsSaved(true);
          } else if (res.response.status === 400) {
            alert('이미 답장을 했거나 올바른 순서의 접근이 아닙니다.');
          } else if (res.response.status === 403) {
            alert('접근 권한이 없습니다.');
          } else if (res.response.status === 404) {
            alert('존재하지 않는 편지 아이디로 요청되었습니다.');
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    navigate(`/letter/${consultId}`);
  };

  return (
    <PostModalBox>
      <ModalBox>
        <Body1>임시저장 할까요?</Body1>
        <Body3 color={Grey4}>작성하던 내용을 추후에 불러올 수 있어요.</Body3>
        <ButtonWrapper>
          <Button
            text="취소"
            onClick={() => {
              setIsActive(false);
            }}
            width="14.8rem"
            height="5.2rem"
            backgroundColor={LightGreen}
            color={Green}
          />
          <Button
            text="임시저장"
            onClick={handleSaveMessageClick}
            width="14.8rem"
            height="5.2rem"
          />
        </ButtonWrapper>
      </ModalBox>
    </PostModalBox>
  );
};

const PostModalBox = styled.div`
  width: 100%;
  height: 15rem;
  z-index: 9999;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 36vh;
`;

const ModalBox = styled.div`
  background: ${White};
  padding: 2rem;
  border-radius: 1.2rem;
  box-sizing: border-box;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 0.7rem;
`;
