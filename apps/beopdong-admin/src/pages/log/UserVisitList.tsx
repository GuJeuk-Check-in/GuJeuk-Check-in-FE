import { UserVisitListFeature, useDeleteVisitMutation, useInfiniteUserVisitList } from '@features/log/visit-list';

const UserVisitList = () => {
  const { data, isLoading, isFetching, isError, errorUpdatedAt, hasNextPage, fetchNextPage, refetch } = useInfiniteUserVisitList();
  const { mutateAsync: deleteVisit } = useDeleteVisitMutation();

  return (
    <UserVisitListFeature
      visits={data?.pages.flatMap((page) => page.visits)}
      isLoading={isLoading}
      isFetching={isFetching}
      isLast={!hasNextPage}
      isError={isError}
      failedAt={errorUpdatedAt}
      onLoadMore={() => {
        if (!isFetching) void fetchNextPage();
      }}
      onRetry={() => void refetch()}
      onDelete={deleteVisit}
    />
  );
};

export default UserVisitList;
