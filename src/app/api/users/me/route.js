import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

import jwt from "jsonwebtoken";
import {cookies} from "next/headers";

const prisma = new PrismaClient();

const MESSAGES = {
    NO_TOKEN: "Aucun token trouvé dans le cookie.",
    INVALID_TOKEN: "Token invalide.",
    COOKIE_GET_ERROR: "Erreur lors de la récupération du cookie.",
    USER_NOT_FOUND: "Utilisateur non trouvé."
};

const HTTP_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    OK: 200
};

export async function POST(req, res) {

    let tokenFromCookie;

    try {
        tokenFromCookie = cookies().get("token").value;
    } catch (error) {
        return NextResponse.json({message: MESSAGES.COOKIE_GET_ERROR}, {status: HTTP_STATUS.BAD_REQUEST});
    }

    if (!tokenFromCookie) {
        return NextResponse.json({message: MESSAGES.NO_TOKEN}, {status: HTTP_STATUS.UNAUTHORIZED});
    }

    let decoded;
    try {
        decoded = jwt.verify(tokenFromCookie, process.env.JWT);
    } catch (err) {
        return NextResponse.json({message: MESSAGES.INVALID_TOKEN}, {status: HTTP_STATUS.UNAUTHORIZED});
    }

    try {
        const userId = decoded.user.id;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return NextResponse.json({message: MESSAGES.USER_NOT_FOUND}, {status: HTTP_STATUS.BAD_REQUEST});
        }

        return NextResponse.json({id: user.id, email: user.email}, {status: HTTP_STATUS.OK});
    } catch (err) {
        return NextResponse.json({message: MESSAGES.INVALID_TOKEN}, {status: HTTP_STATUS.BAD_REQUEST});
    } finally {
        await prisma.$disconnect();
    }
}
