import {NextResponse} from "next/server";

import {prisma} from "@/utils/PrismaUtil";
import {Prisma} from "@prisma/client";

import {z} from 'zod';

import {ArtistSchema} from "@/app/api/artistes/route";
import {ArtistUnknowSchema} from "@/app/api/artistsunknow/route";
import {TagSchema} from "@/app/api/tags/route";
import {TypeOeuvreSchema} from "@/app/api/typesoeuvres/route";
import {OeuvreImageSchema} from "@/app/api/oeuvreimages/route";

const MESSAGES = {
    SUCCESS_DELETE: "L'oeuvre a bien été supprimée",

    INVALID_OEUVRE: "L'oeuvre est invalide",
}

const id = z
    .number({
        required_error: "L'id de l'oeuvre est requis",
        invalid_type_error: "L'id de l'oeuvre doit être un nombre entier",
    })
    .int({
        message: "L'id de l'oeuvre doit être un nombre entier",
    })
    .positive({
        message: "L'id de l'oeuvre doit être positif",
    });

const name = z
    .string({
        required_error: "Le nom de l'oeuvre est requis",
        invalid_type_error: "Le nom de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "Le nom de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(255, {
        message: "Le nom de l'oeuvre doit contenir au plus 255 caractères",
    });

const description = z
    .string({
        required_error: "La description de l'oeuvre est requise",
        invalid_type_error: "La description de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "La description de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(65535, {
        message: "La description de l'oeuvre doit contenir au plus 65535 caractères",
    })
    .nullable()
    .optional();

const anecdote = z
    .string({
        required_error: "L'anecdote de l'oeuvre est requise",
        invalid_type_error: "L'anecdote de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "L'anecdote de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(65535, {
        message: "L'anecdote de l'oeuvre doit contenir au plus 65535 caractères",
    })
    .nullable()
    .optional();

const hauteur = z
    .number({
        required_error: "La hauteur de l'oeuvre est requise",
        invalid_type_error: "La hauteur de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "La hauteur de l'oeuvre doit être positive",
    })
    .int({
        message: "La hauteur de l'oeuvre doit être un nombre entier",
    });

const longueur = z
    .number({
        required_error: "La longueur de l'oeuvre est requise",
        invalid_type_error: "La longueur de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "La longueur de l'oeuvre doit être positive",
    })
    .int({
        message: "La longueur de l'oeuvre doit être un nombre entier",
    });

const largeur = z
    .number({
        required_error: "La largeur de l'oeuvre est requise",
        invalid_type_error: "La largeur de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "La largeur de l'oeuvre doit être positive",
    })
    .int({
        message: "La largeur de l'oeuvre doit être un nombre entier",
    })
    .nullable()
    .optional();

const numerotation = z
    .number({
        required_error: "La numérotation de l'oeuvre est requise",
        invalid_type_error: "La numérotation de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "La numérotation de l'oeuvre doit être positive",
    })
    .int({
        message: "La numérotation de l'oeuvre doit être un nombre entier",
    })
    .optional();

const limitation = z
    .number({
        required_error: "La limitation de l'oeuvre est requise",
        invalid_type_error: "La limitation de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "La limitation de l'oeuvre doit être positive",
    })
    .int({
        message: "La limitation de l'oeuvre doit être un nombre entier",
    })
    .optional()

const support = z
    .string({
        required_error: "Le support de l'oeuvre est requis",
        invalid_type_error: "Le support de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "Le support de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(255, {
        message: "Le support de l'oeuvre doit contenir au plus 255 caractères",
    });

const technique = z
    .string({
        required_error: "La technique de l'oeuvre est requise",
        invalid_type_error: "La technique de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "La technique de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(255, {
        message: "La technique de l'oeuvre doit contenir au plus 255 caractères",
    });

const encadrement = z
    .string({
        required_error: "L'encadrement de l'oeuvre est requis",
        invalid_type_error: "L'encadrement de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "L'encadrement de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(255, {
        message: "L'encadrement de l'oeuvre doit contenir au plus 255 caractères",
    })
    .nullable()
    .optional();

const signature = z
    .string({
        required_error: "La signature de l'oeuvre est requise",
        invalid_type_error: "La signature de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "La signature de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(255, {
        message: "La signature de l'oeuvre doit contenir au plus 255 caractères",
    })
    .nullable()
    .optional();

const prix = z
    .number({
        required_error: "Le prix de l'oeuvre est requis",
        invalid_type_error: "Le prix de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "Le prix de l'oeuvre doit être positif",
    });

// Relations
const Artists = z
    .array(ArtistSchema.pick({id: true}))
    .default([])
    .optional();

const UnknowArtists = z
    .array(ArtistUnknowSchema.pick({id: true}))
    .default([])
    .optional();

const Tags = z
    .array(TagSchema.pick({id: true}))
    .default([])
    .optional();

const Types = z
    .array(TypeOeuvreSchema.pick({id: true}))
    .default([])
    .optional();

const Images = z
    .array(OeuvreImageSchema.pick({mediaURL: true}))
    .default([])
    .optional();

const OeuvreSchema = z.object({
    id,
    name,
    description,
    anecdote,
    hauteur,
    longueur,
    largeur,
    numerotation,
    limitation,
    support,
    technique,
    encadrement,
    signature,
    prix,
    Artists: z.array(z.number()).optional(),
    UnknowArtists: z.array(z.number()).optional(),
    Tags: z.array(z.number()).optional(),
    Types: z.array(z.number()).optional(),
    Images: z.array(z.string()).optional(),
});

const OeuvreCreateSchema = OeuvreSchema
    .omit({
        id: true,
    });

const OeuvreUpdateDeleteSchema = OeuvreSchema
    .partial()
    .extend({
        id,
    });

const OeuvreResponseSchema = z.object({
    total: z
        .number({
            required_error: "Le nombre total d'oeuvres est requis",
            invalid_type_error: "Le nombre total d'oeuvres doit être un nombre",
        })
        .int({
            message: "Le nombre total d'oeuvres doit être un nombre entier",
        })
        .positive({
            message: "Le nombre total d'oeuvres doit être positif",
        }),
    list: z.array(OeuvreSchema),
})

export async function POST(req) {

    try {

        const requestBody = OeuvreCreateSchema.parse(JSON.parse(await req.text()));

        const oeuvre = await prisma.oeuvre.create({
            data: {
                ...requestBody,
            },
            select: {
                id: true,
                name: true,
                description: true,
                anecdote: true,
                prix: true,
                hauteur: true,
                largeur: true,
                longueur: true,
                limitation: true,
                numerotation: true,
                technique: true,
                signature: true,
                encadrement: true,
                support: true,
                images: {
                    select: {
                        mediaURL: true,
                    }
                },
                Artists: {
                    select: {
                        artist: {
                            select: {
                                pseudo: true,
                                user: {
                                    select: {
                                        firstname: true,
                                        lastname: true,
                                    }
                                }
                            }
                        }
                    }
                },
                UnknowArtistOeuvre: {
                    select: {
                        artist: {
                            select: {
                                name: true,
                            }
                        }
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
                type: {
                    select: {
                        type: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            }
        })

        return NextResponse.json(OeuvreSchema.parse(oeuvre), {status: 201});

    } catch (error) {

        if (process.env.NODE_ENV === "development") {
            console.log(error);
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        return NextResponse.json(MESSAGES.API_SERVER_ERROR, {status: 500});

    }
}

export async function DELETE(req) {

    try {

        const requestBody = OeuvreSchema.pick({id: true}).parse(JSON.parse(await req.text()));

        await prisma.oeuvre.delete({
            where: {
                id: requestBody.id,
            },
        });

        return NextResponse.json({message: MESSAGES.SUCCESS_DELETE}, {status: 200});

    } catch (error) {

        if (process.env.NODE_ENV === "development") {
            console.log(error);
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.INVALID_OEUVRE}, {status: 404});
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}
