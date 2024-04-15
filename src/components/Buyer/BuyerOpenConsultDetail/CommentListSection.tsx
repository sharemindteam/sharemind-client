import { lightGreen } from '@mui/material/colors';
import { light } from '@mui/material/styles/createPalette';
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
  Red,
  White,
} from 'styles/color';
import { Body1, Body3, Body4, Caption1, Caption2 } from 'styles/font';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart1.svg';
import { ReactComponent as HeartEmptyIcon } from 'assets/icons/icon-heart3.svg';
import { ReactComponent as SettingIcon } from 'assets/icons/icon-option.svg';
import { ReactComponent as GreenCheckIcon } from 'assets/icons/icon-green-check.svg';
import { Characters } from 'utils/Characters';
import { Space } from 'components/Common/Space';
import {
  getCounselorsComments,
  getCustomerIsWriter,
  getCustomersComments,
} from 'api/get';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-check2.svg';
import { commentApiObject } from 'components/Seller/SellerOpenConsult/CommentListSection';
import { BackDrop } from 'components/Common/BackDrop';
import IsPickPopup from './IsPickPopup';

function CommentListSection() {
  const [commentCard, setCommendCard] = useState<commentApiObject[]>([]);
  const [isMyPost, setIsMyPost] = useState<boolean>(false);
  const [isPickPopup, setIsPickPopup] = useState<boolean>(false);
  const [pickedCommentId, setPickedCommentId] = useState<string | undefined>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res: any = await getCustomersComments(id);
        if (res.status === 200) {
          setCommendCard(res.data);
          const res2: any = await getCustomerIsWriter(id);
          if (res2.status === 200) setIsMyPost(res.data);
          else if (res2?.response.status === 404) {
            alert('존재하지 않는 게시물입니다.');
            navigate('/open-consult');
          }
        } else if (res?.response.status === 400) {
          alert('접근 권한이 없는 게시물입니다.');
          navigate('/open-consult');
        }
      } catch (err) {
        alert(err);
        navigate('/open-consult');
      }
    };
    fetchComment();
  }, [id]);
  return (
    <>
      {isPickPopup && (
        <>
          <BackDrop />
          <IsPickPopup
            isPickPopup={isPickPopup}
            setIsPickPopup={setIsPickPopup}
            pickedCommentId={pickedCommentId}
          />
        </>
      )}

      <CommentListSectionWrapper>
        {/* 댓글 리스트 , 최대 5개까지*/}
        {commentCard?.map((item) => (
          <CommentCard>
            <div className="flex1">
              <Characters number={1} width="3.2rem" height="3.3rem" />
              <Body1>{item.nickName}</Body1>
              <Circle />
              <Caption2>{item.updatedAt}</Caption2>
              <SettingButton />
            </div>
            <Body3 color={Grey1}>{item.content}</Body3>
            <LikeButton>
              <HeartIcon />
              <Caption1 color={Grey2}>{item.totalLike}</Caption1>
            </LikeButton>
            {/* {isMyPost && (
              <SelectButton
                onClick={() => {
                  setPickedCommentId(item.id);
                  setIsPickPopup(true);
                }}
              >
                <GreenCheckIcon />
                <Caption1>이 답변 채택하기</Caption1>
              </SelectButton>
            )} */}

            <SharePickButton>
              <CheckIcon />
              <Caption1 color={White}>셰어 Pick</Caption1>
            </SharePickButton>
          </CommentCard>
        ))}

        <Space height="10rem" />
      </CommentListSectionWrapper>
    </>
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
