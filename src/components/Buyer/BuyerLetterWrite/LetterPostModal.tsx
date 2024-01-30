import { patchLetterMessage, patchLetterMessageFirstQustion } from 'api/patch';
import { postLetterMessage, postLetterMessageFirstQustion } from 'api/post';
import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
import { convertCategoryEnum } from 'utils/convertCategoryEnum';
interface LetterPostModalProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  replyText: string;
  isSaved: boolean;
  setIsSaved: React.Dispatch<React.SetStateAction<boolean>>;
  tagStatus: number;
  categoryType: number;
  consultCategory: string;
  consultId: string | undefined;
  messageId: number | null;
}
export const LetterPostModal = ({
  setIsActive,
  replyText,
  isSaved,
  setIsSaved,
  tagStatus,
  categoryType,
  consultCategory,
  consultId,
  messageId,
}: LetterPostModalProps) => {
  const navigate = useNavigate();
  const handleSubmitClick = async () => {
    //임시 저장 메세지 없는 경우에 first or not(patch)
    if (!isSaved) {
      if (tagStatus === 0) {
        const body = {
          letterId: consultId,
          consultCategory: convertCategoryEnum(consultCategory),
          content: replyText,
          isCompleted: true,
        };
        //카테고리 안정했을 때
        if (categoryType === 0) {
          alert('상담 카테고리를 정해주세요.');
          setIsActive(false);
        } else {
          //첫번째 질문 임시저장 X 메세지 임시저장 수정
          try {
            const res: any = await postLetterMessageFirstQustion(body);
            if (res.status === 201) {
              //제출 후에 홈으로 navigate
              setIsActive(false);
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
        //임시저장 없는 추가질문
        const body = {
          letterId: consultId,
          messageType: 'second_question',
          content: replyText,
          isCompleted: true,
        };
        //추가 질문 임시저장 X 메세지 임시저장 수정
        try {
          const res: any = await postLetterMessage(body);
          if (res.status === 201) {
            //제출 후에 홈으로 navigate
            setIsActive(false);
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
          isCompleted: true,
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
              //제출 후에 홈으로 navigate
              setIsActive(false);
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
        //임시저장 없는 추가질문
        const body = {
          messageId: messageId,
          content: replyText,
          isCompleted: true,
        };
        //추가 질문 임시저장 O 메세지 임시저장 수정
        try {
          const res: any = await patchLetterMessage(body);
          if (res.status === 200) {
            //제출 후에 홈으로 navigate
            setIsActive(false);
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
        <Body1>편지를 보낼까요?</Body1>
        <Body3 color={Grey4}>보낸 후엔 수정이 불가능해요.</Body3>
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
            text="제출하기"
            onClick={handleSubmitClick}
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
