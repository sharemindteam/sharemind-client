import styled from 'styled-components';
import { Subtitle } from 'styles/font';
import { ReactComponent as More } from 'assets/icons/icon-more.svg';
import { ReadyConsultCard } from '../Common/ReadyConsultCard';
import { useState } from 'react';
export const ConsultInReady = () => {
  //태그 리스트, title, name, level, 찜하기 여부,평점, 리뷰개수, 캐릭터 아이콘 정보 dummy data
  //   const tagList: CartegoryStateArray = [
  //     '이별/재회',
  //     '썸/연애시작',
  //     '남자심리',
  //     '공감',
  //   ];
  const dummy = [
    {
      tagList: ['이별/재회', '썸/연애시작', '남자심리', '공감'],
      title: '재회를 밥먹듯이 하고나서 안정적인 연애를 유지하고 있어요',
      name: '연애상담마스터',
      level: 1,
      isBookmarked: true,
      rate: 4.5,
      reviewNumber: 132,
      iconNumber: 10,
    },
    {
      tagList: ['이별/재회', '권태기', '남자심리', '조언'],
      title: '아이셋 싱글맘, 제 경험을 바탕으로 이혼 과정 상담을 해 드립니다',
      name: '싱글맘',
      level: 2,
      isBookmarked: false,
      rate: 5.0,
      reviewNumber: 275,
      iconNumber: 10,
    },
    {
      tagList: ['썸/연애시작', '연애갈등', '팩폭'],
      title:
        '사내연애에서 환승이별까지, 비밀연애를 하며 감수해야 할 상황들과 위험신호를 알려드립니다',
      name: '고민들어드림',
      level: 4,
      isBookmarked: false,
      rate: 3.0,
      reviewNumber: 112,
      iconNumber: 10,
    },
  ];
  //찜하기 array로 state 선언
  const initialBookmarkStates = dummy.map((data) => data.isBookmarked || false);
  const [bookmarkStates, setBookmarkStates] = useState<boolean[]>(
    initialBookmarkStates,
  );
  return (
    <Wrapper>
      <div className="nav-consult">
        <NavConsult>
          <Subtitle>들을 준비가 된 상담사들</Subtitle>
        </NavConsult>
        <MoreIcon />
      </div>
      {dummy.map((value, index) => {
        const tagListCast: CartegoryStateArray =
          value.tagList as CartegoryStateArray;
        return (
          <ReadyConsultCard
            index={index}
            tagList={tagListCast}
            title={value.title}
            name={value.name}
            level={value.level}
            bookmarkStates={bookmarkStates}
            setBookmarkStates={setBookmarkStates}
            rate={value.rate}
            reviewNumber={value.reviewNumber}
            iconNumber={value.iconNumber}
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
