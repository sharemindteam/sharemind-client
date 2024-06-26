import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { APP_WIDTH } from 'styles/AppStyle';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
import { isOutPopupOpenState } from 'utils/atom';

//
//
//

function IsOutPopup() {
  const navigate = useNavigate();
  const setIsOutPopupOpen = useSetRecoilState(isOutPopupOpenState);

  /**
   *
   */
  const handlePostSaveSettings = () => {
    // 프로플 수정 메인 섹션에서 반영
    setIsOutPopupOpen(false);
    navigate('/minder/mypage/viewProfile');
  };

  //
  //
  //

  return (
    <IsOutModalBox>
      <ModalBox>
        <Body1>설정을 저장하지 않고 나가시겠습니까?</Body1>
        <Body3 color={Grey4}>저장하지 않으면 작성한 설정이 초기화됩니다.</Body3>
        <ButtonWrapper>
          <NoButton
            onClick={() => {
              setIsOutPopupOpen(false);
            }}
          >
            아니오
          </NoButton>
          <YesButton onClick={handlePostSaveSettings}>예</YesButton>
        </ButtonWrapper>
      </ModalBox>
    </IsOutModalBox>
  );
}

const IsOutModalBox = styled.div`
  width: 100%;
  height: 15rem;
  z-index: 9999;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 36vh;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
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

export default IsOutPopup;
