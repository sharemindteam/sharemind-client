import { useState } from 'react';
import styled from 'styled-components';
import { Button2, Subtitle } from 'styles/font';

import { Grey1, Grey4 } from 'styles/color';
import { ReactComponent as XIcon } from 'assets/icons/icon-grey-x.svg';
export const SearchRecent = () => {
  const [recentSearch, setRecentSearch] = useState<string[]>([
    '속풀이',
    '심층 상담',
    '공감',
    '무조건 공감',
    '환승 이별',
    '썸 심리',
  ]);
  const handleXonClick = (targetIndex: number) => {
    const update = recentSearch.filter((_, index) => index !== targetIndex);
    setRecentSearch(update);
  };
  return (
    <Wrapper>
      <Subtitle>최근 검색어</Subtitle>
      <TagWrapper>
        {recentSearch.map((value, index) => {
          return (
            <RecentTag>
              <Button2 color={Grey1}>{value}</Button2>
              <XIcon onClick={() => handleXonClick(index)} />
            </RecentTag>
          );
        })}
      </TagWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 1.2rem 0 1.7rem 2rem;
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
`;
const TagWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
  padding-top: 0.7rem;
  padding-left: 0.1rem;
  overflow-x: scroll;
  height: 3.4rem;
`;
