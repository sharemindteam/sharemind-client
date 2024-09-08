import styled from 'styled-components';
import { Button } from './Button';
import { Black, Green, Grey6, LightGreen, White } from 'styles/color';
import { Button2, Caption1, Caption2, Subtitle } from 'styles/font';
import { ReactComponent as InfoIcon } from 'assets/icons/info.svg';
import { ReactComponent as ReciptIcon } from 'assets/icons/recipt.svg';
import { ReactComponent as ReviewIcon } from 'assets/icons/review.svg';
import { ReactComponent as SaveIcon } from 'assets/icons/save.svg';
import { ReactComponent as RightArrowIcon } from 'assets/icons/right-arrow-green.svg';
import { useNavigate } from 'react-router-dom';
import { Characters } from 'utils/Characters';
import { Flex } from './Flex';
interface ProfileProps {
  isBuyer: boolean;
  isVerified?: undefined | boolean;
  profileIdentifier: number | null | undefined;
  name: string | undefined;
  levelStatus: string | undefined;
  isPass?: boolean | undefined;
  profileStatus: string | undefined;
}
//일단 프로필 이미지는 한개만 불러왔음!
export const Profile = ({
  isBuyer,
  isVerified = false,
  profileIdentifier,
  name,
  levelStatus,
  isPass,
  profileStatus,
}: ProfileProps) => {
  const navigate = useNavigate();
  console.log(profileStatus);
  return (
    <>
      <ProfileBox>
        {/* 프로플 만들지 않았을 때, 기본 프로필을 4번으로 */}
        <Characters number={profileIdentifier ?? 4} width="7.6rem" />

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
              navigate('/minder/mypage');
            } else {
              navigate('/mypage');
            }
            event?.stopPropagation();
          }}
          text={isBuyer ? '마인로 전환' : '셰어로 전환'}
          width="10.1rem"
          height="4.2rem"
          border={'1px solid' + (isBuyer ? Green : Green)}
          buttonTextType={2}
          backgroundColor={LightGreen}
          color={Black}
        />
      </ProfileBox>

      {profileStatus === 'EVALUATION_FAIL' && (
        <EvaluationFailStatusSection>
          <div className="navigate-button">
            <Caption1 color={Green}>판매정보 업데이트에 실패했어요.</Caption1>
            <Flex>
              <Caption1 color={Green}>자세히 보기</Caption1>
              <RightArrowIcon />
            </Flex>
          </div>
        </EvaluationFailStatusSection>
      )}

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
              navigate('/minder/mypage/viewProfile');
            }}
          >
            <InfoIcon />
            <Button2>판매 정보</Button2>
          </SelectItem>
          <SelectItem
            onClick={() => {
              navigate('/minder/mypage/review');
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
              if (isPass) {
                navigate('/minder/education/first');
              } else {
                alert(
                  '마지막 인증 시험을 본 시간에서 24시간 이후에 시험을 응시할 수 있어요.',
                );
              }
            }}
            width="100%"
            backgroundColor={Green}
            height="5.2rem"
            text="마인더 인증하기"
            isActive={isPass}
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
          <ServiceItem
            onClick={() => {
              navigate('/service');
            }}
          >
            서비스 소개
          </ServiceItem>
          <ServiceItem
            onClick={() => {
              window.open(process.env.REACT_APP_TEMP_CUSTOMER_SERVICE_URL);
            }}
          >
            정산 문의
          </ServiceItem>
          <ServiceItem
            onClick={() => {
              navigate('/minder/setting');
            }}
          >
            계정 설정
          </ServiceItem>
        </ServiceList>
      ) : (
        <ServiceList>
          <ServiceItem
            onClick={() => {
              navigate('/service');
            }}
          >
            서비스 소개
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
  line-height: 150%;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  padding: 1.2rem 2rem;
  border-bottom: 1px solid ${Grey6};
  align-items: center;
`;

const EvaluationFailStatusSection = styled.section`
  background-color: white;
  padding: 0.8rem 2rem;
  .navigate-button {
    border-radius: 0.8rem;
    margin: 0 auto;
    background-color: ${Grey6};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    cursor: pointer;
    height: 4.2rem;
  }
`;
