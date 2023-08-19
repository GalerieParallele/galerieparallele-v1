import {NextResponse} from "next/server";

import {PrismaClient} from "@prisma/client";

import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const MESSAGES = {
    NO_TOKEN: "Aucun token trouvé dans le cookie.",
    INVALID_TOKEN: "Token invalide."
};

export async function POST(req, res) {

    const tokenFromCookie = req.cookies.token;

    if (!tokenFromCookie) {
        return NextResponse.json({message: MESSAGES.NO_TOKEN}, {status: 401});
    }

    try {

        const decoded = jwt.verify(tokenFromCookie, process.env.JWT);
        const userId = decoded.user.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        return NextResponse.json({id: user.id, email: user.email}, {status: 200})

    } catch (err) {
        return NextResponse.json({message: MESSAGES.NO_TOKEN}, {status: 400});
    }
}
