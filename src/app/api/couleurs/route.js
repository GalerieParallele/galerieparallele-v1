import {prisma} from "@/utils/PrismaUtil";
import {NextResponse} from "next/server";
import {z} from "zod";
import {Prisma} from "@prisma/client";

const MESSAGES = {
    NO_COLORS: "Aucune couleur n'a été trouvée.",
}

const name = z
    .string({
        description: "Nom de la couleur",
        required_error: "Le nom de la couleur est requis.",
        invalid_type_error: "Le nom de la couleur doit être une chaîne de caractères.",
    })
    .min(3, {
        message: "Le nom de la couleur doit contenir au moins 3 caractères.",
    })

const hexa = z
    .string({
        description: "Code hexadécimal de la couleur",
        required_error: "Le code hexadécimal de la couleur est requis.",
        invalid_type_error: "Le code hexadécimal de la couleur doit être une chaîne de caractères.",
    })
    .length(7, {
        message: "Le code hexadécimal de la couleur doit contenir 7 caractères.",
    })

const ColorSchema = z
    .object({
        hexa, name,
    })

const ResponseSchema = z.object({
    total: z
        .number({
            required_error: "Le nombre total de couleurs est requis.",
            invalid_type_error: "Le nombre total de couleurs doit être un nombre entier positif.",
            description: "Nombre total de couleurs",
        })
        .positive({
            message: "Le nombre total de couleurs doit être un nombre entier positif.",
        }), list: z.array(ColorSchema),
})

export async function GET() {

    try {

        const couleurs = await prisma.couleur.findMany({
            select: {
                hexa: true, name: true,
            }
        })

        if (!couleurs || couleurs.length === 0) {
            return NextResponse.json({message: MESSAGES.NO_COLORS}, {status: 404})
        }

        const validatedColors = couleurs.map(couleur => ColorSchema.parse(couleur))

        const response = ResponseSchema.parse({
            total: validatedColors.length, list: validatedColors,
        })

        return NextResponse.json(response, {status: 200})

    } catch (error) {

        console.error(error)

        if (process.env.NODE_ENV === "development") {
            console.error(error)
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({message: error.message}, {status: 400})
        }

        return NextResponse.error("Erreur interne au serveur.", {status: 500});

    }
}