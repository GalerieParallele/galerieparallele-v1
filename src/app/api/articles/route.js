import {z} from 'zod';

import {Prisma} from "@prisma/client";
import {NextResponse} from "next/server";
import {TagSchema} from "@/app/api/tags/route";
import {prisma} from "@/utils/PrismaUtil";

const MESSAGES = {
    ARTICLES_NOT_FOUND: "Aucun article n'a été trouvé.",
    ARTICLE_EDITOR_NOT_FOUND: "L'éditeur de l'article n'a pas été trouvé.",

    SUCCESS_DELETE: "L'article a bien été supprimé.",

    NO_DATA_TO_UPDATE: "Aucune donnée transmise pour mettre à jour l'article.",
}

const id = z.number({
    required_error: "L'identifiant de l'article doit être spécifié.",
    invalid_type_error: "L'identifiant de l'article doit être un nombre."
}).int("L'identifiant de l'article doit être un nombre entier.")
    .positive("L'identifiant de l'article doit être un nombre entier positif.");

const title = z.string({
    required_error: "Le titre est requis.",
    invalid_type_error: "Le titre doit être une chaîne de caractères."
}).min(1, "Le titre doit comporter au moins 1 caractère.")
    .max(255, "Le titre ne peut pas dépasser 255 caractères.")
    .refine(data => data.trim().length > 0, {
        message: "Le titre ne peut pas être une chaîne de caractères vide ou constituée uniquement d'espaces."
    });

const content = z.string({
    required_error: "Le contenu est requis.",
    invalid_type_error: "Le contenu doit être une chaîne de caractères."
}).min(1, "Le contenu doit comporter au moins 1 caractère.")
    .max(65535, "Le contenu ne peut pas dépasser 65535 caractères.")
    .refine(data => data.trim().length > 0, {
        message: "Le contenu ne peut pas être une chaîne de caractères vide ou constituée uniquement d'espaces."
    });

const isPrivate = z.boolean({
    required_error: "Le statut privé ou non de l'article doit être renseigné.",
    invalid_type_error: "Le statut privé doit être un booléen."
});

const createdAt = z.date({
    required_error: "La date de création doit être spécifiée.",
    invalid_type_error: "La date de création doit être une date valide."
});

const updatedAt = z.date({
    required_error: "La date de mise à jour doit être spécifiée.",
    invalid_type_error: "La date de mise à jour doit être une date valide."
});

const editorId = z.number({
    required_error: "L'identifiant de l'éditeur doit être spécifié.",
    invalid_type_error: "L'identifiant de l'éditeur doit être un nombre."
}).int("L'identifiant de l'éditeur doit être un nombre entier.")
    .positive("L'identifiant de l'éditeur doit être un nombre entier positif.");


// Schema -----------------------------------

const ArticleSchema = z.object({
    id,
    title,
    content,
    'private': isPrivate,
    createdAt,
    updatedAt,
    tags: z.array(TagSchema).optional(),
    editorId
});

const ArticleCreateSchema = ArticleSchema
    .omit({id: true, createdAt: true, updatedAt: true, tags: true})
    .extend({
        tags: z.array(z.string().transform(tagName => tagName.toUpperCase())).optional()
    });

const ArticlesResponseSchema = z.object({
    total: z.number({
        required_error: "Le nombre total d'articles doit être spécifié.",
        invalid_type_error: "Le nombre total d'articles doit être un nombre entier positif."
    }).int({
        message: "Le nombre total d'articles doit être un nombre entier positif."
    }).positive({
        message: "Le nombre total d'articles doit être un nombre entier positif."
    }),
    list: z.array(ArticleSchema)
});

const ArticleDeleteSchema = z.object({
    id
});

const ArticleUpdateSchema = ArticleSchema
    .partial()
    .extend({
        id, // Remet l'id comme champ obligatoire
        tags: z.array(z.string({
            invalid_type_error: "Le nom d'un tag doit être une chaîne de caractères."
        }).transform(tagName => tagName.toUpperCase())).optional()
    });

console.log(ArticleUpdateSchema.shape)

// ------------------------------------------

