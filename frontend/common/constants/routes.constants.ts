export const ROUTES = {
  home: '/',
  admin: {
    home: '/admin',
  },
  adminPapers: {
    home: '/admin/papers',
    paper: (slug: string) => `/admin/papers/${slug}`,
  },
};
