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
  White,
} from 'styles/color';
import { Characters } from 'utils/Characters';
import { TagA2Consult } from 'components/Common/TagA2Consult';
import { Button } from 'components/Common/Button';
import { TagA2Cartegory } from 'components/Common/TagA2Cartegory';
import { useNavigate } from 'react-router-dom';
import { CartegoryState, ConsultState } from 'utils/type';
interface OngoingCounsultBoxProps {
  categoryStatus?: string;
  consultStatus: string;
  counselorName: string | undefined;
  beforeMinutes: string | null;
  content: string | null;
  newMessageCounts: number | null;
  counselorprofileStatus: number | undefined;
  onClick?: () => void;
  reviewCompleted?: boolean;
  isChat?: boolean;
}
function OngoingCounsultBox({
  categoryStatus,
  consultStatus,
  counselorName,
  beforeMinutes,
  isChat,
  counselorprofileStatus,
  content,
  newMessageCounts = 0,
  onClick,
  reviewCompleted,
}: OngoingCounsultBoxProps) {
  const navigate = useNavigate();
  return (
    <OngoingCounsultBoxWrapper onClick={onClick}>
      <div className="flex-1">
        {categoryStatus && (
          <div className="button">
            <TagA2Cartegory
              tagType={categoryStatus as CartegoryState}
              bgColorType={2}
            />
          </div>
        )}
        {consultStatus && (
          <div className="button">
            <TagA2Consult tagType={consultStatus as ConsultState} />
          </div>
        )}
        <div className="flex-1-1">
          <Body1 color={consultStatus === '상담 종료' ? Grey3 : Black}>
            {counselorName}
          </Body1>
          <Circle />
          <Caption2 color={consultStatus === '상담 종료' ? Grey4 : Grey2}>
            {beforeMinutes}
          </Caption2>
        </div>

        {/* 상담사 프로필 상태에 따른 캐릭터 이미지 */}
      </div>
      <div className="flex-2">
        <div
          style={{ opacity: `${consultStatus === '상담 종료' ? '0.5' : '1'}` }}
        >
          <Characters
            number={counselorprofileStatus}
            padding="0.4rem 0.4rem 0.3rem 0.3rem"
            width="5.4rem"
            height="5.1rem"
          />
        </div>
        <Content color={consultStatus === '상담 종료' ? Grey3 : Grey1}>
          {content}
        </Content>
      </div>
      {consultStatus === '상담 종료' && reviewCompleted && (
        <Button
          text="리뷰 확인하기"
          color={Green}
          width="100%"
          height="4.2rem"
          backgroundColor={White}
          buttonTextType={2}
          onClick={(e?: React.MouseEvent<HTMLElement>) => {
            navigate('/seller/mypage/review');
            e?.stopPropagation();
          }}
        />
      )}
      {newMessageCounts !== 0 && newMessageCounts !== null && (
        <NewMessageCounts>
          <Caption2 color={White}>{newMessageCounts}</Caption2>
        </NewMessageCounts>
      )}
    </OngoingCounsultBoxWrapper>
  );
}
const OngoingCounsultBoxWrapper = styled.div`
  width: calc(100% - 4rem);
  box-sizing: border-box;
  padding: 1.6rem;
  display: flex;

  position: relative;
  z-index: 1;
  flex-direction: column;
  gap: 0.4rem;
  cursor: pointer;
  border-radius: 1.2rem;
  background-color: ${Grey6};
  margin: 0 2rem;
  .button {
    display: flex;
    width: 6rem;
    justify-content: center;
  }
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

const Circle = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 100%;
  background-color: ${Grey3};
`;

const Content = styled(Body3)`
  width: calc(100% - 9rem);
  max-height: 4.6rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 0.5rem;
  -webkit-line-clamp: 2;
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
