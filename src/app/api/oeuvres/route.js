import {NextResponse} from "next/server";

import {prisma} from "@/utils/PrismaUtil";
import {Prisma} from "@prisma/client";

import {z} from 'zod';

const MESSAGES = {
    SUCCESS_DELETE: "L'oeuvre a bien été supprimée",

    INVALID_OEUVRE: "L'oeuvre est invalide",

    NO_ARTIST_FOUND: "Aucun artiste n'a été trouvé",
    NO_OEUVRES_FOUND: "Aucune oeuvre n'a été trouvée",
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
    .min(1, {
        message: "La hauteur de l'oeuvre doit être supérieure à 1",
    })

const longueur = z
    .number({
        required_error: "La longueur de l'oeuvre est requise",
        invalid_type_error: "La longueur de l'oeuvre doit être un nombre",
    })
    .min(1, {
        message: "La longueur de l'oeuvre doit être supérieure à 1",
    })

const largeur = z
    .number({
        required_error: "La largeur de l'oeuvre est requise",
        invalid_type_error: "La largeur de l'oeuvre doit être un nombre",
    })
    .min(1, {
        message: "La largeur de l'oeuvre doit être supérieure à 1",
    })
    .nullable()
    .optional();

const numerotation = z
    .number({
        required_error: "La numérotation de l'oeuvre est requise",
        invalid_type_error: "La numérotation de l'oeuvre doit être un nombre",
    })
    .min(1, {
        message: "La numérotation de l'oeuvre doit être supérieure à 0",
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
    .min(1, {
        message: "La limitation de l'oeuvre doit être supérieure à 0",
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
    .max(255, {
        message: "Le support de l'oeuvre doit contenir au plus 255 caractères",
    })
    .nullable()
    .optional();

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
    .min(1, {
        message: "Le prix de l'oeuvre doit être supérieur à 0",
    });

const orientation = z
    .enum(
        ["PORTRAIT", "PAYSAGE", "CARRE", "NO_DEFINED"],
        {
            required_error: "L'orientation de l'oeuvre est requise",
            invalid_type_error: "L'orientation de l'oeuvre doit être soit PORTRAIT, PAYSAGE ou CARRE",
        }
    )
    .transform((value) => value.toUpperCase())

const tagSchema = z.string().min(1).max(255).transform((value) => value.toUpperCase());
const typeSchema = z.string().min(1).max(255).transform((value) => value.toUpperCase());

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
    orientation,
}).passthrough();

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

export async function GET() {

    try {

        const oeuvres = await prisma.oeuvre.findMany({
            include: {
                images: {
                    select: {
                        position: true,
                        mediaURL: true,
                    }
                },
                Artists: {
                    include: {
                        artist: {
                            select: {
                                id: true,
                                pseudo: true,
                                user: {
                                    select: {
                                        lastname: true,
                                        firstname: true,
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
                                id: true,
                                name: true,
                            }
                        },
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
                    },
                },
                couleurs: {
                    select: {
                        couleur: {
                            select: {
                                hexa: true,
                                name: true,
                            }
                        }
                    }
                }
            }
        });

        if (!oeuvres.length) {
            return NextResponse.json({message: MESSAGES.NO_OEUVRES_FOUND}, {status: 404});
        }

        oeuvres.forEach((oeuvre) => {
            oeuvre.artists = oeuvre.Artists.map(({artist}) => artist);
            oeuvre.Artists = undefined;

            oeuvre.unknowartists = oeuvre.UnknowArtistOeuvre.map(({artist}) => artist);
            oeuvre.UnknowArtistOeuvre = undefined;

            oeuvre.tags = oeuvre.tag.map(({tag}) => tag.name);
            oeuvre.tag = undefined;

            oeuvre.types = oeuvre.type.map(({type}) => type.name.toUpperCase());
            oeuvre.type = undefined;

            oeuvre.couleurs = oeuvre.couleurs.map(({couleur}) => couleur);

        });


        return NextResponse.json(OeuvreResponseSchema.parse({total: oeuvres.length, list: oeuvres}), {status: 200});

    } catch (error) {

        if (process.env.NODE_ENV === "development") {
            console.log("Oeuvres API - GET", error);
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }
}

export async function POST(req) {

    try {

        let {
            Artists,
            UnknowArtistOeuvre,
            couleurs,
            tag,
            type,
            images,
            ...oeuvreData
        } = OeuvreSchema.omit({id: true}).parse(JSON.parse(await req.text()));


        try {
            parseFloat(oeuvreData.prix);
        } catch (error) {
            throw new Error("Le prix de l'oeuvre doit être un nombre");
        }

        try {
            parseFloat(oeuvreData.hauteur);
        } catch (error) {
            throw new Error("La hauteur de l'oeuvre doit être un nombre");
        }

        const oeuvre = await prisma.$transaction(async (tx) => {

            let createdOeuvre;

            try {

                createdOeuvre = await tx.oeuvre.create({
                    data: oeuvreData,
                });

            } catch (error) {
                console.log(error);
                throw new Error(error.message);
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
                            create: {name: tagValue.toUpperCase()},
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

            if (couleurs && couleurs.length > 0) {
                await Promise.all(couleurs.map(async (hexa) => {
                    try {
                        await tx.oeuvreCouleur.create({
                            data: {
                                hexa: hexa,
                                oeuvreId: createdOeuvre.id,
                            },
                        });
                    } catch (error) {
                        throw new Error("Une erreur est survenue lors de la tentative d'ajout d'une couleur à l'oeuvre");
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
                            create: {name: typeValue.toUpperCase()},
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

export async function PATCH(req) {

    try {

        let {
            artists,
            unknowartists,
            couleurs,
            tag,
            type,
            images,
            ...oeuvreData
        } = OeuvreSchema.omit({id: true}).partial().parse(JSON.parse(await req.text()));


        if (artists) {


            let currentArtistsOeuvre = await prisma.artistOeuvre.findMany({
                where: {
                    oeuvreId: oeuvreData.id,
                },
                select: {
                    artistId: true,
                }
            });

            currentArtistsOeuvre = currentArtistsOeuvre.map(({artistId}) => artistId);

            const addedArtists = artists.filter((artistId) => !currentArtistsOeuvre.includes(artistId));
            const removedArtists = currentArtistsOeuvre.filter((artistId) => !artists.includes(artistId));

            await prisma.$transaction(async (tx) => {

                if (addedArtists.length > 0) {
                    await Promise.all(addedArtists.map(async (artistId) => {
                        try {
                            await tx.artistOeuvre.create({
                                data: {
                                    artistId,
                                    oeuvreId: oeuvreData.id,
                                }
                            });
                        } catch (error) {
                            throw new Error("Une erreur est survenue lors de l'ajout d'un artiste à l'oeuvre");
                        }
                    }));
                }

                if (removedArtists.length > 0) {
                    await Promise.all(removedArtists.map(async (artistId) => {
                        try {
                            await tx.artistOeuvre.delete({
                                where: {
                                    artistId_oeuvreId: {
                                        artistId,
                                        oeuvreId: oeuvreData.id,
                                    }
                                }
                            });
                        } catch (error) {
                            throw new Error("Une erreur est survenue lors de la suppression d'un artiste de l'oeuvre");
                        }
                    }));
                }
            });
        }

        if (unknowartists) {

            const currentUnknowArtistsOeuvre = (await prisma.artistUnknowOeuvre.findMany({
                where: {oeuvreId: oeuvreData.id},
                select: {artist: {select: {name: true}}}
            })).map(({artist}) => artist.name);

            const currentArtistsSet = new Set(currentUnknowArtistsOeuvre);
            const incomingArtistsSet = new Set(unknowartists);

            const addedUnknowArtists = [...incomingArtistsSet].filter(artist => !currentArtistsSet.has(artist));
            const removedUnknowArtists = [...currentArtistsSet].filter(artist => !incomingArtistsSet.has(artist));

            await prisma.$transaction(async (tx) => {
                for (const artist of addedUnknowArtists) {
                    const unknowArtist = await tx.artistUnknow.upsert({
                        where: {name: artist},
                        update: {},
                        create: {name: artist},
                    });

                    await tx.artistUnknowOeuvre.create({
                        data: {artistId: unknowArtist.id, oeuvreId: oeuvreData.id},
                    });
                }

                for (const artistName of removedUnknowArtists) {
                    const unknowArtist = await tx.artistUnknow.findUnique({
                        where: {name: artistName},
                        select: {id: true},
                    });

                    await tx.artistUnknowOeuvre.deleteMany({
                        where: {
                            artistId: unknowArtist.id,
                            oeuvreId: oeuvreData.id,
                        }
                    });
                }
            });


        }

        if (couleurs) {

            const currentSelectedColorsHexa = couleurs.map(({hexa}) => hexa);

            const currentOeuvreColors = await prisma.oeuvreCouleur.findMany({
                where: {
                    oeuvreId: oeuvreData.id,
                },
                select: {
                    hexa: true,
                }
            });

            const addedColors = currentSelectedColorsHexa.filter((hexa) => !currentOeuvreColors.some((color) => color.hexa === hexa));
            const removedColors = currentOeuvreColors.filter((color) => !currentSelectedColorsHexa.some((hexa) => color.hexa === hexa));

            await prisma.$transaction(async (tx) => {

                if (addedColors.length > 0) {
                    await Promise.all(addedColors.map(async (hexa) => {
                        try {
                            await tx.oeuvreCouleur.create({
                                data: {
                                    hexa,
                                    oeuvreId: oeuvreData.id,
                                }
                            });
                        } catch (error) {
                            throw new Error("Une erreur est survenue lors de l'ajout d'une couleur à l'oeuvre");
                        }
                    }))
                }

                if (removedColors.length > 0) {
                    await Promise.all(removedColors.map(async ({hexa}) => {
                        try {
                            await tx.oeuvreCouleur.delete({
                                where: {
                                    oeuvreId_hexa: {
                                        oeuvreId: oeuvreData.id,
                                        hexa,
                                    }
                                }
                            });
                        } catch (error) {
                            console.log(error);
                            throw new Error("Une erreur est survenue lors de la suppression d'une couleur de l'oeuvre");
                        }
                    }));
                }
            });

        }

        if (tag) {

            tag = tagSchema.array().parse(tag);

            let currentOeuvreTags = await prisma.oeuvreTag.findMany({
                where: {
                    oeuvreId: oeuvreData.id,
                },
                select: {
                    tag: {
                        select: {
                            name: true,
                        }
                    }
                }
            });

            currentOeuvreTags = currentOeuvreTags.map(({tag}) => tag.name);

            const addedTags = tag.filter((tag) => !currentOeuvreTags.includes(tag));
            const removedTags = currentOeuvreTags.filter((currentTag) => !tag.includes(currentTag));

            await prisma.$transaction(async (tx) => {

                if (addedTags.length > 0) {
                    await Promise.all(addedTags.map(async (tagValue) => {

                        let tag;

                        try {
                            tag = await tx.tag.upsert({
                                where: {name: tagValue},
                                update: {},
                                create: {name: tagValue},
                            });
                        } catch (error) {
                            throw new Error("Une erreur est survenue lors de la récupération ou de la création d'un tag pour l'oeuvre");
                        }

                        try {
                            await tx.oeuvreTag.create({
                                data: {
                                    tagId: tag.id,
                                    oeuvreId: oeuvreData.id,
                                }
                            });
                        } catch (error) {
                            throw new Error("Une erreur est survenue lors de l'ajout d'un tag à l'oeuvre");
                        }
                    }));
                }

                if (removedTags.length > 0) {
                    await Promise.all(removedTags.map(async (tagValue) => {
                        try {

                            const tag = await tx.tag.findUnique({
                                where: {name: tagValue},
                                select: {id: true},
                            });

                            await tx.oeuvreTag.delete({
                                where: {
                                    oeuvreId_tagId: {
                                        oeuvreId: oeuvreData.id,
                                        tagId: tag.id,
                                    }
                                }
                            });
                        } catch (error) {
                            console.log(error)
                            throw new Error("Une erreur est survenue lors de la suppression d'un tag de l'oeuvre");
                        }
                    }));
                }
            });

        }

        if (type) {

            type = typeSchema.array().parse(type);

            let currentOeuvreTypes = await prisma.oeuvreTypes.findMany({
                where: {
                    oeuvreId: oeuvreData.id,
                },
                select: {
                    type: {
                        select: {
                            name: true,
                        }
                    }
                }
            });

            currentOeuvreTypes = currentOeuvreTypes.map(({type}) => type.name);

            const addedTypes = type.filter((type) => !currentOeuvreTypes.includes(type));
            const removedTypes = currentOeuvreTypes.filter((currentType) => !type.includes(currentType));

            await prisma.$transaction(async (tx) => {

                if (addedTypes.length > 0) {
                    await Promise.all(addedTypes.map(async (typeValue) => {

                        let type;

                        try {
                            type = await tx.typesOeuvre.upsert({
                                where: {name: typeValue},
                                update: {},
                                create: {name: typeValue},
                                select: {id: true},
                            });
                        } catch (error) {
                            throw new Error("Une erreur est survenue lors de la récupération ou de la création d'un type pour l'oeuvre");
                        }


                        try {
                            await tx.oeuvreTypes.create({
                                data: {
                                    typeOeuvreId: type.id,
                                    oeuvreId: oeuvreData.id,
                                }
                            });
                        } catch (error) {
                            throw new Error("Une erreur est survenue lors de l'ajout d'un type à l'oeuvre");
                        }
                    }));
                }

                if (removedTypes.length > 0) {
                    await Promise.all(removedTypes.map(async (typeValue) => {

                        const type = await tx.typesOeuvre.findUnique({
                            where: {name: typeValue},
                            select: {id: true},
                        });

                        try {
                            await tx.oeuvreTypes.delete({
                                where: {
                                    oeuvreId_typeOeuvreId: {
                                        oeuvreId: oeuvreData.id,
                                        typeOeuvreId: type.id,
                                    }
                                }
                            });
                        } catch (error) {
                            throw new Error("Une erreur est survenue lors de la suppression d'un type de l'oeuvre");
                        }
                    }));
                }
            });
        }

        if (images) {
            // TODO : Patch images to oeuvre
        }

        const updatedOeuvre = await prisma.oeuvre.update({
            where: {
                id: oeuvreData.id,
            },
            data: oeuvreData,
        });

        const validatedOeuvre = OeuvreSchema.parse(updatedOeuvre);

        return NextResponse.json(validatedOeuvre, {status: 200});

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
