import {NextResponse} from "next/server";

import {Prisma, PrismaClient} from "@prisma/client";

import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import AUTH from "@/constants/AUTH";
import {isValidEmail} from "@/constants/Util";

const prisma = new PrismaClient();

const MESSAGES = {
    MISSING_FIELDS: 'Veuillez renseigner tous les champs.',
    INVALID_EMAIL: 'Veuillez fournir une adresse e-mail valide.',
    EMAIL_EXISTS: 'Un compte avec cet e-mail existe déjà.',
    SUCCESS: 'Utilisateur créé avec succès.',
    NO_USER_FOUND: 'Aucun utilisateur trouvé.',
};

export async function GET() {

    const users = await prisma.user.findMany(
        {
            select: {
                id: true,
                email: true,
                roles: true,
            }
        }
    );

    if (!users.length) {
        return NextResponse.json({message: MESSAGES.NO_USER_FOUND}, {status: 404});
    }

    return NextResponse.json({
        total: users.length, list: users,
    }, {status: 200});
}

export async function POST(req, res) {

    const requestBodyText = await req.text();

    try {
        const requestBody = JSON.parse(requestBodyText);
        const {email = '', password = ''} = requestBody;

        if (!email || !password) {
            return NextResponse.json({message: MESSAGES.MISSING_FIELDS}, {status: 400});
        }

        if (!isValidEmail(email)) {
            return NextResponse.json({message: MESSAGES.INVALID_EMAIL}, {status: 422});
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = await prisma.user.create({
            data: {
                email, password: hashedPassword,
            },
        });


        const token = jwt.sign({
            user: {
                id: user.id,
            }
        }, process.env.JWT, {expiresIn: AUTH.TOKEN_EXPIRATION_TIME});

        return NextResponse.json({
                message: MESSAGES.SUCCESS,
                user: {
                    id: user.id,
                }
            },
            {
                status: 201,
                headers: {
                    'Set-Cookie': `token=${token};HttpOnly;Max-Age=${AUTH.COOKIE_MAX_AGE}; ${AUTH.sameSiteSetting}${AUTH.secureCookieFlag}Path=/`
                }
            });

    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json({message: MESSAGES.EMAIL_EXISTS}, {status: 409});
        }

        return NextResponse.error(error, {status: 500});

    } finally {

        await prisma.$disconnect();

    }
}
