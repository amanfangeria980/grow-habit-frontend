import { NextResponse } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/admin", "/save-details"];
const isAuthRoutes = ["/login", "/signup"];

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isProtectedRoute = protectedRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
    );

    if (!isLoggedIn && isProtectedRoute) {
        return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }

    if (
        isLoggedIn &&
        isAuthRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
    ) {
        return NextResponse.redirect(new URL("/user-home", req.nextUrl.origin));
    }

    return NextResponse.next();
});
