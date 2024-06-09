import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsCustomersPublic } from 'api/get';
import OpenConsultCard from 'components/Buyer/BuyerOpenConsult/OpenConsultCard';
import { getPostsCustomersPublicResponse } from 'components/Buyer/BuyerOpenConsult/OpenConsultList';
import AppHeader from 'components/Common/AppHeader';
import { Flex } from 'components/Common/Flex';
import useInfiniteObserver from 'hooks/useInfiniteObserver';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

//
//
//

const RECENT_LIST_PER_PAGE = 4;

//
//
//

const BuyerOpenConsultRecents = () => {
  const navigate = useNavigate();

  const {
    data: recentConsults,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoadingError,
  } = useInfiniteQuery<getPostsCustomersPublicResponse[]>({
    queryKey: ['infiniteGetPostsCustomersPublic'],
    queryFn: async ({ pageParam }) =>
      await getPostsCustomersPublic(pageParam).then((res) => {
        return res?.data;
      }),
    initialPageParam: {
      postId: 0,
      finishedAt: new Date().toISOString().slice(0, 19),
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length < RECENT_LIST_PER_PAGE) {
        return undefined;
      }

      const lastItem = lastPage[lastPage.length - 1];

      return {
        postId: lastItem.postId,
        finishedAt: lastItem.finishedAt,
      };
    },
  });

  const recentConsultList = useMemo(
    () => recentConsults?.pages.flatMap((channel) => channel) ?? [],
    [recentConsults],
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
  return (
    <>
      <AppHeader
        title="최신글"
        onBackClick={() => {
          navigate('/open-consult');
        }}
      />
      <Flex direction="column" gap="1.2rem" padding="1.6rem 2rem 7.2rem 2rem">
        {recentConsultList?.map((consult) => (
          <OpenConsultCard
            key={consult.postId}
            title={consult.title}
            content={consult.content}
            totalLike={consult.totalLike}
            totalScrap={consult.totalScrap}
            totalComment={consult.totalComment}
            updatedAt={consult.updatedAt}
            onClick={() => {
              navigate(`/open-consult/${consult.postId}`);
            }}
          />
        ))}
        <div ref={observerElem} />
      </Flex>
    </>
  );
};

export default BuyerOpenConsultRecents;
