import { postWishLists } from 'api/post';
import { SavedCounselorResults } from 'components/Buyer/BuyerSavedCounselor.tsx/SavedCounselorResults';
import { BackIcon, HeaderWrapper } from 'components/Buyer/Common/Header';
import { Space } from 'components/Common/Space';
import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grey1 } from 'styles/color';
import { Body2, Heading } from 'styles/font';
import { WishlistDataType } from 'utils/type';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import styled from 'styled-components';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import Divider2 from 'components/Common/Divider2';
import { openConsultApiObject } from './BuyerConsult';
import { getPostScraps } from 'api/get';
import SavedOpenConsultResults from 'components/Buyer/BuyerSavedCounselor.tsx/SavedOpenConsultResults';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { Flex } from 'components/Common/Flex';

//
//
//

export const BuyerSavedCounselor = () => {
  const navigate = useNavigate();

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [wishlistData, setWishlistData] = useState<WishlistDataType[]>([]);
  const [openConsultData, setOpenConsultData] = useState<
    openConsultApiObject[]
  >([]);

  const [isLastElem, setIsLastElem] = useState<boolean>(false);
  const [tabState, setTabState] = useState<number>(1);

  const preventRef = useRef(true);

  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (
      entry[0].isIntersecting &&
      !isLastElem &&
      !isInitialLoading &&
      preventRef.current
    ) {
      preventRef.current = false;
      if (tabState === 1) {
        await fetchWishlistData(
          wishlistData[wishlistData.length - 1].wishlistId,
          wishlistData[wishlistData.length - 1].updatedAt,
        );
      } else if (tabState === 2) {
        await fetchOpenConsultData(
          openConsultData[openConsultData.length - 1].postScrapId,
          openConsultData[openConsultData.length - 1].scrappedAt,
        );
      }

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

  /**
   *
   */
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
            setIsInitialLoading(true);
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

  /**
   *
   */
  const fetchOpenConsultData = async (lastId: number, lastUpdateAt: string) => {
    try {
      const params = {
        postScrapId: lastId,
        scrappedAt: lastUpdateAt,
      };
      const res: any = await getPostScraps({ params });
      if (res.status === 200) {
        if (res.data.length !== 0) {
          if (lastId === 0) {
            setIsInitialLoading(true);
            setOpenConsultData(res.data);
          } else {
            const updatedOpenConsultList = [...openConsultData, ...res.data];
            setOpenConsultData(updatedOpenConsultList);
          }
        } else {
          setIsLastElem(true);
        }
      } else if (res.response.status !== 401) {
        // navigate('/mypage');
      }
    } catch (err) {
      alert(err);
    } finally {
      if (lastId === 0) {
        setIsInitialLoading(false);
      }
    }
  };

  //
  //
  //
  useLayoutEffect(() => {
    setIsInitialLoading(true);
    if (tabState === 1) {
      fetchWishlistData(0, '');
    } else if (tabState === 2) {
      fetchOpenConsultData(0, new Date().toISOString().slice(0, 19));
    }
  }, [tabState]);

  //
  //
  //

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
        <Divider2 tabState={tabState} setTabState={setTabState} />
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
      </>
    );
  }

  if (tabState === 1) {
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
          <Divider2 tabState={tabState} setTabState={setTabState} />
          <Space height="1.2rem" />
          <div
            className="save-counselor-list"
            style={{ height: 'calc(100vh - 11rem)', overflow: 'scroll' }}
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
          <Divider2 tabState={tabState} setTabState={setTabState} />
          <EmptyWrapper>
            <EmptyIcon />
            <Heading>아직 찜한 마인더가 없어요.</Heading>
            <Space height="1.5rem" />
            <Body2>
              관심 있는 마인더를 찜하고 <br /> 더욱 편리하게 상담하세요.
            </Body2>
          </EmptyWrapper>
        </>
      );
    }
  } else if (tabState === 2) {
    if (openConsultData.length !== 0) {
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
          <Divider2 tabState={tabState} setTabState={setTabState} />
          <Space height="1.2rem" />
          <Flex direction="column" style={{ padding: '0 2rem' }}>
            <SavedOpenConsultResults openConsultList={openConsultData} />
            {!isLastElem ? (
              <div ref={setTarget} style={{ height: '3.5rem' }} />
            ) : (
              <div style={{ height: '3.5rem' }} />
            )}
          </Flex>
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
          <Divider2 tabState={tabState} setTabState={setTabState} />
          <EmptyWrapper>
            <EmptyIcon />
            <Heading>아직 저장한 공개상담이 없어요.</Heading>
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
