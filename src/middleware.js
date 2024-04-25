import {NextResponse} from "next/server";
import ROUTES from "@/constants/ROUTES";
import {getTokenFromRequest} from "@/constants/Util";
import {prisma} from "@/utils/PrismaUtil";
import jwt from "jsonwebtoken";

export default async function middleware(request) {

    const path = request.nextUrl.pathname;
    const user = await getUserDetails(request);

    if (path.startsWith("/dashboard")) {
        console.log('User:', user);
        if (!user.isLoggedIn) {
            return NextResponse.redirect(ROUTES.AUTH);
        }

        // Vérifier si l'utilisateur a le rôle requis
        if (!user.roles.includes('ADMIN')) {
            return NextResponse.redirect(ROUTES.AUTH); // Rediriger vers une page "Unauthorized" ou similaire
        }

        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};

async function getUserDetails(req) {

    const token = getTokenFromRequest(req);

    const {user: {id}} = jwt.verify(token, process.env.JWT);

    const user = await prisma.user.findUnique({where: {id}});

    if (user) {
        const {password, ...safeUser} = user;
        return safeUser;
    }
}
