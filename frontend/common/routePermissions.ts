import { ROUTES, USER_ROLES } from './constants';

const commonRoutes = [ROUTES.home];

const userRoutes = [...commonRoutes];

const adminRoutes = [...commonRoutes, ROUTES.admin.home];

export const routePermissions = {
  [USER_ROLES.PUBLIC]: commonRoutes,
  [USER_ROLES.USER]: userRoutes,
  ADMIN: adminRoutes,
};
