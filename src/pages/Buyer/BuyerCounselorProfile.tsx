import { CounselorProfileCard } from 'components/Buyer/BuyerCounselorProfile/CounselorProfileCard';
import { CounselorProfileHeader } from 'components/Buyer/BuyerCounselorProfile/CounselorProfileHeader';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export const BuyerCounselorProfile = () => {
  const { id } = useParams();
  return (
    <Wrapper>
      <CounselorProfileHeader />
      <CounselorProfileCard counselorId={id} />
    </Wrapper>
  );
};
const Wrapper = styled.div``;
