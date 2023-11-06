import {z} from 'zod';
import {Prisma} from "@prisma/client";
import {NextResponse} from "next/server";
import {UserSchema} from "@/app/api/users/route";
import {prisma} from "@/utils/PrismaUtil";
import {LegalInformationSchema} from "@/app/api/legalsinformation/route";


const MESSAGES = {

    NO_ARTIST_FOUND: "Aucun artiste n'a été trouvé.",
    NO_USER_FOUND: "L'utilisateur appartenant à cet artiste n'existe pas.",
    USER_ALREADY_ARTIST: "L'utilisateur est déjà un artiste.",

    INVALID_ARTIST: "L'id de l'artiste renseigné ne correspond à aucun artiste.",

    SUCCESS_DELETE: "L'artiste a bien été supprimé.",

}

const id = z
    .number({
        message: "L'id de l'artiste doit être un nombre.",
        required_error: "L'id de l'artiste est requis."
    })
    .int({
        message: "L'id de l'artiste doit être un nombre entier.",
    })
    .positive({
        message: "L'id de l'artiste doit être un nombre positif."
    });

const pseudo = z
    .string({
        message: "Le pseudo de l'artiste doit être une chaîne de caractères.",
        required_error: "Le pseudo de l'artiste est requis."
    })
    .max(255, {
        message: "Le pseudo de l'artiste ne doit pas dépasser 255 caractères."
    })
    .nullable()
    .optional();

const bio = z
    .string({
        message: "La biographie de l'artiste doit être une chaîne de caractères.",
        required_error: "La biographie de l'artiste est requise."
    })
    .max(65535, {
        message: "La biographie de l'artiste ne doit pas dépasser 65535 caractères."
    })
    .nullable()
    .optional();

const instagram = z
    .string({
        message: "Le lien Instagram de l'artiste doit être une chaîne de caractères.",
        required_error: "Le lien Instagram de l'artiste est requis."
    })
    .max(255, {
        message: "Le lien Instagram de l'artiste ne doit pas dépasser 255 caractères."
    })
    .url({
        message: "Le lien Instagram de l'artiste doit être une URL valide."
    })
    .startsWith("https://www.instagram.com/", {
        message: "Le lien Instagram de l'artiste doit commencer par 'https://www.instagram.com/'."
    })
    .nullable()
    .optional();

const facebook = z
    .string({
        message: "Le lien Facebook de l'artiste doit être une chaîne de caractères.",
        required_error: "Le lien Facebook de l'artiste est requis."
    })
    .max(255, {
        message: "Le lien Facebook de l'artiste ne doit pas dépasser 255 caractères."
    })
    .url({
        message: "Le lien Facebook de l'artiste doit être une URL valide."
    })
    .startsWith("https://www.facebook.com/", {
        message: "Le lien Facebook de l'artiste doit commencer par 'https://www.facebook.com/'."
    })
    .nullable()
    .optional();

const linkedin = z
    .string({
        message: "Le lien LinkedIn de l'artiste doit être une chaîne de caractères.",
        required_error: "Le lien LinkedIn de l'artiste est requis."
    })
    .max(255, {
        message: "Le lien LinkedIn de l'artiste ne doit pas dépasser 255 caractères."
    })
    .url({
        message: "Le lien LinkedIn de l'artiste doit être une URL valide."
    })
    .startsWith("https://www.linkedin.com/", {
        message: "Le lien LinkedIn de l'artiste doit commencer par 'https://www.linkedin.com/'."
    })
    .nullable()
    .optional();

const website = z
    .string({
        message: "Le lien du site web de l'artiste doit être une chaîne de caractères.",
        required_error: "Le lien du site web de l'artiste est requis."
    })
    .max(500, {
        message: "Le lien du site web de l'artiste ne doit pas dépasser 500 caractères."
    })
    .url({
        message: "Le lien du site web de l'artiste doit être une URL valide."
    })
    .nullable()
    .optional();

const tag = z
    .array(z.string({
            message: "Le tag de l'artiste doit être une chaîne de caractères.",
            required_error: "Le tag de l'artiste est requis."
        })
            .transform(tag => tag.toUpperCase()
            )
    )
    .optional();

const user = UserSchema;
const legalInformation = LegalInformationSchema.nullable();

export const ArtistSchema = z.object({
    id,
    pseudo,
    bio,
    instagram,
    facebook,
    linkedin,
    website,
    tag,
    user,
    legalInformation
});

const ArtistResponseSchema = z.object({
    total: z
        .number({
            message: "Le nombre total d'artistes doit être un nombre.",
            required_error: "Le nombre total d'artistes est requis."
        })
        .int({
            message: "Le nombre total d'artistes doit être un nombre entier.",
        })
        .positive({
            message: "Le nombre total d'artistes doit être un nombre positif."
        }),
    list: z.array(ArtistSchema)
});

