import {PrismaClient} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

const prisma = new PrismaClient();

const MESSAGE = {
    ID_MUST_BE_NUMBER: "L'id renseigné doit être un nombre.",
    ARTICLE_NOT_FOUND: "L'article n'existe pas."
}

export async function GET(req) {

    if (!req.nextUrl.searchParams.get("id")) {
        return NextResponse.json({
                message: "L'id n'est pas spécifié dans la requête.",
            }, {
                status: 400
            }
        );
    }

    let articleId = parseInt(req.nextUrl.searchParams.get("id"));

    if (isNaN(articleId)) {
        return NextResponse.json({
                message: MESSAGE.ID_MUST_BE_NUMBER,
            }, {
                status: 400
            }
        )
    }

    try {

        const article = await prisma.article.findUnique({
            where: {id: articleId}
        })

        if (article) {
            return NextResponse.json(article, {
                status: 200
            })
        } else {
            return NextResponse.json({
                message: MESSAGE.ARTICLE_NOT_FOUND
            }, {
                status: 404
            })
        }

    } catch (e) {
        console.log(e)
    } finally {
        await prisma.$disconnect()
    }
}