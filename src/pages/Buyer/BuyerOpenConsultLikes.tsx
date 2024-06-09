import AppHeader from 'components/Common/AppHeader';
import { useNavigate } from 'react-router-dom';

//
//
//

const BuyerOpenConsultLikes = () => {
  const navigate = useNavigate();

  //
  //
  //

  return (
    <>
      <AppHeader
        title="인기글"
        onBackClick={() => {
          navigate('/open-consult');
        }}
      />
    </>
  );
};

export default BuyerOpenConsultLikes;
