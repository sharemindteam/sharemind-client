import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Space } from 'components/Common/Space';
import { getCustomerIsWriter, getCustomersComments } from 'api/get';
import { useNavigate, useParams } from 'react-router-dom';
import { commentApiObject } from 'components/Seller/SellerOpenConsult/CommentListSection';
import { BackDrop } from 'components/Common/BackDrop';
import IsPickPopup from './IsPickPopup';
import CommentCard from './CommentCard';

function CommentListSection() {
  const [commentCard, setCommendCard] = useState<commentApiObject[]>([]);
  const [isMyPost, setIsMyPost] = useState<boolean>(false);
  const [isPickPopup, setIsPickPopup] = useState<boolean>(false);
  const [pickedCommentId, setPickedCommentId] = useState<string>('');
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
  }, [id, isPickPopup]);
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
          <CommentCard
            key={item.commentId}
            item={item}
            isMyPost={isMyPost}
            setIsPickPopup={setIsPickPopup}
            setPickedCommentId={setPickedCommentId}
          />
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

export default CommentListSection;
