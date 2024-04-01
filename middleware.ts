import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkToken } from "./app/components/useful";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let path = request.nextUrl.pathname;
  let token = request.cookies.get("access_token")?.value;

  const check = await checkToken(token || "");

  if (!token && path !== "/login" && path !== "/signup") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && check.isValid && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && !check.isValid) {
    request.cookies.delete("access_token");
    request.cookies.delete("refresh_token");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/signup", "/", "/forum"],
};
