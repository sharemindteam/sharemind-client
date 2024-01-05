import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grey1, Grey3, Grey6, White } from 'styles/color';
import { Button2, Heading } from 'styles/font';
import { ReactComponent as Back } from 'assets/icons/icon-back.svg';
import { ReactComponent as Down } from 'assets/icons/icon-drop-down.svg';
import { SearchResults } from 'components/Buyer/Common/SearchResults';
import { SortModal } from 'components/Buyer/Common/SortModal';
import { useState } from 'react';
import { sortList } from 'utils/constant';
import { useRecoilState } from 'recoil';
import { isModalOpenState } from 'utils/atom';
export const BuyerAvailCounselor = () => {
  //0 : 최신순 1:인기순 2: 별점순
  // 바뀔 때마다 useEffect로 request
  const [sortType, setSortType] = useState<number>(0);
  // Modal 여부(recoil)
  const [isModalOpen, setIsModalOpen] =
    useRecoilState<boolean>(isModalOpenState);
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div
        onClick={() => {
          if (isModalOpen === true) {
            setIsModalOpen(false);
          }
        }}
      >
        <HeaderWrapper>
          <BackIcon
            onClick={() => {
              navigate(-1);
            }}
          />
          <Heading color={Grey1}>들을 준비가 된 상담사들</Heading>
        </HeaderWrapper>
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
