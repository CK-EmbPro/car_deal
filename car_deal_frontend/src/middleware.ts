import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_NAME, CERTAIN_ERROR, FORBIDDEN, JWT_EXPIRED, NOT_LOGGED_IN } from "./constants/common";
import { ADMIN_EMAIL } from "./constants/variables";

const protectedRoutes = ['/cart', '/account', '/success_url', '/cancel_url'];
const adminRoutes = ['/a/da', '/a/other'];

export function middleware(req: NextRequest) {
    const auth_token = req.cookies.get(AUTH_TOKEN_NAME)?.value;
    const loginUrl = new URL('/login', req.url);

    // Check if route requires authentication
    const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);
    const isAdminRoute = adminRoutes.includes(req.nextUrl.pathname);

    // If no token and route requires authentication
    if (!auth_token && (isProtectedRoute || isAdminRoute)) {
        loginUrl.searchParams.set(NOT_LOGGED_IN, 'Please login first');
        return NextResponse.redirect(loginUrl);
    }

    try {
        // Only decode token if we have one
        if (auth_token) {
            const payload = JSON.parse(atob(auth_token.split(".")[1]));
            
            // Check token expiration first
            if (payload.exp) {
                const currentTime = Date.now() / 1000;
                if (currentTime > payload.exp) {
                    const res = NextResponse.redirect(loginUrl);
                    res.cookies.delete(AUTH_TOKEN_NAME);
                    loginUrl.searchParams.set(JWT_EXPIRED, 'Session over, login again');
                    return res;
                }
            }

            // Check user existence and permissions
            const currentUser = payload.user;
            if (!currentUser && isProtectedRoute) {
                loginUrl.searchParams.set(NOT_LOGGED_IN, 'Invalid user session');
                return NextResponse.redirect(loginUrl);
            }

            // Check admin privileges
            if (isAdminRoute && (!currentUser || currentUser.email !== ADMIN_EMAIL)) {
                loginUrl.searchParams.set(FORBIDDEN, 'Requires admin privileges');
                return NextResponse.redirect(loginUrl);
            }
        }

        return NextResponse.next();

    } catch (error) {
        loginUrl.searchParams.set(CERTAIN_ERROR, 'An error occurred, login again');
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    // matcher: [...protectedRoutes, ...adminRoutes]
    matcher: ['/cart', '/account', '/success_url', '/cancel_url', '/a/da', '/a/other']
};