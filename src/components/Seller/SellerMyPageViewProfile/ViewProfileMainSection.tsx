import { Button } from 'components/Common/Button';
import styled from 'styled-components';
import { Grey3, White } from 'styles/color';
import { Body1, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';

interface ViewProfileMainSectionProps {
  profileIdentifier: number;
  name: string;
}

export const ViewProfileMainSection = () => {
  return (
    <ViewProfileMainSectionWrapper>
      <FirstWhiteBox>
        <div className="profile-character">
          <Body1 color={Grey3}>프로필 캐릭터</Body1>
          <Caption2 color={Grey3} style={{ marginBottom: '1rem' }}>
            설정한 상담 스타일에 따라 프로필 캐릭터가 자동으로 부여됩니다.
          </Caption2>
          <Characters number={1} width="7.6rem" />
        </div>
      </FirstWhiteBox>
      <WhiteBox>
        <div className="nickname">
          <ProfileInformTag>닉네임</ProfileInformTag>
          <ProfileInform>연애상담마스터</ProfileInform>
        </div>
        <div className="category">
          <ProfileInformTag>상담 카테고리</ProfileInformTag>
          <ProfileInform>이별/재회, 권태기, 남자심리</ProfileInform>
        </div>
        <div className="style">
          <ProfileInformTag>상담 스타일</ProfileInformTag>
          <ProfileInform>조언</ProfileInform>
        </div>
      </WhiteBox>
      <WhiteBox>
        <div className="type">
          <ProfileInformTag>상담 방식</ProfileInformTag>
          <ProfileInform>편지, 채팅</ProfileInform>
        </div>
        <div className="chat-time">
          {' '}
          <ProfileInformTag>채팅 상담시간</ProfileInformTag>
          <ProfileInform>1시간</ProfileInform>
        </div>
        <div className="consult-fee">
          {' '}
          <ProfileInformTag>상담료 (1건 기준)</ProfileInformTag>
          <div className="flex-end">
            <ProfileInform>편지 5,000원</ProfileInform>
            <ProfileInform>채팅 10,000원</ProfileInform>
          </div>
        </div>
      </WhiteBox>{' '}
      <LastWhiteBox>
        <div className="one-liner">
          <ProfileInformTag>한줄소개</ProfileInformTag>
          <Body1>
            재회를 밥먹듯이 하고나서 안정적인 연애를 유지하고 있어요
          </Body1>
        </div>
        <div className="experience">
          <ProfileInformTag>경험 소개</ProfileInformTag>
          <Body1>
            안녕하세요. 한 남자와 재회를 밥먹듯이 하고 안정적으로 연애를 유지
            중인 여성입니다. 그 사람과 연애를 하면서 저는 스스로도 많은 내적
            성장을 겪었고 가치관이 180도 변하게 되었습니다. 주변 친구들에게 연애
            상담을 하는 것은 많은 부작용을 가져옵니다. 내 남자친구는 친구들에게
            이미지가 바닥이 되어 있고, 잦은 이별 상담에 주변 사람들이 떠나가기
            시작합니다. 하지만 이 고통을 누군가에게라도 말하지 않으면 풀리지
            않을 것만 같습니다. 저는 상담자분이 장기적으로 행복해질 수 있는
            방법을 제시할 것이고 그것이 당장은 괴로움을 증가시킬 수 있는 원인이
            될 수도 있을 것입니다.
          </Body1>
        </div>
      </LastWhiteBox>
    </ViewProfileMainSectionWrapper>
  );
};

const ViewProfileMainSectionWrapper = styled.section`
  display: flex;
  margin-top: 0.2rem;
  flex-direction: column;
  gap: 1.1rem;
  & > div {
    display: flex;
  }
`;

const ProfileInformTag = styled(Body1)`
  margin-right: auto;
  color: ${Grey3};
`;

const ProfileInform = styled(Body1)`
  margin-left: auto;
`;

const WhiteBox = styled.div`
  padding: 1.9rem 2rem;
  background: ${White};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  & > div {
    display: flex;
  }
  .flex-end {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;
const FirstWhiteBox = styled(WhiteBox)`
  & > div {
    display: flex;
    flex-direction: column;
  }
  & > div > :nth-child(3) {
    align-self: center;
  }
`;

const LastWhiteBox = styled(WhiteBox)`
  & > div {
    flex-direction: column;
    gap: 0.4rem;
  }
`;
