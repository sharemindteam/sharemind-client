import { postWishLists } from 'api/post';
import { SavedCounselorResults } from 'components/Buyer/BuyerSavedCounselor.tsx/SavedCounselorResults';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Space } from 'components/Common/Space';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Grey1 } from 'styles/color';
import { Heading } from 'styles/font';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { isLoadingState } from 'utils/atom';
import { WishlistDataType } from 'utils/type';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import styled from 'styled-components';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
// TODO: 찜한 마인더 없을 시 페이지 추후 백 연동 시 구현
export const BuyerSavedCounselor = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const [wishlistData, setWishlistData] = useState<WishlistDataType[]>([]);
  const [isLastElem, setIsLastElem] = useState<boolean>(false);

  const onIntersect: IntersectionObserverCallback = async (entry, observer) => {
    //&& !isLoading
    if (entry[0].isIntersecting) {
      observer.unobserve(entry[0].target);
      await fetchWishlistData(wishlistData[wishlistData.length - 1].wishlistId);
      console.log('관측');
      observer.observe(entry[0].target);
    }
  };
  //현재 대상 및 option을 props로 전달
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 1,
    onIntersect,
  });
  const fetchWishlistData = async (lastId: number) => {
    if (lastId === 0) {
      setIsLoading(true);
    }
    // 찜하기 목록을 받아오는 api마지막 찜하기의 wishlistId와 updatedAt 바디로 넘겨주시면 됩니다~4개씩 리턴합니다.처음 요청의 경우 wishlistId 0으로 쏴주세요해당 wishlsit가 없을 경우 빈배열로 리턴합니다.
    const body = {
      wishlistId: lastId,
      updatedAt: updatedAt,
    };
    const res: any = await postWishLists(body);
    if (res.status === 200) {
      if (res.data.length !== 0) {
        if (lastId === 0) {
          setWishlistData(res.data);
          setUpdatedAt(res.data[res.data.length - 1].updatedAt);
        } else {
          const updatedReviews = [...wishlistData, ...res.data];
          setUpdatedAt(res.data[res.data.length - 1].updatedAt);
          setWishlistData(updatedReviews);
        }
      } else {
        setIsLastElem(true);
      }
    } else if (res.response.status !== 401) {
      navigate('/mypage');
    }
    if (lastId === 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1);
    }
  };
  useLayoutEffect(() => {
    fetchWishlistData(0);
  }, []);
  if (isLoading) {
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
        <Space height="30vh" />
        <LoadingSpinner />
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
          <SavedCounselorResults wishlistData={wishlistData} />
          {!isLastElem ? (
            <div ref={setTarget} style={{ height: '3.5rem' }} />
          ) : (
            <div style={{ height: '3.5rem' }} />
          )}
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
