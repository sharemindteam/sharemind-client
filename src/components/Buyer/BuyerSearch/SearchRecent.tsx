import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button2, Subtitle } from 'styles/font';

import { Grey1, Grey4 } from 'styles/color';
import { ReactComponent as XIcon } from 'assets/icons/icon-grey-x.svg';
import { getSearchWords } from 'api/get';
export const SearchRecent = () => {
  const [recentSearch, setRecentSearch] = useState<string[]>([
    '어쩌구',
    '어쩌구',
    '어쩌구',
    '어쩌구',
    '어쩌구',
    '어쩌구',
    '어쩌구',
  ]);
  const handleXonClick = (targetIndex: number) => {
    const update = recentSearch.filter((_, index) => index !== targetIndex);
    setRecentSearch(update);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await getSearchWords();
        if (res.status === 200) {
          setRecentSearch(res.data);
        } else if (res.response.status === 404) {
          // 스웨거 문서 잘못된거 같아서 추후 수정
          // 지금 검색할 수 있는 로직이 없어서 나중에 연결
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
                <XIcon onClick={() => handleXonClick(index)} />
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
  height: 3.4rem;
`;
