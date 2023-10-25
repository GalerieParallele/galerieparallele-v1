import {NextResponse} from "next/server";

import {Prisma, PrismaClient} from "@prisma/client";

import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import AUTH from "@/constants/AUTH";
import {checkPassword, isValidEmail} from "@/constants/Util";

const prisma = new PrismaClient();

const MESSAGES = {

    MISSING_ID: 'Veuillez renseigner un identifiant utilisateur.',
    MISSING_EMAIL: 'Veuillez renseigner une adresse e-mail.',
    MISSING_LASTNAME: 'Veuillez renseigner un nom.',
    MISSING_FIRSTNAME: 'Veuillez renseigner un prénom.',
    MISSING_STREET: 'Veuillez renseigner une rue.',
    MISSING_CITY: 'Veuillez renseigner une ville.',
    MISSING_POSTAL_CODE: 'Veuillez renseigner un code postal.',
    MISSING_PHONE: 'Veuillez renseigner un numéro de téléphone.',
    MISSING_PASSWORD: 'Veuillez renseigner un mot de passe.',
    MISSING_TVA: 'Veuillez renseigner un numéro de TVA.',
    MISSING_SIRET: 'Veuillez renseigner un numéro de SIRET.',

    INVALID_EMAIL: 'Veuillez fournir une adresse e-mail valide.',
    INVALID_PASSWORD: 'Veuillez fournir un mot de passe valide.',
    INVALID_USER: "L'utilisateur n'existe pas.",

    EMAIL_EXISTS: 'Un compte avec cet e-mail existe déjà.',

    SUCCESS_CREATE: 'Utilisateur créé avec succès.',
    SUCCESS_DELETE: 'Utilisateur supprimé avec succès.',

    NO_USER_FOUND: 'Aucun utilisateur trouvé.',
};

export async function GET() {

    const users = await prisma.user.findMany({
        select: {
            id: true,
            avatarURL: true,
            email: true,
            lastname: true,
            firstname: true,
            street: true,
            city: true,
            postalCode: true,
            phone: true,
            roles: true,
            Artist: true,
            Articles: true,
        },
    });

    if (!users.length) {
        return NextResponse.json({message: MESSAGES.NO_USER_FOUND}, {status: 404});
    }

    return NextResponse.json({
        total: users.length, list: users,
    }, {status: 200});
}

export async function POST(req) {

    const requestBodyText = await req.text();

    try {
        const requestBody = JSON.parse(requestBodyText);
        const {
            email = '',
            lastname = '',
            firstname = '',
            street = '',
            city = '',
            postalCode = '',
            phone = '',
            password = '',
            avatarURL = '',
            artist_tva = '',
            artist_siret = '',
        } = requestBody;

        if (!email) {
            return NextResponse.json({message: MESSAGES.MISSING_EMAIL}, {status: 422});
        }

        if (!isValidEmail(email)) {
            return NextResponse.json({message: MESSAGES.INVALID_EMAIL}, {status: 422});
        }

        if (!lastname) {
            return NextResponse.json({message: MESSAGES.MISSING_LASTNAME}, {status: 422});
        }

        if (!firstname) {
            return NextResponse.json({message: MESSAGES.MISSING_FIRSTNAME}, {status: 422});
        }

        if (!street) {
            return NextResponse.json({message: MESSAGES.MISSING_STREET}, {status: 422});
        }

        if (!city) {
            return NextResponse.json({message: MESSAGES.MISSING_CITY}, {status: 422});
        }

        if (!postalCode) {
            return NextResponse.json({message: MESSAGES.MISSING_POSTAL_CODE}, {status: 422});
        }

        if (!phone) {
            return NextResponse.json({message: MESSAGES.MISSING_PHONE}, {status: 422});
        }

        if (!password) {
            return NextResponse.json({message: MESSAGES.MISSING_PASSWORD}, {status: 422});
        }

        if (!checkPassword(password)) {
            return NextResponse.json({message: MESSAGES.INVALID_PASSWORD}, {status: 422});
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const data = {
            email, lastname, firstname, street, city, postalCode, phone, password: hashedPassword,
        }

        if (avatarURL) {
            data.avatarURL = avatarURL;
        }

        if (artist_tva && !artist_siret) {
            return NextResponse.json({message: MESSAGES.MISSING_SIRET}, {status: 422});
        }

        if (artist_siret && !artist_tva) {
            return NextResponse.json({message: MESSAGES.MISSING_TVA}, {status: 422});
        }

        if (artist_tva && artist_siret) {
            data.Artist = {
                create: {
                    tva: artist_tva,
                    siret: artist_siret,
                }
            }
        }

        const user = await prisma.user.create({data});

        const token = jwt.sign({
            user: {
                id: user.id,
            }
        }, process.env.JWT, {expiresIn: AUTH.TOKEN_EXPIRATION_TIME});

        return NextResponse.json({
            message: MESSAGES.SUCCESS_CREATE, user: {
                id: user.id,
                email: user.email,
                lastname: user.lastname,
                firstname: user.firstname,
                street: user.street,
                city: user.city,
                postalCode: user.postalCode,
                phone: user.phone,
                avatarURL: user.avatarURL,
                articles: user.Articles,
                roles: user.roles,
            }
        }, {
            status: 201, headers: {
                'Set-Cookie': `token=${token};HttpOnly;Max-Age=${AUTH.COOKIE_MAX_AGE}; ${AUTH.sameSiteSetting}${AUTH.secureCookieFlag}Path=/`
            }
        });

    } catch
        (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json({message: MESSAGES.EMAIL_EXISTS}, {status: 409});
        }

        return NextResponse.error(error, {status: 500});

    } finally {

        await prisma.$disconnect();

    }
}

export async function DELETE(req) {

    const requestBodyText = await req.text();

    const requestBody = JSON.parse(requestBodyText);

    const {
        id = '',
    } = requestBody;

    if (!id) {
        return NextResponse.json({message: MESSAGES.MISSING_ID}, {status: 422});
    }

    try {

        const user = await prisma.user.findUnique({
            where: {
                id,
            }
        });

        if (!user) {
            return NextResponse.json({message: MESSAGES.INVALID_USER}, {status: 404});
        }

        await prisma.user.delete({
            where: {
                id,
            }
        });

        return NextResponse.json({message: MESSAGES.SUCCESS_DELETE}, {status: 200});

    } catch (error) {

        return NextResponse.error(error, {status: 500});

    } finally {

        await prisma.$disconnect();

    }


}
