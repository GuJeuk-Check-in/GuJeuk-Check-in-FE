import { UserVisitListFeature, useDeleteVisitMutation, useInfiniteUserVisitList } from '@features/log/visit-list';

const UserVisitList = () => {
  const { data, isLoading, isError, errorUpdatedAt, hasNextPage, fetchNextPage, refetch } = useInfiniteUserVisitList();
  const { mutateAsync: deleteVisit } = useDeleteVisitMutation();

  return (
    <UserVisitListFeature
      visits={data?.pages.flatMap((page) => page.visits)}
      isLoading={isLoading}
      isLast={!hasNextPage}
      isError={isError}
      failedAt={errorUpdatedAt}
      onLoadMore={() => void fetchNextPage()}
      onRetry={() => void refetch()}
      onDelete={deleteVisit}
    />
  );
};

export default UserVisitList;
