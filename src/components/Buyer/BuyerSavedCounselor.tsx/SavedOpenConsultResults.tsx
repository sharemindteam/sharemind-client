import { openConsultApiObject } from 'pages/Buyer/BuyerConsult';
import styled from 'styled-components';
import SavedOpenConsultCard from './SavedOpenConsultCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostScraps } from 'api/get';
import { useMemo } from 'react';
import useInfiniteObserver from 'hooks/useInfiniteObserver';
import { Space } from 'components/Common/Space';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import EmptySection from 'components/Common/EmptySection';

//
//
//

const INFINITE_POST_SCRAPS_QUERY_KEY = 'infiniteGetPostScraps';

const POST_SCRAPS_PER_PAGE = 6;

//
//
//

function SavedOpenConsultResults() {
  //
  //
  //
  const {
    data: openConsults,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoadingError,
  } = useInfiniteQuery<openConsultApiObject[]>({
    queryKey: [INFINITE_POST_SCRAPS_QUERY_KEY],
    queryFn: async ({ pageParam }) =>
      await getPostScraps({ params: pageParam }).then((res: any) => res.data),
    initialPageParam: {
      postScrapId: 0,
      scrappedAt: new Date().toISOString().slice(0, 19),
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length < POST_SCRAPS_PER_PAGE) {
        return undefined;
      }

      const lastItem = lastPage[lastPage.length - 1];

      return {
        postScrapId: lastItem.postScrapId,
        scrappedAt: lastItem.scrappedAt,
      };
    },
  });

  const openConsultList = useMemo(
    () => openConsults?.pages.flatMap((consult) => consult) ?? [],
    [openConsults],
  );

  const { observerElem } = useInfiniteObserver({
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoadingError,
  });

  //
  //
  //

  if (isFetching && !isFetchingNextPage) {
    return (
      <div
        style={{
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (openConsultList.length === 0) {
    return <EmptySection title="아직 저장한 공개상담이 없어요." />;
  }

  return (
    <Wrapper>
      {openConsultList.map((card) => (
        <SavedOpenConsultCard item={card} />
      ))}
      <div ref={observerElem} />
      <Space height="3.5rem" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  box-sizing: border-box;
  padding: 0 2rem;
  align-items: center;
  width: 100%;
`;

export default SavedOpenConsultResults;
