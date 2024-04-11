import { postComment } from 'api/post';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Green, Grey4, LightGreen, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
import { isSendPopupOpenState } from 'utils/atom';

interface IsSendPopupProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

function IsSendPopup({ text, setText }: IsSendPopupProps) {
  const setIsSendPopupOpen = useSetRecoilState(isSendPopupOpenState);
  const { consultid } = useParams();
  const handleSendContent = async () => {
    const body = {
      postId: consultid,
      content: text,
    };
    try {
      const res: any = await postComment(body);
      console.log(res);
      if (res?.status === 200 || res.status === 201) {
        setText('');
        setIsSendPopupOpen(false);
      } else if (res?.response?.status === 400) {
        console.log(400);
        setIsSendPopupOpen(false);
        if (res?.response.data.errorName === 'COUNSELOR_AND_CUSTOMER_SAME') {
          alert('본인에게는 상담 신청과 댓글 작성을 할 수 없습니다.');
        } else if (
          res?.response.data.errorName === 'COMMENT_ALREADY_REGISTERED'
        ) {
          alert('상담사 당 댓글은 한번씩만 작성할 수 있습니다.');
        }
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <IsSendModalBox>
      <ModalBox>
        <Body1>답장을 보낼까요?</Body1>
        <Body3 color={Grey4}>보낸 후엔 수정할 수 없어요.</Body3>
        <ButtonWrapper>
          <NoButton
            onClick={() => {
              setIsSendPopupOpen(false);
            }}
          >
            취소
          </NoButton>
          <YesButton onClick={handleSendContent}>보내기</YesButton>
        </ButtonWrapper>
      </ModalBox>
    </IsSendModalBox>
  );
}
const IsSendModalBox = styled.div`
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
export default IsSendPopup;
