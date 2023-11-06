import {NextResponse} from "next/server";

import {z} from 'zod';

import {Prisma} from "@prisma/client";

import jwt from 'jsonwebtoken';
import AUTH from "@/constants/AUTH";
import {hashPassword} from "@/constants/Util";
import {prisma} from "@/utils/PrismaUtil";

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

    INVALID_EMAIL: 'Veuillez fournir une adresse e-mail valide.',
    INVALID_PASSWORD: 'Veuillez fournir un mot de passe valide.',
    INVALID_USER: "L'utilisateur n'existe pas.",

    EMAIL_EXISTS: 'Un compte avec cet e-mail existe déjà.',

    SUCCESS_CREATE: 'Utilisateur créé avec succès.',
    SUCCESS_EDIT: 'Utilisateur modifié avec succès.',
    SUCCESS_DELETE: 'Utilisateur supprimé avec succès.',

    NO_USER_FOUND: 'Aucun utilisateur trouvé.',
};

export const UserSchema = z.object({
    id: z.number({
        required_error: "L'identifiant utilisateur est requis.",
        invalid_type_error: "L'identifiant doit être un nombre.",
    }),
    email: z.string({
        required_error: "L'adresse e-mail est requise.",
        invalid_type_error: "L'adresse e-mail doit être une chaîne de caractères.",
    }).email({
        message: "L'adresse e-mail doit être une adresse e-mail valide.",
    }),
    avatarURL: z.string({
        invalid_type_error: "L'URL de l'avatar doit être une chaîne de caractères.",
    }).url({
        message: "L'URL de l'avatar doit être une URL valide.",
    }).nullable({
        message: "L'URL de l'avatar peut être nulle.",
    }),
    lastname: z.string({
        required_error: "Le nom de famille est requis.",
        invalid_type_error: "Le nom de famille doit être une chaîne de caractères.",
    }).min(1, {
        message: "Le nom de famille ne peut pas être vide.",
    }),
    firstname: z.string({
        required_error: "Le prénom est requis.",
        invalid_type_error: "Le prénom doit être une chaîne de caractères.",
    }).min(1, {
        message: "Le prénom ne peut pas être vide.",
    }),
    street: z.string({
        required_error: "La rue est requise.",
        invalid_type_error: "La rue doit être une chaîne de caractères.",
    }).min(1, {
        message: "La rue ne peut pas être vide.",
    }),
    city: z.string({
        required_error: "La ville est requise.",
        invalid_type_error: "La ville doit être une chaîne de caractères.",
    }).min(1, {
        message: "La ville ne peut pas être vide.",
    }),
    postalCode: z.string({
        required_error: "Le code postal est requis.",
        invalid_type_error: "Le code postal doit être une chaîne de caractères.",
    }).min(1, {
        message: "Le code postal ne peut pas être vide.",
    }),
    phone: z.string({
        required_error: "Le numéro de téléphone est requis.",
        invalid_type_error: "Le numéro de téléphone doit être une chaîne de caractères.",
    }).min(10, {
        message: "Le numéro de téléphone doit contenir 10 chiffres.",
    }).max(10, {
        message: "Le numéro de téléphone doit contenir 10 chiffres.",
    }),
    roles: z.array(z.string({
        invalid_type_error: "Les rôles doivent être des chaînes de caractères.",
    })).min(1, {
        message: "L'utilisateur doit avoir au moins un rôle.",
    }),
});

const UsersResponseSchema = z.object({
    total: z.number({
        description: "Nombre total d'utilisateurs.",
    }),
    list: z.array(UserSchema),
});

