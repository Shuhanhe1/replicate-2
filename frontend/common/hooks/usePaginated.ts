import { useEffect, useState } from 'react';
import { PaginatedResponse, PaginationQuery } from '../types';

export const usePaginated = <T>(
  api: (payload: {
    pagination: PaginationQuery;
  }) => Promise<PaginatedResponse<T>>,
  pagination: PaginationQuery
): PaginatedResponse<T> & { refetch: () => void } => {
  const [data, setData] = useState<PaginatedResponse<T>>({
    data: [],
    pagination: {
      page: pagination.page,
      pageSize: 0,
      total: 0,
    },
  });

  const fetch = async () => {
    const data = await api({ pagination });
    setData(data);
  };

  useEffect(() => {
    fetch();
  }, [pagination]);

  return { ...data, refetch: fetch };
};
