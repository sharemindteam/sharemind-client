import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsCustomersPublicLikes } from 'api/get';
import { getPostsCustomersPublicLikesResponse } from 'components/Buyer/BuyerOpenConsult/HotOpenConsultList';
import OpenConsultCard from 'components/Buyer/BuyerOpenConsult/OpenConsultCard';
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

const LIKE_LIST_PER_PAGE = 4;

//
//
//

const BuyerOpenConsultLikes = () => {
  const navigate = useNavigate();

  const {
    data: hotConsults,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoadingError,
  } = useInfiniteQuery<getPostsCustomersPublicLikesResponse[]>({
    queryKey: ['infiniteGetPostsCustomersPublicLikes'],
    queryFn: async ({ pageParam }) =>
      await getPostsCustomersPublicLikes(pageParam).then((res) => res.data),
    initialPageParam: {
      postId: 0,
      finishedAt: new Date().toISOString().slice(0, 19),
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length < LIKE_LIST_PER_PAGE) {
        return undefined;
      }

      const lastItem = lastPage[lastPage.length - 1];

      return {
        postId: lastItem.postId,
        finishedAt: lastItem.finishedAt,
      };
    },
  });

  const hotConsultList = useMemo(
    () => hotConsults?.pages.flatMap((consult) => consult) ?? [],
    [hotConsults],
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
        title="인기글"
        onBackClick={() => {
          navigate('/open-consult');
        }}
      />
      <Flex direction="column" gap="1.2rem" padding="1.6rem 2rem 7.2rem 2rem">
        {hotConsultList?.map((consult) => (
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

export default BuyerOpenConsultLikes;
