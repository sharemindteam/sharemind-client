import { CategoryResultHeader } from 'components/Buyer/BuyerCategoryResult/CategoryResultHeader';
import { SortModal } from 'components/Buyer/Common/SortModal';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { Button2 } from 'styles/font';
import { Grey3 } from 'styles/color';
import { useEffect, useState } from 'react';
import { sortList } from 'utils/constant';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isSortModalOpenState, scrollLockState } from 'utils/atom';
import { ConverSortType } from 'utils/convertSortType';
import { patchSearchWordsResults } from 'api/patch';
import { SearchResultData } from 'utils/type';
import { convertNumToCategory } from 'utils/convertNumToCategory';
import { SearchResults } from 'components/Buyer/BuyerCategoryResult/SearchResult';
//백 연동 시 page에서 상담사 리스트 받아서 뿌려줘야함
export const BuyerCategoryResult = () => {
  const navigate = useNavigate();
  //0 : 최신순 1:인기순 2: 별점순
  // 바뀔 때마다 useEffect로 request
  const [sortType, setSortType] = useState<number>(0);
  const { id } = useParams();
  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] =
    useRecoilState<boolean>(isSortModalOpenState);
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  //결과저장
  const [searchData, setSearchData] = useState<SearchResultData[]>([]);
  const fectchSearchResults = async (searchWord: string) => {
    try {
      const body = {
        word: searchWord,
        index: 0,
      };
      const sortTypeString: string = ConverSortType(sortType);
      const res: any = await patchSearchWordsResults(sortTypeString, body);
      if (res.status === 200) {
        setSearchData(res.data);
      } else if (res.response.status === 400) {
        alert('검색어는 2~20자 사이여야 합니다.');
        navigate('/buyer/home');
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (id !== undefined) {
      fectchSearchResults(convertNumToCategory(parseInt(id, 10)));
    } else {
      alert('잘못된 접근입니다');
      navigate('/buyer/home');
    }
  }, []);
  if (id !== undefined) {
    return (
      <Wrapper>
        <CategoryResultHeader categoryType={parseInt(id, 10)} />
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
        <SearchResults searchData={searchData} />
        {isModalOpen ? (
          <>
            <BackDrop
              onClick={() => {
                //여기서 api
                setIsModalOpen(false);
                setScrollLock(false);
              }}
            />
            <SortModal sortType={sortType} setSortType={setSortType} />
          </>
        ) : null}
      </Wrapper>
    );
  } else {
    return <>404 error</>;
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
