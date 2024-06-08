import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grey1, Grey2, Grey3, Grey6, White } from 'styles/color';

import { ReactComponent as LockIcon } from 'assets/icons/icon-lock.svg';
import { ReactComponent as HeartIcon } from 'assets/open-consult/open-consult-heart-button.svg';
import { ReactComponent as SaveIcon } from 'assets/open-consult/open-consult-scrap-button.svg';
import { ReactComponent as HeartEmptyIcon } from 'assets/open-consult/open-consult-heart-empty-button.svg';
import { ReactComponent as SaveEmptyIcon } from 'assets/open-consult/open-consult-scrap-empty-button.svg';

import { Body1, Caption1, Caption2 } from 'styles/font';
import { Space } from 'components/Common/Space';
import { openConsultApiObject } from 'pages/Buyer/BuyerConsult';
import { getOneOpenConsult } from 'api/get';
import { useNavigate, useParams } from 'react-router-dom';
import { postLikeOpenConsult, postScrapOpenConsult } from 'api/post';
import { deletePostLikes, deletePostScraps } from 'api/delete';
import { formattedMessage } from 'utils/formattedMessage';

//
//
//

function MainQuestionSection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isSave, setIsSave] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [card, setCard] = useState<openConsultApiObject>();

  // 보내기 중복 방지
  const [isSending, setIsSending] = useState<boolean>(false);

  /**
   *
   */
  const handleClickLikeButton = useCallback(async () => {
    if (isSending) {
      return;
    } else {
      if (isLike) {
        setIsSending(true);
        const res: any = await deletePostLikes(id);
        if (res.response?.status === 400) {
          alert('이미 좋아요를 취소한 게시물입니다.');
        } else if (res.response?.status === 404) {
          alert('존재하지 않은 게시물입니다.');
          navigate('/open-consult');
        }
        setIsLike(false);
        setIsSending(false);
      } else {
        setIsSending(true);
        const res: any = await postLikeOpenConsult(id);
        if (res.response?.status === 400) {
          alert('이미 좋아요를 누른 게시물입니다.');
        } else if (res.response?.status === 404) {
          alert('존재하지 않은 게시물입니다.');
          navigate('/open-consult');
        }
        setIsLike(true);
        setIsSending(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isLike, isSending]);

  /**
   *
   */
  const handleClickScrapButton = useCallback(async () => {
    if (isSending) {
      return;
    } else {
      if (isSave) {
        setIsSending(true);
        const res: any = await deletePostScraps(id);
        if (res.response?.status === 400) {
          alert('이미 저장 취소한 게시물입니다.');
        } else if (res.response?.status === 404) {
          alert('존재하지 않은 게시물입니다.');
          navigate('/open-consult');
        }
        setIsSave(false);
        setIsSending(false);
      } else {
        setIsSending(true);
        const res: any = await postScrapOpenConsult(id);
        if (res.response?.status === 400) {
          alert('이미 저장한 게시물입니다.');
        } else if (res.response?.status === 404) {
          alert('존재하지 않은 게시물입니다.');
          navigate('/open-consult');
        }
        setIsSave(true);
        setIsSending(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isSave, isSending]);

  //
  //
  //
  useEffect(() => {
    const fetchOneConsult = async () => {
      try {
        const res: any = await getOneOpenConsult(id);
        if (res.status === 200) {
          setCard(res.data);
          setIsLike(res.data.isLiked);
          setIsSave(res.data.isScrapped);
        }
      } catch (err) {
        alert(err);
      }
    };
    fetchOneConsult();
  }, [isLike, isSave, id]);

  //
  //
  //

  return (
    <MainQuestionWrapper>
      <MainQuestionText>
        <div className="row1">
          <Body1>{card?.title}</Body1>
          {!card?.isPublic && (
            <PrivateSign>
              <LockIcon />
              <Caption1 color={Grey3}>비공개</Caption1>
            </PrivateSign>
          )}
        </div>
        <Space height="1.2rem" />
        <div className="row2">{formattedMessage(card?.content)}</div>
        <Space height="0.8rem" />
        <div className="row3">
          <Caption2 color={Grey2}>{card?.updatedAt}</Caption2>
          <Circle />
          <Caption2 color={Grey2}>{card?.consultCategory}</Caption2>
        </div>
        <Space height="1rem" />
      </MainQuestionText>
      <ButtonList>
        <ButtonItem>
          {isLike ? (
            <HeartIcon onClick={handleClickLikeButton} />
          ) : (
            <HeartEmptyIcon onClick={handleClickLikeButton} />
          )}

          <Caption1 color={Grey2}>{card?.totalLike}</Caption1>
        </ButtonItem>
        <ButtonItem>
          {isSave ? (
            <SaveIcon onClick={handleClickScrapButton} />
          ) : (
            <SaveEmptyIcon onClick={handleClickScrapButton} />
          )}

          <Caption1 color={Grey2}>{card?.totalScrap}</Caption1>
        </ButtonItem>
      </ButtonList>
    </MainQuestionWrapper>
  );
}

export default MainQuestionSection;

//
//
//

const MainQuestionWrapper = styled.section`
  display: flex;
  padding: 1.2rem 2rem;
  flex-direction: column;
  gap: 1.2rem;
  border-bottom: 1px solid ${Grey6};
`;

const MainQuestionText = styled.div`
  width: 100%;
  position: relative;
  background-color: ${White};
  padding: 1.6rem;
  box-sizing: border-box;
  border-radius: 1.2rem;
  .row2 {
    align-self: flex-end;
    margin-bottom: 0.4rem;
    color: ${Grey1};
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 155%;
  }
  .row3 {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }
`;
const PrivateSign = styled.div`
  display: flex;
  position: absolute;
  top: 1.95rem;
  right: 1.6rem;
`;
const Circle = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 100%;
  background-color: ${Grey3};
`;

const ButtonList = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const ButtonItem = styled.div`
  border-radius: 0.8rem;
  background: ${White};
  display: flex;
  padding: 0.6rem 1.2rem 0.6rem 0.6rem;
  align-items: center;
  gap: 0.4rem;
`;
