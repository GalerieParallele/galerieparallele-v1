import {NextResponse} from "next/server";

export default async function middleware(request) {

    const path = request.nextUrl.pathname;

    if (path.startsWith("/dashboard")) {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
