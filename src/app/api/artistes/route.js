import {z} from 'zod';
import {NextResponse} from "next/server";
import {getTokenFromRequest, getUserFromToken, UTIL_MESSAGES} from "@/constants/Util";
import {Prisma} from "@prisma/client";
import ROLES from "@/constants/ROLES";
import {prisma} from "@/utils/PrismaUtil";

const MESSAGES = {

    BIO_REQUIRED: "La biographie de l'artiste est requise.",
    BIO_MUST_BE_STRING: "La biographie de l'artiste doit être une chaîne de caractères.",
    BIO_MIN_LENGTH: "La biographie de l'artiste doit contenir au moins 1 caractère.",

    ID_REQUIRED: "L'id de l'artiste est requis.",
    ID_MUST_BE_NUMBER: "L'id de l'artiste doit être un nombre entier.",
    ID_MUST_BE_POSITIVE: "L'id de l'artiste doit être un nombre positif.",

    PSEUDO_REQUIRED: "Le pseudo de l'artiste est requis.",
    PSEUDO_MUST_BE_STRING: "Le pseudo de l'artiste doit être une chaîne de caractères.",
    PSEUDO_MIN_LENGTH: "Le pseudo de l'artiste doit contenir au moins 1 caractère.",

    NATIONALITY_REQUIRED: "La nationalité de l'artiste est requise.",
    NATIONALITY_MUST_BE_STRING: "La nationalité de l'artiste doit être une chaîne de caractères.",
    NATIONALITY_MIN_LENGTH: "La nationalité de l'artiste doit contenir au moins 1 caractère.",

    INSTAGRAM_MUST_BE_STRING: "L'instagram de l'artiste doit être une chaîne de caractères.",
    INSTAGRAM_STARTS_WITH: "L'instagram de l'artiste doit commencer par 'https://www.instagram.com/'.",
    INSTAGRAM_REQUIRED: "L'instagram de l'artiste est requis.",

    FACEBOOK_MUST_BE_STRING: "Le facebook de l'artiste doit être une chaîne de caractères.",
    FACEBOOK_STARTS_WITH: "Le facebook de l'artiste doit commencer par 'https://www.facebook.com/'.",
    FACEBOOK_REQUIRED: "Le facebook de l'artiste est requis.",

    LINKEDIN_MUST_BE_STRING: "Le linkedin de l'artiste doit être une chaîne de caractères.",
    LINKEDIN_STARTS_WITH: "Le linkedin de l'artiste doit commencer par 'https://www.linkedin.com/'.",
    LINKEDIN_REQUIRED: "Le linkedin de l'artiste est requis.",

    WEBSITE_MUST_BE_STRING: "Le site web de l'artiste doit être une chaîne de caractères.",
    WEBSITE_STARTS_WITH: "Le site web de l'artiste doit commencer par 'https://'.",
    WEBSITE_REQUIRED: "Le site web de l'artiste est requis.",

    AT_THE_TOP_MUST_BE_BOOLEAN: "La valeur de 'atTheTop' doit être un booléen.",
    AT_THE_TOP_REQUIRED: "La valeur de 'atTheTop' est requise.",

    PRIVATE_MUST_BE_BOOLEAN: "La valeur de 'private' doit être un booléen.",
    PRIVATE_REQUIRED: "La valeur de 'private' est requise.",

    TOTAL_OF_ARTISTS_MUST_BE_NUMBER: "La valeur totale d'artiste doit être un nombre.",
    TOTAL_OF_ARTISTS_MUST_BE_INT: "La valeur totale d'artiste doit être un nombre entier.",
    TOTAL_OF_ARTISTS_MUST_BE_POSITIVE: "La valeur totale d'artiste doit être un nombre positif.",
    TOTAL_OF_ARTISTS_REQUIRED: "La valeur totale d'artiste est requise.",

    NO_ARTIST_FOUND: "Aucun artiste trouvé.",
    USER_ALREADY_ARTIST: "L'utilisateur est déjà un artiste.",

    SUCCESS_DELETE: "L'artiste a été supprimé avec succès.",
    INVALID_ARTIST: "L'artiste renseigné ne correspond à aucun artiste enregistré.",
    MUST_BE_OWN_OR_ADMIN: "Vous devez être l'artiste ou administrateur pour effectuer cette action.",

}

const id = z
    .number({
        invalid_type_error: MESSAGES.ID_MUST_BE_NUMBER,
        required_error: MESSAGES.ID_REQUIRED,
        description: "Id de l'artiste.",
    })
    .positive({
        message: MESSAGES.ID_MUST_BE_POSITIVE,
    })

