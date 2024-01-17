import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
interface LetterLoadModalProps {
  savedText: string;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setReplyText: React.Dispatch<React.SetStateAction<string>>;
  lastModifyDate: string;
}
// 임시저장할지 여부 모달
export const LetterLoadModal = ({
  savedText,
  setIsActive,
  setReplyText,
  lastModifyDate,
}: LetterLoadModalProps) => {
  return (
    <SaveModalBox>
      <ModalBox>
        <Body1>임시저장된 글을 불러올까요?</Body1>
        <Body3 color={Grey4}>마지막 수정 {lastModifyDate ?? ''}</Body3>
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
            text="불러오기"
            onClick={() => {
              //TODO: 서버로 post, param id로
              setIsActive(false);
              setReplyText(savedText);
            }}
            width="14.8rem"
            height="5.2rem"
          />
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