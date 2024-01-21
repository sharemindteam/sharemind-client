import { getProfiles } from 'api/get';
import { ViewProfileHeader } from 'components/Seller/SellerMyPageViewProfile/ViewProfileHeader';
import { ViewProfileMainSection } from 'components/Seller/SellerMyPageViewProfile/ViewProfileMainSection';
import { useEffect, useState } from 'react';
interface profileData {
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
  const [profile, setProfile] = useState<profileData>();
  useEffect(() => {
    const fetchMinderProfile = async () => {
      const profileRes: any = await getProfiles();
      setProfile(profileRes.data);
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
