import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey3, Grey4, White } from 'styles/color';
import { Button2 } from 'styles/font';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { SearchResults } from 'components/Buyer/BuyerSearchResult/SearchResults';
import { SortModal } from 'components/Buyer/Common/SortModal';
import { ChangeEvent, useEffect, useState } from 'react';
import { sortList } from 'utils/constant';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  isSortModalOpenState,
  scrollLockState,
  searchKeywordState,
} from 'utils/atom';
import Input from 'components/Common/Input';
import { patchSearchWordsResults } from 'api/patch';
import { SearchResultData } from 'utils/type';

export const BuyerSearchResult = () => {
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
  //input onchagne
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(input);
  };
  const ConverSortType = (typeNum: number) => {
    if (typeNum === 0) {
      return 'LATEST';
    } else if (typeNum === 1) {
      return 'POPULARITY';
    } else if (typeNum === 2) {
      return 'STAR_RATING';
    } else {
      return '';
    }
  };
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
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fectchSearchResults(keyword);
  }, [keyword, sortType]);
  const navigate = useNavigate();
  return (
    <Wrapper>
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate(-1);
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
      <SearchResults searchData={searchData} />
      {isModalOpen ? (
        <>
          <BackDrop
            onClick={() => {
              //여기서 api 호출
              setIsModalOpen(false);
              setScrollLock(false);
            }}
          />
          <SortModal sortType={sortType} setSortType={setSortType} />
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
