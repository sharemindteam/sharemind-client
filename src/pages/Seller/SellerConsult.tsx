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
          navigate('/minder');
        }}
      />
      <TabA1 isBuyer={false} initState={2} />
      <section
        className="consult-container"
        style={{ height: 'calc(100vh - 10.4rem)', overflow: 'scroll' }}
      >
        <SellerConsultSection />
      </section>
    </>
  );
};
