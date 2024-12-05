import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey3, Grey6, White } from 'styles/color';
import { Button2, Heading } from 'styles/font';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { SortModal } from 'components/Buyer/Common/SortModal';
import { useEffect, useRef, useState } from 'react';
import { sortList } from 'utils/constant';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isSortModalOpenState, scrollLockState } from 'utils/atom';
import { SearchResultData } from 'utils/type';
import { patchCounselorsAllDeprecated } from 'api/patch';
import { ConverSortType } from 'utils/convertSortType';
import { AvailCounselorSearchResults } from 'components/Buyer/BuyerAvailCounselor/AvailCounselorSearchResult';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { BackDrop } from 'components/Common/BackDrop';

//
//
//

export const BuyerAvailCounselor = () => {
  //0 : 최신순 1:인기순 2: 별점순
  const [searchParams, setSearchParams] = useSearchParams();

  // sortType - 0 : 최신순 1:인기순 2: 별점순, 기본값: 0, 최신순
  const initialSortType =
    searchParams.get('sort') === 'rating'
      ? 2
      : searchParams.get('sort') === 'popular'
      ? 1
      : 0;

  const [sortType, setSortType] = useState<number>(initialSortType);

  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] =
    useRecoilState<boolean>(isSortModalOpenState);

  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  const navigate = useNavigate();

  //결과저장
  const [searchData, setSearchData] = useState<SearchResultData[]>([]);

  //무한스크롤 위한 page num
  const [pageNum, setPageNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true); //로딩 state
  const [isLastElem, setIsLastElem] = useState<boolean>(false);

  const preventRef = useRef(true); // 중복 방지 옵션

  /**
   *
   */
  const fectchSearchResults = async (pageIndex: number) => {
    try {
      const body = {
        index: pageIndex,
      };
      const sortTypeString: string = ConverSortType(sortType);
      const res: any = await patchCounselorsAllDeprecated(sortTypeString, body);
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
        alert('유효하지 않은 정렬 방식입니다.');
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
      await fectchSearchResults(pageNum);
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
  useEffect(() => {
    setIsLastElem(false);
    fectchSearchResults(0);
  }, [sortType]);

  //
  //
  //

  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate('/share');
          }}
        />
        <Heading color={Grey1}>들을 준비가 된 마인더들</Heading>
      </HeaderWrapper>
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
      <AvailCounselorSearchResults searchData={searchData} />
      {!isLastElem ? (
        <div ref={setTarget} style={{ height: '4rem' }} />
      ) : (
        <div style={{ height: '4rem' }} />
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

const Wrapper = styled.div`
  .select {
    display: flex;
    height: 4.4rem;
    padding: 0.4rem 2rem;
    align-items: center;
    justify-content: flex-end;
  }
  .select-wrapper {
    display: flex;
    gap: 0.4rem;
    cursor: pointer;
  }
`;

const HeaderWrapper = styled.div`
  height: 5.2rem;
  background-color: ${White};
  position: relative;
  border-bottom: 1px solid ${Grey6};
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const BackIcon = styled(Back)`
  position: absolute;
  top: 1.2rem;
  left: 2rem;
  cursor: pointer;
`;
