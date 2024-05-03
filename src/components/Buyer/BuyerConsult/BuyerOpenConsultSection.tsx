import { useLayoutEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Grey1, Grey2, Grey3, Grey6 } from 'styles/color';
import { Body1, Body3, Caption1, Heading } from 'styles/font';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { isBuyPopupOpenState } from 'utils/atom';
import { ReactComponent as LockIcon } from 'assets/icons/icon-lock.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { ReactComponent as HeartEmptyIcon } from 'assets/icons/icon-heart4.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/icon-save4.svg';
import { ReactComponent as SaveEmptyIcon } from 'assets/icons/icon-save5.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/icon-comment.svg';
import { Space } from 'components/Common/Space';
import { BackDrop } from 'components/Common/BackDrop';
import IsBuyPopup from './IsBuyPopup';
import { Button } from 'components/Common/Button';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import { openConsultApiObject } from 'pages/Buyer/BuyerConsult';
import { getCustomerOpenConsultList } from 'api/get';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
interface BuyerOpenConsultSectionProps {
  isChecked: boolean;
}
function BuyerOpenConsultSection({ isChecked }: BuyerOpenConsultSectionProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLastElem, setIsLastElem] = useState<boolean>(false);
  const navigate = useNavigate();
  const isBuyPopupOpen = useRecoilValue(isBuyPopupOpenState);

  const preventRef = useRef(true);

  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (entry[0].isIntersecting && !isLastElem && preventRef.current) {
      preventRef.current = false;
      await fetchOpenConsult(cardData[cardData.length - 1]?.postId);
      preventRef.current = true;
    }
  };
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
    onIntersect,
  });
  const [cardData, setCardData] = useState<openConsultApiObject[]>([]);
  const fetchOpenConsult = async (lastId: number) => {
    try {
      const params = {
        filter: isChecked,
        postId: lastId,
      };
      const res: any = await getCustomerOpenConsultList({ params });

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
    fetchOpenConsult(0);
  }, [isChecked]);
  return (
    <>
      {isLoading ? (
        <div
          style={{
            height: 'calc(70vh)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <BuyerOpenConsultCardList>
          {/* 상담카드 부분 */}
          {cardData.length === 0 ? (
            <EmptyWrapper>
              <EmptyIcon />
              <Heading>아직 진행한 상담이 없어요</Heading>
            </EmptyWrapper>
          ) : (
            cardData?.map((item) => {
              if (item.title === null) {
                return (
                  <BuyerPendingOpenConsultCard key={item.postId}>
                    <Body1>
                      {item.isCompleted === null
                        ? '상담 글을 작성해주세요!'
                        : '임시저장된 글입니다.'}
                    </Body1>
                    <Body3>
                      {item.isCompleted === null
                        ? '결제 후 작성전'
                        : '이어서 작성하기'}
                    </Body3>
                    <Button
                      text={
                        item.isCompleted === null
                          ? '상담 글 작성하기'
                          : '이어서 작성하기'
                      }
                      width="100%"
                      height="4rem"
                      onClick={() => {
                        navigate(`/writeOpenConsult/${item.postId}`);
                      }}
                    ></Button>
                  </BuyerPendingOpenConsultCard>
                );
              } else {
                return (
                  <BuyerOpenConsultCard
                    key={item.postId}
                    onClick={() => {
                      navigate(`/open-consult/${item.postId}?isMine=true`);
                    }}
                  >
                    <div className="row1">
                      <Body1>{item?.title}</Body1>
                      {!item?.isPublic && (
                        <PrivateSign>
                          <LockIcon />
                          <Caption1 color={Grey3}>비공개</Caption1>
                        </PrivateSign>
                      )}
                    </div>
                    <Space height="1.2rem" />
                    <div className="row2">{item?.content}</div>
                    <div className="row3">
                      <IconItem>
                        {item?.isLiked ? (
                          <HeartResizeIcon />
                        ) : (
                          <HeartEmptyIcon />
                        )}

                        <Caption1 color={Grey2}>{item?.totalLike}</Caption1>
                      </IconItem>
                      <IconItem>
                        {item?.isScrapped ? <SaveIcon /> : <SaveEmptyIcon />}

                        <Caption1 color={Grey2}>{item?.totalScrap}</Caption1>
                      </IconItem>
                      <IconItem>
                        <CommentIcon />
                        <Caption1 color={Grey2}>{item?.totalComment}</Caption1>
                      </IconItem>
                    </div>
                    <TimeLeft>{item?.updatedAt}</TimeLeft>
                  </BuyerOpenConsultCard>
                );
              }
            })
          )}
          {/* 상담카드 부분 */}
          {/* 마지막 요소가 가려지지 않도록 마진 영역을 추가 */}
          <Space height="4rem" />
        </BuyerOpenConsultCardList>
      )}
      {!isLastElem ? (
        <div ref={setTarget} style={{ height: '3.5rem' }} />
      ) : (
        <div style={{ height: '3.5rem' }} />
      )}
      {isBuyPopupOpen && (
        <>
          <BackDrop />
          <IsBuyPopup />
        </>
      )}
      <CreateConsultButtonWrapper>
        <Button
          text="공개상담 신청하기"
          width="100%"
          height="5.2rem"
          onClick={() => {
            navigate('/openConsultRequest');
          }}
        />
      </CreateConsultButtonWrapper>
    </>
  );
}

const BuyerOpenConsultCardList = styled.div`
  display: flex;
  margin: 0 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
`;

const BuyerPendingOpenConsultCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.6rem;
  gap: 0.8rem;
  position: relative;
  background-color: ${Grey6};
  border-radius: 1.2rem;
`;

const BuyerOpenConsultCard = styled.div`
  width: 100%;
  cursor: pointer;
  height: 14rem;
  position: relative;
  background-color: ${Grey6};
  padding: 1.6rem;
  box-sizing: border-box;
  border-radius: 1.2rem;
  .row1 {
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
    display: flex;
    gap: 1.2rem;
  }
`;
const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HeartResizeIcon = styled(HeartIcon)`
  width: 2rem;
  height: 2rem;
`;

const PrivateSign = styled.div`
  display: flex;
  position: absolute;
  top: 1.95rem;
  right: 1.6rem;
`;

const TimeLeft = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${Grey2};
  position: absolute;
  bottom: 1.8rem;
  right: 1.6rem;
`;

const CreateConsultButtonWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  bottom: 1.5rem;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 375px;
  }
`;

const EmptyIcon = styled(Empty)`
  padding: 4.7rem 4.41rem 4.603rem 4.5rem;
`;
const EmptyWrapper = styled.div`
  margin: 10vh auto 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default BuyerOpenConsultSection;
