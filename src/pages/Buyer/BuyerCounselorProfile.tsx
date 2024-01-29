import { getCounselors } from 'api/get';
import {
  CounselorExp,
  CounselorFooter,
  CounselorInfo,
  CounselorProfileCard,
  CounselorProfileHeader,
  CounselorProfileNav,
  CounselorReview,
} from 'components/Buyer/BuyerCounselorProfile';
import { Space } from 'components/Common/Space';
import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AppendCategoryType } from 'utils/AppendCategoryType';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { ConsultCosts, ConsultTimes, MinderProfile } from 'utils/type';
export const BuyerCounselorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profileData, setProfileData] = useState<MinderProfile>({
    consultCategories: [],
    consultCosts: {} as ConsultCosts,
    consultStyle: '',
    consultTimes: {} as ConsultTimes,
    consultTypes: [],
    counselorId: -1,
    introduction: '',
    isWishList: false,
    experience: '',
    level: 0,
    nickname: '',
    ratingAverage: 0,
    totalReview: 0,
  });
  //로딩 state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useLayoutEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res: any = await getCounselors(id);
        if (res.status === 200) {
          setProfileData(res.data);
        } else if (res.response.status === 404) {
          alert('존재하지 않는 상담 아이디입니다.');
          navigate('/buyer');
        }
      } catch (e) {
        alert(e);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1);
      }
    };
    fetchData();
  }, []);
  //Nav 버튼 toggle
  const [isInfo, setIsInfo] = useState<boolean>(true);
  if (isLoading) {
    return (
      <>
        <CounselorProfileHeader />
        <Space height="15vh" />
        <LoadingSpinner />
      </>
    );
  } else {
    if (id !== undefined) {
      const counselorId = parseInt(id, 10);
      return (
        <Wrapper>
          <CounselorProfileHeader />
          <Body>
            <CounselorProfileCard
              nickname={profileData.nickname}
              level={profileData.level}
              rating={profileData.ratingAverage}
              reviewNumber={profileData.totalReview}
              tagList={AppendCategoryType(
                profileData.consultCategories,
                profileData.consultStyle,
              )}
              consultStyle={consultStyleToCharNum(profileData.consultStyle)}
            />
            <CounselorProfileNav
              isInfo={isInfo}
              setIsInfo={setIsInfo}
              reviewNumber={profileData.totalReview}
            />
            {isInfo ? (
              <>
                <CounselorInfo
                  consultType={profileData.consultTypes}
                  consultTimes={profileData.consultTimes}
                  letterPrice={profileData.consultCosts.편지}
                  chattingPrice={profileData.consultCosts.채팅}
                />
                <CounselorExp experience={profileData.experience} />
              </>
            ) : (
              <CounselorReview counselorId={counselorId} />
            )}
          </Body>
          <CounselorFooter
            counselorId={counselorId}
            isWishList={profileData.isWishList}
          />
        </Wrapper>
      );
    } else {
      return <>404 error</>;
    }
  }
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Body = styled.div`
  min-height: calc(var(--vh, 1vh) * 100 - 12.5rem);
`;
