import {z} from 'zod';

import {NextResponse} from 'next/server';
import {prisma} from "@/utils/PrismaUtil";

const GetTypeOeuvreByIdSchema = z.object({
    id: z
        .number({
            required_error: "L'id du type d'oeuvre est requis",
            invalid_type_error: "L'id du type d'oeuvre doit être un nombre entier positif",
        })
        .int({
            message: "L'id du type d'oeuvre doit être un nombre entier positif",
        })
        .positive({
            message: "L'id du type d'oeuvre doit être un nombre entier positif",
        }),
});

const MESSAGES = {
    INVALID_TYPE_OEUVRE: "Type d'oeuvre non trouvé",
}

export async function POST(req) {

    try {

        const requestBody = GetTypeOeuvreByIdSchema.parse(JSON.parse(await req.text()));

        const id = requestBody.id;

        const typeOeuvre = await prisma.typesOeuvre.findUnique({
            where: {id},
        });

        if (!typeOeuvre) {
            return NextResponse.json({message: MESSAGES.INVALID_TYPE_OEUVRE}, {status: 404});
        }

        return NextResponse.json(typeOeuvre, {status: 200});

    } catch (error) {

        console.error(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({errors: error.errors[0].message}, {status: 400});
        }

        if (error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.INVALID_TYPE_OEUVRE}, {status: 404});
        }

        return NextResponse.json({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }
}
