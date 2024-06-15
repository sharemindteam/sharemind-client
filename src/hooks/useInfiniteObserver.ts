import { useEffect, useRef } from 'react';

//
//
//

interface UseInfiniteObserverParams {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  isLoadingError: boolean;
}

interface UseInfiniteObserverReturns {
  observerElem: React.RefObject<HTMLDivElement>;
}

type UseInfiniteObserver = (
  params: UseInfiniteObserverParams,
) => UseInfiniteObserverReturns;

//
//
//

export const useInfiniteObserver: UseInfiniteObserver = ({
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  isLoadingError,
}) => {
  const observerElem = useRef<HTMLDivElement>(null);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      void fetchNextPage();
    }
  };

  //
  //
  //
  useEffect(() => {
    if (!hasNextPage || isFetching || isFetchingNextPage || isLoadingError) {
      return;
    }

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    const observerEl = observerElem.current;

    if (observerEl) observer.observe(observerEl);

    return () => {
      if (observerEl) observer.unobserve(observerEl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoadingError,
    observerElem,
  ]);

  return { observerElem };
};

export default useInfiniteObserver;
