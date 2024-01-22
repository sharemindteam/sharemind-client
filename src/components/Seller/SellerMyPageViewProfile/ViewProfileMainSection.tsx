import styled from 'styled-components';
import { Grey3, Grey6, White } from 'styles/color';
import { Body1, Caption2 } from 'styles/font';
import { Characters } from 'utils/Characters';
import { BottomButton, BottomButtonWrapper } from '../Common/BottomButton';
import { useNavigate } from 'react-router-dom';
import { Space } from 'components/Common/Space';
import Input from 'components/Common/Input';
import { Button } from 'components/Common/Button';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';

interface ViewProfileMainSectionProps {
  profileIdentifier: number;
  name: string | undefined;
  category: string[] | undefined;
  chatStyle: string | undefined;
  type: string[] | undefined;
  chatTime: string | undefined;
  letterFee: number;
  chatFee: number;
  oneLiner: string | undefined;
  experience: string | undefined;
  // accountNum: string;
  // bankType: string;
  // bankOwner: string;
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
}: // accountNum,
// bankType,
// bankOwner,
ViewProfileMainSectionProps) => {
  const navigate = useNavigate();
  return (
    <ViewProfileMainSectionWrapper>
      <FirstWhiteBox>
        <div className="profile-character">
          <Body1 color={Grey3}>프로필 캐릭터</Body1>
          <Caption2 color={Grey3} style={{ marginBottom: '1rem' }}>
            설정한 상담 스타일에 따라 프로필 캐릭터가 자동으로 부여됩니다.
          </Caption2>
          <Characters
            number={consultStyleToCharNum(chatStyle)}
            width="7.6rem"
          />
        </div>
      </FirstWhiteBox>
      <WhiteBox>
        <div className="nickname">
          <ProfileInformTag>닉네임</ProfileInformTag>
          <ProfileInform>{name}</ProfileInform>
        </div>
        <div className="category">
          <ProfileInformTag>상담 카테고리</ProfileInformTag>
          <ProfileInform>{category?.join()}</ProfileInform>
        </div>
        <div className="style">
          <ProfileInformTag>상담 스타일</ProfileInformTag>
          <ProfileInform>{chatStyle}</ProfileInform>
        </div>
      </WhiteBox>
      <WhiteBox>
        <div className="type">
          <ProfileInformTag>상담 방식</ProfileInformTag>
          <ProfileInform>{type?.join()}</ProfileInform>
        </div>
        <div className="chat-time">
          {' '}
          <ProfileInformTag>채팅 상담시간</ProfileInformTag>
          <ProfileInform>{chatTime}</ProfileInform>
        </div>
        <div className="consult-fee">
          {' '}
          <ProfileInformTag>
            상담료 <br />
            (1건 기준)
          </ProfileInformTag>
          <div className="flex-end">
            {letterFee && (
              <ProfileInform>
                편지 {letterFee?.toLocaleString()}원
              </ProfileInform>
            )}
            {chatFee && (
              <ProfileInform>채팅 {chatFee?.toLocaleString()}원</ProfileInform>
            )}
          </div>
        </div>
      </WhiteBox>{' '}
      <IntroduceWhiteBox>
        <div className="one-liner">
          <ProfileInformTag>한줄소개</ProfileInformTag>
          <Body1>{oneLiner}</Body1>
        </div>
        <div className="experience">
          <ProfileInformTag>경험 소개</ProfileInformTag>
          <Body1>{experience}</Body1>
        </div>
      </IntroduceWhiteBox>
      {/* <AccountWhiteBox>
        <ProfileInformTag>수익 계좌</ProfileInformTag>
        <div className="account-num">
          <AccountTag>계좌번호</AccountTag>
          <Input
            width="100%"
            height="4.8rem"
            isBoxSizing={true}
            padding="1.2rem"
            readOnly={true}
            value={accountNum}
          />
        </div>
        <div className="bank-type">
          <AccountTag>은행</AccountTag>
          <Input
            width="100%"
            height="4.8rem"
            isBoxSizing={true}
            padding="1.2rem"
            readOnly={true}
            value={bankType}
          />
        </div>
        <div className="owner-name">
          <AccountTag>예금주</AccountTag>
          <Input
            width="100%"
            height="4.8rem"
            isBoxSizing={true}
            padding="1.2rem"
            readOnly={true}
            value={bankOwner}
          />
        </div>
      </AccountWhiteBox> */}
      <Space height="9.2rem" />
      <BottomButtonWrapper style={{ display: 'block' }}>
        <Button
          text="수정하기"
          height="5.2rem"
          width="calc(100% - 4rem)"
          onClick={() => {
            navigate('/seller/mypage/modifyProfile');
          }}
        />
      </BottomButtonWrapper>
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
  margin-right: 3.3rem;
  color: ${Grey3};
  width: 8.7rem;
`;

const ProfileInform = styled(Body1)``;

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
  }
`;

const AccountWhiteBox = styled(WhiteBox)`
  gap: 0.6rem;
  & > div {
    align-items: center;
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

const IntroduceWhiteBox = styled(WhiteBox)`
  & > div {
    flex-direction: column;
    gap: 0.4rem;
  }
`;

const AccountTag = styled(Body1)`
  width: 10rem;
  margin-bottom: 0.4rem;
`;

const AccountForm = styled.div`
  border-radius: 1.2rem;
  margin-left: 1.7rem;
  background: ${Grey6};
`;
