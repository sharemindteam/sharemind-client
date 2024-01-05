import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { SellerConsultSection } from 'components/Seller/SellerConsult/SellerConsultSection';
import { useNavigate } from 'react-router-dom';
export const SellerConsult = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header
        isBuyer={false}
        onClick={() => {
          navigate('/seller');
        }}
      />
      <TabA1 isBuyer={false} initState={2} />
      <SellerConsultSection />
    </>
  );
};
