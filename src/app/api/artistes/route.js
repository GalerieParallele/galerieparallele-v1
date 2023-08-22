import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const MESSAGE = {
    NO_ARTIST_FOUND: "Aucun artiste trouvé.",
    GLOBAL_ERROR: "Une erreur est survenue lors de la récupération des artistes."
}

export async function GET() {

    try {

        const artists = await prisma.artist.findMany({
            select: {
                pseudo: true,
                User: {
                    select: {
                        email: true
                    }
                }
            }
        });

        const total = artists.length;

        if (!total) {
            return NextResponse.json({message: MESSAGE.NO_ARTIST_FOUND}, {status: 404});
        }

        return NextResponse.json({
            total: total,
            list: artists,
        }, {status: 200});

    } catch (error) {

        return NextResponse.json({message: MESSAGE.GLOBAL_ERROR}, {status: 500});

    } finally {

        await prisma.$disconnect();

    }
}