const CreateUserSchema = z.object({
    avatarURL: z
        .string({
            invalid_type_error: "L'URL de l'avatar doit être une chaîne de caractères.",
        })
        .url({message: "L'URL de l'avatar est invalide."})
        .optional(),
    email: z
        .string({
            invalid_type_error: "L'adresse e-mail doit être une chaîne de caractères.",
            required_error: "L'adresse e-mail est requise.",
        })
        .email({message: "L'adresse e-mail est invalide."}),
    password: z
        .string({
            invalid_type_error: "Le mot de passe doit être une chaîne de caractères.",
            required_error: "Le mot de passe est requis.",
        })
        .min(8, {message: "Le mot de passe doit contenir au moins 8 caractères."})
        .max(32, {message: "Le mot de passe ne peut pas contenir plus de 32 caractères."})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {message: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."}),
    lastname: z
        .string({
            invalid_type_error: "Le nom de famille doit être une chaîne de caractères.",
            required_error: "Le nom de famille est requis.",
        })
        .min(1, {message: "Le nom de famille ne peut pas être vide.",}),
    firstname: z
        .string({
            invalid_type_error: "Le prénom doit être une chaîne de caractères.",
            required_error: "Le prénom est requis.",
        })
        .min(1, {message: "Le prénom ne peut pas être vide."}),
    street: z
        .string({
            invalid_type_error: "La rue doit être une chaîne de caractères.",
            required_error: "La rue est requise.",
        })
        .min(1, {message: "La rue ne peut pas être vide."}),
    city: z
        .string({
            invalid_type_error: "La ville doit être une chaîne de caractères.",
            required_error: "La ville est requise.",
        })
        .min(1, {message: "La ville ne peut pas être vide."}),
    postalCode: z
        .string({
            invalid_type_error: "Le code postal doit être une chaîne de caractères.",
            required_error: "Le code postal est requis.",
        })
        .min(1, {message: "Le code postal ne peut pas être vide."}),
    phone: z
        .string({
            invalid_type_error: "Le numéro de téléphone doit être une chaîne de caractères.",
            required_error: "Le numéro de téléphone est requis.",
        })
        .regex(/^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/, {message: "Numéro de téléphone invalide."})
        .min(10, {message: "Le numéro de téléphone doit contenir 10 chiffres."})
        .max(10),
});

const UpdateUserSchema = z.object({
    id: z
        .number({
            message: "L'identifiant doit être un nombre.",
            required_error: "L'identifiant est requis.",
        })
        .positive({message: "L'identifiant doit être un nombre positif."}),
    avatarURL: z.string({message: "L'URL de l'avatar doit être une chaîne de caractères."})
        .url({message: "L'URL de l'avatar doit être une URL valide."})
        .nullable({message: "L'URL de l'avatar peut être nulle."})
        .optional(),
    email: z.string({message: "L'adresse e-mail doit être une chaîne de caractères."})
        .email({message: "L'adresse e-mail doit être valide."})
        .optional(),
    lastname: z.string({message: "Le nom de famille doit être une chaîne de caractères."})
        .min(1, {message: "Le nom de famille ne peut pas être vide."})
        .optional(),
    firstname: z.string({message: "Le prénom doit être une chaîne de caractères."})
        .min(1, {message: "Le prénom ne peut pas être vide."})
        .optional(),
    street: z.string({message: "La rue doit être une chaîne de caractères."})
        .min(1, {message: "La rue ne peut pas être vide."})
        .optional(),
    city: z.string({message: "La ville doit être une chaîne de caractères."})
        .min(1, {message: "La ville ne peut pas être vide."})
        .optional(),
    postalCode: z.string({message: "Le code postal doit être une chaîne de caractères."})
        .min(1, {message: "Le code postal ne peut pas être vide."})
        .optional(),
    phone: z.string({message: "Le numéro de téléphone doit être une chaîne de caractères."})
        .length(10, {message: "Le numéro de téléphone doit contenir 10 chiffres."})
        .optional(),
    password: z.string({message: "Le mot de passe doit être une chaîne de caractères."})
        .min(8, {message: "Le mot de passe doit contenir au moins 8 caractères."})
        .max(32, {message: "Le mot de passe ne peut pas contenir plus de 32 caractères."})
        .optional(),
    roles: z.array(z.string({message: "Les rôles doivent être des chaînes de caractères."}))
        .min(1, {message: "L'utilisateur doit avoir au moins un rôle."})
        .optional(),
});

export async function GET() {

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

    // const {user, message} = await getUserFromToken(req);
    //
    // if (message !== null) {
    //     return NextResponse.json({message: message}, {status: 401});
    // }

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

        return NextResponse.json({
            message: MESSAGES.SUCCESS_CREATE,
            token,
            user: {
                ...user,
                password: undefined,
            },
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
