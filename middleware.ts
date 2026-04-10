import { NextRequest, NextResponse } from "next/server";

const disabledPathPrefixes = [
  "/polls",
  "/admin",
  "/api/polls",
  "/api/newsletter",
  "/api/admin",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isDisabled = disabledPathPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (!isDisabled) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}

export const config = {
  matcher: ["/polls/:path*", "/admin/:path*", "/api/polls/:path*", "/api/newsletter/:path*", "/api/admin/:path*"],
};
