import z from 'zod'

import {NextResponse} from "next/server";

import {prisma} from "@/utils/PrismaUtil";

const MESSAGES = {
    NO_TYPES_OEUVRE: "Aucun type d'oeuvre n'a été trouvé.",
    TYPE_OEUVRE_NOT_FOUND: "Le type d'oeuvre n'a pas été trouvé.",

    TYPE_OEUVRE_ALREADY_EXIST: "Le type d'oeuvre existe déjà.",

    SUCCESS_CREATE: "Le type d'oeuvre a été créé avec succès.",
    SUCCESS_EDIT: "Le type d'oeuvre a été modifié avec succès.",
    SUCCESS_DELETE: "Le type d'oeuvre a été supprimé avec succès.",
}

const TypeOeuvreSchema = z.object({
    id: z
        .number({
            required_error: "L'id du type d'oeuvre est requis.",
            invalid_type_error: "L'id du type d'oeuvre doit être un nombre entier positif.",
        })
        .int({
            message: "L'id du type d'oeuvre doit être un nombre entier positif.",
        })
        .positive({
            message: "L'id du type d'oeuvre doit être un nombre entier positif.",
        }),
    name: z
        .string({
            required_error: "Le nom du type d'oeuvre est requis.",
            invalid_type_error: "Le nom du type d'oeuvre doit être une chaîne de caractères.",
        }).transform(name => name.toUpperCase()),
})

const TypesOeuvreResponseSchema = z.object({
    total: z
        .number({
            required_error: "Le nombre total de type d'oeuvre est requis.",
            invalid_type_error: "Le nombre total de type d'oeuvre doit être un nombre entier positif.",
        })
        .int({
            message: "Le nombre total de type d'oeuvre doit être un nombre entier positif.",
        })
        .min(0, {
            message: "Le nombre total de type d'oeuvre doit être un nombre entier positif.",
        }),
    list: z
        .array(TypeOeuvreSchema),
})

const CreateTypeOeuvreSchema = z.object({
    name: z
        .string({
            required_error: "Le nom du type d'oeuvre est requis.",
            invalid_type_error: "Le nom du type d'oeuvre doit être une chaîne de caractères.",
        }),
})

const UpdateTypeOeuvreSchema = z.object({
    id: z
        .number({
            required_error: "L'id du type d'oeuvre est requis.",
            invalid_type_error: "L'id du type d'oeuvre doit être un nombre entier positif.",
        })
        .int({
            message: "L'id du type d'oeuvre doit être un nombre entier positif.",
        })
        .positive({
            message: "L'id du type d'oeuvre doit être un nombre entier positif.",
        }),
    name: z
        .string({
            required_error: "Le nom du type d'oeuvre est requis.",
            invalid_type_error: "Le nom du type d'oeuvre doit être une chaîne de caractères.",
        }),
})

export async function GET() {

    try {

        const typesOeuvre = await prisma.typesOeuvre.findMany();

        if (!typesOeuvre.length) {
            return NextResponse.json({message: MESSAGES.NO_TYPES_OEUVRE}, {status: 404})
        }

        const validateTypesOeuvre = typesOeuvre.map(typeOeuvre => TypeOeuvreSchema.parse(typeOeuvre))

        const response = TypesOeuvreResponseSchema.parse({
            total: validateTypesOeuvre.length,
            list: validateTypesOeuvre,
        })

        return NextResponse.json(response, {status: 200})

    } catch (error) {

        console.error(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }
}

export async function POST(req) {

    try {

        const requestBody = CreateTypeOeuvreSchema.parse(JSON.parse(await req.text()))

        const data = {
            name: requestBody.name,
        }

        const typeOeuvre = await prisma.typesOeuvre.create({
            data,
        })

        const validateTypeOeuvre = TypeOeuvreSchema.parse(typeOeuvre)

        return NextResponse.json({
            message: MESSAGES.SUCCESS_CREATE,
            typeOeuvre: validateTypeOeuvre,
        }, {status: 201})

    } catch (error) {

        console.error(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        if (error.code === 'P2002') {
            return NextResponse.json({message: MESSAGES.TYPE_OEUVRE_ALREADY_EXIST}, {status: 400})
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}

export async function PATCH(req) {

    try {

        const requestBody = UpdateTypeOeuvreSchema.parse(JSON.parse(await req.text()));

        const typeOeuvreId = requestBody.id;
        delete requestBody.id;

        const data = {
            name: requestBody.name,
        }

        const typeOeuvre = await prisma.typesOeuvre.update({
            where: {
                id: typeOeuvreId,
            },
            data,
        })

        const validateTypeOeuvre = TypeOeuvreSchema.parse(typeOeuvre)

        return NextResponse.json({
            message: MESSAGES.SUCCESS_EDIT,
            typeOeuvre: validateTypeOeuvre,
        }, {status: 200})

    } catch (error) {

        console.error(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        if (error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.TYPE_OEUVRE_NOT_FOUND}, {status: 404})
        }

        if (error.code === 'P2002') {
            return NextResponse.json({message: MESSAGES.TYPE_OEUVRE_ALREADY_EXIST}, {status: 400})
        }

        return NextResponse.error({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }

}

export async function DELETE(req) {

    try {

        const {id} = TypeOeuvreSchema.pick({id: true}).parse(JSON.parse(await req.text()));

        await prisma.typesOeuvre.delete({
            where: {
                id,
            },
        })

        return NextResponse.json({message: MESSAGES.SUCCESS_DELETE}, {status: 200})

    } catch (error) {

        console.error(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        if (error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.TYPE_OEUVRE_NOT_FOUND}, {status: 404})
        }

        return NextResponse.error({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }
}