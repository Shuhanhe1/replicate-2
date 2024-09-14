import axios from 'axios';

if (!process.env.CS_CONSUMER_KEY || !process.env.CS_COUNSUMER_SECRET) {
  throw new Error('CS_CONSUMER_KEY and CS_COUNSUMER_SECRET must be defined');
}

const conductscienceApiInstance = axios.create({
  baseURL: 'https://conductscience.com',
  auth: {
    username: process.env.CS_CONSUMER_KEY,
    password: process.env.CS_COUNSUMER_SECRET,
  },
});

export const conductscienceApi = {
  products: {
    get: async (payload: { search: string }) => {
      try {
        const { data } = await conductscienceApiInstance.get(
          'wp-json/wc/v3/products',
          {
            params: payload,
          }
        );

        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  },
};