const pseudo = z
    .string({
        invalid_type_error: MESSAGES.PSEUDO_MUST_BE_STRING,
        required_error: MESSAGES.PSEUDO_REQUIRED,
        description: "Pseudo de l'artiste.",
    })
    .min(1, {
        message: MESSAGES.PSEUDO_MIN_LENGTH,
    })
    .optional()
    .nullable()

const nationality = z
    .string({
        invalid_type_error: MESSAGES.NATIONALITY_MUST_BE_STRING,
        required_error: MESSAGES.NATIONALITY_REQUIRED,
        description: "Nationalité de l'artiste.",
    })
    .min(1, {
        message: MESSAGES.NATIONALITY_MIN_LENGTH,
    })
    .optional()
    .nullable()

const bio = z
    .string({
        invalid_type_error: MESSAGES.BIO_MUST_BE_STRING,
        required_error: MESSAGES.BIO_REQUIRED,
        description: "Biographie de l'artiste.",
    })
    .min(1, {
        message: MESSAGES.BIO_MIN_LENGTH,
    })
    .optional()
    .nullable()

const instagram = z
    .string({
        invalid_type_error: MESSAGES.INSTAGRAM_MUST_BE_STRING,
        required_error: MESSAGES.INSTAGRAM_REQUIRED,
        description: "Instagram de l'artiste.",
    })
    .startsWith('https://www.instagram.com/', {
        message: MESSAGES.INSTAGRAM_STARTS_WITH,
    })
    .optional()
    .nullable()

const facebook = z
    .string({
        invalid_type_error: MESSAGES.FACEBOOK_MUST_BE_STRING,
        required_error: MESSAGES.FACEBOOK_REQUIRED,
        description: "Facebook de l'artiste.",
    })
    .startsWith('https://www.facebook.com/', {
        message: MESSAGES.FACEBOOK_STARTS_WITH,
    })
    .optional()
    .nullable()

const linkedin = z
    .string({
        invalid_type_error: MESSAGES.LINKEDIN_MUST_BE_STRING,
        required_error: MESSAGES.LINKEDIN_REQUIRED,
        description: "Linkedin de l'artiste.",
    })
    .startsWith('https://www.linkedin.com/', {
        message: MESSAGES.LINKEDIN_STARTS_WITH,
    })
    .optional()
    .nullable()

const website = z
    .string({
        invalid_type_error: MESSAGES.WEBSITE_MUST_BE_STRING,
        required_error: MESSAGES.WEBSITE_REQUIRED,
        description: "Site web de l'artiste.",
    })
    .startsWith('https://', {
        message: MESSAGES.WEBSITE_STARTS_WITH,
    })
    .optional()
    .nullable()

const atTheTop = z
    .boolean({
        invalid_type_error: MESSAGES.AT_THE_TOP_MUST_BE_BOOLEAN,
        required_error: MESSAGES.AT_THE_TOP_REQUIRED,
        description: "L'artiste est-il mis en avant ?",
    })
    .optional()

const visibility = z
    .boolean({
        invalid_type_error: MESSAGES.PRIVATE_MUST_BE_BOOLEAN,
        required_error: MESSAGES.PRIVATE_REQUIRED,
        description: "L'artiste est-il privé ?",
    })
    .optional()

export const ArtistSchema = z.object({
    id,
    pseudo,
    nationality,
    bio,
    instagram,
    facebook,
    linkedin,
    website,
    atTheTop,
    private: visibility,
}).passthrough()

const ArtistGetResponseSchema = z.object({
    total: z
        .number({
            invalid_type_error: MESSAGES.TOTAL_OF_ARTISTS_MUST_BE_NUMBER,
            required_error: MESSAGES.TOTAL_OF_ARTISTS_REQUIRED,
            description: "Nombre total d'artistes.",
        })
        .int({
            message: MESSAGES.TOTAL_OF_ARTISTS_MUST_BE_INT,
        })
        .positive({
            message: MESSAGES.TOTAL_OF_ARTISTS_MUST_BE_POSITIVE,
        }),
    list: z.array(ArtistSchema),
})

const userid = z
    .number({
        required_error: MESSAGES.REQUIRED_ID,
        invalid_type_error: MESSAGES.ID_MUST_BE_NUMBER,
    })
    .int({
        message: MESSAGES.ID_MUST_BE_POSITIVE,
    })

const ArtistPostRequestSchema = ArtistSchema
    .omit({id})
    .partial()
    .extend({
        userid,
    })
    .passthrough()

const ArtistPatchRequestSchema = ArtistSchema
    .partial()
    .extend({
        id,
    })
    .passthrough()

const ArtistDeleteRequestSchema = ArtistSchema
    .pick({id: true})

