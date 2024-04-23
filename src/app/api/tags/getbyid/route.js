import {z} from 'zod';

import {NextResponse} from 'next/server';
import {prisma} from "@/utils/PrismaUtil";

const GetTagByIdSchema = z.object({
    id: z
        .number({
            required_error: 'L\'id du tag est requis',
            invalid_type_error: 'L\'id du tag doit être un nombre entier positif',
        })
        .int({
            message: 'L\'id du tag doit être un nombre entier positif',
        })
        .positive({
            message: 'L\'id du tag doit être un nombre entier positif',
        }),
});

const MESSAGES = {
    INVALID_TAG: 'Tag non trouvé',
}

export async function POST(req) {

    try {

        const requestBody = GetTagByIdSchema.parse(JSON.parse(await req.text()));

        const id = parseInt(requestBody.id);

        const tag = await prisma.tag.findUnique({
            where: {id},
        });

        if (!tag) {
            return NextResponse.json({message: MESSAGES.INVALID_TAG}, {status: 404});
        }

        return NextResponse.json(tag, {status: 200});

    } catch (error) {

        console.error(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({errors: error.errors[0].message}, {status: 400});
        }

        if (error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.INVALID_TAG}, {status: 404});
        }

        return NextResponse.json({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }
}
