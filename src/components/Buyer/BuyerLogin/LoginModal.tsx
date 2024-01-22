import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { White } from 'styles/color';
import { Body1 } from 'styles/font';
interface LoginModalProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string;
}
// 임시저장할지 여부 모달
export const LoginModal = ({ setIsActive, errorMessage }: LoginModalProps) => {
  return (
    <SaveModalBox>
      <ModalBox>
        <Body1>{errorMessage}</Body1>
        <Button
          text="닫기"
          onClick={() => {
            setIsActive(false);
          }}
          width="30.3rem"
          height="5.2rem"
          margin="2rem 0 0 0"
        />
      </ModalBox>
    </SaveModalBox>
  );
};

const SaveModalBox = styled.div`
  width: 100%;
  height: 12.8rem;
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
