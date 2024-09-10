import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // 토큰이 없고 /api 요청이라면 바로 Authentication Error 반환
  if (!token) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return new NextResponse("Authentication Error", { status: 401 });
    }

    // /api로 요청이 오면 무조건 토큰 인증을 거치고 없다면 홈 url로 리다이렉트
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// match에 경로를 설정하면 해당 경로는 무조건 미들웨어를 거처간다
// 참고 https://next-auth.js.org/configuration/nextjs
// search나 users의 사용자 페이지는 로그인 하지 않아도 사용할 수 있음으로 제외
export const config = {
  matcher: ["/api"],
};
