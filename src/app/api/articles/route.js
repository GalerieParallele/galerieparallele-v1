import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const MESSAGE = {
    NO_ARTICLES_FOUND: "Aucun article trouvé.",
    GLOBAL_ERROR: "Une erreur est survenue lors de la récupération des articles."
}


export async function GET() {
    try {

        const articles = await prisma.article.findMany({
            select: {
                User: {
                    select: {
                        email: true,
                    }
                },
                id: true,
                title: true,
                content: true,
                createdAt: true,
                private: true,
            }
        });

        const total = articles.length;

        if (!total) {
            return NextResponse.json({
                    message: MESSAGE.NO_ARTICLES_FOUND
                },
                {status: 404}
            )
        }

        return NextResponse.json({
                total,
                list: articles
            },
            {status: 200}
        )


    } catch (error) {

        return NextResponse.json({message: MESSAGE.GLOBAL_ERROR}, {status: 500});

    } finally {

        await prisma.$disconnect();

    }
}