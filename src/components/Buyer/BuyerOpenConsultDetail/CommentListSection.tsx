import { lightGreen } from '@mui/material/colors';
import { light } from '@mui/material/styles/createPalette';
import React from 'react';
import styled from 'styled-components';
import {
  Green,
  Grey1,
  Grey2,
  Grey3,
  Grey6,
  LightGreen,
  LightRed,
} from 'styles/color';
import { Body1, Body3, Body4, Caption1, Caption2 } from 'styles/font';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart1.svg';
import { ReactComponent as HeartEmptyIcon } from 'assets/icons/icon-heart3.svg';
import { ReactComponent as SettingIcon } from 'assets/icons/icon-option.svg';
import { ReactComponent as GreenCheckIcon } from 'assets/icons/icon-green-check.svg';
import { Characters } from 'utils/Characters';
import { Space } from 'components/Common/Space';

function CommentListSection() {
  return (
    <CommentListSectionWrapper>
      {/* 댓글 리스트 , 최대 5개까지*/}
      <CommentCard>
        <div className="flex1">
          <Characters number={1} width="3.2rem" height="3.3rem" />
          <Body1>연애상담마스터</Body1>
          <Circle />
          <Caption2>11:23</Caption2>
          <SettingButton />
        </div>

        <Body3 color={Grey1}>
          권태기 증상이 맞는 것 같네요. 속상하시겠지만, 대화를 통해 충분히
          극복하실 수 있어요. 어쩌구 저쩌구.
        </Body3>
        <LikeButton>
          <HeartIcon />
          <Caption1 color={Grey2}>28</Caption1>
        </LikeButton>
      </CommentCard>
      <CommentCard>
        <div className="flex1">
          <Characters number={1} width="3.2rem" height="3.3rem" />
          <Body1>연애상담마스터</Body1>
          <Circle />
          <Caption2>11:23</Caption2>
          <SettingButton />
        </div>

        <Body3 color={Grey1}>
          권태기 증상이 맞는 것 같네요. 속상하시겠지만, 대화를 통해 충분히
          극복하실 수 있어요. 어쩌구 저쩌구.
        </Body3>
        <LikeButton>
          <HeartIcon />
          <Caption1 color={Grey2}>28</Caption1>
        </LikeButton>
        <SelectButton>
          <GreenCheckIcon />
          <Caption1>이 답변 채택하기</Caption1>
        </SelectButton>
      </CommentCard>{' '}
      <CommentCard>
        <div className="flex1">
          <Characters number={1} width="3.2rem" height="3.3rem" />
          <Body1>연애상담마스터</Body1>
          <Circle />
          <Caption2>11:23</Caption2>
          <SettingButton />
        </div>

        <Body3 color={Grey1}>
          권태기 증상이 맞는 것 같네요. 속상하시겠지만, 대화를 통해 충분히
          극복하실 수 있어요. 어쩌구 저쩌구.
        </Body3>
        <LikeButton>
          <HeartEmptyIcon />
          <Caption1 color={Grey2}>28</Caption1>
        </LikeButton>
      </CommentCard>
      <Space height="10rem" />
    </CommentListSectionWrapper>
  );
}

const CommentListSectionWrapper = styled.section`
  padding: 1.2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const CommentGuide = styled.div<{ $isGreen: boolean }>`
  height: 3.1rem;
  background-color: ${(props) => (props.$isGreen ? LightGreen : LightRed)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
`;

const SelectButton = styled.div`
  position: absolute;
  bottom: 1.2rem;
  cursor: pointer;
  right: 1.6rem;
  display: flex;
  padding: 0.6rem 0.8rem;
  justify-content: flex-end;
  align-items: center;
  gap: 0.4rem;
  border-radius: 0.8rem;
  background: var(--Basic-White, #fff);
`;

const CommentCard = styled.div`
  display: flex;
  position: relative;
  border-radius: 1.2rem;
  box-sizing: border-box;
  padding: 1.2rem 1.6rem;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${Grey6};
  gap: 1rem;
  .flex1 {
    display: flex;
    width: 100%;
    gap: 0.8rem;
    height: 3.3rem;
    align-items: center;
  }
`;

const LikeButton = styled.div`
  display: flex;
  border-radius: 0.8rem;
  background-color: white;
  padding: 0.4rem 0.8rem 0.4rem 0.4rem;
  align-items: center;
  gap: 0.4rem;
`;

const Circle = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 100%;
  background-color: ${Grey3};
`;

const SettingButton = styled(SettingIcon)`
  position: absolute;
  top: 2.65rem;
  right: 2rem;
`;

export default CommentListSection;
