// export { auth as middleware } from "@/auth" 

import { NextRequest, NextResponse } from "next/server";

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }

export default function middleware(req: NextRequest) {
  return NextResponse.next();
}
