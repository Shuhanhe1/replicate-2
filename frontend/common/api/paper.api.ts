import {
  PaginatedResponse,
  PaginationQuery,
  Paper,
  PaperDetailed,
} from '../types';
import {
  ExperimentItemData,
  UpdateExperimentData,
} from '../types/experiment.types';
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

  get: async (slug: string) => {
    const { data } = await api.get<PaperDetailed>(`/paper/${slug}`);

    return data;
  },

  update: async (
    slug: string,
    body: { experiments: UpdateExperimentData[] }
  ) => {
    await api.put(`/paper/${slug}`, body);
  },
};
