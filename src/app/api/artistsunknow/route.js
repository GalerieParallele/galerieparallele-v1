import z from 'zod'

import {NextResponse} from "next/server";
import {prisma} from "@/utils/PrismaUtil";

const MESSAGES = {
    NO_ARTIST_UNKNOW: "Aucun artiste non référencé n'a été trouvé.",
    ARTIST_UNKNOW_NOT_FOUND: "L'artiste non référencé n'a pas été trouvé.",

    ARTIST_UNKNOW_ALREADY_EXISTS: "L'artiste non référencé existe déjà.",

    SUCCESS_CREATE: "L'artiste non référencé a été créé avec succès.",
    SUCCESS_EDIT: "L'artiste non référencé a été modifié avec succès.",
    SUCCESS_DELETE: "L'artiste non référencé a été supprimé avec succès.",
}

const idArtistUnknow = z
    .number({
        required_error: "L'id de l'artiste non référencé est requis.",
        invalid_type_error: "L'id de l'artiste non référencé doit être un nombre entier positif.",
    })
    .int({
        message: "L'id de l'artiste non référencé doit être un nombre entier positif.",
    })
    .positive({
        message: "L'id de l'artiste non référencé doit être un nombre entier positif.",
    })

const nameArtistUnknow = z
    .string({
        required_error: "Le nom de l'artiste non référencé est requis.",
        invalid_type_error: "Le nom de l'artiste non référencé doit être une chaîne de caractères.",
    })

export const ArtistUnknowSchema = z.object({
    id: idArtistUnknow,
    name: nameArtistUnknow,
})

const CreateArtistUnknowSchema = z.object({
    name: nameArtistUnknow,
})

const UpdateArtistUnknowSchema = z.object({
    id: idArtistUnknow,
    name: nameArtistUnknow,
})

const ArtistsUnknowResponseSchema = z.object({
    total: z
        .number({
            required_error: "Le nombre total d'artiste non référencé est requis.",
            invalid_type_error: "Le nombre total d'artiste non référencé doit être un nombre entier positif.",
        })
        .int({
            message: "Le nombre total d'artiste non référencé doit être un nombre entier positif.",
        })
        .min(0, {
            message: "Le nombre total d'artiste non référencé  doit être un nombre entier positif.",
        }),
    list: z
        .array(ArtistUnknowSchema),
})

export async function GET() {

    try {

        const artistsUnknow = await prisma.artistUnknow.findMany();

        if (!artistsUnknow.length) {
            return NextResponse.json({message: MESSAGES.NO_ARTIST_UNKNOW}, {status: 404})
        }

        const validatedArtistsUnknow = artistsUnknow.map(artistUnknow => ArtistUnknowSchema.parse(artistUnknow))

        const response = ArtistsUnknowResponseSchema.parse({
            total: validatedArtistsUnknow.length,
            list: validatedArtistsUnknow,
        })

        return NextResponse.json(response, {status: 200})

    } catch (error) {

        console.error(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }
}

export async function POST(req) {

    try {

        const requestBody = CreateArtistUnknowSchema.parse(JSON.parse(await req.text()))

        const data = {
            name: requestBody.name,
        }

        const artistUnkow = await prisma.artistUnknow.create({
            data,
        })

        const validatedArtistUnknow = ArtistUnknowSchema.parse(artistUnkow)

        return NextResponse.json({
            message: MESSAGES.SUCCESS_CREATE,
            artistUnknow: validatedArtistUnknow,
        }, {status: 201})

    } catch (error) {

        console.error(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        if (error.code === 'P2002') {
            return NextResponse.json({message: MESSAGES.ARTIST_UNKNOW_ALREADY_EXISTS}, {status: 400})
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}

export async function PATCH(req) {

    try {

        const requestBody = UpdateArtistUnknowSchema.parse(JSON.parse(await req.text()));

        const artistUnknowId = requestBody.id;
        delete requestBody.id;

        const data = {
            name: requestBody.name,
        }

        const artistUnknow = await prisma.artistUnknow.update({
            where: {
                id: artistUnknowId,
            },
            data,
        })

        const validatedArtistUnknow = ArtistUnknowSchema.parse(artistUnknow)

        return NextResponse.json({
            message: MESSAGES.SUCCESS_EDIT,
            artistUnknow: validatedArtistUnknow,
        }, {status: 200})

    } catch (error) {

        console.error(error)

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

        const {id} = ArtistUnknowSchema.pick({id: true}).parse(JSON.parse(await req.text()));

        await prisma.artistUnknow.delete({
            where: {
                id,
            },
        })

        return NextResponse.json({message: MESSAGES.SUCCESS_DELETE}, {status: 200})

    } catch (error) {

        console.error(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        if (error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.ARTIST_UNKNOW_NOT_FOUND}, {status: 404})
        }

        return NextResponse.error({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }
}
