import { api } from './api';

export const uploadApi = {
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
