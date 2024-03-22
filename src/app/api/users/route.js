import {NextResponse} from "next/server";

import {z} from 'zod';

import {Prisma} from "@prisma/client";

import jwt from 'jsonwebtoken';
import AUTH from "@/constants/AUTH";
import {getTokenFromRequest, getUserFromToken, hashPassword} from "@/constants/Util";
import {prisma} from "@/utils/PrismaUtil";

const MESSAGES = {

    REQUIRED_ID: 'L\'identifiant utilisateur est requis.',
    REQUIRED_EMAIL: 'L\'adresse e-mail est requise.',

    ID_MUST_BE_NUMBER: 'L\'identifiant doit être un nombre.',
    ID_MUST_BE_POSITIVE: 'L\'identifiant doit être un nombre positif.',

    INVALID_USER: "L'utilisateur n'existe pas.",

    EMAIL_EXISTS: 'Un compte avec cet e-mail existe déjà.',

    SUCCESS_CREATE: 'Utilisateur créé avec succès.',
    SUCCESS_EDIT: 'Utilisateur modifié avec succès.',
    SUCCESS_DELETE: 'Utilisateur supprimé avec succès.',

    NO_USER_FOUND: 'Aucun utilisateur trouvé.',

};

const id = z
    .number({
        required_error: MESSAGES.REQUIRED_ID,
        invalid_type_error: MESSAGES.ID_MUST_BE_NUMBER,
    })
    .int({
        message: MESSAGES.ID_MUST_BE_POSITIVE,
    })

const email = z
    .string({
        required_error: MESSAGES.REQUIRED_EMAIL,
        invalid_type_error: "L'adresse e-mail doit être une chaîne de caractères.",
    })
    .email({
        message: "L'adresse e-mail doit être une adresse e-mail valide.",
    })

const lastname = z
    .string({
        required_error: "Le nom de famille est requis.",
        invalid_type_error: "Le nom de famille doit être une chaîne de caractères.",
    })
    .min(1, {
        message: "Le nom de famille ne peut pas être vide.",
    })

const firstname = z
    .string({
        required_error: "Le prénom est requis.",
        invalid_type_error: "Le prénom doit être une chaîne de caractères.",
    })
    .min(1, {
        message: "Le prénom ne peut pas être vide.",
    })

const street = z
    .string({
        required_error: "La rue est requise.",
        invalid_type_error: "La rue doit être une chaîne de caractères.",
    })
    .min(1, {
        message: "La rue ne peut pas être vide.",
    })

const city = z
    .string({
        required_error: "La ville est requise.",
        invalid_type_error: "La ville doit être une chaîne de caractères.",
    })
    .min(1, {
        message: "La ville ne peut pas être vide.",
    })

const postalCode = z
    .string({
        required_error: "Le code postal est requis.",
        invalid_type_error: "Le code postal doit être une chaîne de caractères.",
    })
    .min(1, {
        message: "Le code postal ne peut pas être vide.",
    })

const phone = z
    .string({
        required_error: "Le numéro de téléphone est requis.",
        invalid_type_error: "Le numéro de téléphone doit être une chaîne de caractères.",
    })
    .min(10, {
        message: "Le numéro de téléphone doit contenir 10 chiffres.",
    })
    .max(10, {
        message: "Le numéro de téléphone doit contenir 10 chiffres.",
    })

const roles = z
    .array(z.string({
        invalid_type_error: "Les rôles doivent être des chaînes de caractères.",
    }))
    .min(1, {
        message: "L'utilisateur doit avoir au moins un rôle.",
    })

const avatarURL = z
    .string({
        invalid_type_error: "L'URL de l'avatar doit être une chaîne de caractères.",
    })
    .url({
        message: "L'URL de l'avatar doit être une URL valide.",
    })
    .optional()
    .nullable()

