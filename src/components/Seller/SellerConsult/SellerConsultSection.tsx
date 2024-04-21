import { Black, Green, Grey3, Grey5, Grey6, LightGreen } from 'styles/color';
import { ReactComponent as DownArrowIcon } from 'assets/icons/sorting-down-arrow.svg';
import { ReactComponent as CircleCheckIcon } from 'assets/icons/circle-check.svg';
import { Button2 } from 'styles/font';
import styled from 'styled-components';

import { useSetRecoilState } from 'recoil';
import { isConsultModalOpenState } from 'utils/atom';
import SellerLetterList from './SellerLetterList';
import SellerChatList from './SellerChatList';
import SellerOpenConsultList from './SellerOpenConsultList';
import { useConsultParams } from 'hooks/useConsultParams';
import { Space } from 'components/Common/Space';

//
//
//

interface ConsultTypeProps {
  $isActive: boolean;
  $isLong?: boolean;
}

//
//
//

export const SellerConsultSection = () => {
  const {
    consultType,
    sortType,
    setSortType,
    handleLetterClick,
    handleChatClick,
    handleOpenConsultClick,
    searchParams,
    setSearchParams,
    isChecked,
    setIsChecked,
  } = useConsultParams();

  const setIsModalOpen = useSetRecoilState<boolean>(isConsultModalOpenState);
  return (
    <>
      <ConsultSortingMenu>
        <div className="row1">
          <ConsultType
            $isActive={consultType === 'letter'}
            onClick={handleLetterClick}
          >
            편지
          </ConsultType>
          <ConsultType
            $isActive={consultType === 'chat'}
            onClick={handleChatClick}
          >
            채팅
          </ConsultType>
          <ConsultType
            $isLong={true}
            $isActive={consultType === 'open-consult'}
            onClick={handleOpenConsultClick}
          >
            공개상담
          </ConsultType>
          {!(consultType === 'open-consult') && (
            <SortingType
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <Button2 color={Grey3}>
                {sortType === 0 ? '최근순' : '읽지않은순'}
              </Button2>
              <DownArrowIcon />
            </SortingType>
          )}
        </div>
        <div className="row2">
          <div
            className="row2-1"
            onClick={() => {
              setIsChecked(!isChecked);
              searchParams.set('check', String(!isChecked));
              setSearchParams(searchParams);
            }}
            style={{
              cursor: 'pointer',
            }}
          >
            <CircleCheckIcon fill={isChecked ? Green : Grey5} />
            <Button2 color={Grey3}>종료/취소된 상담 제외</Button2>
          </div>
        </div>
      </ConsultSortingMenu>
      <section
        className="consult-list"
        style={{ height: 'calc(100vh - 19.3rem)', overflow: 'scroll' }}
      >
        {consultType === 'letter' ? (
          <SellerLetterList
            sortType={sortType}
            setSortType={setSortType}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            isChecked={isChecked}
          />
        ) : consultType === 'chat' ? (
          <SellerChatList
            sortType={sortType}
            setSortType={setSortType}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            isChecked={isChecked}
          />
        ) : (
          <SellerOpenConsultList
            sortType={sortType}
            setSortType={setSortType}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}
        <Space height='4rem'/>
      </section>
    </>
  );
};
const ConsultSortingMenu = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 2rem 1.2rem;
  gap: 1.2rem;
  position: sticky;
  top: 10.4rem;
  z-index: 10;
  background-color: white;
  .row1 {
    display: flex;
    gap: 1.2rem;
    align-items: center;
  }
  .row2 {
    align-self: flex-start;
  }
  .row2-1 {
    display: flex;
    cursor: pointer;
    gap: 0.4rem;
    align-items: center;
  }
`;

const ConsultType = styled.div<ConsultTypeProps>`
  display: flex;
  width: ${(props) => (props.$isLong ? '8rem' : '5.6rem')};
  height: 3.4rem;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 1.2rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  background: ${(props) => (props.$isActive ? LightGreen : Grey6)};
  color: ${(props) => (props.$isActive ? Green : Black)};
  margin-top: 0.2rem;
`;
const SortingType = styled.div`
  display: flex;
  margin-left: auto;
  gap: 0.4rem;
  cursor: pointer;
`;
