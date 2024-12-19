import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as MOCKED_PRODUCTS from './data-source/products-data-source.json';
import { knexInstance } from 'src/common/setups';

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
    getAll: async () => {
      if (this.configService.get('NODE_ENV') === 'development') {
        return MOCKED_PRODUCTS;
      }

      return knexInstance('ghew_posts as p')
        .select(
          'p.post_name',
          'p.post_title',
          't.name as category_name',
          't.slug as category_slug',
        )
        .join('ghew_term_relationships as tr', 'p.ID', 'tr.object_id') // Join with term_relationships
        .join(
          'ghew_term_taxonomy as tt',
          'tr.term_taxonomy_id',
          'tt.term_taxonomy_id',
        ) // Join with term_taxonomy
        .join('ghew_terms as t', 'tt.term_id', 't.term_id') // Join with terms
        .where('p.post_type', 'product')
        .andWhere('tt.taxonomy', 'product_cat')
        .andWhere('p.post_status', 'publish');
    },
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
