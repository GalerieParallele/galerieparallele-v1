import z from "zod";

import {NextResponse} from "next/server";

const MESSAGES = {
    HEXA_MUST_BE_A_STRING: "La valeur hexadécimal doit être une chaîne de caractères.",
    HEXA_REQUIRED: "La valeur hexadécimal est requise.",
    HEXA_INVALID_LENGTH: "La valeur hexadécimal doit être de 6 caractères.",

    NAME_MUST_BE_A_STRING: "Le nom de la couleur doit être une chaîne de caractères.",
    NAME_REQUIRED: "Le nom de la couleur est requis.",

    NO_COLORS: "Aucune couleur n'a été trouvée."

}

const hexa = z
    .string({
        invalid_type_error: MESSAGES.HEXA_MUST_BE_A_STRING,
        required_error: MESSAGES.HEXA_REQUIRED,
        description: "La valeur hexadécimal de la couleur."
    })
    .length(7, {
        message: MESSAGES.HEXA_INVALID_LENGTH,
    })

const name = z
    .string({
        invalid_type_error: MESSAGES.NAME_MUST_BE_A_STRING,
        required_error: MESSAGES.NAME_REQUIRED,
        description: "Le nom de la couleur."
    })

const ColorSchema = z.object({
    hexa,
    name
})

const ColorSchemaResponse = z.object({
    total: z.number(),
    list: z.array(ColorSchema)
})

export async function GET() {

    try {

        const couleurs = await prisma.couleur.findMany({
            select: {
                name: true,
                hexa: true
            }
        })

        console.log(couleurs)

        if (!couleurs.length) {
            return NextResponse.json({message: MESSAGES.NO_COLORS}, {status: 404})
        }

        const validatedColors = couleurs.map(couleur => {
            return ColorSchema.parse(couleur)
        })

        const response = ColorSchemaResponse.parse({
            total: validatedColors.length,
            list: validatedColors
        })

        return NextResponse.json(response, {status: 200})

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.error("Couleurs API - GET", error)
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        return NextResponse.json(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}