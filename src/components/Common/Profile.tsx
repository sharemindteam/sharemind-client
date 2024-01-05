import styled from 'styled-components';
import { ReactComponent as Char1 } from 'assets/characters/char1.svg';
import { Button } from './Button';
import { Black, Green, Grey6, Red, White } from 'styles/color';
import { Button2, Caption2, Subtitle } from 'styles/font';
import { ReactComponent as InfoIcon } from 'assets/icons/info.svg';
import { ReactComponent as ReciptIcon } from 'assets/icons/recipt.svg';
import { ReactComponent as ReviewIcon } from 'assets/icons/review.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/save.svg';
import { useNavigate } from 'react-router-dom';
interface ProfileProps {
  isBuyer: boolean;
  isVerified?: undefined | boolean;
  profileIdentifier: Number;
}
//일단 프로필 이미지는 한개만 불러왔음!
export const Profile = ({ isBuyer, isVerified = false }: ProfileProps) => {
  const navigate = useNavigate();
  return (
    <>
      <ProfileBox
        onClick={(event) => {
          if (isBuyer) {
            navigate('/buyer/mypage/viewProfile');
          } else {
            navigate('/seller/mypage/viewProfile');
          }
        }}
      >
        <Char1 />
        {isBuyer ? (
          <Name>김고민</Name>
        ) : (
          <ProfileInfo>
            <Level>
              <Caption2 color={White}>Lv 1</Caption2>
            </Level>
            <Name>연애상담마스터</Name>
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
          text={isBuyer ? '판매자로 전환' : '구매자로 전환'}
          width="10.1rem"
          height="4.2rem"
          border={'1px solid' + (isBuyer ? Green : Red)}
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
          <SelectItem>
            <InfoIcon />
            <Button2>판매 정보</Button2>
          </SelectItem>
          <SelectItem>
            <ReviewIcon />
            <Button2>받은 리뷰</Button2>
          </SelectItem>
        </SelectInfoList>
      ) : (
        <VerifyButtonWrapper>
          <VerifyButton
            width="100%"
            backgroundColor={Red}
            height="5.2rem"
            text="판매자 인증하기"
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
          <ServiceItem>계정 설정</ServiceItem>
        </ServiceList>
      ) : (
        <ServiceList>
          <ServiceItem>서비스 소개</ServiceItem>
          <ServiceItem>알림 설정</ServiceItem>
          <ServiceItem>계정 설정</ServiceItem>
        </ServiceList>
      )}
    </>
  );
};

const ProfileBox = styled.div`
  display: flex;
  height: 10.4rem;
  cursor: pointer;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${White};
  gap: 0.9rem;
`;
const SelectInfoList = styled.div`
  display: flex;
  background-color: ${White};
  justify-content: center;
  gap: 7.2rem;
`;
const SelectItem = styled.div`
  display: flex;
  padding: 0.9rem 0 1.5rem;
  flex-direction: column;
  align-items: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-right: auto;
`;

const Level = styled.div`
  background-color: ${Red};
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
  padding: 1.7rem;
  border-bottom: 1px solid ${Grey6};
  align-items: center;
`;
