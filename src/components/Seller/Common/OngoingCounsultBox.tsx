import React from 'react';
import styled from 'styled-components';
import { Body1, Body3, Caption2 } from 'styles/font';
import {
  Black,
  Green,
  Grey1,
  Grey2,
  Grey3,
  Grey4,
  Grey6,
  Red,
  White,
} from 'styles/color';
import { Characters } from 'utils/Characters';
import { TagA2Consult } from 'components/Common/TagA2Consult';
import { Button } from 'components/Common/Button';
import { TagA2Cartegory } from 'components/Common/TagA2Cartegory';
interface OngoingCounsultBoxProps {
  categoryStatus?: CartegoryState;
  consultStatus?: ConsultState;
  counselorName: string | undefined;
  beforeMinutes: string | undefined;
  content: string | undefined;
  newMessageCounts: number | undefined;
  counselorprofileStatus: number | undefined;
}
function OngoingCounsultBox({
  categoryStatus,
  consultStatus,
  counselorName,
  beforeMinutes,
  counselorprofileStatus,
  content,
  newMessageCounts = 0,
}: OngoingCounsultBoxProps) {
  return (
    <OngoingCounsultBoxWrapper>
      <div className="flex-1">
        {categoryStatus && (
          <TagA2Cartegory tagType={categoryStatus} bgColorType={2} />
        )}
        {consultStatus && <TagA2Consult tagType={consultStatus} />}
        <div className="flex-1-1">
          <Name color={consultStatus === '상담 종료' ? Grey3 : Black}>
            {counselorName}
          </Name>
          <Circle />
          <MinutesBefore color={consultStatus === '상담 종료' ? Grey4 : Grey2}>
            {beforeMinutes}
          </MinutesBefore>
        </div>

        {/* 상담사 프로필 상태에 따른 캐릭터 이미지 */}
      </div>
      <div className="flex-2">
        <div
          style={{ opacity: `${consultStatus === '상담 종료' ? '0.5' : '1'}` }}
        >
          <Characters
            number={counselorprofileStatus}
            width="5.4rem"
            height="5.1rem"
          />
        </div>
        <Content color={consultStatus === '상담 종료' ? Grey3 : Grey1}>
          {content?.substr(0, 50) + '...'}
        </Content>
      </div>
      {consultStatus === '상담 종료' ? (
        <Button
          text="리뷰 확인하기"
          color={Red}
          width="100%"
          height="4.2rem"
          backgroundColor={White}
          buttonTextType={2}
        />
      ) : (
        ''
      )}
      {newMessageCounts === 0 ? (
        ''
      ) : (
        <NewMessageCounts>
          <Caption2 color={White}>{newMessageCounts}</Caption2>
        </NewMessageCounts>
      )}
    </OngoingCounsultBoxWrapper>
  );
}
const OngoingCounsultBoxWrapper = styled.div`
  padding: 1.4rem 1.6rem 1.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
  border-radius: 0.4rem;
  background-color: ${Grey6};
  margin: 0 2rem;
  .flex-1 {
    display: flex;
    align-items: center;
    gap: 1.4rem;
  }
  .flex-1-1 {
    display: flex;
    align-items: center;
    gap: 1.4rem;
  }
  .flex-2 {
    display: flex;
    gap: 1.2rem;
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
  width: calc(100% - 9rem);
  margin-right: 2.3rem;
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
  background-color: ${Green};
`;
export default OngoingCounsultBox;
