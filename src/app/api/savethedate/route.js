import z from 'zod'
import {ArtistSchema} from "@/app/api/artistes/route";
import {prisma} from "@/utils/PrismaUtil";
import {NextResponse} from "next/server";

const MESSAGES = {
    SUCCESS_CREATE: 'La date importante a bien été créée.',
    SUCCESS_UPDATE: 'La date importante a bien été modifiée.',
    SUCCESS_DELETE: 'La date importante a bien été supprimée.',
    NO_SAVE_THE_DATE: 'Aucune date importante n\'a été trouvée.',
    SAVE_THE_DATE_NOT_FOUND: 'La date importante n\'a pas été trouvée.',
}

const id = z
    .number({
        required_error: 'L\'id de la date importante est requis.',
        invalid_type_error: 'L\'id de la date importante doit être un nombre.',
    })
    .int({
        message: 'L\'id de la date importante doit être un nombre entier.',
    })
    .positive({
        message: 'L\'id de la date importante doit être un nombre positif.',
    });

const title = z
    .string({
        required_error: 'Le titre de la date importante est requis.',
        invalid_type_error: 'Le titre de la date importante doit être une chaîne de caractères.',
    })
    .min(1, {
        message: 'Le titre de la date importante doit contenir au moins 1 caractère.',
    });

const content = z
    .string({
        required_error: 'Le contenu de la date importante est requis.',
        invalid_type_error: 'Le contenu de la date importante doit être une chaîne de caractères.',
    })
    .min(1, {
        message: 'Le contenu de la date importante doit contenir au moins 1 caractère.',
    });

const date = z
    .date({
        required_error: 'La date de la date importante est requise.',
        invalid_type_error: 'La date de la date importante doit être une date.',
    })

const photoURL = z
    .string({
        required_error: 'Le lien de la photo de la date importante est requise.',
        invalid_type_error: 'Le lien de la photo de la date importante doit être une chaîne de caractères.',
    });

const artistId = z
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

const SaveTheDateSchema = z.object({
    id,
    title,
    content,
    date,
    photoURL,
    artistId,
})

const SaveTheDateResponseSchema = z.object({
    total: z
        .number({
            required_error: 'Le nombre total de date importante est requis.',
            invalid_type_error: 'Le nombre total de date importante doit être un nombre entier positif.',
        })
        .int({
            message: 'Le nombre total de date importante doit être un nombre entier positif.',
        })
        .min(0, {
            message: 'Le nombre total de date importante doit être un nombre entier positif.',
        }),
    saveTheDates: z.array(SaveTheDateSchema),
})

const CreateSaveTheDateSchema = SaveTheDateSchema.omit({id: true, date: true})

const UpdateSaveTheDateSchema = SaveTheDateSchema.partial().extend({
    id
})

export async function GET() {

    try {

        const saveTheDates = await prisma.artistSaveTheDate.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                date: true,
                photoURL: true,
                artistId: true,
            }
        });

        if (!saveTheDates.length) {
            return NextResponse.json({message: MESSAGES.NO_SAVE_THE_DATE}, {status: 404})
        }

        const validatedSaveTheDate = saveTheDates.map((saveTheDate) => SaveTheDateSchema.parse(saveTheDate))

        const response = SaveTheDateResponseSchema.parse({
            total: validatedSaveTheDate.length,
            saveTheDates: validatedSaveTheDate,
        })

        return NextResponse.json(response, {status: 200})

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.error(error)
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }
}

export async function POST(req) {

    try {

        const requestBody = CreateSaveTheDateSchema.parse(JSON.parse(await req.text()))

        const saveTheDate = await prisma.artistSaveTheDate.create({
            data: requestBody,
        })

        const validateSaveTheDate = SaveTheDateSchema.parse(saveTheDate)

        return NextResponse.json({
            message: MESSAGES.SUCCESS_CREATE,
            saveTheDate: validateSaveTheDate,
        }, {status: 201})

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.error(error)
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}

export async function PATCH(req) {

    try {

        const requestBody = UpdateSaveTheDateSchema.parse(JSON.parse(await req.text()));

        const id = requestBody.id;
        delete requestBody.id;

        const saveTheDate = await prisma.artistSaveTheDate.update({
            where: {
                id,
            },
            data: requestBody,
            select: {
                id: true,
                title: true,
                content: true,
                date: true,
                photoURL: true,
                artistId: true,
            }
        })

        const validatedSaveTheDate = SaveTheDateSchema.parse(saveTheDate)

        return NextResponse.json({
            message: MESSAGES.SUCCESS_UPDATE,
            saveTheDate: validatedSaveTheDate,
        }, {status: 200})

    } catch (error) {

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        if (error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.ARTIST_UNKNOW_NOT_FOUND}, {status: 404})
        }

        if (error.code === 'P2002') {
            return NextResponse.json({message: MESSAGES.ARTIST_UNKNOW_ALREADY_EXISTS}, {status: 400})
        }

        return NextResponse.error({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }
}

export async function DELETE(req) {

    try {

        const {id} = SaveTheDateSchema.pick({id: true}).parse(JSON.parse(await req.text()));

        await prisma.artistSaveTheDate.delete({
            where: {
                id,
            }
        });

        return NextResponse.json({message: MESSAGES.SUCCESS_DELETE}, {status: 200})

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.error(error)
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        if (error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.SAVE_THE_DATE_NOT_FOUND}, {status: 404})
        }

        return NextResponse.error({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }

}