import { NextRequest, NextResponse } from 'next/server';
import { User, UserRole } from './common/types/user.types';
import { USER_ROLES } from './common/constants/user.constants';
import { routePermissions } from './common/routePermissions';
import { ROUTES } from './common/constants';

export const middleware = async (request: NextRequest) => {
  const url = request.nextUrl.clone();

  if (
    url.href.includes('api') ||
    url.href.includes('_next') ||
    url.href.includes('static') ||
    url.href.includes('image') ||
    url.href.includes('favicon')
  )
    return;

  let roleName: UserRole | 'PUBLIC' = 'PUBLIC';
  let user: User | null = null;

  const cookie = request.cookies.get('accessToken');
  const accessToken = cookie?.value;

  if (accessToken) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is not defined');

    const userRes = await fetch(`${apiUrl}/user/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userRes.ok) {
      const data = await userRes.json();
      if (data?.statusCode !== 401) {
        throw data;
      }
    } else {
      user = await userRes.json();
      roleName = user?.role || 'PUBLIC';
    }
  }

  const headers = new Headers(request.headers);
  headers.set(
    'user',
    JSON.stringify({
      id: user?.id,
      username: user?.username,
      role: user?.role,
    })
  );

  const allowedRoutes = routePermissions[roleName];
  if (
    !allowedRoutes.find((route) => url.pathname.includes(route)) &&
    url.pathname !== '/'
  ) {
    const response = NextResponse.redirect(new URL(ROUTES.home), {
      headers,
    });
    if (roleName === USER_ROLES.PUBLIC && accessToken) {
      response.cookies.delete('accessToken');
      response.cookies.delete('user');
    } else {
      response.cookies.set('user', JSON.stringify(user));
    }

    return response;
  } else {
    const response = NextResponse.next({
      request: {
        headers,
      },
    });
    if (roleName === USER_ROLES.PUBLIC && accessToken) {
      response.cookies.delete('accessToken');
      response.cookies.delete('user');
    } else {
      response.cookies.set('user', JSON.stringify(user));
    }
    return response;
  }
};
