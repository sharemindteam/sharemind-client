import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey3, Grey4, White } from 'styles/color';
import { Body2, Button2, Heading } from 'styles/font';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { SearchResults } from 'components/Buyer/BuyerSearchResult/SearchResults';
import { SortModal } from 'components/Buyer/Common/SortModal';
import { ChangeEvent, useLayoutEffect, useRef, useState } from 'react';
import { sortList } from 'utils/constant';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  isLoadingState,
  isSortModalOpenState,
  scrollLockState,
  searchKeywordState,
} from 'utils/atom';
import Input from 'components/Common/Input';
import { patchSearchWordsResults } from 'api/patch';
import { SearchResultData } from 'utils/type';
import { ConverSortType } from 'utils/convertSortType';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
export const BuyerSearchResult = () => {
  const navigate = useNavigate();
  //0 : 최신순 1:인기순 2: 별점순
  // 바뀔 때마다 useEffect로 request
  const [sortType, setSortType] = useState<number>(0);
  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] =
    useRecoilState<boolean>(isSortModalOpenState);
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  //검색된 value
  const [keyword, setKeyword] = useRecoilState(searchKeywordState);
  //input value
  const initInput = keyword;
  const [input, setInput] = useState(initInput);
  //결과저장
  const [searchData, setSearchData] = useState<SearchResultData[]>([]);
  //무한스크롤 위한 page num
  const [pageNum, setPageNum] = useState<number>(0);
  const [isLastElem, setIsLastElem] = useState<boolean>(false);
  const preventRef = useRef(true); // 중복 방지 옵션
  const onIntersect: IntersectionObserverCallback = async (entry, observer) => {
    if (
      entry[0].isIntersecting &&
      !isLoading &&
      !isLastElem &&
      preventRef.current
    ) {
      preventRef.current = false;
      await fetchSearchResults(keyword, pageNum);
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
  //input onchagne
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleSubmit: any = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPageNum(0);
    setSearchData([]);
    setKeyword(input);
  };

  //로딩 state
  const [isLoading, setIsLoading] = useRecoilState<boolean>(isLoadingState);
  const fetchSearchResults = async (searchWord: string, pageIndex: number) => {
    if (pageIndex === 0) {
      setIsLoading(true);
    }
    try {
      const body = {
        word: searchWord,
        index: pageIndex,
      };
      const sortTypeString: string = ConverSortType(sortType);
      const res: any = await patchSearchWordsResults(sortTypeString, body);
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
      } else if (res.response.status === 400) {
        alert('검색어는 2~20자 사이여야 합니다.');
      }
    } catch (e) {
      alert(e);
    } finally {
      if (pageIndex === 0) {
        setIsLoading(false);
      }
    }
  };
  useLayoutEffect(() => {
    setIsLastElem(false);
    setSearchData([]);
    fetchSearchResults(keyword, 0);
  }, [keyword, sortType]);
  if (isLoading) {
    return (
      <>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/consult');
            }}
          />
        </HeaderWrapper>
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
  } else {
    return (
      <Wrapper>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/search');
            }}
          />
          <FormWrapper onSubmit={handleSubmit}>
            <Input
              value={input}
              onChange={handleOnChange}
              placeholder="상담사명, 제목, 키워드"
              fontSize="1.6rem"
              fontWeight="400"
              fontColor={Grey1}
              placeHolderColor={Grey4}
              height="4.4rem"
              width="100%"
              padding="0 3.2rem 0 0"
              textIndent="1rem"
            />
            <SearchIcon onClick={handleSubmit} />
          </FormWrapper>
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
        {searchData.length !== 0 ? (
          <>
            <SearchResults searchData={searchData} />
            {!isLastElem ? (
              <div ref={setTarget} style={{ height: '3.5rem' }} />
            ) : (
              <div style={{ height: '3.5rem' }} />
            )}
          </>
        ) : (
          <EmptyWrapper>
            <EmptyIcon />
            <Heading color={Grey1} margin="0 0 1.5rem 0">
              검색 결과가 없어요.
            </Heading>
            <Body2 color={Grey1}>마인더명, 제목, 상담 스타일 등</Body2>
            <Body2 color={Grey1}>더 간단한 단어로 검색해보세요.</Body2>
          </EmptyWrapper>
        )}

        {isModalOpen ? (
          <>
            <BackDrop
              onClick={() => {
                //여기서 api 호출
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
    justify-content: flex-end;
    cursor: pointer;
  }
  .select-wrapper {
    display: flex;
    gap: 0.4rem;
  }
`;
const HeaderWrapper = styled.div`
  height: 5.2rem;
  background-color: ${White};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 2rem;
`;
const FormWrapper = styled.form`
  position: relative;
  width: 79%;
`;
const BackIcon = styled(Back)`
  position: absolute;
  top: 1.4rem;
  left: 2rem;
  cursor: pointer;
`;
const SearchIcon = styled(Search)`
  position: absolute;
  right: -2.7rem;
  top: 0.8rem;
  cursor: pointer;
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
const EmptyIcon = styled(Empty)`
  padding: 4.7rem 4.41rem 4.603rem 4.5rem;
`;
const EmptyWrapper = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
