import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import { Profile } from 'components/Common/Profile';
import { useEffect, useState } from 'react';
import { getIsPassQuiz, getMyInfo } from 'api/get';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
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
  const [isPass, setIsPass] = useState(undefined);
  useEffect(() => {
    const fetchMyInfo = async () => {
      const res: any = await getMyInfo();
      if (!res?.data?.isEducated) {
        const isPassRes: any = await getIsPassQuiz();
        setIsPass(isPassRes?.data);
      }
      setUserInfo(res?.data);
    };
    fetchMyInfo();
  }, []);
  console.log(userInfo);
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
        profileIdentifier={consultStyleToCharNum(userInfo?.consultStyle)}
        isBuyer={false}
        isPass={isPass}
      />
    </>
  );
};
