import z from 'zod'

import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

const MESSAGES = {
    NO_TAGS: "Aucun tag n'a été trouvé.",
    TAG_NOT_FOUND: "Le tag n'a pas été trouvé.",

    TAG_ALREADY_EXISTS: "Le tag existe déjà.",

    SUCCESS_CREATE: "Le tag a été créé avec succès.",
    SUCCESS_EDIT: "Le tag a été modifié avec succès.",
    SUCCESS_DELETE: "Le tag a été supprimé avec succès.",
}

const TagsSchema = z.object({
    id: z
        .number({
            required_error: "L'id du tag est requis.",
            invalid_type_error: "L'id du tag doit être un nombre entier positif.",
        })
        .int({
            message: "L'id du tag doit être un nombre entier positif.",
        })
        .positive({
            message: "L'id du tag doit être un nombre entier positif.",
        }),
    name: z
        .string({
            required_error: "Le nom du tag est requis.",
            invalid_type_error: "Le nom du tag doit être une chaîne de caractères.",
        }),
})

const TagsResponseSchema = z.object({
    total: z
        .number({
            required_error: "Le nombre total de tags est requis.",
            invalid_type_error: "Le nombre total de tags doit être un nombre entier positif.",
        })
        .int({
            message: "Le nombre total de tags doit être un nombre entier positif.",
        })
        .min(0, {
            message: "Le nombre total de tags doit être un nombre entier positif.",
        }),
    list: z
        .array(TagsSchema),
})

const CreateTagSchema = z.object({
    name: z
        .string({
            required_error: "Le nom du tag est requis.",
            invalid_type_error: "Le nom du tag doit être une chaîne de caractères.",
        }),
})

const UpdateTagSchema = z.object({
    id: z
        .number({
            required_error: "L'id du tag est requis.",
            invalid_type_error: "L'id du tag doit être un nombre entier positif.",
        })
        .int({
            message: "L'id du tag doit être un nombre entier positif.",
        })
        .positive({
            message: "L'id du tag doit être un nombre entier positif.",
        }),
    name: z
        .string({
            required_error: "Le nom du tag est requis.",
            invalid_type_error: "Le nom du tag doit être une chaîne de caractères.",
        }),
})


export async function GET() {

    try {

        const tags = await prisma.tag.findMany();

        if (!tags.length) {
            return NextResponse.json({message: MESSAGES.NO_TAGS}, {status: 404})
        }

        const validatedTags = tags.map(tag => TagsSchema.parse(tag))

        const response = TagsResponseSchema.parse({
            total: validatedTags.length,
            list: validatedTags,
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

        const requestBody = CreateTagSchema.parse(JSON.parse(await req.text()))

        const data = {
            name: requestBody.name.toUpperCase(),
        }

        const tag = await prisma.tag.create({
            data,
        })

        const validatedTag = TagsSchema.parse(tag)

        return NextResponse.json({
            message: MESSAGES.SUCCESS_CREATE,
            tag: validatedTag,
        }, {status: 201})

    } catch (error) {

        console.error(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        if (error.code === 'P2002') {
            return NextResponse.json({message: MESSAGES.TAG_ALREADY_EXISTS}, {status: 400})
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}

export async function PATCH(req) {

    try {

        const requestBody = UpdateTagSchema.parse(JSON.parse(await req.text()));

        const tagId = requestBody.id;
        delete requestBody.id;

        const data = {
            name: requestBody.name.toUpperCase(),
        }

        const tag = await prisma.tag.update({
            where: {
                id: tagId,
            },
            data,
        })

        const validatedTag = TagsSchema.parse(tag)

        return NextResponse.json({
            message: MESSAGES.SUCCESS_EDIT,
            tag: validatedTag,
        }, {status: 200})

    } catch (error) {

        console.error(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        if (error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.TAG_NOT_FOUND}, {status: 404})
        }

        if (error.code === 'P2002') {
            return NextResponse.json({message: MESSAGES.TAG_ALREADY_EXISTS}, {status: 400})
        }

        return NextResponse.error({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }

}

export async function DELETE(req) {

    try {

        const {id} = TagsSchema.pick({id: true}).parse(JSON.parse(await req.text()));

        await prisma.tag.delete({
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
            return NextResponse.json({message: MESSAGES.TAG_NOT_FOUND}, {status: 404})
        }

        return NextResponse.error({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }
}