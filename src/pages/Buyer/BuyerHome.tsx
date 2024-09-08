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
import { getRandomCounselors } from 'api/get';

//
//
//

export const BuyerHome = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<SearchResultData[]>([]);

  const [isViewManyLoved, setIsViewManyLoved] = useState<boolean>(false);

  //
  //
  //
  useEffect(() => {
    const fectchSearchResults = async () => {
      try {
        const body = {
          index: 0,
        };
        const res: any = await patchCounselorsAll('POPULARITY', body);
        if (res.status === 200) {
          if (res.data.length > 0) {
            setSearchData(res.data);
          } else {
            /** 
             * 많은 셰어에게 사랑을 받았어요
             */
            setIsViewManyLoved(true);
            const params = {
              sortType: 'RANDOM',
              index: 0,
            };
            const res: any = await getRandomCounselors({ params });
            setSearchData(res.data);
          }
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

  //
  //
  //

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
      <HomeConsultInReady
        searchData={searchData}
        isViewManyLoved={isViewManyLoved}
      />
      <HomeAboutFooterSection isBuyer={true} />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
`;
