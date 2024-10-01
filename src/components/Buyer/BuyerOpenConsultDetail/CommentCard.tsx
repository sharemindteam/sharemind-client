import { commentApiObject } from 'components/Seller/SellerOpenConsult/CommentListSection';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  Green,
  Grey1,
  Grey2,
  Grey3,
  Grey6,
  LightGreen,
  Red,
  White,
} from 'styles/color';
import { Body1, Body3, Button2, Caption1, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { ReactComponent as HeartIcon } from 'assets/open-consult/open-consult-heart-button.svg';
import { ReactComponent as HeartEmptyIcon } from 'assets/open-consult/open-consult-heart-empty-button.svg';
import { ReactComponent as SettingIcon } from 'assets/icons/icon-option.svg';
import { ReactComponent as GreenCheckIcon } from 'assets/open-consult/open-consult-check.svg';
import { ReactComponent as PickIcon } from 'assets/open-consult/open-consult-pick.svg';
import { deleteCommentLikes } from 'api/delete';
import { postLikeComment } from 'api/post';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { formattedMessage } from 'utils/formattedMessage';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'components/Common/Flex';

//
//
//

interface CommentCardProps {
  item: commentApiObject;
  isMyPost: boolean;
  setIsPickPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setPickedCommentId: React.Dispatch<React.SetStateAction<string>>;
  isEndConsult: boolean | undefined;
  handleMoreButtonClick: () => void;
}

//
//
//

function CommentCard({
  item,
  isMyPost,
  setPickedCommentId,
  setIsPickPopup,
  isEndConsult,
  handleMoreButtonClick,
}: CommentCardProps) {
  const navigate = useNavigate();

  const [isLike, setIsLike] = useState<boolean>(item.isLiked);
  // 보내기 중복 방지
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isFirstRendering, setIsFirstRendering] = useState<boolean>(true);

  /**
   *
   */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, isLike]);

  //
  //
  //

  return (
    <CommentCardWrapper>
      {item.isChosen && (
        <SharePickButton>
          <PickIcon />
          <Caption1 color={White}>셰어 Pick</Caption1>
        </SharePickButton>
      )}
      <Flex justify="space-between" width="100%">
        <Flex gap="0.8rem">
          <div
            className="minder-profile"
            onClick={() => {
              navigate(`/profile/${item.counselorId}`);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              cursor: 'pointer',
            }}
          >
            <Characters
              number={consultStyleToCharNum(item.consultStyle) ?? 1}
              width="3.2rem"
              height="3.3rem"
            />
            <Body1>{item.nickName}</Body1>
          </div>
          <Circle />
          <Caption2>{item.updatedAt}</Caption2>
        </Flex>
        <MoreButton onClick={handleMoreButtonClick} />
      </Flex>
      <Body3 color={Grey1}>{formattedMessage(item.content)}</Body3>
      <Flex justify="flex-end" width="100%">
        <LikeButton onClick={handleClickLikeButton}>
          {isLike ? <HeartIcon /> : <HeartEmptyIcon />}
          <Button2 color={Grey2}>
            {isFirstRendering
              ? item.totalLike
              : isLike
              ? item.totalLike + 1
              : item.totalLike}
          </Button2>
        </LikeButton>
      </Flex>
      {isMyPost && !item.isChosen && !isEndConsult && (
        <SelectButton
          onClick={() => {
            setPickedCommentId(item.commentId);
            setIsPickPopup(true);
          }}
        >
          <GreenCheckIcon />
          <Caption1 color={Grey2}>이 답변 채택하기</Caption1>
        </SelectButton>
      )}
    </CommentCardWrapper>
  );
}

//
//
//

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
`;

const SharePickButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  width: 100%;
  height: 3.6rem;
  align-items: center;
  background: ${Red};
  gap: 0.4rem;
`;

const SelectButton = styled.button`
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 3.6rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  border-radius: 0.8rem;
  border: 1px solid ${Green};
  background-color: ${LightGreen};
`;

const MoreButton = styled(SettingIcon)`
  cursor: pointer;
  padding: 0 0.4rem;
`;

const LikeButton = styled.div`
  display: flex;
  border-radius: 0.8rem;
  background-color: white;
  padding: 0.8rem 1.2rem;
  align-items: center;
  gap: 0.4rem;
`;

const Circle = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 100%;
  background-color: ${Grey3};
`;
export default CommentCard;
