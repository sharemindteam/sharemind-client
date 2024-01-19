import { postLetterMessageFirstQustion } from 'api/post';
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
  tagStatus: number;
  consultCategory: string;
  consultId: string | undefined;
}
// 임시저장 할까요? 모달
export const LetterSaveModal = ({
  setIsActive,
  replyText,
  isSaved,
  tagStatus,
  consultCategory,
  consultId,
}: LetterSaveModalProps) => {
  const navigate = useNavigate();

  const handleSaveMessageClick = async () => {
    //임시 저장 메세지 없는 경우에 first or not
    if (!isSaved) {
      if (tagStatus === 0) {
        const body = {
          letterId: consultId,
          consultCategory: convertCategoryEnum(consultCategory),
          content: replyText,
          isCompleted: false,
        };
        try {
          const res: any = await postLetterMessageFirstQustion(body);
          console.log(body);
          console.log(res);
          if (res.status === 200) {
            setIsActive(false);
          } else if (res.response.status === 403) {
            alert('접근 권한이 없습니다.');
            navigate('/buyer/consult');
          } else if (res.response.status === 404) {
            alert('존재하지 않는 편지 아이디로 요청되었습니다.');
          }
        } catch (e) {
          console.log(e);
        }
      } else if (tagStatus === 2) {
      }
    } else {
      //임시 저장 메세지 있는 경우에 first or not
      // if (tagStatus === 0) {
      //   const params = {
      //     messageType: 'FIRST_QUESTION',
      //     isCompleted: false,
      //   };
      //   try {
      //     const res: any = await postLetterMessageFirstQustion(
      //       { params },
      //       consultId,
      //     );
      //     if (res.status === 200) {
      //       setIsActive(false);
      //     } else if (res.response.status === 403) {
      //       alert('접근 권한이 없습니다.');
      //       navigate('/buyer/consult');
      //     } else if (res.response.status === 404) {
      //       alert('존재하지 않는 편지 아이디로 요청되었습니다.');
      //     }
      //   } catch (e) {
      //     console.log(e);
      //   }
      // } else if (tagStatus === 2) {
      // }
    }
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
