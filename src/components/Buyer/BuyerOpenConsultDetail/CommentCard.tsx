import { commentApiObject } from 'components/Seller/SellerOpenConsult/CommentListSection';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Grey1, Grey2, Grey3, Grey6, Red, White } from 'styles/color';
import { Body1, Body3, Caption1, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart1.svg';
import { ReactComponent as HeartEmptyIcon } from 'assets/icons/icon-heart3.svg';
import { ReactComponent as SettingIcon } from 'assets/icons/icon-option.svg';
import { ReactComponent as GreenCheckIcon } from 'assets/icons/icon-green-check.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-check2.svg';
import { deleteCommentLikes } from 'api/delete';
import { postLikeComment } from 'api/post';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { formattedMessage } from 'utils/formattedMessage';
import { useNavigate } from 'react-router-dom';
interface CommentCardProps {
  item: commentApiObject;
  isMyPost: boolean;
  setIsPickPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setPickedCommentId: React.Dispatch<React.SetStateAction<string>>;
  isEndConsult: boolean | undefined;
}
function CommentCard({
  item,
  isMyPost,
  setPickedCommentId,
  setIsPickPopup,
  isEndConsult,
}: CommentCardProps) {
  const [isLike, setIsLike] = useState<boolean>(item.isLiked);
  // 보내기 중복 방지
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isFirstRendering, setIsFirstRendering] = useState<boolean>(true);
  const navigate = useNavigate();
  const handleClickLikeButton = useCallback(async () => {
    if (isSending) {
      return;
    } else {
      if (isLike) {
        setIsSending(true);
        const res: any = await deleteCommentLikes(item.commentId);
        if (res.response?.status === 400) {
          alert('이미 좋아요를 취소한 댓글입니다.');
        } else if (res.response?.status === 404) {
          alert('존재하지 않은 댓글입니다.');
        }
        setIsLike(false);
        setIsSending(false);
        setIsFirstRendering(false);
      } else {
        setIsSending(true);
        const res: any = await postLikeComment(item.commentId);
        if (res.response?.status === 400) {
          alert('이미 좋아요를 누른 댓글입니다.');
        } else if (res.response?.status === 404) {
          alert('존재하지 않은 댓글입니다.');
        }
        setIsLike(true);
        setIsSending(false);
        setIsFirstRendering(false);
      }
    }
  }, [item, isLike]);

  return (
    <CommentCardWrapper>
      <div className="flex1">
        <Characters
          number={consultStyleToCharNum(item.consultStyle) ?? 1}
          width="3.2rem"
          height="3.3rem"
        />
        <Body1>{item.nickName}</Body1>
        <Circle />
        <Caption2>{item.updatedAt}</Caption2>
        <SettingButton />
      </div>
      <Body3 color={Grey1}>{formattedMessage(item.content)}</Body3>
      <LikeButton>
        {isLike ? (
          <HeartIcon onClick={handleClickLikeButton} />
        ) : (
          <HeartEmptyIcon onClick={handleClickLikeButton} />
        )}
        <Caption1 color={Grey2}>
          {isFirstRendering
            ? item.totalLike
            : isLike
            ? item.totalLike + 1
            : item.totalLike}
        </Caption1>
      </LikeButton>
      {isMyPost && !item.isChosen && !isEndConsult && (
        <SelectButton
          onClick={() => {
            setPickedCommentId(item.commentId);
            setIsPickPopup(true);
          }}
        >
          <GreenCheckIcon />
          <Caption1>이 답변 채택하기</Caption1>
        </SelectButton>
      )}
      {item.isChosen && (
        <SharePickButton>
          <CheckIcon />
          <Caption1 color={White}>셰어 Pick</Caption1>
        </SharePickButton>
      )}
    </CommentCardWrapper>
  );
}

const CommentCardWrapper = styled.div`
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

const SharePickButton = styled.div`
  display: flex;
  border-radius: 0.8rem;
  position: absolute;
  bottom: 1.2rem;
  right: 1.6rem;
  padding: 0.6rem 0.8rem;
  align-items: center;
  background: ${Red};
  gap: 0.4rem;
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

const LikeButton = styled.div`
  display: flex;
  border-radius: 0.8rem;
  background-color: white;
  padding: 0.4rem 0.8rem 0.4rem 0.4rem;
  align-items: center;
  gap: 0.4rem;
`;

const SettingButton = styled(SettingIcon)`
  position: absolute;
  top: 2.65rem;
  right: 2rem;
`;

const Circle = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 100%;
  background-color: ${Grey3};
`;
export default CommentCard;
