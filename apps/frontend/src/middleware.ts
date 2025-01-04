import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getSession } from "./server/session";

const middleware = async (req: NextRequest) => {
  const session = await getSession();
  if (!session || !session.user)
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));

  NextResponse.next();
};

export const config: MiddlewareConfig = {
  matcher: ["/dashboard", "/customer", "/admin", "/protected"],
};

export default middleware;
