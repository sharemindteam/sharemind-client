import { Space } from 'components/Common/Space';
import React from 'react';
import styled from 'styled-components';
import { Grey6, LightGreen, White } from 'styles/color';

function ChatListSection() {
  const chatList = [
    '안녕하세요',
    '너무 힘든 일이 었어서 이렇게 얘기할 수 있는 방법이 없어서 여기로 좀 상담 하고 싶어서요.',
    '이성보다 감정이 깊으면 아닌걸 알면서도 계속 붙잡게 되고 힘들지만 만남을 이어가게 되겠죠. 생각 나는게 당연해요.',
  ];
  return (
    <ChatListWrapper>
      <ScrollContainer>
        <ChatWhite>{chatList[0]}</ChatWhite>
        <ChatWhite>{chatList[1]}</ChatWhite>
        <ChatGreen>{chatList[0]}</ChatGreen>
        <ChatWhite>{chatList[1]}</ChatWhite>
        <ChatGreen>{chatList[2]}</ChatGreen>
        <ChatGreen>{chatList[2]}</ChatGreen>
        <ChatGreen>{chatList[2]}</ChatGreen>
        <Space height="30rem" />
      </ScrollContainer>
    </ChatListWrapper>
  );
}

const ChatListWrapper = styled.div`
  background: ${Grey6};
  padding: 0.8rem 2rem;
  height: calc(100vh - 10rem);
  overflow: scroll;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const ChatWhite = styled.div`
  background-color: ${White};
  padding: 1.2rem;
  max-width: 27.5rem;
  font-family: Pretendard;
  align-self: flex-start;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  border-radius: 0rem 1rem 1rem 1rem;
`;

const ChatGreen = styled(ChatWhite)`
  background-color: #c2f3f0;
  align-self: flex-end;
  border-radius: 1rem 0rem 1rem 1rem;
`;

export default ChatListSection;
