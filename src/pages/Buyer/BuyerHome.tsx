import { CartegorySearch } from 'components/Buyer/Common/CartegorySearch';
import { HomeConsultInProgress } from 'components/Buyer/BuyerHome/HomeConsultInProgress';
import { HomeConsultInReady } from 'components/Buyer/BuyerHome/HomeConsultInReady';
import { Header } from 'components/Common/Header';
import { TabA1 } from 'components/Common/TabA1';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeAboutFooterSection from 'components/Common/HomeAboutFooterSection';
import { SearchResultData } from 'utils/type';
import { useEffect, useState } from 'react';
import { patchCounselorsAll } from 'api/patch';
export const BuyerHome = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<SearchResultData[]>([]);
  useEffect(() => {
    const fectchSearchResults = async () => {
      try {
        const body = {
          index: 0,
        };
        const res: any = await patchCounselorsAll('POPULARITY', body);
        if (res.status === 200) {
          setSearchData(res.data);
        } else if (res.response.status === 404) {
          alert('유효하지 않은 정렬 방식입니다.');
          navigate('/share');
        }
      } catch (e) {
        alert(e);
      }
    };
    fectchSearchResults();
  }, [navigate]);
  return (
    <Wrapper>
      <Header
        isBuyer={true}
        onClick={() => {
          navigate('/share');
        }}
      />
      <TabA1 isBuyer={true} initState={1} />
      <CartegorySearch />
      <HomeConsultInProgress />
      <HomeConsultInReady searchData={searchData} />
      <HomeAboutFooterSection isBuyer={true} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
`;
