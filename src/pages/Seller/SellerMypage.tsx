import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import { Profile } from 'components/Common/Profile';
import { useEffect, useState } from 'react';
import { getIsPassQuiz, getMyInfo } from 'api/get';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import { useRecoilState } from 'recoil';
import { isLoadingState } from 'utils/atom';
import { LoadingSpinner } from 'utils/LoadingSpinner';

//
//
//

interface UserInfo {
  nickname: string;
  level: string;
  isEducated: boolean;
  consultStyle: string;
  profilesStatus: string;
}

//
//
//

export const SellerMypage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [isPass, setIsPass] = useState(undefined);
  const [isLoading, setIsLoading] = useRecoilState<boolean>(isLoadingState);

  //
  //
  //
  useEffect(() => {
    const fetchMyInfo = async () => {
      setIsLoading(true);
      const res: any = await getMyInfo();
      if (!res?.data?.isEducated) {
        const isPassRes: any = await getIsPassQuiz();
        setIsPass(isPassRes?.data);
      }
      setUserInfo(res?.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };

    fetchMyInfo();
  }, []);

  //
  //
  //

  return (
    <>
      <Header
        isBuyer={false}
        onClick={() => {
          navigate('/minder');
        }}
      />
      <TabA1 isBuyer={false} initState={4} />
      {isLoading ? (
        <div
          style={{
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <Profile
          name={userInfo?.nickname}
          levelStatus={userInfo?.level}
          isVerified={userInfo?.isEducated}
          profileIdentifier={consultStyleToCharNum(userInfo?.consultStyle)}
          isBuyer={false}
          isPass={isPass}
        />
      )}
    </>
  );
};
