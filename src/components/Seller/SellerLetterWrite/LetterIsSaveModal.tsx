import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
interface SaveModalProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setReplyText: React.Dispatch<React.SetStateAction<string>>;
  lastModifyDate: string | undefined;
  saveText: string;
  setIsActiveSaveButton: React.Dispatch<React.SetStateAction<boolean>>;
  setIsActivePostButton: React.Dispatch<React.SetStateAction<boolean>>;
}
// 임시저장할지 여부 모달
export const LetterIsSaveModal = ({
  setIsActive,
  setReplyText,
  lastModifyDate,
  setIsActivePostButton,
  setIsActiveSaveButton,
  saveText,
}: SaveModalProps) => {
  return (
    <SaveModalBox>
      <ModalBox>
        <Body1>임시저장된 글을 불러올까요?</Body1>
        <Body3 color={Grey4}>마지막 수정 {lastModifyDate ?? ''}</Body3>
        <ButtonWrapper>
          <NoButton
            onClick={() => {
              setIsActive(false);
            }}
          >
            취소
          </NoButton>
          <YesButton
            onClick={() => {
              setIsActive(false);
              setReplyText(saveText);
              setIsActiveSaveButton(true);
              setIsActivePostButton(true);
            }}
          >
            불러오기
          </YesButton>
        </ButtonWrapper>
      </ModalBox>
    </SaveModalBox>
  );
};

const SaveModalBox = styled.div`
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
