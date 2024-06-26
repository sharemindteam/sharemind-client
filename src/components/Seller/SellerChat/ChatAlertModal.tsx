import { Button } from 'components/Common/Button';
import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import { Green, Grey1, Grey4, White } from 'styles/color';
import { Body1, Body3 } from 'styles/font';
import { convertAMPMToStringYear } from 'utils/convertDate';

//
//
//

interface ChatAlertModalProps {
  setAlertModalActive: React.Dispatch<SetStateAction<boolean>>;
  opponentName: string;
  chatStatus: string;
  alertModalTime: string;
}

//
//
//

export const ChatAlertModal = ({
  setAlertModalActive,
  opponentName,
  chatStatus,
  alertModalTime,
}: ChatAlertModalProps) => {
  if (chatStatus === '상담 중') {
    return (
      <ChatAlertModalContainer>
        <div className="chat-alert-modal-box">
          <div className="chat-alert-modal-row1">
            <Body1 color={Green}>{opponentName}</Body1>
            <Body1 color={Grey1}>님과의 상담이 시작되었어요.</Body1>
          </div>
          <div className="chat-alert-modal-row2">
            <Body3 color={Grey4}>
              {convertAMPMToStringYear(alertModalTime)}
            </Body3>
          </div>
          <Button
            text="닫기"
            onClick={() => {
              setAlertModalActive(false);
            }}
            width="100%"
            height="5.2rem"
          />
        </div>
      </ChatAlertModalContainer>
    );
  } else if (chatStatus === '상담 종료') {
    return (
      <ChatAlertModalContainer>
        <div className="chat-alert-modal-box">
          <div className="chat-alert-modal-row1">
            <Body1 color={Green}>{opponentName}</Body1>
            <Body1 color={Grey1}>님과의 상담이 종료되었어요.</Body1>
          </div>
          <div className="chat-alert-modal-row2">
            <Body3 color={Grey4}>
              {convertAMPMToStringYear(alertModalTime)}
            </Body3>
          </div>
          <Button
            text="닫기"
            onClick={() => {
              setAlertModalActive(false);
            }}
            width="100%"
            height="5.2rem"
          />
        </div>
      </ChatAlertModalContainer>
    );
  }
};

const ChatAlertModalContainer = styled.div`
  width: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 36vh;
  .chat-alert-modal-box {
    width: 33.5rem;
    border-radius: 1.2rem;
    padding: 1.6rem;
    box-sizing: border-box;
    box-shadow: 0 0 2rem 0 rgba(0, 0, 0, 0.1);
    background-color: ${White};
  }
  .chat-alert-modal-row1 {
    display: flex;
    justify-content: center;
  }
  .chat-alert-modal-row2 {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
`;
