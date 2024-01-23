import styled from 'styled-components';
import { Subtitle } from 'styles/font';
import { ReactComponent as More } from 'assets/icons/icon-more.svg';
import { ReadyConsultCard } from '../Common/ReadyConsultCard';
import { useState } from 'react';
import { counselorDummyData as dummy } from 'utils/buyerDummy';
import { useNavigate } from 'react-router-dom';
import { CartegoryState } from 'utils/type';
export const ConsultInReady = () => {
  const navigate = useNavigate();
  //consult type은 1이면 편지,2 면 채팅 3이면 둘다
  //일단 상담시간부분은 확실하지 않으니 추후 구현
  //dummy data naming이 erd와 맞음
  //찜하기 array로 state 선언, 받아온 개수만큼 찜하기 array 할당
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
      {dummy.map((value, index) => {
        const tagListCast: CartegoryState[] = value.tagList as CartegoryState[];
        return (
          <ReadyConsultCard
            index={index}
            counselorId={value.counselorId}
            tagList={tagListCast}
            introduction={value.introduction}
            nickname={value.nickname}
            level={value.level}
            bookmarkStates={bookmarkStates}
            setBookmarkStates={setBookmarkStates}
            rating={value.rating}
            totalReview={value.reviewNumber}
            consultType={[]}
            letterPrice={value.letterPrice}
            chattingPrice={value.chattingPrice}
          />
        );
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
