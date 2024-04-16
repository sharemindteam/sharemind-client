import { patchOpenConsult } from 'api/patch';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
import {
  isBuyPopupOpenState,
  isPostPopupOpenState,
  isSendPopupOpenState,
} from 'utils/atom';
import { convertCategoryEnum } from 'utils/convertCategoryEnum';
interface FianlWritePopupProps {
  title: string;
  content: string;
  category: string;
}

function FinalWritePopup({ title, content, category }: FianlWritePopupProps) {
  const navigate = useNavigate();
  const setIsPostPopupOpen = useSetRecoilState(isPostPopupOpenState);
  const { postId } = useParams();
  const handlePost = async () => {
    setIsPostPopupOpen(false);
    const body = {
      postId: postId,
      consultCategory: convertCategoryEnum(category),
      title: title,
      content: content,
      isCompleted: true,
    };
    try {
      const res: any = await patchOpenConsult(body);
      if (res?.status === 200) {
        navigate('/consult/?type=open-consult');
      } else {
        console.log(res);
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <IsSendModalBox>
      <ModalBox>
        <Body1>게시 후 더이상 수정 또는 삭제가 불가능해요.</Body1>
        <ButtonWrapper>
          <NoButton
            onClick={() => {
              setIsPostPopupOpen(false);
            }}
          >
            닫기
          </NoButton>
          <YesButton onClick={handlePost}>게시하기</YesButton>
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
export default FinalWritePopup;