const password = z
    .string({
        invalid_type_error: "Le mot de passe doit être une chaîne de caractères.",
        required_error: "Le mot de passe est requis.",
    })
    .min(8, {message: "Le mot de passe doit contenir au moins 8 caractères."})
    .max(32, {message: "Le mot de passe ne peut pas contenir plus de 32 caractères."})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {message: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."})

export const UserSchema = z.object({
    id,
    email,
    lastname,
    firstname,
    street,
    city,
    postalCode,
    phone,
    roles,
    avatarURL,
});

const UsersResponseSchema = z.object({
    total: z
        .number(),
    list: z
        .array(UserSchema),
});

const CreateUserSchema = UserSchema.extend({
    password,
}).omit({id: true, roles: true})

const passwordForUpdate = password.optional();

const UpdateUserSchema = UserSchema.partial().extend({
    id,
    password: passwordForUpdate,
})

export async function GET(req) {

    const token = getTokenFromRequest(req);

    if (!token) {
        return NextResponse.json({message: MESSAGES.NO_TOKEN_PROVIDED}, {status: 401});
    }

    const user = getUserFromToken(token);

    if (!user) {
        return NextResponse.json({message: MESSAGES.NO_USER_FOUND_IN_TOKEN}, {status: 401});
    }

    try {

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
                articles: false,
                artist: false,
                password: false,
            },
        });

        if (!users.length) {
            return NextResponse.json({message: MESSAGES.NO_USER_FOUND}, {status: 404});
        }

        const validatedUsers = users.map(user => UserSchema.parse(user));

        const response = UsersResponseSchema.parse({
            total: validatedUsers.length,
            list: validatedUsers,
        });

        return NextResponse.json(response, {status: 200});

    } catch (error) {

        console.log(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({errors: error.errors[0].message}, {status: 400});
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }
}

export async function POST(req) {

    try {

        const requestBody = CreateUserSchema.parse(JSON.parse(await req.text()));

        const hashedPassword = hashPassword(requestBody.password);

        const userData = {
            ...requestBody,
            password: hashedPassword,
            lastname: requestBody.lastname.toUpperCase(),
        };

        if (requestBody.avatarURL) {
            userData.avatarURL = requestBody.avatarURL;
        }

        const user = await prisma.user.create({
            data: userData,
        });

        const token = jwt.sign({
            user: {
                id: user.id,
            }
        }, process.env.JWT, {expiresIn: AUTH.TOKEN_EXPIRATION_TIME});

        const {password, ...safeUser} = user;

        return NextResponse.json({
            user: safeUser
        }, {
            status: 201,
            headers: {
                'Set-Cookie': `token=${token};HttpOnly;Max-Age=${AUTH.COOKIE_MAX_AGE}; ${AUTH.sameSiteSetting}${AUTH.secureCookieFlag}Path=/`
            }
        });

    } catch (error) {

        console.log(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json({message: MESSAGES.EMAIL_EXISTS}, {status: 409});
        }

        return NextResponse.json(MESSAGES.API_SERVER_ERROR, {status: 500});

    }
}

export async function PATCH(req) {

    try {

        const requestBody = UpdateUserSchema.parse(JSON.parse(await req.text()));

        const userId = requestBody.id;

        delete requestBody.id;

        if (requestBody.password) {
            requestBody.password = hashPassword(requestBody.password);
        }

        const updatedUser = await prisma.user.update({
            where: {id: userId},
            data: requestBody,
        });

        updatedUser.password = undefined;

        const validatedUser = UserSchema.parse(updatedUser);

        return NextResponse.json({
            message: MESSAGES.SUCCESS_EDIT,
            user: validatedUser
        }, {status: 200});

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.log(error);
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.INVALID_USER}, {status: 404});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json({message: MESSAGES.EMAIL_EXISTS}, {status: 409});
        }

        return NextResponse.json(MESSAGES.API_SERVER_ERROR, {status: 500});
    }
}

export async function DELETE(req) {

    try {

        const {id} = UserSchema.pick({id: true}).parse(JSON.parse(await req.text()));

        await prisma.user.delete({
            where: {id},
        });

        return NextResponse.json({message: MESSAGES.SUCCESS_DELETE}, {status: 200});

    } catch (error) {

        console.log(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.INVALID_USER}, {status: 404});
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }
}
