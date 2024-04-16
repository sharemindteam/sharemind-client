import { postWishLists } from 'api/post';
import { SavedCounselorResults } from 'components/Buyer/BuyerSavedCounselor.tsx/SavedCounselorResults';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Space } from 'components/Common/Space';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';
import { WishlistDataType } from 'utils/type';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import styled from 'styled-components';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
// TODO: 찜한 마인더 없을 시 페이지 추후 백 연동 시 구현
export const BuyerSavedCounselor = () => {
  const navigate = useNavigate();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [wishlistData, setWishlistData] = useState<WishlistDataType[]>([]);
  const [isLastElem, setIsLastElem] = useState<boolean>(false);

  const preventRef = useRef(true);

  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (
      entry[0].isIntersecting &&
      !isLastElem &&
      !isInitialLoading &&
      preventRef.current
    ) {
      preventRef.current = false;
      await fetchWishlistData(
        wishlistData[wishlistData.length - 1].wishlistId,
        wishlistData[wishlistData.length - 1].updatedAt,
      );
      preventRef.current = true;
    }
  };
  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
    onIntersect,
  });
  const fetchWishlistData = async (lastId: number, lastUpdateAt: string) => {
    const body = {
      wishlistId: lastId,
      updatedAt: lastUpdateAt,
    };

    try {
      const res: any = await postWishLists(body);
      if (res.status === 200) {
        if (res.data.length !== 0) {
          if (lastId === 0) {
            setWishlistData(res.data);
          } else {
            const updatedReviews = [...wishlistData, ...res.data];
            setWishlistData(updatedReviews);
          }
        } else {
          setIsLastElem(true);
        }
      } else if (res.response.status !== 401) {
        navigate('/mypage');
      }
    } catch (e) {
      alert(e);
    } finally {
      if (lastId === 0) {
        setIsInitialLoading(false);
      }
    }
  };
  useLayoutEffect(() => {
    fetchWishlistData(0, '');
  }, []);
  if (isInitialLoading) {
    return (
      <>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/mypage');
            }}
          />
          <Heading color={Grey1}>찜 목록</Heading>
        </HeaderWrapper>
      </>
    );
  } else {
    if (wishlistData.length !== 0) {
      return (
        <>
          <HeaderWrapper>
            <BackIcon
              onClick={() => {
                navigate('/mypage');
              }}
            />
            <Heading color={Grey1}>찜 목록</Heading>
          </HeaderWrapper>
          <Space height="1.2rem" />
          <div
            className="save-counselor-list"
            style={{ height: 'calc(100vh - 6.5rem)', overflow: 'scroll' }}
          >
            <SavedCounselorResults wishlistData={wishlistData} />
            {!isLastElem ? (
              <div ref={setTarget} style={{ height: '3.5rem' }} />
            ) : (
              <div style={{ height: '3.5rem' }} />
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <HeaderWrapper>
            <BackIcon
              onClick={() => {
                navigate('/mypage');
              }}
            />
            <Heading color={Grey1}>찜 목록</Heading>
          </HeaderWrapper>
          <EmptyWrapper>
            <EmptyIcon />
            <Heading>아직 후기가 없어요.</Heading>
          </EmptyWrapper>
        </>
      );
    }
  }
};
const EmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const EmptyIcon = styled(Empty)`
  margin-top: 20vh;
  padding: 4.7rem 4.413rem 4.603rem 4.5rem;
`;
