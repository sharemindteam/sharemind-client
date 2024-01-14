import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import { Profile } from 'components/Common/Profile';
export const SellerMypage = () => {
  const navigate = useNavigate();
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
