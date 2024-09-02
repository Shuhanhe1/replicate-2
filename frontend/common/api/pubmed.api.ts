import { api } from './api';
import * as cheerio from 'cheerio';
import { createPubmedUrl } from '../utils';

export const pubmedApi = {
  getCitationsNumber: async (pubmedId: string) => {
    try {
      const { data } = await api.get(
        createPubmedUrl(`/?linkname=pubmed_pubmed_citedin&from_uid=${pubmedId}`)
      );

      const $ = cheerio.load(data);

      const total = Number($('.results-amount .value').first().text());
      return total;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
