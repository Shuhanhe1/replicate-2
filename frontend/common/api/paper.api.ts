import { PaginatedResponse, PaginationQuery, Paper } from '../types';
import { api } from './api';

export const paperApi = {
  getAll: async (payload: { pagination: PaginationQuery }) => {
    const { data } = await api.get<PaginatedResponse<Paper>>('/paper', {
      params: payload.pagination,
    });

    return data;
  },

  delete: async (slug: string) => {
    await api.delete(`/paper/${slug}`);
  },
};
