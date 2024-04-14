import React, { useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Green, Grey1, Grey2, Grey3, Grey6, Red, White } from 'styles/color';
import { Body1, Caption1, Caption2 } from 'styles/font';
import { ReactComponent as LockIcon } from 'assets/icons/icon-lock.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/icon-heart2.svg';
import { ReactComponent as HeartEmptyIcon } from 'assets/icons/icon-heart3.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/icon-save2.svg';
import { ReactComponent as SaveEmptyIcon } from 'assets/icons/icon-save3.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/icon-comment.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-check2.svg';
import { Space } from 'components/Common/Space';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { SetURLSearchParams, useNavigate } from 'react-router-dom';
import { isConsultModalOpenState, scrollLockState } from 'utils/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BackDrop } from 'components/Common/BackDrop';
import { ConsultModal } from 'components/Buyer/BuyerConsult/ConsultModal';
import { openConsultApiObject } from 'pages/Buyer/BuyerConsult';
import { getCounselorsOpenConsultList } from 'api/get';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

interface SellerConsultOpenProps {
  sortType: number;
  setSortType: React.Dispatch<React.SetStateAction<number>>;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

function SellerOpenConsultList({
  sortType,
  setSortType,
  searchParams,
  setSearchParams,
}: SellerConsultOpenProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLastElem, setIsLastElem] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(
    isConsultModalOpenState,
  );
  const setScrollLock = useSetRecoilState(scrollLockState);
  const [openConsultList, setOpenConsultList] = useState<
    openConsultApiObject[]
  >([]);

  const preventRef = useRef(true);

  const navigate = useNavigate();
  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (entry[0].isIntersecting && !isLastElem && preventRef.current) {
      preventRef.current = false;
      await fetchOpenConsultData(
        openConsultList[openConsultList.length - 1]?.postId,
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
  const fetchOpenConsultData = async (lastId: number) => {
    try {
      const params = {
        filter: searchParams.get('check') === 'false',
        postId: lastId,
      };
      const res: any = await getCounselorsOpenConsultList({ params });
      if (res.status === 200) {
        if (res.data.length !== 0) {
          if (lastId === 0) {
            setOpenConsultList(res.data);
          } else {
            const updatedReviews = [...openConsultList, ...res.data];
            setOpenConsultList(updatedReviews);
          }
        } else {
          setIsLastElem(true);
        }
      } else if (res.response.status === 404) {
        alert('존재하지 않는 회원입니다.');
        navigate('/login');
      }
    } catch (error) {
      alert(error);
    } finally {
      if (lastId === 0) {
        setIsLoading(false);
      }
    }
  };
  useLayoutEffect(() => {
    fetchOpenConsultData(0);
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            height: 'calc(100vh - 46rem)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <SellerOpenConsultCardList>
          <GuideMessage>
            <Caption2 color={Green}>
              내가 댓글을 작성한 글의 목록입니다.
            </Caption2>
          </GuideMessage>
          {openConsultList.map((item) => (
            <SellerOpenConsultCard
              onClick={() => {
                navigate(`/minder/open-consult/${item.postId}?isMine=true`);
              }}
            >
              <div className="row1">
                <Body1>{item.title}</Body1>
                {!item.isPublic && (
                  <PrivateSign>
                    <LockIcon />
                    <Caption1 color={Grey3}>비공개</Caption1>
                  </PrivateSign>
                )}
              </div>
              <Space height="1.2rem" />
              <div className="row2">{item.content}</div>
              <Space height="0.8rem" />
              <div className="row3">
                <Caption2 color={Grey2}>{item.publishedAt}</Caption2>
                <Circle />
                <Caption2 color={Grey2}>{item.consultCategory}</Caption2>
              </div>
              <Space height="1rem" />
              <div className="row4">
                <IconItem>
                  <HeartResizeIcon />
                  <Caption1 color={Grey2}>{item.totalLike}</Caption1>
                </IconItem>
                <IconItem>
                  <SaveIcon />
                  <Caption1 color={Grey2}>{item.totalScrap}</Caption1>
                </IconItem>
                <IconItem>
                  <CommentIcon />
                  <Caption1 color={Grey2}>{item.totalComment}</Caption1>
                </IconItem>
              </div>
              {item.isChosen && (
                <SharePickSign>
                  <CheckIcon />
                  <Caption1 color={White}>셰어 Pick</Caption1>
                </SharePickSign>
              )}
            </SellerOpenConsultCard>
          ))}
        </SellerOpenConsultCardList>
      )}
      {!isLastElem ? (
        <div ref={setTarget} style={{ height: '3.5rem' }} />
      ) : (
        <div style={{ height: '3.5rem' }} />
      )}
      {isModalOpen ? (
        <>
          <BackDrop
            onClick={() => {
              setIsModalOpen(false);
              setScrollLock(false);
            }}
          />
          <ConsultModal
            sortType={sortType}
            setSortType={setSortType}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </>
      ) : null}
    </>
  );
}

const GuideMessage = styled.div`
  width: 100%;
  height: 3.1rem;
  background-color: ${Grey6};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
`;
const SellerOpenConsultCardList = styled.div`
  display: flex;
  margin: 0 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
`;
const SellerOpenConsultCard = styled.div`
  width: 100%;
  cursor: pointer;
  height: 17.5rem;
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
    gap: 0.8rem;
    align-items: center;
  }
  .row4 {
    display: flex;
    gap: 1.2rem;
  }
`;

const PrivateSign = styled.div`
  display: flex;
  position: absolute;
  top: 1.95rem;
  right: 1.6rem;
`;

const SharePickSign = styled.div`
  background-color: ${Red};
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  gap: 0.4rem;
  border-radius: 0.8rem;
  bottom: 1.6rem;
  right: 1.4rem;
`;
const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Circle = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 100%;
  background-color: ${Grey3};
`;

const HeartResizeIcon = styled(HeartIcon)`
  width: 2rem;
  height: 2rem;
`;
export default SellerOpenConsultList;
