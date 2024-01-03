import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import styled from 'styled-components';
import { ReactComponent as Char1 } from 'assets/characters/char1.svg';
import { Profile } from 'components/Common/Profile';
export const SellerMypage = () => {
  return (
    <>
      <Header
        isBuyer={false}
        onClick={() => {
          navigate('/seller');
        }}
      />
      <TabA1 isBuyer={false} initState={3} />
      <Profile />
    </>
  );
};

const MyProfileSection = styled.div``;
