import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Green, LightGreen, White } from 'styles/color';
import { Body1 } from 'styles/font';
import { isBuyPopupOpenState } from 'utils/atom';

//
//
//

function IsBuyPopup() {
  const navigate = useNavigate();
  const setIsSendPopupOpen = useSetRecoilState(isBuyPopupOpenState);
  const handleBuyConsult = () => {
    setIsSendPopupOpen(false);
    navigate('/openConsultRequest');
  };

  //
  //
  //

  return (
    <IsSendModalBox>
      <ModalBox>
        <Body1>상담권 구매 후 글을 작성할 수 있어요.</Body1>
        <ButtonWrapper>
          <NoButton
            onClick={() => {
              setIsSendPopupOpen(false);
            }}
          >
            닫기
          </NoButton>
          <YesButton onClick={handleBuyConsult}>구매하기</YesButton>
        </ButtonWrapper>
      </ModalBox>
    </IsSendModalBox>
  );
}

const IsSendModalBox = styled.div`
  width: 100%;
  height: 12.8rem;
  z-index: 9999;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 22.3rem;
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
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
  font-size: 1.6rem;
  font-weight: 600;
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
export default IsBuyPopup;
