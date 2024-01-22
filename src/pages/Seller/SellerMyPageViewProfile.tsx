import { getProfiles } from 'api/get';
import { ViewProfileHeader } from 'components/Seller/SellerMyPageViewProfile/ViewProfileHeader';
import { ViewProfileMainSection } from 'components/Seller/SellerMyPageViewProfile/ViewProfileMainSection';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export interface ProfileData {
  counselorId: string;
  nickname: string;
  consultCategories: string[];
  consultStyle: string;
  consultTypes: string[];
  consultTimes: any;
  consultCosts: any;
  introduction: string;
  experience: string;
}
export const SellerMypageViewProfile = () => {
  const [profile, setProfile] = useState<ProfileData>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMinderProfile = async () => {
      try {
        const profileRes: any = await getProfiles();
        console.log(profileRes);
        if (profileRes?.response?.status === 404) {
          alert('마인더 인증을 통과한 뒤 판매 정보를 등록할 수 있습니다.');
          navigate('/seller/mypage');
        }
        setProfile(profileRes.data);
      } catch (err) {
        alert('판매 정보 가져오는도중 에러 발생');
        navigate('/seller/mypage');
      }
    };
    fetchMinderProfile();
  }, []);

  return (
    <>
      <ViewProfileHeader />
      <ViewProfileMainSection
        profileIdentifier={3}
        name={profile?.nickname}
        category={profile?.consultCategories}
        chatStyle={profile?.consultStyle}
        type={profile?.consultTypes}
        chatTime="1시간"
        letterFee={profile?.consultCosts?.편지}
        chatFee={profile?.consultCosts?.채팅}
        oneLiner={profile?.introduction}
        experience={profile?.experience}
        // accountNum="1234567890000"
        // bankType="우리은행"
        // bankOwner="정인영"
      />
    </>
  );
};
