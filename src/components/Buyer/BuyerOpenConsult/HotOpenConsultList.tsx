import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as FireIcon } from 'assets/icons/icon-fire.svg';
import { Body4 } from 'styles/font';
import { Grey6 } from 'styles/color';
import { getCustomerPopularConsultList } from 'api/get';
import { useNavigate } from 'react-router-dom';

//
//
//
interface apiHotConsultObj {
  postId: number;
  title: string;
}

//
//
//

const HotOpenConsultList = () => {
  const navigate = useNavigate();

  const [hotConsultList, setHotConsultList] = useState<apiHotConsultObj[]>([]);

  //
  //
  //
  useEffect(() => {
    const fetchHotConsultList = async () => {
      try {
        const params = {
          postId: 0,
          finishedAt: new Date().toISOString().slice(0, 19),
        };

        const res: any = await getCustomerPopularConsultList({ params });
        if (res.status === 200) {
          console.log(res);
          setHotConsultList(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchHotConsultList();
  }, []);

  //
  //
  //

  return (
    <>
      <FireIcon />

      {hotConsultList?.map((item) => (
        <HotTitleItem
          key={item.postId}
          onClick={() => {
            navigate(`/open-consult/${item.postId}`);
          }}
        >
          <Body4>
            {item.title.length > 19
              ? item.title.slice(0, 19) + '...'
              : item.title}
          </Body4>
        </HotTitleItem>
      ))}
    </>
  );
};

//
//
//

const HotTitleItem = styled.div`
  padding: 1.2rem 1.6rem;
  cursor: pointer;
  background-color: ${Grey6};
  border-radius: 1.2rem;
`;

export default HotOpenConsultList;
