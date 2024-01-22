import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button2, Subtitle } from 'styles/font';

import { Grey1, Grey4 } from 'styles/color';
import { ReactComponent as XIcon } from 'assets/icons/icon-grey-x.svg';
import { getSearchWords } from 'api/get';
import { deleteSearchWords } from 'api/delete';
import { instance } from 'api/axios';
export const SearchRecent = () => {
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const handleXonClick = async (targetIndex: number) => {
    const body = {
      word: recentSearch[targetIndex],
    };
    const res: any = await deleteSearchWords(body);
    console.log(res);
    if (res.status === 200) {
      const update = recentSearch.filter((_, index) => index !== targetIndex);
      setRecentSearch(update);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await getSearchWords();
        if (res.status === 200) {
          setRecentSearch(res.data);
        } else if (res.response.status === 404) {
          alert('최근  검색어를 불러올 수 없습니다');
        }
      } catch (e) {
        alert(e);
      }
    };
    fetchData();
  }, []);
  return (
    <Wrapper>
      <Subtitle margin="0 0 0 2rem">최근 검색어</Subtitle>
      <TagWrapper>
        {recentSearch.map((value, index) => {
          if (index === 0) {
            return (
              <RecentTag style={{ marginLeft: '2rem' }}>
                <Button2 color={Grey1}>{value}</Button2>
                <XIcon onClick={() => handleXonClick(index)} />
              </RecentTag>
            );
          } else if (index === recentSearch.length - 1) {
            return (
              <RecentTag style={{ marginRight: '2rem' }}>
                <Button2 color={Grey1}>{value}</Button2>
                <XIcon
                  onClick={() => handleXonClick(index)}
                  style={{ padding: '0.1rem' }}
                />
              </RecentTag>
            );
          } else {
            return (
              <RecentTag>
                <Button2 color={Grey1}>{value}</Button2>
                <XIcon onClick={() => handleXonClick(index)} />
              </RecentTag>
            );
          }
        })}
      </TagWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 1.2rem 0 1.7rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const RecentTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.6rem;
  border-radius: 10rem;
  border: 1px solid ${Grey4};
  white-space: nowrap;
  cursor: pointer;
  box-sizing: border-box;
`;
const TagWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  padding-top: 0.7rem;
  overflow-x: scroll;
`;
