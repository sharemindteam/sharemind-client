import { patchProfiles } from 'api/patch';
import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { APP_WIDTH } from 'styles/AppStyle';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
import { isSuccessUpdateState, isUpdateModalOpenState } from 'utils/atom';
import { SharemindErrorResponse } from 'utils/type';

//
//
//

interface UpdatePopupProps {
  nickname: any;
  category: any;
  style: any;
  type: any;
  availableTime: any;
  letterPrice: any;
  chatPrice: any;
  oneLiner: any;
  experience: any;
  selectAvailableTime: any;
  phoneNumber: string;
}

//
//
//

const DUPLICATE_PHONE_NUMBER_ERROR_NAME = 'DUPLICATE_PHONE_NUMBER';

//
//
//

export const UpdatePopup = ({
  nickname,
  category,
  style,
  type,
  availableTime,
  letterPrice,
  chatPrice,
  oneLiner,
  experience,
  selectAvailableTime,
  phoneNumber,
}: UpdatePopupProps) => {
  const setIsUpdateModalOpen = useSetRecoilState(isUpdateModalOpenState);
  const setIsSuccess = useSetRecoilState(isSuccessUpdateState);
  const handlePostUpdate = async () => {
    // 여기서 서버로 모든 데이터를 POST

    const body = {
      nickname: nickname.value,
      consultCategories: category.serverValue,
      consultStyle: style.serverValue,
      consultTypes: type.serverValue,
      consultTimes: selectAvailableTime,
      letterCost: type.viewValue.includes('편지')
        ? letterPrice.value.replace(',', '')
        : null,
      chatCost: type.viewValue.includes('채팅')
        ? chatPrice.value.replace(',', '')
        : null,
      introduction: oneLiner.value,
      experience: experience.value,
      phoneNumber: phoneNumber,
    };
    try {
      await patchProfiles(body);
      setIsUpdateModalOpen(false);

      setIsSuccess(true);
    } catch (error) {
      const _error = error as AxiosError;

      const errorResponseData = _error.response?.data as SharemindErrorResponse;

      if (errorResponseData.errorName === DUPLICATE_PHONE_NUMBER_ERROR_NAME) {
        alert(errorResponseData.message);
      } else {
        alert('판매 정보를 올바르게 입력해주세요!');
      }
    }
  };

  //
  //
  //

  return (
    <UpdateModalBox>
      <ModalBox>
        <Body1>판매정보 업데이트를 요청할까요?</Body1>
        <Body3 color={Grey4}>
          변경사항을 저장하시면 업데이트가 요청됩니다.
        </Body3>
        <ButtonWrapper>
          <NoButton
            onClick={() => {
              setIsUpdateModalOpen(false);
            }}
          >
            닫기
          </NoButton>
          <YesButton onClick={handlePostUpdate}>요청하기</YesButton>
        </ButtonWrapper>
      </ModalBox>
    </UpdateModalBox>
  );
};

const UpdateModalBox = styled.div`
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
