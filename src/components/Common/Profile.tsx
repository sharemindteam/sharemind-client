import styled from 'styled-components';
import { Button } from './Button';
import { Black, Green, Grey6, Red, White } from 'styles/color';
import { Button2, Caption2, Subtitle } from 'styles/font';
import { ReactComponent as InfoIcon } from 'assets/icons/info.svg';
import { ReactComponent as ReciptIcon } from 'assets/icons/recipt.svg';
import { ReactComponent as ReviewIcon } from 'assets/icons/review.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/save.svg';
import { useNavigate } from 'react-router-dom';
import { Characters } from 'utils/Characters';
interface ProfileProps {
  isBuyer: boolean;
  isVerified?: undefined | boolean;
  profileIdentifier: number | undefined;
  name: string | undefined;
  levelStatus: string | undefined;
}
//일단 프로필 이미지는 한개만 불러왔음!
export const Profile = ({
  isBuyer,
  isVerified = false,
  profileIdentifier,
  name,
  levelStatus,
}: ProfileProps) => {
  const navigate = useNavigate();
  return (
    <>
      <ProfileBox>
        <Characters number={profileIdentifier} width="7.6rem" />

        {isBuyer ? (
          <Name>{name}</Name>
        ) : (
          <ProfileInfo>
            <Level>
              <Caption2 color={White}>Lv {levelStatus}</Caption2>
            </Level>
            <Name>{name}</Name>
          </ProfileInfo>
        )}
        <Button
          onClick={(event) => {
            if (isBuyer) {
              navigate('/seller/mypage');
            } else {
              navigate('/buyer/mypage');
            }
            event?.stopPropagation();
          }}
          text={isBuyer ? '마인로 전환' : '셰어로 전환'}
          width="10.1rem"
          height="4.2rem"
          border={'1px solid' + (isBuyer ? Green : Green)}
          buttonTextType={2}
          backgroundColor={White}
          color={Black}
        />
      </ProfileBox>

      {isBuyer ? (
        <SelectInfoList>
          <SelectItem>
            <ReciptIcon />
            <Button2>결제 내역</Button2>
          </SelectItem>
          <SelectItem>
            <ReviewIcon />
            <Button2>리뷰 관리</Button2>
          </SelectItem>
          <SelectItem>
            <SaveIcon />
            <Button2>찜 목록</Button2>
          </SelectItem>
        </SelectInfoList>
      ) : isVerified ? (
        <SelectInfoList>
          <SelectItem
            onClick={() => {
              navigate('/seller/mypage/viewProfile');
            }}
          >
            <InfoIcon />
            <Button2>판매 정보</Button2>
          </SelectItem>
          <SelectItem
            onClick={() => {
              navigate('/seller/mypage/review');
            }}
          >
            <ReviewIcon />
            <Button2>받은 리뷰</Button2>
          </SelectItem>
        </SelectInfoList>
      ) : (
        <VerifyButtonWrapper>
          <VerifyButton
            onClick={() => {
              navigate('/seller/education/first');
            }}
            width="100%"
            backgroundColor={Green}
            height="5.2rem"
            text="마인더 인증하기"
          />
        </VerifyButtonWrapper>
      )}

      {isBuyer ? (
        <ServiceList>
          <ServiceItem>서비스 소개</ServiceItem>
          <ServiceItem>결제 문의</ServiceItem>
          <ServiceItem>계정 설정</ServiceItem>
        </ServiceList>
      ) : isVerified ? (
        <ServiceList>
          <ServiceItem>서비스 소개</ServiceItem>
          <ServiceItem>정산 문의</ServiceItem>
          <ServiceItem>알림 설정</ServiceItem>
          <ServiceItem
            onClick={() => {
              navigate('/seller/setting');
            }}
          >
            계정 설정
          </ServiceItem>
        </ServiceList>
      ) : (
        <ServiceList>
          <ServiceItem>서비스 소개</ServiceItem>
          <ServiceItem>알림 설정</ServiceItem>
          <ServiceItem
            onClick={() => {
              navigate('/seller/setting');
            }}
          >
            계정 설정
          </ServiceItem>
        </ServiceList>
      )}
    </>
  );
};

const ProfileBox = styled.div`
  display: flex;
  height: 9.8rem;
  align-items: center;
  padding: 0 2rem;
  background-color: ${White};
  gap: 0.9rem;
  border-bottom: 1px solid ${Grey6};
`;
const SelectInfoList = styled.div`
  display: flex;
  background-color: ${White};
  justify-content: center;
  gap: 7.2rem;
`;
const SelectItem = styled.div`
  display: flex;
  cursor: pointer;
  padding: 0.9rem 0 1.5rem;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
  margin-right: auto;
`;

const Level = styled.div`
  background-color: ${Green};
  border-radius: 0.8rem;
  display: flex;
  width: 4.5rem;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
`;

const Name = styled(Subtitle)`
  margin-right: auto;
`;
const VerifyButtonWrapper = styled.div`
  padding: 1.2rem 2rem;
  background-color: ${White};
`;
const VerifyButton = styled(Button)``;

const ServiceList = styled.div`
  margin-top: 1.2rem;
`;
const ServiceItem = styled.div`
  display: flex;
  background-color: ${White};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 1.7rem;
  border-bottom: 1px solid ${Grey6};
  align-items: center;
`;
