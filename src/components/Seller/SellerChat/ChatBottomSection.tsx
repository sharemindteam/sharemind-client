import { Button } from 'components/Common/Button';
import Input from 'components/Common/Input';
import { Space } from 'components/Common/Space';
import React from 'react';
import styled from 'styled-components';
import { Grey3, Grey5 } from 'styles/color';
import { ReactComponent as SendIcon } from 'assets/icons/icon-send.svg';
function ChatBottomSection() {
  return (
    <ChatBottomWrapper>
      <TopBarSection>
        <TopBar />
      </TopBarSection>
      <Space height="0.4rem" />
      <GuideSection>
        시작 전에도 메시지를 주고 받을 수 있어요. 시작 요청은 10분 간 유효하며,
        셰어가 요청에 응한 후 30분간 상담이 진행되어요. 30분이 지나면 상담종료
        버튼을 눌러 종료하세요.
      </GuideSection>
      <Space height="1.2rem" />
      <ConsultStartButton
        text="상담시작 요청하기"
        width="calc(100% - 4rem)"
        height="5.2rem"
      />
      <Space height="1.5rem" />
      <MessageSection>
        <Input placeholder="메시지" width="100%" padding="1.2rem 1.5rem" />
        <SendIcon />
      </MessageSection>
    </ChatBottomWrapper>
  );
}

const ChatBottomWrapper = styled.div`
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  height: 25.7rem;
  border-radius: 2rem 2rem 0rem 0rem;
  background-color: white;
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopBarSection = styled.div`
  height: 1.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopBar = styled.div`
  width: 2.75rem;
  height: 0.3rem;
  flex-shrink: 0;
  background: ${Grey5};
`;

const GuideSection = styled.div`
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 2.17rem */
  color: ${Grey3};
  margin: 0 2rem;
`;

const ConsultStartButton = styled(Button)`
  display: block;
`;

const MessageSection = styled.div`
  display: flex;
  width: calc(100% - 4rem);
  margin: 0 2rem;
  align-items: center;
  gap: 0.8rem;
`;
export default ChatBottomSection;
