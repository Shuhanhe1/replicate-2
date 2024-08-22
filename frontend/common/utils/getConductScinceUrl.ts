export const getConductScienceUrl = (path: string = '') => {
  return `${process.env.NEXT_PUBLIC_CONDUCTSCIENCE_URL}/${path}`;
};
