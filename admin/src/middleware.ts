import { NextRequest, NextResponse } from "next/server";
import { EnumTokens } from "./services/auth-token.service";
import { authService } from "./services/auth.service";
import { ADMIN_PAGES } from "./config/pages-url.config";

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request;

  const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;
  const appType = cookies.get("app")?.value;

  const isAuthPage = url.includes("/auth");

  if (isAuthPage && refreshToken && appType) {
    return NextResponse.redirect(new URL(ADMIN_PAGES.STOCKS, url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!refreshToken || appType !== "admin") {
    return NextResponse.redirect(new URL("/auth", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
