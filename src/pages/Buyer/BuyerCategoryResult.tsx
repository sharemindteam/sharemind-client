import { CategoryResultHeader } from 'components/Buyer/BuyerCategoryResult/CategoryResultHeader';
import { SortModal } from 'components/Buyer/Common/SortModal';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { Button2 } from 'styles/font';
import { Grey3 } from 'styles/color';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { sortList } from 'utils/constant';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  isSortModalOpenState,
  scrollLockState,
  searchKeywordState,
} from 'utils/atom';
import { ConverSortType } from 'utils/convertSortType';
import { patchCounselorsAll } from 'api/patch';
import { SearchResultData } from 'utils/type';

import { CategorySearchResults } from 'components/Buyer/BuyerCategoryResult/CategorySearchResult';
import { convertCategoryEnum } from 'utils/convertCategoryEnum';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { LoadingSpinner } from 'utils/LoadingSpinner';
//백 연동 시 page에서 상담사 리스트 받아서 뿌려줘야함
export const BuyerCategoryResult = () => {
  const navigate = useNavigate();
  //0 : 최신순 1:인기순 2: 별점순
  // 바뀔 때마다 useEffect로 request
  const [sortType, setSortType] = useState<number>(0);
  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] =
    useRecoilState<boolean>(isSortModalOpenState);
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  //const 카테고리 정보, 검색과 동일하게 searchKeyword로 넘겨줌
  const searchKeyword = useRecoilValue(searchKeywordState);
  //결과저장
  const [searchData, setSearchData] = useState<SearchResultData[]>([]);
  //무한스크롤 위한 page num
  const [pageNum, setPageNum] = useState<number>(0);
  const [isLastElem, setIsLastElem] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); //로딩 state
  const preventRef = useRef(true); // 중복 방지 옵션
  //fetch 함수
  const fetchSearchResults = async (pageIndex: number) => {
    try {
      const body = {
        consultCategory: convertCategoryEnum(searchKeyword),
        index: pageIndex,
      };
      const sortTypeString: string = ConverSortType(sortType);
      const res: any = await patchCounselorsAll(sortTypeString, body);
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

  useLayoutEffect(() => {
    setIsLastElem(false);
    setSearchData([]);
    fetchSearchResults(0);
  }, [sortType]);
  if (isLoading) {
    return (
      <>
        <CategoryResultHeader categoryType={searchKeyword} />
      </>
    );
  } else {
    return (
      <Wrapper>
        <CategoryResultHeader categoryType={searchKeyword} />
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
              sortType={sortType}
              setSortType={setSortType}
              setPageNum={setPageNum}
            />
          </>
        ) : null}
      </Wrapper>
    );
  }
};
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
  @media (max-width: 767px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    width: 37.5rem;
  }
  position: fixed;
  top: 0;
  z-index: 2001;
  height: calc(var(--vh, 1vh) * 100);
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;
