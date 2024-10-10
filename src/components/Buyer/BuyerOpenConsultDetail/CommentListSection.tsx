import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Space } from 'components/Common/Space';
import { getCustomerIsWriter, getCustomersComments } from 'api/get';
import { useNavigate, useParams } from 'react-router-dom';
import { commentApiObject } from 'components/Seller/SellerOpenConsult/CommentListSection';
import { BackDrop } from 'components/Common/BackDrop';
import IsPickPopup from './IsPickPopup';
import CommentCard from './CommentCard';
import { Green, LightGreen, White } from 'styles/color';
import { Flex } from 'components/Common/Flex';
import { Caption1 } from 'styles/font';
import { useShowComplainttModal } from 'hooks/useShowComplaintModal';
import { ComplaintModal } from 'components/Seller/Common/ComplaintModal';

//
//
//

function CommentListSection() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [commentCard, setCommendCard] = useState<commentApiObject[]>([]);
  // 내 게시물인지 아닌지
  const [isMyPost, setIsMyPost] = useState<boolean>(false);
  // 팝업 창 열지 말지
  const [isPickPopup, setIsPickPopup] = useState<boolean>(false);
  // 상담이 종료되었는지 여부 (채택된 댓글이 있는가)
  const [isEndConsult, setIsEndConsult] = useState<boolean | undefined>();
  // 선택한 댓글 아이디 (좋아요, 채택)
  const [pickedCommentId, setPickedCommentId] = useState<string>('');

  const { isComplaintModalOpen, handleBackDropClick, handleMoreButtonClick } =
    useShowComplainttModal();

  const handleComplaintButtonClick = () => {
    window.open(process.env.REACT_APP_REPORT_URL);
  };

  /**
   *
   */
  const renderCommentCards = () => {
    if (commentCard?.length === 0) {
      return (
        <NoCommentBox
          align="center"
          justify="center"
          style={{ padding: '0.7rem 0' }}
        >
          <Caption1 color={Green}>
            아직 마인더의 답변이 달리지 않았어요
          </Caption1>
        </NoCommentBox>
      );
    }

    return commentCard?.map((item) => (
      <CommentCard
        key={item.commentId}
        item={item}
        isMyPost={isMyPost}
        isEndConsult={isEndConsult}
        setIsPickPopup={setIsPickPopup}
        setPickedCommentId={setPickedCommentId}
        handleMoreButtonClick={handleMoreButtonClick}
      />
    ));
  };

  //
  //
  //
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res: any = await getCustomersComments(id);
        if (res.status === 200) {
          setCommendCard(res.data);
          for (let obj of res.data) {
            if (obj.hasOwnProperty('isChosen') && obj.isChosen === true) {
              setIsEndConsult(true);
            }
          }
          const res2: any = await getCustomerIsWriter(id);
          if (res2.status === 200) setIsMyPost(res2.data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isPickPopup]);

  //
  //
  //

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
      {isComplaintModalOpen && (
        <>
          <BackDrop onClick={handleBackDropClick} />
          <ComplaintModal
            handleComplaintButtonClick={handleComplaintButtonClick}
          />
        </>
      )}

      <CommentListSectionWrapper>
        {renderCommentCards()}
        <Space height="3.2rem" />
      </CommentListSectionWrapper>
    </>
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
  background-color: ${White};
`;

const NoCommentBox = styled(Flex)`
  background-color: ${LightGreen};
`;

export default CommentListSection;
