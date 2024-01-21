import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import { Profile } from 'components/Common/Profile';
import { useEffect } from 'react';
import { getMyInfo } from 'api/get';
export const SellerMypage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMyInfo = async () => {
      const res = await getMyInfo();
      console.log(res);
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
        name="김고민"
        levelStatus={1}
        isVerified={false}
        profileIdentifier={1}
        isBuyer={false}
      />
    </>
  );
};
