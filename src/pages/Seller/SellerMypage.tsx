import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import styled from 'styled-components';
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
      <Profile isBuyer={false} isVerified={true} profileIdentifier={1} />
    </>
  );
};
