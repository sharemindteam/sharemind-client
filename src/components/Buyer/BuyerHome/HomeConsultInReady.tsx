import styled from 'styled-components';
import { Caption2, Subtitle } from 'styles/font';
import { ReactComponent as More } from 'assets/icons/icon-more.svg';
import { ReadyConsultCard } from '../Common/ReadyConsultCard';

import { useNavigate } from 'react-router-dom';
import { SearchResultData } from 'utils/type';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { AppendCategoryType } from 'utils/AppendCategoryType';
import { Green, Grey2 } from 'styles/color';
import { Space } from 'components/Common/Space';
import { getCurrentHour } from 'utils/getCurrentHour';
import { Flex } from 'components/Common/Flex';
///
///
///
interface HomeConsultInReadyProps {
  searchData: SearchResultData[];
}
///
///
///
export const HomeConsultInReady = ({ searchData }: HomeConsultInReadyProps) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div
        className="nav-consult"
        onClick={() => {
          navigate('/counselors');
        }}
      >
        <NavConsult>
          <div className="row1">
            <Subtitle>들을 준비가 된 마인더들</Subtitle>
            <MoreIcon />
          </div>
          <Space height="0.2rem" />
          <Caption2 color={Grey2}>
            현재 시간 <span id="current-time">{getCurrentHour()}</span>시 기준,
            실시간 상담을 신청할 수 있어요
          </Caption2>
        </NavConsult>
      </div>
      <Flex
        direction="column"
        gap="0.8rem"
        width="100%"
        style={{ padding: '0.4rem 2rem', boxSizing: 'border-box' }}
      >
        {searchData.slice(0, 3).map((value) => {
          return (
            <ReadyConsultCard
              key={value.counselorId}
              counselorId={value.counselorId}
              tagList={AppendCategoryType(
                value.consultCategories,
                value.consultStyle,
              )}
              consultStyle={consultStyleToCharNum(value.consultStyle)}
              consultTimes={value.consultTimes}
              introduction={value.introduction}
              nickname={value.nickname}
              level={value.level}
              isWishList={value.isWishList}
              rating={value.ratingAverage}
              totalReview={value.totalReview}
              consultType={value.consultTypes}
              letterPrice={value.consultCosts.편지}
              chattingPrice={value.consultCosts.채팅}
              totalConsult={value.totalConsult}
            />
          );
        })}
      </Flex>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3.5rem;
  .nav-consult {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    padding: 2.2rem 3.2rem 1.2rem 2rem;
    cursor: pointer;
  }
`;
const NavConsult = styled.div`
  width: 100%;
  span#current-time {
    color: ${Green};
  }
  .row1 {
    display: flex;
    width: 100%;
    align-items: center;
  }
`;
const MoreIcon = styled(More)`
  margin-left: auto;
`;
