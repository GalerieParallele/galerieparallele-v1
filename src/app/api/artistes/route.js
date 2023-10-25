import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const MESSAGE = {
    NO_ARTIST_FOUND: "Aucun artiste trouvé.",
    GLOBAL_ERROR: "Une erreur est survenue lors de la récupération des artist."
}

export async function GET() {

    try {

        const artists = await prisma.artist.findMany({
            select: {
                id: true,
                pseudo: true,
                User: {
                    select: {
                        email: true,
                        avatarURL: true,
                        firstname: true,
                        lastname: true,
                    }
                },
            }
        });

        const total = artists.length;

        if (!total) {
            return NextResponse.json({
                    message: MESSAGE.NO_ARTIST_FOUND
                },
                {status: 404}
            );
        }

        return NextResponse.json({
                total: total,
                list: artists,
            },
            {status: 200}
        );

    } catch (error) {

        return NextResponse.json({message: MESSAGE.GLOBAL_ERROR}, {status: 500});

    } finally {

        await prisma.$disconnect();

    }
}

