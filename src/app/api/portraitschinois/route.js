import {z} from 'zod';

import {Prisma} from "@prisma/client";
import {NextResponse} from "next/server";

const MESSAGES = {
    PORTRAITS_NOT_FOUND: "Aucun portrait n'a été trouvé.",
    ARTIST_OWNER_NOT_FOUND: "L'artiste propriétaire du portrait n'a pas été trouvé.",

    SUCCESS_DELETE: "Le portrait a été supprimé avec succès.",
}

const id = z.number({
    required_error: "L'identifiant du portrait est requis.",
    invalid_type_error: "L'identifiant du portrait doit être un nombre.",
})
    .int("L'identifiant du portrait doit être un nombre entier.")
    .positive("L'identifiant du portrait doit être un nombre positif.");

const artistId = z.number({
    required_error: "L'identifiant de l'artiste est requis.",
    invalid_type_error: "L'identifiant de l'artiste doit être un nombre.",
})
    .int("L'identifiant de l'artiste doit être un nombre entier.")
    .positive("L'identifiant de l'artiste doit être un nombre positif.");

const question = z.string({
    required_error: "La question du portrait est requise.",
    length: {
        minimum: 1,
        maximum: 2000,
        message: "La question du portrait doit contenir entre 1 et 2000 caractères."
    }
});

const answer = z.string({
    required_error: "La réponse du portrait est requise.",
    length: {
        minimum: 1,
        maximum: 2000,
        message: "La réponse du portrait doit contenir entre 1 et 2000 caractères."
    }
});

const isPrivate = z.boolean({
    required_error: "La confidentialité du portrait (public/privé) est requise.",
})

// Schema -----------------------

const PortraitSchema = z.object({
    id,
    artistId,
    question,
    answer,
    'private': isPrivate,
});

const PortraitResponseSchema = z.object({
    total: z.number({
        required_error: "Le nombre total de portraits est requis.",
        invalid_type_error: "Le nombre total de portraits doit être un nombre.",
    }).int({
        message: "Le nombre total de portraits doit être un nombre entier."
    }).positive({
        message: "Le nombre total de portraits doit être un nombre positif."
    }),
    list: z.array(PortraitSchema),
});

export async function GET() {

    try {

        const portraits = await prisma.artistPortrait.findMany({
            include: {
                artist: {
                    select: {
                        id: true,
                    }
                },
                portrait: {
                    select: {
                        answer: true,
                    }
                },
            }
        })

        if (!portraits.length) {
            return NextResponse.json({message: MESSAGES.PORTRAITS_NOT_FOUND}, {status: 404});
        }

        const transformedPortraits = portraits.map(portrait => {
            return {
                id: portrait.id,
                artistId: portrait.artistId,
                question: portrait.question,
                answer: portrait.answer,
                private: portrait.private,
            }
        });

        const response = PortraitResponseSchema.parse({
            total: transformedPortraits.length,
            list: transformedPortraits,
        });

        return NextResponse.json(response, {status: 200});


    } catch (error) {

        if (process.env.ENV === "development") {
            console.error(error);
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json({message: MESSAGES.ARTIST_OWNER_NOT_FOUND}, {status: 404});
            }
        }

        return NextResponse.json({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }

}