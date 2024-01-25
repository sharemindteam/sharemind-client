import styled from 'styled-components';
import { Subtitle } from 'styles/font';
import { ReactComponent as More } from 'assets/icons/icon-more.svg';
import { ReadyConsultCard } from '../Common/ReadyConsultCard';
import { useState } from 'react';
import { counselorDummyData as dummy } from 'utils/buyerDummy';
import { useNavigate } from 'react-router-dom';
import { SearchResultData } from 'utils/type';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { AppendCategoryType } from 'utils/AppendCategoryType';
interface HomeConsultInReadyProps {
  searchData: SearchResultData[];
}
export const HomeConsultInReady = ({ searchData }: HomeConsultInReadyProps) => {
  const navigate = useNavigate();
  //consult type은 1이면 편지,2 면 채팅 3이면 둘다
  const initialBookmarkStates = dummy.map((data) => data.isBookmarked || false);
  const [bookmarkStates, setBookmarkStates] = useState<boolean[]>(
    initialBookmarkStates,
  );

  return (
    <Wrapper>
      <div
        className="nav-consult"
        onClick={() => {
          navigate('/buyer/counselors');
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
              // 나중에 id로 변경
              key={index}
              index={index}
              counselorId={consultStyleToCharNum(value.consultStyle)}
              tagList={AppendCategoryType(
                value.consultCategories,
                value.consultStyle,
              )}
              consultTimes={value.consultTimes}
              introduction={value.introduction}
              nickname={value.nickname}
              level={value.level}
              bookmarkStates={bookmarkStates}
              setBookmarkStates={setBookmarkStates}
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
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 0.4rem;
  }
`;
const NavConsult = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.9rem;
  margin-left: 2rem;
`;
const MoreIcon = styled(More)`
  margin-right: 3.8rem;
  margin-top: 1.5rem;
`;
