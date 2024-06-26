import { patchLetterMessage } from 'api/patch';
import { postLetterMessage } from 'api/post';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';

//
//
//

interface LetterWritePostModal {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  replyText: string;
  setIsSend: React.Dispatch<React.SetStateAction<boolean>>;
  isSave: boolean;
  messageType: string;
  saveId: string;
}

//
//
//

export const LetterPostModal = ({
  setIsActive,
  replyText,
  setIsSend,
  isSave,
  messageType,
  saveId,
}: LetterWritePostModal) => {
  const { consultid } = useParams();

  /**
   *
   */
  const handlePostReplyText = async () => {
    const postBody = {
      isCompleted: true,
      content: replyText,
      letterId: consultid,
      messageType: messageType,
    };
    const patchBody = {
      isCompleted: true,
      content: replyText,
      messageId: saveId,
    };
    try {
      if (isSave) {
        await patchLetterMessage(patchBody);
        setIsSend(true);
      } else {
        postLetterMessage(postBody);
        setIsSend(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //
  //
  //

  return (
    <PostModalBox>
      <ModalBox>
        <Body1>편지를 보낼까요?</Body1>
        <Body3 color={Grey4}>보낸 후엔 수정이 불가능합니다.</Body3>
        <ButtonWrapper>
          <NoButton
            onClick={() => {
              setIsActive(false);
            }}
          >
            아니오
          </NoButton>
          <YesButton onClick={handlePostReplyText}>예</YesButton>
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
