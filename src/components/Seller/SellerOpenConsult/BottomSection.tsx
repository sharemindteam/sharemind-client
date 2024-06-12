import { Button } from 'components/Common/Button';
import React, { useEffect, useState } from 'react';
import reactTextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { ReactComponent as SendIcon } from 'assets/icons/icon-send.svg';
import { Green, Grey3, Grey6, LightGreen, White } from 'styles/color';
import { useSetRecoilState } from 'recoil';
import { isSendPopupOpenState } from 'utils/atom';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getCounselorsIsWriteComments,
  getCounselorsRandomConsult,
} from 'api/get';

//
//
//

interface BottomSectionProps {
  isReplying: boolean;
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

//
//
//

function BottomSection({
  isReplying,
  setIsReplying,
  text,
  setText,
}: BottomSectionProps) {
  const navigate = useNavigate();
  const setIsSendPopupOpen = useSetRecoilState(isSendPopupOpenState);
  const { consultid } = useParams() as { consultid: string };
  const [isAlreadyWrite, setIsAlreadyWrite] = useState<boolean>(false);
  const handleNavigateRandomConsult = async () => {
    const randomNumListString =
      localStorage.getItem('randomConsult') ?? `[${consultid}]`;
    // 공개상담 탭 눌렀을 때, random api 호출하여 로컬 스토리지에 값 저장
    // 로컬스토리지에 값이 없을 땐 (URL링크로 바로 들어올 경우) path variable를 하나의 원소로 하는 리스트 형태로 저장

    const randomNumList: number[] = JSON.parse(randomNumListString);
    if (randomNumList.length !== 1) {
      const navigateId =
        randomNumList[
          (randomNumList.indexOf(parseInt(consultid)) + 1) %
            randomNumList.length
        ];
      const filteredNumList = randomNumList.filter((item) => {
        return item !== parseInt(consultid);
      });
      localStorage.setItem('randomConsult', JSON.stringify(filteredNumList));
      navigate(`/minder/open-consult/${navigateId}`);
    } else {
      try {
        // 로컬 스토리지에 저장된 상담 리스트의 길이가 1인경우 -> 사용자에게 상담을 모두 순회했다고 알림
        const res: any = await getCounselorsRandomConsult();
        if (res.status === 200) {
          alert('현재 올라온 상담글을 모두 정독하셨습니다.');
          if (res.data.length > 0) {
            localStorage.setItem('randomConsult', JSON.stringify(res.data));
            navigate(`/minder/open-consult/${res.data[0]}`);
          } else {
            // 서버 응답 상담 리스트가 []일 경우
            navigate('/minder/open-consult/all-adopted');
          }
        } else if (res?.response.status === 403) {
          alert('공개 상담 페이지에 접근할 권한이 없습니다.');
        }
      } catch (err) {
        alert(err);
      }
    }
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
