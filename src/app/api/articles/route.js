import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {cookies} from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const MESSAGE = {
    NO_ARTICLES_FOUND: "Aucun article trouvé.",
    GLOBAL_ERROR: "Une erreur est survenue lors de la récupération des articles.",
    INVALID_DATA: "Les données fournies sont invalides.",
    ARTICLE_CREATION_FAILED: "Une erreur est survenue lors de la création de l'article.",
    NO_TOKEN: "Aucun token trouvé dans le cookie.",
    INVALID_TOKEN: "Token invalide.",
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

export async function POST(req, res) {

    // Récupération du token depuis les cookies
    let tokenFromCookie;

    try {
        tokenFromCookie = cookies().get("token").value;
    } catch (error) {
        return NextResponse.json({message: MESSAGE.NO_TOKEN}, {status: 401});
    }

    let decoded;
    try {
        decoded = jwt.verify(tokenFromCookie, process.env.JWT);
    } catch (err) {
        return NextResponse.json({message: MESSAGE.INVALID_TOKEN}, {status: 401});
    }

    // Obtenir le corps de la demande
    const requestBodyText = await req.text();
    const {title = "", content = "", private: locked = false} = JSON.parse(requestBodyText);

    // Vérification des données fournies
    if (!title || !content) {
        return NextResponse.json({message: MESSAGE.INVALID_DATA}, {status: 400});
    }

    try {
        // Créer un nouvel article
        const article = await prisma.article.create({
            data: {
                userid: decoded.user.id,  // l'ID de l'utilisateur à partir du token
                title,
                content,
                createdAt: new Date(),
                updatedAt: new Date(),
                private: locked,
            }
        });

        return NextResponse.json({message: "Article créé avec succès!", id: article.id}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: error.message}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}