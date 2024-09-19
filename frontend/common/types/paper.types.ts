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
    items: {
      material: string;
      usage: string;
      supplier: string;
      url?: string;
    }[];
    title: string;
    instructions: { text: string }[];
    methodologies: { text: string }[];
  }[];
}
