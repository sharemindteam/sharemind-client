import React from 'react';
import styled from 'styled-components';
import { Body1, Body3, Caption2 } from 'styles/font';
import { Grey2, Grey3, Grey6, Red, White } from 'styles/color';
import { Characters } from 'utils/Characters';
import { TagA2Consult } from 'components/Common/TagA2Consult';
interface OngoingCounsultBoxProps {
  consultStatus: ConsultState;
  counselorName: string;
  beforeMinutes: string;
  content: string;
  newMessageCounts: string;
  counselorprofileStatus: number;
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
        <TagA2Consult tagType={consultStatus} isBuyer={false} />
        {/* 상담사 프로필 상태에 따른 캐릭터 이미지 */}
        <Characters
          number={counselorprofileStatus}
          width="5.4rem"
          height="5.1rem"
        />
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
