export const redirect = (url: string, params?: { newTab: boolean }) => {
  if (params?.newTab) return window.open(url, '_blank');
  window.location.href = url;
};
