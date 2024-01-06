import { CategoryResultHeader } from 'components/Buyer/BuyerCategoryResult/CategoryResultHeader';
import { SearchResults } from 'components/Buyer/Common/SearchResults';
import { SortModal } from 'components/Buyer/Common/SortModal';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { Button2 } from 'styles/font';
import { Grey3 } from 'styles/color';
import { useState } from 'react';
import { sortList } from 'utils/constant';
import { useRecoilState } from 'recoil';
import { isSortModalOpenState } from 'utils/atom';
//백 연동 시 page에서 상담사 리스트 받아서 뿌려줘야함
export const BuyerCategoryResult = () => {
  //0 : 최신순 1:인기순 2: 별점순
  // 바뀔 때마다 useEffect로 request
  const [sortType, setSortType] = useState<number>(0);
  const { id } = useParams();
  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] =
    useRecoilState<boolean>(isSortModalOpenState);
  if (id !== undefined) {
    const categoryId = parseInt(id, 10);
    return (
      <Wrapper>
        <div
          onClick={() => {
            if (isModalOpen === true) {
              setIsModalOpen(false);
            }
          }}
        >
          <CategoryResultHeader categoryType={categoryId} />
          <div className="select">
            <div
              className="select-wrapper"
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
            >
              <Button2 color={Grey3}>{sortList[sortType]}</Button2>
              <Down />
            </div>
          </div>
          <SearchResults />
        </div>
        {isModalOpen ? (
          <SortModal sortType={sortType} setSortType={setSortType} />
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
    cursor: pointer;
  }
  .select-wrapper {
    display: flex;
    gap: 0.4rem;
  }
`;
