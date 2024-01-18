import React from 'react';
import styled from 'styled-components';
import { Grey1 } from 'styles/color';

function SetChatTimeSection() {
  return (
    <Wrapper>
      <SetChatGuide>
        채팅 상담 활동이 가능한 시간대를 설정해주세요. <br />
        최소 1시간 이상 간격으로 설정해주세요.
      </SetChatGuide>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background-color: white;
`;
const SetChatGuide = styled.div`
  color: ${Grey1};
  font-family: Pretendard;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 2.17rem */
  padding: 1.8rem 2rem 1.2rem;
`;

export default SetChatTimeSection;