export async function GET() {

    try {

        const artists = await prisma.artist.findMany({
            include: {
                user: true,
                oeuvre: {
                    select: {
                        oeuvre: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                hauteur: true,
                                longueur: true,
                                images: {
                                    select: {
                                        mediaURL: true,
                                        position: true
                                    },
                                    orderBy: {
                                        position: 'asc'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!artists.length) {
            return NextResponse.json({message: MESSAGES.NO_ARTIST_FOUND}, {status: 404})
        }


        artists.map(artist => {
            artist.userid = undefined
            artist.user.password = undefined

            // Transformation en objet direct
            artist.oeuvres = artist.oeuvre.map(oeuvre => oeuvre.oeuvre)

            // Transformation en tableau d'images
            artist.oeuvres.map(oeuvre => {
                oeuvre.images = oeuvre.images.map(image => {
                    return {
                        mediaURL: image.mediaURL,
                        position: image.position
                    }
                })
            })


            // Suppression mauvaise champ
            artist.oeuvre = undefined
        })

        const validatedArtist = artists.map(artist => ArtistSchema.parse(artist))

        const response = ArtistGetResponseSchema.parse({
            total: validatedArtist.length,
            list: validatedArtist,
        })

        return NextResponse.json(response, {status: 200})

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.error("Artistes API - GET", error)
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        return NextResponse.json(MESSAGES.API_SERVER_ERROR, {status: 500});

    }
}

export async function POST(req) {

    const token = getTokenFromRequest(req);

    if (!token) {
        return NextResponse.json({message: UTIL_MESSAGES.NO_TOKEN_PROVIDED}, {status: 401})
    }

    const user = await getUserFromToken(token);

    if (!user) {
        return NextResponse.json({message: UTIL_MESSAGES.NO_USER_FOUND_IN_TOKEN}, {status: 401})
    }

    console.log(user)

    if (!user.roles.includes(ROLES.ADMIN)) {
        return NextResponse.json({message: UTIL_MESSAGES.MUST_HAVE_RIGHTS}, {status: 403})
    }

    const requestBody = ArtistPostRequestSchema.parse(JSON.parse(await req.text()))

    try {

        const artist = await prisma.artist.create({
            data: {
                ...requestBody,
                userid: requestBody.userid,
            }
        })

        return NextResponse.json(ArtistSchema.parse(artist), {status: 201});

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.error("Artistes API - POST", error)
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code === 'P2002') {
                return NextResponse.json({message: MESSAGES.USER_ALREADY_ARTIST}, {status: 400});
            }

            if (error.code === 'P2003') {
                return NextResponse.json({message: MESSAGES.NO_ARTIST_FOUND}, {status: 400});
            }

            if (error.code === 'P2025') {
                return NextResponse.json({message: MESSAGES.NO_ARTIST_FOUND}, {status: 400});
            }
        }

        return NextResponse.json(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}

export async function PATCH(req) {

    const token = getTokenFromRequest(req);

    if (!token) {
        return NextResponse.json({message: UTIL_MESSAGES.NO_TOKEN_PROVIDED}, {status: 401})
    }

    const user = await getUserFromToken(token);

    if (!user) {
        return NextResponse.json({message: UTIL_MESSAGES.NO_USER_FOUND_IN_TOKEN}, {status: 401})
    }

    if (!user.roles.includes(ROLES.ADMIN) && user.id !== id) {
        return NextResponse.json({message: MESSAGES.MUST_BE_OWN_OR_ADMIN}, {status: 403})
    }

    try {

        const requestBody = ArtistPatchRequestSchema.parse(JSON.parse(await req.text()));

        const id = requestBody.id;
        delete requestBody.id;

        const updateArtist = await prisma.artist.update({
            where: {
                id
            },
            data: {
                ...requestBody,
            },
        });

        const validatedArtist = ArtistSchema.parse(updateArtist);

        return NextResponse.json(validatedArtist, {status: 200});

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.error("Artistes API - PATCH", error)
        }

    }
}

export async function DELETE(req) {

    const token = getTokenFromRequest(req);

    if (!token) {
        return NextResponse.json({message: UTIL_MESSAGES.NO_TOKEN_PROVIDED}, {status: 401})
    }

    const user = await getUserFromToken(token);

    if (!user) {
        return NextResponse.json({message: UTIL_MESSAGES.NO_USER_FOUND_IN_TOKEN}, {status: 401})
    }

    if (!user.roles.includes(ROLES.ADMIN) && user.id !== id) {
        return NextResponse.json({message: MESSAGES.MUST_BE_OWN_OR_ADMIN}, {status: 403})
    }

    try {

        const requestBody = ArtistDeleteRequestSchema.parse(JSON.parse(await req.text()));

        await prisma.artist.delete({
            where: {
                id: requestBody.id
            }
        });

        return NextResponse.json({message: MESSAGES.SUCCESS_DELETE}, {status: 200})

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.error("Artistes API - DELETE", error)
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.INVALID_ARTIST}, {status: 400});
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}



