import { getCounselorsAll } from 'api/get';
import {
  CounselorExp,
  CounselorFooter,
  CounselorInfo,
  CounselorProfileCard,
  CounselorProfileHeader,
  CounselorProfileNav,
  CounselorReview,
  CounselorTypeSection,
} from 'components/Buyer/BuyerCounselorProfile';

import { Space } from 'components/Common/Space';
import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AppendCategoryType } from 'utils/AppendCategoryType';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import {
  ConsultCosts,
  ConsultTimes,
  GetCounselorsAllResponse,
} from 'utils/type';

//
//
//

const DEFAULT_PROFILE_DATA: GetCounselorsAllResponse = {
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
  totalConsult: 0,
};

//
//
//

export const BuyerCounselorProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [profileData, setProfileData] =
    useState<GetCounselorsAllResponse>(DEFAULT_PROFILE_DATA);

  //로딩 state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //Nav 버튼 toggle
  const [isInfo, setIsInfo] = useState<boolean>(true);

  //
  //
  //
  useLayoutEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res: any = await getCounselorsAll(id);
        if (res.status === 200) {
          setProfileData(res.data);
        } else if (res.response.status === 404) {
          alert('존재하지 않는 상담 아이디입니다.');
          navigate('/share');
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
  }, [id, navigate]);

  //
  //
  //

  if (isLoading) {
    return (
      <>
        <CounselorProfileHeader />
        <Space height="15vh" />
        <LoadingSpinner />
      </>
    );
  }

  if (id !== undefined) {
    const counselorId = parseInt(id, 10);
    return (
      <Wrapper className="header">
        <CounselorProfileHeader />
        <Body>
          <CounselorProfileCard
            nickname={profileData.nickname}
            level={profileData.level}
            rating={profileData.ratingAverage}
            reviewNumber={profileData.totalReview}
            consultStyle={consultStyleToCharNum(profileData.consultStyle) || 9}
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
              <CounselorExp
                experience={profileData.experience}
                introduction={profileData.introduction}
              />
              <CounselorTypeSection
                tagList={AppendCategoryType(
                  profileData.consultCategories,
                  profileData.consultStyle,
                )}
              />
              <Space height="5.2rem" />
            </>
          ) : (
            <CounselorReview counselorId={counselorId} />
          )}
        </Body>
        <CounselorFooter
          counselorId={counselorId}
          isWishList={profileData.isWishList}
          consultTypes={profileData.consultTypes}
        />
      </Wrapper>
    );
  } else {
    return <>404 error</>;
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
