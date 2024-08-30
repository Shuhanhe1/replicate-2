export const createPubmedUrl = (path: string = '') => {
  return `${process.env.NEXT_PUBLIC_PUBMED_URL}${path}`;
};
