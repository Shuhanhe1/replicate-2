import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConductscienceSdkService } from '../conductscienceSdk/conductscienceSdk.service';
import { typesense } from 'src/common/setups';
import { ConfigService } from '@nestjs/config';

interface SearchParams {
  min_text_match: number;
}

interface ProductSearchResult {
  id: string;
  name: string;
  title: string;
}

@Injectable()
export class ProductService implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    private readonly conductscienceSdkService: ConductscienceSdkService,
  ) {}

  async onApplicationBootstrap() {
    const productsSchema = {
      name: 'products',
      fields: [
        {
          name: 'name',
          type: 'string',
        },
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'embedding',
          type: 'float[]',
          embed: {
            from: ['title'],
            model_config: {
              model_name: 'ts/all-MiniLM-L12-v2',
            },
          },
        },
      ],
    };

    if (!(await typesense.collections('products').exists())) {
      await typesense
        .collections()
        // @ts-ignore
        .create(productsSchema);
    }

    await this.improtToSearchEngine();
  }

  private async improtToSearchEngine() {
    const products = await this.conductscienceSdkService.products.getAll();

    await typesense.collections('products').documents().delete({
      filter_by: 'id:>0',
    });
    await typesense
      .collections('products')
      .documents()
      .import(
        products.map((product) => ({
          name: product.post_name,
          title: product.post_title,
        })),
      );
  }

  async search(
    query: string,
    params?: SearchParams,
  ): Promise<{ document: ProductSearchResult }[]> {
    let { hits } = await typesense.collections('products').documents().search({
      q: query,
      query_by: 'name,title',
      exclude_fields: 'embedding',
      //num_typos: 2, // Allow for some typos
    });

    if (params?.min_text_match) {
      hits = hits.filter((hit) => hit.text_match >= params.min_text_match);
    }

    return hits as { document: ProductSearchResult }[];
  }

  async searchOne(
    query: string,
    params?: SearchParams,
  ): Promise<{ document: ProductSearchResult } | null> {
    const matches = await this.search(query, params);

    return matches[0] || null;
  }
}
