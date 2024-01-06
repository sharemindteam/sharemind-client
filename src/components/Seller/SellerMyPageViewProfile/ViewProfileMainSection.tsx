import styled from 'styled-components';
import { Grey3, White } from 'styles/color';
import { Body1, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';

interface ViewProfileMainSectionProps {
  profileIdentifier: number;
  name: string;
  category: string;
  chatStyle: string;
  type: string;
  chatTime: string;
  letterFee: number;
  chatFee: number;
  oneLiner: string;
  experience: string;
}

export const ViewProfileMainSection = ({
  profileIdentifier,
  name,
  category,
  chatStyle,
  type,
  chatTime,
  letterFee,
  chatFee,
  oneLiner,
  experience,
}: ViewProfileMainSectionProps) => {
  return (
    <ViewProfileMainSectionWrapper>
      <FirstWhiteBox>
        <div className="profile-character">
          <Body1 color={Grey3}>프로필 캐릭터</Body1>
          <Caption2 color={Grey3} style={{ marginBottom: '1rem' }}>
            설정한 상담 스타일에 따라 프로필 캐릭터가 자동으로 부여됩니다.
          </Caption2>
          <Characters number={profileIdentifier} width="7.6rem" />
        </div>
      </FirstWhiteBox>
      <WhiteBox>
        <div className="nickname">
          <ProfileInformTag>닉네임</ProfileInformTag>
          <ProfileInform>{name}</ProfileInform>
        </div>
        <div className="category">
          <ProfileInformTag>상담 카테고리</ProfileInformTag>
          <ProfileInform>{category}</ProfileInform>
        </div>
        <div className="style">
          <ProfileInformTag>상담 스타일</ProfileInformTag>
          <ProfileInform>{chatStyle}</ProfileInform>
        </div>
      </WhiteBox>
      <WhiteBox>
        <div className="type">
          <ProfileInformTag>상담 방식</ProfileInformTag>
          <ProfileInform>{type}</ProfileInform>
        </div>
        <div className="chat-time">
          {' '}
          <ProfileInformTag>채팅 상담시간</ProfileInformTag>
          <ProfileInform>{chatTime}</ProfileInform>
        </div>
        <div className="consult-fee">
          {' '}
          <ProfileInformTag>상담료 (1건 기준)</ProfileInformTag>
          <div className="flex-end">
            <ProfileInform>편지 {letterFee.toLocaleString()}원</ProfileInform>
            <ProfileInform>채팅 {chatFee.toLocaleString()}원</ProfileInform>
          </div>
        </div>
      </WhiteBox>{' '}
      <LastWhiteBox>
        <div className="one-liner">
          <ProfileInformTag>한줄소개</ProfileInformTag>
          <Body1>{oneLiner}</Body1>
        </div>
        <div className="experience">
          <ProfileInformTag>경험 소개</ProfileInformTag>
          <Body1>{experience}</Body1>
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
