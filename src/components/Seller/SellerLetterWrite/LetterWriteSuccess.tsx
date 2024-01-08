import styled from 'styled-components';
import { BottomButton } from '../Common/BottomButton';
import { ReactComponent as SendGraphic } from 'assets/icons/graphic-send.svg';
import { useNavigate } from 'react-router-dom';
export const LetterWriteSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <SendSuccessSection>
        <SendGraphicIcon />
        <SendSuccessMessage>편지를 보냈어요!</SendSuccessMessage>
      </SendSuccessSection>

      <BottomButton
        text="확인"
        onClick={() => {
          navigate('/seller/consult');
        }}
      />
    </>
  );
};

const SendGraphicIcon = styled(SendGraphic)`
  margin-top: 20.68rem;
`;
const SendSuccessSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;
`;

const SendSuccessMessage = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3rem; /* 150% */
`;
