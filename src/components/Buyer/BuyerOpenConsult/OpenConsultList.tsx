import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Grey1, Grey2, Grey6 } from 'styles/color';
import { Body1, Caption1 } from 'styles/font';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { ReactComponent as HeartEmptyIcon } from 'assets/icons/icon-heart4.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/icon-save5.svg';
import { ReactComponent as SaveEmptyIcon } from 'assets/icons/icon-save4.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/icon-comment.svg';
import { Space } from 'components/Common/Space';
import { openConsultApiObject } from 'pages/Buyer/BuyerConsult';
import { getCustomerPublicConsultList } from 'api/get';
import { useNavigate } from 'react-router-dom';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { LoadingSpinner } from 'utils/LoadingSpinner';

function OpenConsultList() {
  const [cardData, setCardData] = useState<openConsultApiObject[]>([]);
  const preventRef = useRef(true);
  const navigate = useNavigate();
  const [isLastElem, setIsLastElem] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (entry[0].isIntersecting && !isLastElem && preventRef.current) {
      preventRef.current = false;
      await fetchOpenConsult(
        cardData[cardData.length - 1]?.postId,
        cardData[cardData.length - 1]?.finishedAt,
      );
      preventRef.current = true;
    }
  };
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
    onIntersect,
  });
  const fetchOpenConsult = async (lastId: number, lastDate: string) => {
    try {
      const params = {
        postId: lastId,
        finishedAt: lastDate,
      };
      const res: any = await getCustomerPublicConsultList({ params });

      if (res.status === 200) {
        if (res.data.length !== 0) {
          if (lastId === 0) {
            setCardData(res.data);
          } else {
            const updatedReviews = [...cardData, ...res.data];
            setCardData(updatedReviews);
          }
        } else {
          setIsLastElem(true);
        }
      } else if (res.response.status === 404) {
        alert('존재하지 않는 회원입니다.');
        navigate('/login');
      }
    } catch (err) {
      alert(err);
    } finally {
      if (lastId === 0) {
        setIsLoading(false);
      }
    }
  };
  useLayoutEffect(() => {
    fetchOpenConsult(0, new Date().toISOString().slice(0, 19));
  }, []);
  if (isLoading) {
    return (
      <div
        style={{
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  } else {
    return (
      <div>
        <BuyerOpenConsultCardList>
          {/* 상담카드 부분 */}
          {cardData.map((item) => (
            <BuyerOpenConsultCard
              onClick={() => {
                navigate(`/open-consult/${item.postId}`);
              }}
              key={item.postId}
            >
              <div className="row1">
                <Body1>{item.title}</Body1>
              </div>
              <Space height="0.8rem" />
              <div className="row2">{item.content}</div>
              <div className="row3">
                <IconItem>
                  {item.isLiked ? <HeartIcon /> : <HeartEmptyIcon />}
                  <Caption1 color={Grey2}>{item.totalLike}</Caption1>
                </IconItem>

                <IconItem>
                  {item.isScrapped ? <SaveResizeIcon /> : <SaveEmptyIcon />}
                  <Caption1 color={Grey2}>{item.totalScrap}</Caption1>
                </IconItem>
                <IconItem>
                  <CommentIcon />
                  <Caption1 color={Grey2}>{item.totalComment}</Caption1>
                </IconItem>
              </div>
              <TimeLeft>{item.updatedAt}</TimeLeft>
            </BuyerOpenConsultCard>
          ))}
          {!isLastElem ? (
            <div ref={setTarget} style={{ height: '3.5rem' }} />
          ) : (
            <div style={{ height: '3.5rem' }} />
          )}
          {/* 상담카드 부분 */}
        </BuyerOpenConsultCardList>
      </div>
    );
  }
}
const BuyerOpenConsultCardList = styled.div`
  display: flex;
  margin: 0 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
`;

const BuyerOpenConsultCard = styled.div`
  width: 100%;
  height: 14rem;
  cursor: pointer;
  position: relative;
  background-color: ${Grey6};
  padding: 1.6rem;
  box-sizing: border-box;
  border-radius: 1.2rem;
  .row1 {
    width: calc(100% - 5rem);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    max-height: 5rem;
    overflow: hidden;
  }
  .row2 {
    display: -webkit-box;
    max-height: 4.7rem;
    -webkit-box-orient: vertical;
    overflow: hidden;
    align-self: flex-end;
    margin-bottom: 0.4rem;
    -webkit-line-clamp: 2;
    color: ${Grey1};
    height: 4.6rem;
    text-overflow: ellipsis;
    font-family: Pretendard;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 155%;
  }
  .row3 {
    position: absolute;
    bottom: 1.6rem;
    display: flex;
    gap: 1.2rem;
  }
`;
const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SaveResizeIcon = styled(SaveIcon)`
  width: 2rem;
  height: 2rem;
`;

const TimeLeft = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${Grey2};
  position: absolute;
  bottom: 1.8rem;
  right: 1.6rem;
`;

export default OpenConsultList;
