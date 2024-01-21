import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import { Profile } from 'components/Common/Profile';
import { useEffect, useState } from 'react';
import { getMyInfo } from 'api/get';
interface UserInfo {
  nickname: string;
  level: string;
  isEducated: boolean;
  consultStlyle: string;
  profilesStatus: string;
}
export const SellerMypage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const fetchMyInfo = async () => {
      const res: any = await getMyInfo();
      setUserInfo(res.data);
    };
    fetchMyInfo();
  }, []);
  return (
    <>
      <Header
        isBuyer={false}
        onClick={() => {
          navigate('/seller');
        }}
      />
      <TabA1 isBuyer={false} initState={3} />
      <Profile
        name={userInfo?.nickname}
        levelStatus={userInfo?.level}
        isVerified={userInfo?.isEducated}
        profileIdentifier={1}
        isBuyer={false}
      />
    </>
  );
};
