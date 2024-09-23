import { SortModal } from 'components/Buyer/Common/SortModal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { Button2 } from 'styles/font';
import { Grey3 } from 'styles/color';
import { useLayoutEffect, useRef, useState } from 'react';
import { sortList } from 'utils/constant';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isSortModalOpenState, scrollLockState } from 'utils/atom';
import { ConverSortType } from 'utils/convertSortType';
import { SearchResultData } from 'utils/type';
import { CategorySearchResults } from 'components/Buyer/BuyerCategoryResult/CategorySearchResult';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { APP_WIDTH } from 'styles/AppStyle';
import SearchTextHeader from 'components/Buyer/BuyerManyLovedCounselor/SearchTextHeader';
import { getRandomCounselors } from 'api/get';

//
//
//

export const BuyerManyLovedCounselor = () => {
  const navigate = useNavigate();

  // using query params to store sorting type
  const [searchParams, setSearchParams] = useSearchParams();

  // sortType - 0 : 최신순 1:인기순 2: 별점순, 기본값: 0, 최신순
  const initialSortType =
    searchParams.get('sort') === 'rating'
      ? 2
      : searchParams.get('sort') === 'popular'
      ? 1
      : 0;
  const [sortType, setSortType] = useState<number>(initialSortType);

  // state with opening Modal, lock scroll
  const [isModalOpen, setIsModalOpen] =
    useRecoilState<boolean>(isSortModalOpenState);
  const setScrollLock = useSetRecoilState(scrollLockState);

  // state with store keyword and serach result
  const [searchData, setSearchData] = useState<SearchResultData[]>([]);

  //page num for infinite scrol
  const [pageNum, setPageNum] = useState<number>(0);
  const [isLastElem, setIsLastElem] = useState<boolean>(false);

  // loding spinner
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const preventRef = useRef(true);

  /**
   *
   */
  const fetchSearchResults = async (pageIndex: number) => {
    try {
      const sortTypeString: string = ConverSortType(sortType);
      const params = {
        index: pageIndex,
        sortType: sortTypeString,
      };
      const res: any = await getRandomCounselors(params);
      if (res.status === 200) {
        if (res.data.length !== 0) {
          if (pageIndex === 0) {
            setSearchData(res.data);
            setPageNum(pageNum + 1);
          } else {
            const updatedSearchs = [...searchData, ...res.data];
            setSearchData(updatedSearchs);
            setPageNum(pageNum + 1);
          }
        } else {
          setIsLastElem(true);
        }
      } else if (res.response.status === 404) {
        alert('카테고리 유형이 유효하지 않습니다.');
        navigate('/share');
      }
    } catch (e) {
      alert(e);
    } finally {
      if (pageIndex === 0) {
        setIsLoading(false);
      }
    }
  };

  /**
   *
   */
  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (
      entry[0].isIntersecting &&
      !isLoading &&
      !isLastElem &&
      preventRef.current
    ) {
      preventRef.current = false;
      await fetchSearchResults(pageNum);
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

  //
  //
  //
  useLayoutEffect(() => {
    setIsLastElem(false);
    setSearchData([]);
    fetchSearchResults(0);
  }, [sortType]);

  //
  //
  //

  return (
    <Wrapper>
      <SearchTextHeader
        title="많은 셰어에게 사랑을 받았어요"
        onBackClick={() => {
          navigate('/');
        }}
      />
      <div className="select">
        <div
          className="select-wrapper"
          onClick={() => {
            setIsModalOpen(true);
            setScrollLock(true);
          }}
        >
          <Button2 color={Grey3}>{sortList[sortType]}</Button2>
          <Down />
        </div>
      </div>
      <CategorySearchResults searchData={searchData} />
      {!isLastElem ? (
        <div ref={setTarget} style={{ height: '5rem' }} />
      ) : (
        <div style={{ height: '5rem' }} />
      )}
      {isModalOpen ? (
        <>
          <BackDrop
            onClick={() => {
              setIsModalOpen(false);
              setScrollLock(false);
            }}
          />
          <SortModal
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            sortType={sortType}
            setSortType={setSortType}
            setPageNum={setPageNum}
          />
        </>
      ) : null}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  .select {
    display: flex;
    height: 4.4rem;
    padding: 0.4rem 2rem;
    align-items: center;
    gap: 0.4rem;
    justify-content: flex-end;
  }
  .select-wrapper {
    display: flex;
    gap: 0.4rem;
    cursor: pointer;
  }
`;

const BackDrop = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: ${APP_WIDTH};
  }

  position: fixed;
  top: 0;
  z-index: 2001;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;
