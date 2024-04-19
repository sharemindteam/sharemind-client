import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey3, Grey4, White } from 'styles/color';
import { Body2, Button2, Heading } from 'styles/font';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { SearchResults } from 'components/Buyer/BuyerSearchResult/SearchResults';
import { SortModal } from 'components/Buyer/Common/SortModal';
import { useLayoutEffect, useRef, useState } from 'react';
import { openSortList, sortList } from 'utils/constant';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  isSortModalOpenState,
  scrollLockState,
} from 'utils/atom';
import Input from 'components/Common/Input';
import {
  patchSearchWordsCounselorsResults,
  patchSearchWordsPostsResults,
} from 'api/patch';
import { SearchResultData } from 'utils/type';
import { ConverSortType } from 'utils/convertSortType';
import { ReactComponent as Empty } from 'assets/icons/graphic-noting.svg';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import Divider2 from 'components/Common/Divider2';
import OpenConsultResults from 'components/Buyer/BuyerSearchResult/OpenConsultResults';
import { openConsultApiObject } from './BuyerConsult';
import { OpenConsultSortModal } from 'components/Buyer/Common/OpenConsultSortModal';
import { ConverOpenSortType } from 'utils/convertOpenSortType';
import { useSearchPageParams } from 'hooks/useSearchPageParams';
export const BuyerSearchResult = () => {
  const navigate = useNavigate();
  // Modal 여부(recoil), 스크롤 막기
  const [isModalOpen, setIsModalOpen] =
    useRecoilState<boolean>(isSortModalOpenState);
  const setScrollLock = useSetRecoilState(scrollLockState);
  // 검색 결과 리스트 - 상담사 리스트와 공개 상담 리스트
  const [searchData, setSearchData] = useState<SearchResultData[]>([]);
  const [openConsultSearchData, setOpenConsultSearchData] = useState<
    openConsultApiObject[]
  >([]);
  //무한스크롤 위한 page num과 lastId
  const [pageNum, setPageNum] = useState<number>(0);
  const [lastId, setLastId] = useState<number>(0);
  // 무한스크롤을 trigger를 위한 상태
  const [isLastElem, setIsLastElem] = useState<boolean>(false);
  // 무한스크롤을 trigger를 위한 상태
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const preventRef = useRef(true);
  const {
    handleClickTab,
    searchParams,
    setSearchParams,
    openSortType,
    setOpenSortType,
    input,
    keyword,
    tabState,
    handleSubmit,
    sortType,
    setSortType,
    handleChangeInput,
  } = useSearchPageParams();
  const onIntersect: IntersectionObserverCallback = async (entry) => {
    if (
      entry[0].isIntersecting &&
      !isLoading &&
      !isLastElem &&
      preventRef.current
    ) {
      preventRef.current = false;
      if (tabState === 1) {
        await fetchSearchResults(keyword, pageNum);
      } else if (tabState === 2) {
        await fetchOpenSearchResults(keyword, lastId);
      }

      preventRef.current = true;
    }
  };
  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
    onIntersect,
  });

  const fetchSearchResults = async (searchWord: string, pageIndex: number) => {
    try {
      const body = {
        word: searchWord,
        index: pageIndex,
      };
      const sortTypeString: string = ConverSortType(sortType);
      const res: any = await patchSearchWordsCounselorsResults(
        sortTypeString,
        body,
      );
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

  const fetchOpenSearchResults = async (searchWord: string, postId: number) => {
    try {
      const body = {
        word: searchWord,
        postId: postId,
      };
      const sortTypeString: string = ConverOpenSortType(openSortType);
      const res: any = await patchSearchWordsPostsResults(sortTypeString, body);
      if (res.status === 200) {
        if (res.data.length !== 0) {
          if (postId === 0) {
            setOpenConsultSearchData(res.data);
            setPageNum(pageNum + 1);
          } else {
            const updatedSearchs = [...openConsultSearchData, ...res.data];
            setLastId(res.data.postId);
            setOpenConsultSearchData(updatedSearchs);
          }
          setIsLastElem(true);
        } else {
          setOpenConsultSearchData([]);
        }
      } else if (res.response.status === 400) {
        alert('검색어는 2~20자 사이여야 합니다.');
      }
    } catch (e) {
      alert(e);
    } finally {
      if (postId === 0) {
        setIsLoading(false);
      }
    }
  };
  useLayoutEffect(() => {
    setIsLastElem(false);
    setPageNum(0);
    setSearchData([]);
    setIsLoading(true);
    if (tabState === 1) {
      fetchSearchResults(keyword, 0);
    } else if (tabState === 2) {
      fetchOpenSearchResults(keyword, 0);
    }
  }, [keyword, sortType, tabState, openSortType]);

  if (isLoading) {
    return (
      <>
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate('/consult');
            }}
          />
          <FormWrapper onSubmit={handleSubmit}>
            <Input
              value={input}
              onChange={handleChangeInput}
              placeholder="상담사명, 제목, 키워드"
              fontSize="1.6rem"
              fontWeight="400"
              fontColor={Grey1}
              placeHolderColor={Grey4}
              height="4.4rem"
              width="100%"
              isBoxSizing={true}
              padding="0.8rem 3.4rem 0.8rem 1.6rem"
            />
            <SearchIcon onClick={handleSubmit} />
          </FormWrapper>
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
    if (tabState === 1) {
      return (
        <Wrapper>
          <FixedContainer>
            <HeaderWrapper>
              <BackIcon
                onClick={() => {
                  navigate('/search');
                }}
              />
              <FormWrapper onSubmit={handleSubmit}>
                <Input
                  value={input}
                  onChange={handleChangeInput}
                  placeholder="상담사명, 제목, 키워드"
                  fontSize="1.6rem"
                  fontWeight="400"
                  fontColor={Grey1}
                  placeHolderColor={Grey4}
                  height="4.4rem"
                  width="100%"
                  isBoxSizing={true}
                  padding="0.8rem 3.4rem 0.8rem 1.6rem"
                />
                <SearchIcon onClick={handleSubmit} />
              </FormWrapper>
            </HeaderWrapper>
            <Divider2 tabState={tabState} setTabState={handleClickTab} />
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
          </FixedContainer>

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
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </>
          ) : null}
        </Wrapper>
      );
    } else if (tabState === 2) {
      return (
        <Wrapper>
          <FixedContainer>
            <HeaderWrapper>
              <BackIcon
                onClick={() => {
                  navigate('/search');
                }}
              />
              <FormWrapper onSubmit={handleSubmit}>
                <Input
                  value={input}
                  onChange={handleChangeInput}
                  placeholder="상담사명, 제목, 키워드"
                  fontSize="1.6rem"
                  fontWeight="400"
                  fontColor={Grey1}
                  placeHolderColor={Grey4}
                  height="4.4rem"
                  width="100%"
                  isBoxSizing={true}
                  padding="0.8rem 3.4rem 0.8rem 1.6rem"
                />
                <SearchIcon onClick={handleSubmit} />
              </FormWrapper>
            </HeaderWrapper>
            <Divider2 tabState={tabState} setTabState={handleClickTab} />
            <div className="select">
              <div
                className="select-wrapper"
                onClick={() => {
                  setIsModalOpen(true);
                  setScrollLock(true);
                }}
              >
                <Button2 color={Grey3}>{openSortList[openSortType]}</Button2>
                <Down />
              </div>
            </div>
          </FixedContainer>

          {openConsultSearchData.length !== 0 ? (
            <>
              <OpenConsultResults openConsultList={openConsultSearchData} />
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
              <OpenConsultSortModal
                sortType={openSortType}
                setSortType={setOpenSortType}
                setPostId={setLastId}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </>
          ) : null}
        </Wrapper>
      );
    }
  }
};

const Wrapper = styled.div`
  .select {
    display: flex;
    background-color: white;
    height: 4.4rem;
    padding: 0.4rem 2rem;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    z-index: 9;
  }
  .select-wrapper {
    display: flex;
    gap: 0.4rem;
  }
`;
const HeaderWrapper = styled.header`
  height: 5.2rem;
  gap: 0.8rem;
  background-color: ${White};
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  box-sizing: border-box;
  padding: 0.4rem 2rem;
`;
const FormWrapper = styled.form`
  position: relative;
  width: 100%;
`;
const BackIcon = styled(Back)`
  cursor: pointer;
`;
const SearchIcon = styled(Search)`
  position: absolute;
  right: 0.8rem;
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

const FixedContainer = styled.section`
  position: sticky;
  width: 100%;
  top: 0;
  background-color: white;
  z-index: 99;
`;
