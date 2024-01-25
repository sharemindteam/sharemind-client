import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey3, Grey6, White } from 'styles/color';
import { Button2, Heading } from 'styles/font';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { SearchResults } from 'components/Buyer/Common/SearchResults';
import { SortModal } from 'components/Buyer/Common/SortModal';
import { useEffect, useState } from 'react';
import { sortList } from 'utils/constant';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isSortModalOpenState, scrollLockState } from 'utils/atom';
import { SearchResultData } from 'utils/type';
import { convertCategoryEnum } from 'utils/convertCategoryEnum';
import { patchCounselors } from 'api/patch';
import { ConverSortType } from 'utils/convertSortType';
//백 연동 시 page에서 상담사 리스트 받아서 뿌려줘야함
export const BuyerAvailCounselor = () => {
  //0 : 최신순 1:인기순 2: 별점순
  // 바뀔 때마다 useEffect로 request
  const [sortType, setSortType] = useState<number>(0);
  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] =
    useRecoilState<boolean>(isSortModalOpenState);
  //scorll 막기
  const setScrollLock = useSetRecoilState(scrollLockState);
  const navigate = useNavigate();
  //결과저장
  const [searchData, setSearchData] = useState<SearchResultData[]>([]);
  const fectchSearchResults = async () => {
    try {
      const body = {
        index: 0,
      };
      const sortTypeString: string = ConverSortType(sortType);
      const res: any = await patchCounselors(sortTypeString, body);
      if (res.status === 200) {
        console.log(res.data);
        setSearchData(res.data);
      } else if (res.response.status === 404) {
        alert('카테고리 유형이 유효하지 않습니다.');
        navigate('/buyer/home');
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
      <HeaderWrapper>
        <BackIcon
          onClick={() => {
            navigate(-1);
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
      <SearchResults />

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
