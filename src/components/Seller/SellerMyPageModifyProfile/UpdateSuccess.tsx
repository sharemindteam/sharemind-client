import styled from 'styled-components';
import { ReactComponent as UpdateGraphic } from 'assets/icons/graphic-update-success.svg';
import { BottomButton } from '../Common/BottomButton';
import { useNavigate } from 'react-router-dom';

export const UpdateSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <UpdateSuccessSection>
        <UpdateGraphicIcon />
        <UpdateMessage>판매정보 업데이트가 요청되었어요</UpdateMessage>
        <GuideMessage>
          수정한 판매정보는 <b>검토 후</b> 반영됩니다. <br />
          반영 여부에 관한 상세 내용은 이메일로 전송되므로 <br />
          이메일을 확인해주세요.
        </GuideMessage>
        <BottomButton
          text="확인"
          onClick={() => {
            navigate(`/seller/mypage`);
          }}
        />
      </UpdateSuccessSection>
    </>
  );
};
const UpdateSuccessSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;
const GuideMessage = styled.div`
  font-family: Pretendard;
  margin-top: 1.2rem;
  text-align: center;
  font-size: 1.6rem;h
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const UpdateGraphicIcon = styled(UpdateGraphic)`
  margin-top: 16.4rem;
`;
const UpdateMessage = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3rem; /* 150% */
`;