const ArtistSchemaPost = ArtistSchema
    .omit({
        id: true,
    })
    .partial()
    .extend({
        userid: z
            .number({
                message: "L'id de l'utilisateur doit être un nombre.",
                required_error: "L'id de l'utilisateur est requis."
            })
            .int({
                message: "L'id de l'utilisateur doit être un nombre entier.",
            })
            .positive({
                message: "L'id de l'utilisateur doit être un nombre positif."
            })

    });

export async function GET() {

    try {

        const artists = await prisma.artist.findMany({
            select: {
                id: true,
                pseudo: true,
                bio: true,
                instagram: true,
                facebook: true,
                linkedin: true,
                website: true,
                saveTheDate: {
                    select: {
                        title: true,
                        content: true,
                        date: true,
                        photoURL: true,
                    }
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                        avatarURL: true,
                        firstname: true,
                        lastname: true,
                        street: true,
                        city: true,
                        postalCode: true,
                        phone: true,
                        roles: true,
                    }
                },
                tag: {
                    select: {
                        tag: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                legalInformation: {
                    select: {
                        id: true,
                        societe: true,
                        tva: true,
                        siret: true,
                        adrNumVoie: true,
                        adrRue: true,
                        adrVille: true,
                        adrCodePostal: true,
                        numMaisonsDesArtistes: true,
                        numSecuriteSociale: true,
                        artistId: true,
                    }
                }
                // exposition: {
                //     select: {
                //         name: true,
                //     }
                // },
                // oeuvre: {
                //     select: {
                //         oeuvre: {
                //             select: {
                //                 name: true,
                //                 description: true,
                //                 prix: true,
                //                 anecdote: true,
                //                 hauteur: true,
                //                 longueur: true,
                //                 largeur: true,
                //                 signature: true,
                //                 encadrement: true,
                //                 support: true,
                //                 technique: true,
                //                 numerotation: true,
                //                 images: {
                //                     select: {
                //                         mediaURL: true
                //                     }
                //                 },
                //                 tag: {
                //                     select: {
                //                         tag: {
                //                             select: {
                //                                 name: true
                //                             }
                //                         }
                //                     }
                //                 },
                //                 type: {
                //                     select: {
                //                         type: {
                //                             select: {
                //                                 name: true,
                //                             }
                //                         }
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }
            }
        });

        if (!artists.length) {
            return NextResponse.json({message: MESSAGES.NO_ARTIST_FOUND}, {status: 404});
        }

        artists.map(artist => {
            artist.tag = artist.tag.map(tag => tag.tag.name);

            console.log(artist);
        });

        const validatedArtist = artists.map(artist => ArtistSchema.parse(artist));

        const response = ArtistResponseSchema.parse({
            total: validatedArtist.length,
            list: validatedArtist
        });

        return NextResponse.json(response, {status: 200});

    } catch (error) {

        console.log(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({errors: error.errors[0].message}, {status: 400});
        }

        return NextResponse.json(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}

export async function POST(req) {

    try {

        const requestBody = ArtistSchemaPost.parse(JSON.parse(await req.text()))

        const artist = await prisma.artist.create({
            data: {
                ...requestBody,
                userid: requestBody.userid
            },
            select: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        avatarURL: true,
                        firstname: true,
                        lastname: true,
                        street: true,
                        city: true,
                        postalCode: true,
                        phone: true,
                        roles: true,
                    }
                },
                legalInformation: {
                    select: {
                        id: true,
                        societe: true,
                        tva: true,
                        siret: true,
                        adrNumVoie: true,
                        adrRue: true,
                        adrVille: true,
                        adrCodePostal: true,
                        numMaisonsDesArtistes: true,
                        numSecuriteSociale: true,
                        artistId: true,
                    }
                }
            }
        });

        return NextResponse.json(ArtistSchema.omit({id: true}).parse(artist), {status: 201});

    } catch (error) {

        console.log(error);

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

    try {

        const ArtistSchemaOmitRelation = ArtistSchema.omit({
            user: true,
            legalInformation: true,
            tag: true
        });

        const requestBody = ArtistSchemaOmitRelation.parse(JSON.parse(await req.text()));

        const id = requestBody.id;

        const updateArtist = await prisma.artist.update({
            where: {
                id
            },
        })

        const validatedArtist = ArtistSchemaOmitRelation.parse(updateArtist);

        return NextResponse.json(validatedArtist, {status: 200});

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.log(error);
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.INVALID_ARTIST}, {status: 404});
        }

        return NextResponse.json(MESSAGES.API_SERVER_ERROR, {status: 500});
    }
}

export async function DELETE(req) {

    try {

        const requestBody = ArtistSchema.pick({id: true}).parse(JSON.parse(await req.text()));

        await prisma.artist.delete({
            where: {
                id: requestBody.id
            }
        });

        return NextResponse.json({message: MESSAGES.SUCCESS_DELETE}, {status: 200})

    } catch (error) {

        console.log(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.INVALID_ARTIST}, {status: 404});
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}