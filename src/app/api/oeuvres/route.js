import {NextResponse} from "next/server";

import {prisma} from "@/utils/PrismaUtil";
import {Prisma} from "@prisma/client";

import {z} from 'zod';

const MESSAGES = {
    SUCCESS_DELETE: "L'oeuvre a bien été supprimée",

    INVALID_OEUVRE: "L'oeuvre est invalide",

    NO_ARTIST_FOUND: "Aucun artiste n'a été trouvé",
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
    });

const longueur = z
    .number({
        required_error: "La longueur de l'oeuvre est requise",
        invalid_type_error: "La longueur de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "La longueur de l'oeuvre doit être positive",
    });

const largeur = z
    .number({
        required_error: "La largeur de l'oeuvre est requise",
        invalid_type_error: "La largeur de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "La largeur de l'oeuvre doit être positive",
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

export const OeuvreSchema = z.object({
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
    UnknowArtistOeuvre: z.array(z.string()).optional(),
    tag: z.array(z.string()).optional().transform((value) => value ? value.map((tag) => tag.toUpperCase()) : value),
    type: z.array(z.string()).optional().transform((value) => value ? value.map((type) => type.toUpperCase()) : value),
    images: z.array(z.object(
            {
                url: z.string({
                    required_error: "L'url de l'image est requise",
                    invalid_type_error: "L'url de l'image doit être une chaîne de caractères",
                })
                    .min(
                        1,
                        {
                            message: "L'url de l'image doit contenir au moins 1 caractère",
                        }
                    ),
                position: z.number({
                    required_error: "La position de l'image est requise",
                    invalid_type_error: "La position de l'image doit être un nombre",
                })
                    .positive({
                        message: "La position de l'image doit être positive",
                    })
                    .int({
                        message: "La position de l'image doit être un nombre entier",
                    }),
            }
        )
    ).optional(),
})


const OeuvreCreateSchema = OeuvreSchema
    .omit({
        id: true,
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
        let {Artists, UnknowArtistOeuvre, tag, type, images, ...oeuvreData} = requestBody;

        console.log(requestBody);

        const oeuvre = await prisma.$transaction(async (tx) => {

            let createdOeuvre;

            try {

                createdOeuvre = await tx.oeuvre.create({
                    data: oeuvreData,
                });

            } catch (error) {
                throw new Error("Une erreur est survenue lors de la création de l'oeuvre");
            }

            if (Artists && Artists.length > 0) {
                await Promise.all(
                    Artists.map(async (artistId) => {
                        try {
                            await tx.artistOeuvre.create({
                                data: {
                                    artistId,
                                    oeuvreId: createdOeuvre.id,
                                }
                            });
                        } catch (error) {
                            throw new Error("Une erreur est survenue lors de la tentative d'ajout d'un artiste à l'oeuvre");
                        }
                    })
                );
            }

            if (UnknowArtistOeuvre && UnknowArtistOeuvre.length > 0) {
                await Promise.all(
                    UnknowArtistOeuvre.map(async (unknowArtistValue) => {

                        let unknowArtist;

                        try {
                            unknowArtist = await tx.artistUnknow.upsert({
                                where: {name: unknowArtistValue},
                                update: {},
                                create: {name: unknowArtistValue},
                            })
                        } catch (error) {
                            console.log(error);
                            throw new Error("Une erreur est survenue lors de la tentative de récupération ou de création d'un artiste inconnu pour l'oeuvre");
                        }

                        try {
                            await tx.artistUnknowOeuvre.create({
                                data: {
                                    artistId: unknowArtist.id,
                                    oeuvreId: createdOeuvre.id,
                                }
                            });
                        } catch (error) {
                            throw new Error("Une erreur est survenue lors de la tentative d'ajout d'un artiste inconnu à l'oeuvre");
                        }
                    })
                );
            }

            if (tag && tag.length > 0) {
                await Promise.all(tag.map(async (tagValue) => {

                    let tag;

                    try {
                        tag = await tx.tag.upsert({
                            where: {name: tagValue},
                            update: {},
                            create: {name: tagValue},
                        });
                    } catch (error) {
                        throw new Error("Une erreur est survenue lors de la tentative de récupération ou de création d'un tag pour l'oeuvre");
                    }

                    try {
                        await tx.oeuvreTag.create({
                            data: {
                                tagId: tag.id,
                                oeuvreId: createdOeuvre.id,
                            },
                        });
                    } catch (error) {
                        throw new Error("Une erreur est survenue lors de la tentative d'ajout d'un tag à l'oeuvre");
                    }
                }));
            }

            if (type && type.length > 0) {
                await Promise.all(type.map(async (typeValue) => {

                    let type;

                    try {
                        type = await tx.typesOeuvre.upsert({
                            where: {name: typeValue},
                            update: {},
                            create: {name: typeValue},
                        });
                    } catch (error) {
                        throw new Error("Une erreur est survenue lors de la tentative de récupération ou de création d'un type pour l'oeuvre");
                    }

                    try {
                        await tx.oeuvreTypes.create({
                            data: {
                                typeOeuvreId: type.id,
                                oeuvreId: createdOeuvre.id,
                            },
                        });
                    } catch (error) {
                        throw new Error("Une erreur est survenue lors de la tentative d'ajout d'un type à l'oeuvre");
                    }
                }));
            }

            if (images && images.length > 0) {
                await Promise.all(images.map(async (image) => {
                    try {
                        await tx.oeuvreImage.create({
                            data: {
                                mediaURL: image.url,
                                position: image.position,
                                oeuvreId: createdOeuvre.id,
                            },
                        });
                    } catch (error) {
                        throw new Error("Une erreur est survenue lors de la tentative d'ajout d'une image à l'oeuvre");
                    }
                }));
            }

            return createdOeuvre;
        });

        const updatedOeuvre = await prisma.oeuvre.findUnique({
            where: {
                id: oeuvre.id,
            },
        });

        return NextResponse.json(OeuvreSchema.parse(updatedOeuvre), {status: 201});

    } catch (error) {

        if (process.env.NODE_ENV === "development") {
            console.log(error);
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code === 'P2003') {
                return NextResponse.json({message: MESSAGES.NO_ARTIST_FOUND}, {status: 400});
            }

            if (error.code === 'P2025') {
                return NextResponse.json({message: MESSAGES.NO_ARTIST_FOUND}, {status: 400});
            }

            if (error.code === 'P2002') {
                return NextResponse.json({message: MESSAGES.INVALID_OEUVRE}, {status: 400});
            }
        }

        if (error.message) {
            return NextResponse.json({message: error.message}, {status: 400});
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
