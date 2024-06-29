import { patchOpenConsult } from 'api/patch';

import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { APP_WIDTH } from 'styles/AppStyle';
import { Green, LightGreen, White } from 'styles/color';
import { Body1 } from 'styles/font';
import { isSavePopupOpenState } from 'utils/atom';
import { convertCategoryEnum } from 'utils/convertCategoryEnum';

//
//
//

interface FianlSavePopupProps {
  title: string;
  content: string;
  category: string;
}

//
//
//

function FinalSavePopup({ title, content, category }: FianlSavePopupProps) {
  const navigate = useNavigate();
  const setIsSavePopupOpen = useSetRecoilState(isSavePopupOpenState);
  const { postId } = useParams();

  /**
   *
   */
  const handlePost = async () => {
    setIsSavePopupOpen(false);
    const body = {
      postId: postId,
      consultCategory: convertCategoryEnum(category),
      title: title,
      content: content,
      isCompleted: false,
    };
    try {
      const res: any = await patchOpenConsult(body);
      if (res.status === 200) {
        navigate('/consult/?type=open-consult');
      } else if (res?.response.status === 404) {
        if (res?.response.data.errorName === 'CONSULT_CATEGORY_NOT_FOUND') {
          alert('상담 카테고리를 선택해주세요.');
          setIsSavePopupOpen(false);
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  //
  //
  //

  return (
    <IsSendModalBox>
      <ModalBox>
        <Body1>임시저장 하시겠습니까?</Body1>
        <ButtonWrapper>
          <NoButton
            onClick={() => {
              setIsSavePopupOpen(false);
            }}
          >
            아니오
          </NoButton>
          <YesButton onClick={handlePost}>예</YesButton>
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
export default FinalSavePopup;
