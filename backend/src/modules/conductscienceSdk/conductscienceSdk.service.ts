import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ConductscienceSdkService {
  private readonly conductscienceApiInstance = axios.create({
    baseURL: 'https://conductscience.com',
    auth: {
      username: this.configService.get('CS_CONSUMER_KEY'),
      password: this.configService.get('CS_COUNSUMER_SECRET'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  products = {
    getByTitle: async (payload: {
      title: string;
    }): Promise<
      {
        id: number;
        title: string;
        link: string;
      }[]
    > => {
      try {
        const { data } = await this.conductscienceApiInstance.get(
          'wp-json/wc/v3/product-by-title',
          {
            params: payload,
          },
        );

        return data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  };
}
