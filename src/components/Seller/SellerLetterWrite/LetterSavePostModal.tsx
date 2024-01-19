import { patchLetterMessage } from 'api/patch';
import { postLetterMessage } from 'api/post';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
interface LetterWriteSavePostModal {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  replyText: string;
  isSave: boolean;
  messageType: string;
  saveId: string;
}
// 임시저장 할까요? 모달
export const LetterSavePostModal = ({
  setIsActive,
  replyText,
  isSave,
  messageType,
  saveId,
}: LetterWriteSavePostModal) => {
  const navigate = useNavigate();
  const { consultid } = useParams();
  const handleSaveReplyText = async () => {
    const postBody = {
      isCompleted: false,
      content: replyText,
      letterId: consultid,
      messageType: messageType,
    };
    const patchBody = {
      isCompleted: false,
      content: replyText,
      messageId: saveId,
    };
    try {
      if (isSave) {
        await patchLetterMessage(patchBody);
        navigate(`/seller/letter/${consultid}`);
      } else {
        await postLetterMessage(postBody);
        navigate(`/seller/letter/${consultid}`);
      }
    } catch (err) {
      console.log(err);
    }
    navigate(`/seller/letter/${consultid}`);
  };
  return (
    <PostModalBox>
      <ModalBox>
        <Body1>임시저장 할까요?</Body1>
        <Body3 color={Grey4}>작성하던 내용을 추후에 불러올 수 있어요.</Body3>
        <ButtonWrapper>
          <NoButton
            onClick={() => {
              setIsActive(false);
            }}
          >
            취소
          </NoButton>
          <YesButton onClick={handleSaveReplyText}>임시저장</YesButton>
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
  top: 22.3rem;
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

const NoButton = styled.div`
  display: flex;
  width: 14.8rem;
  height: 5.2rem;
  cursor: pointer;
  border-radius: 0.8rem;
  padding: 1.7rem 0rem 1.5rem 0rem;
  justify-content: center;
  align-items: center;
  color: ${Green};
  background-color: ${LightGreen};
  box-sizing: border-box;
`;

const YesButton = styled.div`
  display: flex;
  width: 14.8rem;
  height: 5.2rem;
  border-radius: 0.8rem;
  padding: 1.7rem 0rem 1.5rem 0rem;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: ${White};
  background-color: ${Green};
  box-sizing: border-box;
`;
