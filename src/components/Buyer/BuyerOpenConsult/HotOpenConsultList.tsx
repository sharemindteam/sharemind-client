import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as FireIcon } from 'assets/icons/icon-fire.svg';
import { Body4 } from 'styles/font';
import { Grey6 } from 'styles/color';
import { getCustomerPopularConsultList } from 'api/get';
import { useNavigate } from 'react-router-dom';
interface apiHotConsultObj {
  postId: number;
  title: string;
}
function HotOpenConsultList() {
  const [hotConsultList, setHotConsultList] = useState<apiHotConsultObj[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHotConsultList = async () => {
      const res: any = await getCustomerPopularConsultList();
      setHotConsultList(res.data);
    };
    fetchHotConsultList();
  }, []);
  return (
    <HotList>
      <FireIconWrapper>
        <FireIcon />
      </FireIconWrapper>
      {hotConsultList.map((item) => (
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
    </HotList>
  );
}

const HotList = styled.div`
  display: flex;
  white-space: nowrap;
  flex-wrap: nowrap;
  overflow-x: scroll;
  gap: 1.2rem;
  align-items: center;
`;

const HotTitleItem = styled.div`
  padding: 1.2rem 1.6rem;
  cursor: pointer;
  background-color: ${Grey6};
  border-radius: 1.2rem;
`;

const FireIconWrapper = styled.div``;

export default HotOpenConsultList;
