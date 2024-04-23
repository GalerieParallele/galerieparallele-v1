import {z} from 'zod';

import {NextResponse} from 'next/server';
import {prisma} from "@/utils/PrismaUtil";
import {UserSchema} from "@/app/api/users/route";

const GetUserByIdSchema = UserSchema.pick({id: true});

const MESSAGES = {
    INVALID_USER: 'Utilisateur non trouvé',
}

export async function POST(req) {

    try {

        const requestBody = GetUserByIdSchema.parse(JSON.parse(await req.text()));

        const id = requestBody.id;

        const user = await prisma.user.findUnique({
            where: {id},
        });

        if (!user) {
            return NextResponse.json({message: MESSAGES.INVALID_USER}, {status: 404});
        }

        user.password = undefined;
        user.artist = undefined;
        user.articles = undefined;

        return NextResponse.json(user, {status: 200});

    } catch (error) {

        console.error(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({errors: error.errors[0].message}, {status: 400});
        }

        if (error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.INVALID_USER}, {status: 404});
        }

        return NextResponse.json({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }
}
