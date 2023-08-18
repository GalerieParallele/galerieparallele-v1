import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ERROR_MESSAGES = {
    MISSING_FIELDS: 'Veuillez renseigner tous les champs (email, password).',
    INCORRECT_INFORMATIONS: 'E-mail ou mot de passe incorrect.',
};

export async function POST(req, res) {

    const requestBodyText = await req.text();

    try {

        const requestBody = JSON.parse(requestBodyText);
        const {email = '', password = ''} = requestBody;

        if (!email || !password) {
            return NextResponse.json({message: ERROR_MESSAGES.MISSING_FIELDS}, {status: 400});
        }

        const user = await prisma.user.findUnique({where: {email: email}});

        if (!user) {
            return NextResponse.json({message: ERROR_MESSAGES.INCORRECT_INFORMATIONS}, {status: 401});
        }

        const match = bcrypt.compareSync(password, user.password);

        if (!match) {
            return NextResponse.json({message: ERROR_MESSAGES.INCORRECT_INFORMATIONS}, {status: 401});

        }


        return NextResponse.json({id: user.id, email: user.email}, {status: 200});

    } catch (error) {

        return NextResponse.error(error, {status: 500});

    } finally {

        await prisma.$disconnect();

    }
}