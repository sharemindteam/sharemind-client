import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsCustomersPublic } from 'api/get';
import OpenConsultCard from 'components/Buyer/BuyerOpenConsult/OpenConsultCard';
import { getPostsCustomersPublicResponse } from 'components/Buyer/BuyerOpenConsult/OpenConsultList';
import AppHeader from 'components/Common/AppHeader';
import { Button } from 'components/Common/Button';
import { Flex } from 'components/Common/Flex';
import useInfiniteObserver from 'hooks/useInfiniteObserver';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
      await getPostsCustomersPublic(pageParam).then((res) => res.data),
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
    () => recentConsults?.pages.flatMap((consult) => consult) ?? [],
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
      <Flex
        direction="column"
        gap="1.2rem"
        style={{ padding: '1.6rem 2rem 7.2rem 2rem' }}
      >
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
      <ButtonWrapper>
        <Button
          text="공개상담 신청하기"
          width="100%"
          height="5.2rem"
          onClick={() => {
            navigate('/openConsultRequest');
          }}
        />
      </ButtonWrapper>
    </>
  );
};

//
//
//

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 1.5rem;
  @media (min-width: 768px) {
    width: 375px;
  }
`;

export default BuyerOpenConsultRecents;
