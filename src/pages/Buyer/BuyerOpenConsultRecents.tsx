import AppHeader from 'components/Common/AppHeader';
import { useNavigate } from 'react-router-dom';

//
//
//

const BuyerOpenConsultRecents = () => {
  const navigate = useNavigate();
  //
  //
  //
  return (
    <>
      <AppHeader
        title="최신글"
        onBackClick={() => {
          navigate('/open-consult');
        }}
      />
    </>
  );
};

export default BuyerOpenConsultRecents;
