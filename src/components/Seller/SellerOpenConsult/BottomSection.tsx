import { Button } from 'components/Common/Button';
import React, { useEffect, useState } from 'react';
import reactTextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { ReactComponent as SendIcon } from 'assets/icons/icon-send.svg';
import { Green, Grey3, Grey6, LightGreen, White } from 'styles/color';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isSendPopupOpenState } from 'utils/atom';
import { useNavigate, useParams } from 'react-router-dom';
import { getCounselorsIsWriteComments } from 'api/get';
interface BottomSectionProps {
  isReplying: boolean;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}
function BottomSection({
  isReplying,
  setIsReplying,
  text,
  setText,
}: BottomSectionProps) {
  const navigate = useNavigate();
  const setIsSendPopupOpen = useSetRecoilState(isSendPopupOpenState);
  const { consultid } = useParams();
  const [isAlreadyWrite, setIsAlreadyWrite] = useState<boolean>(false);
  const handleNavigateRandomConsult = () => {
    if (localStorage.getItem('randomConsult')) {
      const randomNumList = JSON.parse(localStorage.getItem('randomConsult'));
      const navigateId =
        randomNumList[
          (randomNumList.indexOf(parseInt(consultid)) + 1) %
            randomNumList.length
        ];
      navigate(`/minder/open-consult/${navigateId}`);
    }
    // 그냥 open-consult id쳐서 들어왔을 경우 추후 예외처리..
  };
  useEffect(() => {
    const fetchIsAlreadyWrite = async () => {
      const res: any = await getCounselorsIsWriteComments(consultid);
      if (res.status === 200) {
        setIsAlreadyWrite(res.data);
      } else if (res.response.status === 404) {
        alert('존재하지 않는 상담입니다.');
        navigate('/minder/consult?type=open-consult');
      }
    };
    fetchIsAlreadyWrite();
  });
  return (
    <BottomSectionWrapper>
      {isReplying ? (
        <div className="message-input">
          <MessageTextArea
            value={text}
            placeholder="답장을 작성해주세요."
            onChange={(e) => {
              setText(e.target.value);
            }}
            rows={1}
            maxRows={4}
          />
          <SendIconSVG
            fill={text.length > 0 ? Green : Grey3}
            onClick={() => {
              // sendMessage();
              if (text.length > 0) {
                setIsSendPopupOpen(true);
              }
            }}
          />
        </div>
      ) : (
        <div className="buttons">
          <Button
            text={'다른 질문보기'}
            width="100%"
            backgroundColor={LightGreen}
            color={Green}
            height="5.2rem"
            onClick={handleNavigateRandomConsult}
          />
          <Button
            text={'답장쓰기'}
            width="100%"
            isActive={!isAlreadyWrite}
            backgroundColor={Green}
            height="5.2rem"
            onClick={() => {
              if (!isAlreadyWrite) {
                setIsReplying(true);
              }
            }}
          />
        </div>
      )}
    </BottomSectionWrapper>
  );
}

const BottomSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  text-align: center;
  gap: 0.6rem;
  padding-top: 0.8rem;
  padding-bottom: 1.6rem;
  background-color: ${White};
  position: fixed;
  bottom: 0;
  width: 100%;
  .buttons {
    display: flex;
    justify-content: center;
    gap: 0.7rem;
    width: calc(100% - 4rem);
  }
  .message-input {
    display: flex;
    width: calc(100% - 4rem);
    align-items: center;
    gap: 0.8rem;
  }
  @media (max-width: 767px) {
    width: calc(100%);
  }
  @media (min-width: 768px) {
    width: calc(375px);
  }
`;

const MessageTextArea = styled(reactTextareaAutosize)`
  width: 100%;
  padding: 1.2rem 1.5rem;
  outline: none;
  border: none;
  resize: none;
  border-radius: 1.2rem;
  background-color: ${Grey6};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.76rem */
  &:focus {
    border: none;
    outline: none;
  }
`;
const SendIconSVG = styled(SendIcon)`
  cursor: pointer;
  align-self: flex-end;
  padding-bottom: 0.7rem;
`;

export default BottomSection;
