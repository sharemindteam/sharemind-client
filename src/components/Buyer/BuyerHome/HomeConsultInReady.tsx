import styled from 'styled-components';
import { Subtitle } from 'styles/font';
import { ReactComponent as More } from 'assets/icons/icon-more.svg';
import { ReadyConsultCard } from '../Common/ReadyConsultCard';

import { useNavigate } from 'react-router-dom';
import { SearchResultData } from 'utils/type';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { AppendCategoryType } from 'utils/AppendCategoryType';
interface HomeConsultInReadyProps {
  searchData: SearchResultData[];
}
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
          <Subtitle>들을 준비가 된 마인더들</Subtitle>
        </NavConsult>
        <MoreIcon />
      </div>
      {searchData.map((value, index) => {
        if (index <= 2) {
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
            />
          );
        }
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 3.5rem;
  .nav-consult {
    width: 100%;
    height: 4.4rem;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    padding: 2.2rem 3.2rem 1.2rem 2rem;
    cursor: pointer;
    margin-bottom: 0.4rem;
  }
`;
const NavConsult = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0px auto 0px 0px;
`;
const MoreIcon = styled(More)``;
