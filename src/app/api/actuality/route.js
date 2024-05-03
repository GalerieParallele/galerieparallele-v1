import {z} from 'zod';
import {NextResponse} from "next/server";
import {STATIC_MESSAGES} from "@/constants/STATIC_MESSAGES";

const MESSAGES = {
    ID_INVALID_TYPE: "L'id d'une actualité doit être un nombre.",
    ID_REQUIRED: "L'id d'une actualité est requis.",

    TITLE_INVALID_TYPE: "Le titre d'une actualité doit être une chaîne de caractères.",
    TITLE_REQUIRED: "Le titre d'une actualité est requis.",
    TITLE_TOO_SHORT: "Le titre d'une actualité doit contenir au moins 5 caractères.",
    TITLE_TOO_LONG: "Le titre d'une actualité doit contenir au plus 255 caractères.",

    CONTENT_INVALID_TYPE: "Le contenu d'une actualité doit être une chaîne de caractères.",
    CONTENT_REQUIRED: "Le contenu d'une actualité est requis.",
    CONTENT_TOO_SHORT: "Le contenu d'une actualité doit contenir au moins 5 caractères.",
    CONTENT_TOO_LONG: "Le contenu d'une actualité doit contenir au plus 500 caractères.",

    IS_PRIVATE_INVALID_TYPE: "Le statut de confidentialité d'une actualité doit être un booléen.",
    IS_PRIVATE_REQUIRED: "Le statut de confidentialité d'une actualité est requis.",

    EDITOR_ID_INVALID_TYPE: "L'éditeur d'une actualité doit être un nombre.",
    EDITOR_ID_REQUIRED: "L'éditeur d'une actualité est requis.",
    EDITOR_ID_TOO_SMALL: "L'éditeur d'une actualité doit être un nombre positif.",

    DATE_INVALID_TYPE: "La date de publication d'une actualité doit être une date.",
    DATE_REQUIRED: "La date de publication d'une actualité est requise.",

    LINK_INVALID_TYPE: "Le lien d'une actualité doit être une URL.",
    LINK_REQUIRED: "Le lien d'une actualité est requis.",

    MEDIA_URL_INVALID_TYPE: "L'URL du média d'une actualité doit être une URL.",
    MEDIA_URL_REQUIRED: "L'URL du média d'une actualité est requise.",
}

const id = z
    .number({
        invalid_type_error: MESSAGES.ID_INVALID_TYPE,
        required_error: MESSAGES.ID_REQUIRED,
        description: "L'id de l'actualité.",
    })

const title = z
    .string({
        invalid_type_error: MESSAGES.TITLE_INVALID_TYPE,
        required_error: MESSAGES.TITLE_REQUIRED,
        description: "Le titre de l'actualité.",
    })
    .min(5, {
        message: MESSAGES.TITLE_TOO_SHORT,
    })
    .max(255, {
        message: MESSAGES.TITLE_TOO_LONG,
    })

const content = z
    .string({
        invalid_type_error: MESSAGES.CONTENT_INVALID_TYPE,
        required_error: MESSAGES.CONTENT_REQUIRED,
        description: "Le contenu de l'actualité.",
    })
    .min(5, {
        message: MESSAGES.CONTENT_TOO_SHORT,
    })
    .max(500, {
        message: MESSAGES.CONTENT_TOO_LONG,
    })

const isPrivate = z
    .boolean({
        invalid_type_error: MESSAGES.IS_PRIVATE_INVALID_TYPE,
        required_error: MESSAGES.IS_PRIVATE_REQUIRED,
        description: "Le statut de confidentialité de l'actualité.",
    })

const editorId = z
    .number({
        invalid_type_error: MESSAGES.EDITOR_ID_INVALID_TYPE,
        required_error: MESSAGES.EDITOR_ID_REQUIRED,
        description: "L'id de l'éditeur de l'actualité.",
    }).int({
        message: MESSAGES.EDITOR_ID_TOO_SMALL,
    }).positive({
        message: MESSAGES.EDITOR_ID_TOO_SMALL,
    })
    .optional()
    .nullable()

const date = z
    .date({
        invalid_type_error: MESSAGES.DATE_INVALID_TYPE,
        required_error: MESSAGES.DATE_REQUIRED,
        description: "La date de publication de l'actualité.",
    })
    .optional()
    .nullable()

const link = z
    .string({
        invalid_type_error: MESSAGES.LINK_INVALID_TYPE,
        required_error: MESSAGES.LINK_REQUIRED,
        description: "Le lien de l'actualité.",
    })
    .url({
        message: MESSAGES.LINK_INVALID_TYPE,
    })
    .optional()
    .nullable()

const mediaURL = z
    .string({
        invalid_type_error: MESSAGES.MEDIA_URL_INVALID_TYPE,
        required_error: MESSAGES.MEDIA_URL_REQUIRED,
        description: "L'URL du média de l'actualité.",
    })
    .url({
        message: MESSAGES.MEDIA_URL_INVALID_TYPE,
    })
    .optional()
    .nullable()

const ActualitySchema = z.object({
    id,
    title,
    content,
    link,
    mediaURL,
    private: isPrivate,
    date,
    editorId,
}).passthrough()

const ResponseSchema = z.object({
    total: z.number(),
    list: z.array(ActualitySchema),
})

export async function GET() {

    try {

        const actualities = await prisma.actuality.findMany({
            include: {
                editor: {
                    select: {
                        id: true,
                        email: true,
                        firstname: true,
                        lastname: true,
                    }
                },
            },
            orderBy: {
                date: 'desc',
            }
        })

        if (!actualities) {
            return {
                status: 404,
                body: {
                    message: "Aucune actualité n'a été trouvée."
                }
            }
        }

        actualities.map(actuality => {
            actuality.editorId = undefined
        })

        const validatedResponse = ResponseSchema.parse({
            total: actualities.length,
            list: actualities,
        })

        return NextResponse.json(validatedResponse,
            {
                status: 200
            })

    } catch (error) {

        if (process.env.NODE_ENV === "development") {
            console.error(error)
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        return NextResponse.json({message: STATIC_MESSAGES.API_SERVER_ERROR}, {status: 500});

    }
}