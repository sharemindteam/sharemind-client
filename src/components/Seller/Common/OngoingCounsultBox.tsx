import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Char1 } from 'assets/characters/char_공감.svg';
import { ReactComponent as Char2 } from 'assets/characters/char_조언.svg';
import { ReactComponent as Char3 } from 'assets/characters/char_팩폭.svg';
import { Body1, Body3, Caption2 } from 'styles/font';
import { Grey2, Grey3, Grey6, Red, White } from 'styles/color';
interface OngoingCounsultBoxProps {
  consultStatus: string;
  counselorName: string;
  beforeMinutes: string;
  content: string;
  newMessageCounts: string;
  counselorprofileStatus: Number;
}
function OngoingCounsultBox({
  consultStatus,
  counselorName,
  beforeMinutes,
  counselorprofileStatus,
  content,
  newMessageCounts,
}: OngoingCounsultBoxProps) {
  return (
    <OngoingCounsultBoxWrapper>
      <div className="flex-1">
        <ConsultStatus>
          <Caption2 color={White}>{consultStatus}</Caption2>
        </ConsultStatus>
        {/* 상담사 프로필 상태에 따른 캐릭터 이미지 */}
        {counselorprofileStatus === 1 ? (
          <Char1 />
        ) : counselorprofileStatus === 2 ? (
          <Char2 />
        ) : (
          <Char3 />
        )}
      </div>
      <div className="flex-2">
        <div className="flex-2-1">
          <Name>{counselorName}</Name>
          <Circle />
          <MinutesBefore color={Grey2}>{beforeMinutes}</MinutesBefore>
        </div>
        <div>
          <Content>{content.substr(0, 50) + '...'}</Content>
        </div>
      </div>
      <NewMessageCounts>
        <Caption2 color={White}>{newMessageCounts}</Caption2>
      </NewMessageCounts>
    </OngoingCounsultBoxWrapper>
  );
}
const OngoingCounsultBoxWrapper = styled.div`
  padding: 1.4rem 4.1rem 1.4rem 1.6rem;
  display: flex;
  position: relative;
  gap: 1.2rem;
  border-radius: 4px;
  background-color: ${Grey6};
  margin: 0 2rem;
  .flex-1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.4rem;
    width: 5.8rem;
  }
  .flex-2 {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  .flex-2-1 {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }
`;

const ConsultStatus = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 0.6rem;
  border-radius: 0.8rem;
  background-color: ${Red};
  color: ${White};
`;

const Name = styled(Body1)``;

const Circle = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 100%;
  background-color: ${Grey3};
`;
const MinutesBefore = styled(Caption2)``;

const Content = styled(Body3)`
  text-overflow: ellipsis;
`;

const NewMessageCounts = styled.div`
  width: 1.9rem;
  height: 1.9rem;
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Red};
`;
export default OngoingCounsultBox;
