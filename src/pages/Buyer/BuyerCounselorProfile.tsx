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
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AppendCategoryType } from 'utils/AppendCategoryType';
import { counselorDummyData as dummy } from 'utils/buyerDummy';
import { reviewDummy } from 'utils/buyerDummy';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import {
  CartegoryState,
  ConsultCosts,
  ConsultTimes,
  MinderProfile,
} from 'utils/type';
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
    // isWishList: boolean,
    level: 0,
    nickname: '',
    ratingAverage: 0,
    totalReview: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      const res: any = await getCounselors(id);
      if (res.status === 200) {
        setProfileData(res.data);
      } else if (res.response.status === 404) {
        alert('존재하지 않는 상담 아이디입니다.');
        navigate('/buyer');
      }
    };
    fetchData();
  }, []);
  //Nav 버튼 toggle
  const [isInfo, setIsInfo] = useState<boolean>(true);
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
                letterPrice={profileData.consultCosts.편지}
                chattingPrice={profileData.consultCosts.채팅}
              />
              <CounselorExp experience={dummy[1].experience} />
            </>
          ) : (
            <CounselorReview reviewList={reviewDummy} />
          )}
        </Body>
        <CounselorFooter
          counselorId={counselorId}
          isBookmarked={dummy[1].isBookmarked}
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
