import styled from 'styled-components';
import { WishlistDataType } from 'utils/type';
import { AppendCategoryType } from 'utils/AppendCategoryType';
import { consultStyleToCharNum } from 'utils/convertStringToCharNum';
import CounselorCard from 'components/Common/CounselorCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { postWishLists } from 'api/post';
import { useMemo } from 'react';
import useInfiniteObserver from 'hooks/useInfiniteObserver';
import { Space } from 'components/Common/Space';
import { LoadingSpinner } from 'utils/LoadingSpinner';
import EmptySection from 'components/Common/EmptySection';

//
//
//

const INFINITE_POST_WISH_LISTS_QUERY_KEY = 'infinitePostWishLists';

const WISH_LIST_PER_PAGE = 4;

//
//
//

export const SavedCounselorResults = () => {
  //
  //
  //
  const {
    data: wishlistData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoadingError,
  } = useInfiniteQuery<WishlistDataType[]>({
    queryKey: [INFINITE_POST_WISH_LISTS_QUERY_KEY],
    queryFn: async ({ pageParam }) =>
      await postWishLists(pageParam).then((res: any) => res.data),
    initialPageParam: {
      wishlistId: 0,
      updatedAt: '',
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length < WISH_LIST_PER_PAGE) {
        return undefined;
      }

      const lastItem = lastPage[lastPage.length - 1];

      return {
        wishlistId: lastItem.wishlistId,
        updatedAt: lastItem.updatedAt,
      };
    },
  });

  const wishlists = useMemo(
    () => wishlistData?.pages.flatMap((wishlist) => wishlist) ?? [],
    [wishlistData],
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

  if (wishlists.length === 0) {
    return (
      <EmptySection
        title="아직 찜한 마인더가 없어요."
        subtitle={`관심 있는 마인더를 찜하고\n더욱 편리하게 상담하세요.`}
      />
    );
  }

  return (
    <Wrapper>
      {wishlists.map((value) => {
        return (
          <CounselorCard
            key={value.wishlistId}
            counselorId={value.counselorId}
            tagList={AppendCategoryType(
              value.consultCategories,
              value.consultStyle,
            )}
            isWishList={true}
            consultStyle={consultStyleToCharNum(value.consultStyle)}
            introduction={value.introduction}
            nickname={value.nickname}
            level={value.level}
            rating={value.ratingAverage}
            totalReview={value.totalReview}
            isSavedCounselorPage={true}
          />
        );
      })}
      <div ref={observerElem} />
      <Space height="3.5rem" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  box-sizing: border-box;
  padding: 0 2rem;
  align-items: center;
  width: 100%;
`;