export async function GET() {
    try {

        const articles = await prisma.article.findMany({
            include: {
                tags: {
                    include: {
                        tag: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                editor: true,
            },
        });

        if (!articles.length) {
            return NextResponse.json({message: MESSAGES.ARTICLES_NOT_FOUND}, {status: 404});
        }

        const transformedAndValidatedArticles = articles.map(article => {
            article.tags = article.tags.map(tag => TagSchema.parse(tag.tag));
            return ArticleSchema.parse(article);
        });

        const response = ArticlesResponseSchema.parse({
            total: transformedAndValidatedArticles.length,
            list: transformedAndValidatedArticles,
        });

        return NextResponse.json(response, {status: 200});

    } catch (error) {

        console.error(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        return NextResponse.json({message: MESSAGES.API_SERVER_ERROR}, {status: 500});
    }
}

export async function POST(req) {

    try {

        const requestBody = ArticleCreateSchema.parse(JSON.parse(await req.text()));

        const tags = requestBody.tags;
        delete requestBody.tags;

        const article = await prisma.article.create({
            data: {
                ...requestBody,
            },
            include: {
                tags: {
                    include: {
                        tag: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
            },
        });

        if (tags) {
            await Promise.all(tags.map(async tag => {
                const tagExistOrCreate = await checkTagExistOrCreate({name: tag});
                await prisma.articleTag.create({
                    data: {
                        articleId: article.id,
                        tagId: tagExistOrCreate.id
                    }
                });
            }));
        }

        const articleWithTags = await prisma.article.findUnique({
            where: {id: article.id},
            include: {tags: {include: {tag: true}}},
        });

        articleWithTags.tags = articleWithTags.tags.map(tag => TagSchema.parse(tag.tag));

        console.log(articleWithTags);

        const transformedAndValidatedArticle = ArticleSchema.parse(articleWithTags);

        return NextResponse.json(transformedAndValidatedArticle, {status: 201});

    } catch (error) {

        console.error(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({message: MESSAGES.ARTICLE_EDITOR_NOT_FOUND}, {status: 404});
            }
            if (error.code === 'P2002') {
                return NextResponse.json({message: MESSAGES.ARTICLE_EDITOR_NOT_FOUND}, {status: 404});
            }
            if (error.code === 'P2003') {
                return NextResponse.json({message: MESSAGES.ARTICLE_EDITOR_NOT_FOUND}, {status: 404});
            }
        }

        return NextResponse.json({message: MESSAGES.API_SERVER_ERROR}, {status: 500});
    }

}

export async function PATCH(req) {

    try {

        const requestBody = ArticleUpdateSchema.parse(JSON.parse(await req.text()));

        const articleId = requestBody.id;
        delete requestBody.id;

        if (Object.keys(requestBody).length === 0 && (!requestBody.tags || requestBody.tags.length === 0)) {
            return NextResponse.json({message: MESSAGES.NO_DATA_TO_UPDATE}, {status: 400});
        }

        const tags = requestBody.tags;
        delete requestBody.tags;


        await prisma.articleTag.deleteMany({
            where: {
                articleId: articleId,
            },
        });

        const updatedArticle = await prisma.article.update({
            where: {id: articleId},
            data: {
                ...requestBody,
            },
            include: {
                tags: {
                    include: {
                        tag: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                editor: true,
            },
        });

        if (requestBody.editor) {
            await prisma.article.update({
                where: {id: articleId},
                data: {
                    editor: {
                        connect: {
                            id: requestBody.editor
                        }
                    }
                },
            });
        }


        if (tags && tags.length > 0) {
            await Promise.all(tags.map(async tag => {
                const tagExistOrCreate = await checkTagExistOrCreate({name: tag});
                await prisma.articleTag.create({
                    data: {
                        articleId: updatedArticle.id,
                        tagId: tagExistOrCreate.id
                    }
                });
            }));
        }

        const articleWithUpdatedTags = await prisma.article.findUnique({
            where: {id: articleId},
            include: {
                tags: {
                    include: {
                        tag: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                },
                editor: true,
            },
        });

        articleWithUpdatedTags.tags = articleWithUpdatedTags.tags.map(tag => TagSchema.parse(tag.tag));

        const transformedAndValidatedArticle = ArticleSchema.parse(articleWithUpdatedTags);

        return NextResponse.json(transformedAndValidatedArticle, {status: 200});

    } catch (error) {

        console.error(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({message: MESSAGES.ARTICLES_NOT_FOUND}, {status: 404});
            }
            if (error.code === 'P2002') {
                return NextResponse.json({message: MESSAGES.ARTICLE_EDITOR_NOT_FOUND}, {status: 404});
            }
            if (error.code === 'P2003') {
                return NextResponse.json({message: MESSAGES.ARTICLE_EDITOR_NOT_FOUND}, {status: 404});
            }
        }

        return NextResponse.json({message: MESSAGES.API_SERVER_ERROR}, {status: 500});
    }

}

export async function DELETE(req) {

    try {

        const request = ArticleDeleteSchema.parse(JSON.parse(await req.text()));

        const articleId = request.id;

        await prisma.article.delete({
            where: {id: articleId},
        });

        return NextResponse.json({message: MESSAGES.SUCCESS_DELETE}, {status: 200});


    } catch (error) {

        console.error(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({message: MESSAGES.ARTICLES_NOT_FOUND}, {status: 404});
            }
            if (error.code === 'P2002') {
                return NextResponse.json({message: MESSAGES.ARTICLE_EDITOR_NOT_FOUND}, {status: 404});
            }
            if (error.code === 'P2003') {
                return NextResponse.json({message: MESSAGES.ARTICLE_EDITOR_NOT_FOUND}, {status: 404});
            }
        }

        return NextResponse.json({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }

}

const checkTagExistOrCreate = async (tag) => {

    const tagExist = await prisma.tag.findUnique({
        where: {
            name: tag.name
        }
    });

    if (tagExist) {
        return tagExist;
    }

    return prisma.tag.create({
        data: {
            name: tag.name
        }
    });

}

