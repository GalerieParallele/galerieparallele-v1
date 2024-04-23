import {z} from 'zod';

import {NextResponse} from 'next/server';
import {prisma} from "@/utils/PrismaUtil";

const GetArtistUnknowById = z.object({
    id: z
        .number({
            required_error: "L'id de l'artiste non référencé est requis",
            invalid_type_error: "L'id de l'artiste non référencé doit être un nombre entier positif",
        })
        .int({
            message: "L'id de l'artiste non référencé doit être un nombre entier positif",
        })
        .positive({
            message: "L'id de l'artiste non référencé doit être un nombre entier positif",
        }),
});

const MESSAGES = {
    INVALID_UNKNOW_ARTIST: "L'artiste non référencé n'a pas été trouvé",
}

export async function POST(req) {

    try {

        const requestBody = GetArtistUnknowById.parse(JSON.parse(await req.text()));

        const id = requestBody.id;

        const artistUnknow = await prisma.artistUnknow.findUnique({
            where: {id},
        });

        if (!artistUnknow) {
            return NextResponse.json({message: MESSAGES.INVALID_UNKNOW_ARTIST}, {status: 404});
        }

        return NextResponse.json(artistUnknow, {status: 200});

    } catch (error) {

        console.error(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({errors: error.errors[0].message}, {status: 400});
        }

        if (error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.INVALID_UNKNOW_ARTIST}, {status: 404});
        }

        return NextResponse.json({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }
}
