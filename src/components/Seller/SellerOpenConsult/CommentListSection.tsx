import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Green,
  Grey1,
  Grey2,
  Grey3,
  Grey6,
  LightGreen,
  LightRed,
  White,
} from 'styles/color';
import { Body1, Body3, Caption1, Caption2 } from 'styles/font';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart1.svg';
import { ReactComponent as SettingIcon } from 'assets/icons/icon-option.svg';
import { Characters } from 'utils/Characters';
import { Space } from 'components/Common/Space';
import { getCounselorsComments } from 'api/get';
import { useNavigate, useParams } from 'react-router-dom';
import { isSendPopupOpenState } from 'utils/atom';
import { useRecoilValue } from 'recoil';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { formattedMessage } from 'utils/formattedMessage';

//
//
//

export interface commentApiObject {
  commentId: string;
  nickName: string;
  content: string;
  isLiked: boolean;
  totalLike: number;
  consultStyle: string;
  updatedAt: string;
  counselorId: number;
  isChosen: boolean;
}

//
//
//

function CommentListSection() {
  const navigate = useNavigate();

  const { consultid } = useParams();
  const [commentCardList, setCommentCardList] = useState<commentApiObject[]>(
    [],
  );

  const isSendPopupOpen = useRecoilValue(isSendPopupOpenState);

  //
  //
  //
  useEffect(() => {
    const fetchCommentList = async () => {
      try {
        const res: any = await getCounselorsComments(consultid);
        if (res.status === 200) {
          setCommentCardList(res.data);
        } else if (res?.response.status === 400) {
          alert('이미 채택 완료 혹은 종료된 상담입니다.');
          navigate('/open-consult');
        }
      } catch (err) {
        alert(err);
      }
    };
    fetchCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultid, isSendPopupOpen]);

  //
  //
  //

  return (
    <CommentListSectionWrapper>
      <CommentGuide $isGreen={commentCardList.length !== 5}>
        <Caption1 color={commentCardList.length === 5 ? LightRed : Green}>
          {commentCardList.length === 0
            ? '아직 답장한 마인더가 없어요! 가장 먼저 답장해보세요.'
            : commentCardList.length === 5
            ? '이미 5개의 답장이 모두 달렸어요'
            : 5 - commentCardList.length + '명의 마인더가 더 답장할 수 있어요.'}
        </Caption1>
      </CommentGuide>
      {/* 댓글 리스트 , 최대 5개까지*/}
      {commentCardList?.map((card, idx) => {
        return (
          <CommentCard key={idx}>
            <div className="flex1">
              <Characters
                number={consultStyleToCharNum(card.consultStyle) ?? 1}
                width="3.2rem"
                height="3.3rem"
              />
              <Body1>{card.nickName}</Body1>
              <Circle />
              <Caption2>{card.updatedAt}</Caption2>
              <SettingButton />
            </div>
            <Body3 color={Grey1}>{formattedMessage(card.content)}</Body3>
            <LikeButton>
              <HeartIcon />
              <Caption1 color={Grey2}>{card.totalLike}</Caption1>
            </LikeButton>
          </CommentCard>
        );
      })}
      <Space height="10rem" />
    </CommentListSectionWrapper>
  );
}

//
//
//

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
  background-color: ${White};
  padding: 0.8rem 1.15rem;
  align-items: center;
  align-self: flex-end;
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

export default React.memo(CommentListSection);
