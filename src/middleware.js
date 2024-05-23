import {NextResponse} from "next/server";
import ROUTES from "@/constants/ROUTES";

export default async function middleware(request) {

    const path = request.nextUrl.pathname;

    const user = await checkIfUserIsLogged(request);

    if (path.startsWith("/dashboard")) {

        if (!user || !user?.roles?.includes("ROLE_ADMIN")) {
            return redirectTo(request, "/auth")
        }

    }

    return NextResponse.next();

}

async function checkIfUserIsLogged(request) {
    try {

        const response = await fetch(ROUTES.API.AUTH.ME, {
            method: 'POST',
            headers: {
                "Cookie": request.headers.get("cookie") || "",
            },
        })

        return await response.json();

    } catch (error) {
        return false;
    }
}

function redirectTo(request, path) {

    const url = request.nextUrl.clone();
    url.pathname = path;
    return NextResponse.redirect(url);

}

export const config = {
    matcher: ['/dashboard/:path*'],
};
