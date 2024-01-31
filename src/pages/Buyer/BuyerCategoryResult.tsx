import { CategoryResultHeader } from 'components/Buyer/BuyerCategoryResult/CategoryResultHeader';
import { SortModal } from 'components/Buyer/Common/SortModal';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { Button2 } from 'styles/font';
import { Grey3 } from 'styles/color';
import { useEffect, useState } from 'react';
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
  const fectchSearchResults = async () => {
    try {
      const body = {
        consultCategory: convertCategoryEnum(searchKeyword),
        index: 0,
      };
      const sortTypeString: string = ConverSortType(sortType);
      const res: any = await patchCounselorsAll(sortTypeString, body);
      if (res.status === 200) {
        setSearchData(res.data);
      } else if (res.response.status === 404) {
        alert('카테고리 유형이 유효하지 않습니다.');
        navigate('/');
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fectchSearchResults();
  }, [sortType]);

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
