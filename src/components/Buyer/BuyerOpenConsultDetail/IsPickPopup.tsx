import { patchAdoptComment } from 'api/patch';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';

interface IsPickPopupProps {
  isPickPopup: boolean;
  setIsPickPopup: React.Dispatch<React.SetStateAction<boolean>>;
  pickedCommentId: string;
}

function IsPickPopup({
  isPickPopup,
  setIsPickPopup,
  pickedCommentId,
}: IsPickPopupProps) {
  const { id } = useParams();
  const adoptComment = async () => {
    try {
      const res: any = await patchAdoptComment(id, pickedCommentId);
      if (res.status === 200) {
        setIsPickPopup(false);
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <IsPickPopupBox>
      <ModalBox>
        <Body1>이 답변을 채택하시겠어요?</Body1>
        <Body3 color={Grey4}>
          하나의 답변만 채택 가능하며, 취소할 수 없습니다.
        </Body3>
        <ButtonWrapper>
          <NoButton
            onClick={() => {
              setIsPickPopup(false);
            }}
          >
            닫기
          </NoButton>
          <YesButton
            onClick={() => {
              adoptComment();
            }}
          >
            채택하기
          </YesButton>
        </ButtonWrapper>
      </ModalBox>
    </IsPickPopupBox>
  );
}
const IsPickPopupBox = styled.div`
  width: 100%;
  height: 15rem;
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
export default IsPickPopup;
