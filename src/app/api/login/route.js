import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

import AUTH from "@/constants/AUTH";

import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {cookies} from "next/headers";

const prisma = new PrismaClient();

// -----------------------------------------------------------

const ERROR_MESSAGES = {
    MISSING_FIELDS: 'Veuillez renseigner tous les champs (email, password).',
    INCORRECT_INFORMATIONS: 'E-mail ou mot de passe incorrect.',
};

// -----------------------------------------------------------

export async function POST(req, res) {

    const requestBodyText = await req.text();

    try {

        const requestBody = JSON.parse(requestBodyText);
        const {email = '', password = ''} = requestBody;

        if (!email || !password) {
            return NextResponse.json({message: ERROR_MESSAGES.MISSING_FIELDS}, {status: 400});
        }

        const user = await prisma.user.findUnique(
            {
                where: {
                    email: email
                },
                select: {
                    id: true,
                    email: true,
                    roles: true,
                    avatarURL: true,
                    firstname: true,
                    lastname: true,
                    phone: true,
                    street: true,
                    postalCode: true,
                    city: true,
                    password: true,
                }
            }
        );

        if (!user) {
            return NextResponse.json({message: ERROR_MESSAGES.INCORRECT_INFORMATIONS}, {status: 401});
        }

        const match = bcrypt.compareSync(password, user.password);

        if (!match) {
            return NextResponse.json({message: ERROR_MESSAGES.INCORRECT_INFORMATIONS}, {status: 401});
        }

        const token = jwt.sign({
            user: {
                id: user.id,
            }
        }, process.env.JWT, {expiresIn: AUTH.TOKEN_EXPIRATION_TIME});

        cookies().set('token', token, {
            httpOnly: true,
            maxAge: AUTH.COOKIE_MAX_AGE,
            sameSite: AUTH.sameSiteSetting,
            secure: AUTH.secureCookieFlag,
            path: '/'
        });

        return NextResponse.json({
                id: user.id,
                email: user.email,
                roles: user.roles,
                avatarURL: user.avatarURL,
                firstname: user.firstname,
                lastname: user.lastname,
                phone: user.phone,
                street: user.street,
                postalCode: user.postalCode,
                city: user.city,
            },
            {
                status: 200,
            });


    } catch (error) {

        return NextResponse.error(error, {status: 500});

    } finally {

        await prisma.$disconnect();

    }
}