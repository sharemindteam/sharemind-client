import { getLetterMessages } from 'api/get';
import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
interface LetterLoadModalProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setReplyText: React.Dispatch<React.SetStateAction<string>>;
  lastModifyDate: string;
  consultId: string;
}
// 임시저장할지 여부 모달
export const LetterLoadModal = ({
  setIsActive,
  setReplyText,
  lastModifyDate,
  consultId,
}: LetterLoadModalProps) => {
  const navigate = useNavigate();
  const handleLoadMessageClick = async () => {
    const params = {
      messageType: 'FIRST_QUESTION',
      isCompleted: false,
    };
    try {
      const res: any = await getLetterMessages({ params }, consultId);
      if (res.status === 200) {
      } else if (res.response.status === 403) {
        alert('접근 권한이 없습니다.');
        navigate('/buyer/consult');
      } else if (res.response.status === 404) {
        alert('존재하지 않는 편지 아이디로 요청되었습니다.');
      }
    } catch (e) {
      console.log(e);
    }
    //TODO: 서버로 post, param id로
    setIsActive(false);
    setReplyText('');
  };
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
            onClick={handleLoadMessageClick}
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
