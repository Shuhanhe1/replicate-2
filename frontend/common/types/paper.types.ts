import { ExperimentItemData } from './experiment.types';

export interface Paper {
  id: string;
  slug: string;
  title: string;
  pubmedId: string;
  tags: string[];
  authors: string[];
  image?: string;
}

export interface PaperDetailed extends Paper {
  experiments: {
    id: string;
    items: ExperimentItemData[];
    title: string;
    instructions: { text: string }[];
    methodologies: { text: string }[];
  }[];
}
