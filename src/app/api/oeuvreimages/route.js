import z from 'zod'

import {Prisma, PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

const MESSAGES = {

    NO_OEUVRE_IMAGES: "Aucune image d'oeuvre n'a été trouvée",
    OEUVRE_IMAGE_NOT_FOUND: "L'image d'oeuvre n'a pas été trouvée",

    SUCCESS_DELETE: "L'image d'oeuvre a bien été supprimée",

}

const id = z
    .number({
        required_error: "L'id du média est requis",
        invalid_type_error: "L'id du média doit être un nombre"
    })
    .positive({
        message: "L'id du média doit être un nombre positif"
    });

const mediaURL = z
    .string({
        required_error: "L'URL du média est requis",
        invalid_type_error: "L'URL du média doit être une chaîne de caractères"
    })
    .url({
        message: "L'URL du média doit être une URL valide"
    });

const oeuvreId = z
    .number({
        required_error: "L'id de l'oeuvre à laquelle correspond le média est requis",
        invalid_type_error: "L'id de l'oeuvre à laquelle correspond le média doit être un nombre"
    })
    .positive({
        message: "L'id de l'oeuvre à laquelle correspond le média doit être un nombre positif"
    });

const OeuvreImageSchema = z.object({
    id,
    mediaURL,
    oeuvreId
});

const OeuvreImageCreateSchema = z.object({
    mediaURL,
    oeuvreId
});

const OeuvreImageResponseSchema = z.object({
    total: z
        .number({
            required_error: "Le nombre total d'images d'oeuvres est requis",
            invalid_type_error: "Le nombre total d'images d'oeuvres doit être un nombre"
        })
        .int({
            message: "Le nombre total d'images d'oeuvres doit être un nombre entier"
        })
        .positive({
            message: "Le nombre total d'images d'oeuvres doit être un nombre positif"
        }),
    list: z
        .array(OeuvreImageSchema)
});


export async function GET() {

    try {

        const oeuvreImages = await prisma.oeuvreImage.findMany();

        if (!oeuvreImages.length) {
            return NextResponse.json({message: MESSAGES.NO_OEUVRE_IMAGES}, {status: 404});
        }

        const validatedOeuvreImages = oeuvreImages.map(oeuvreImage => OeuvreImageSchema.parse(oeuvreImage));

        const response = OeuvreImageResponseSchema.parse({
            total: validatedOeuvreImages.length,
            list: validatedOeuvreImages
        });

        return NextResponse.json(response, {status: 200});

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

        const requestBody = OeuvreImageCreateSchema.parse(JSON.parse(await req.text()));

        const oeuvreImage = await prisma.oeuvreImage.create({
            data: requestBody,
        });

        const response = OeuvreImageSchema.parse(oeuvreImage);

        return NextResponse.json(response, {status: 201});

    } catch (error) {

        console.log(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}

export async function PATCH(req) {

    try {

        const requestBody = OeuvreImageSchema.parse(JSON.parse(await req.text()));

        const oeuvreImageId = requestBody.id;

        const oeuvreImage = await prisma.oeuvreImage.update({
            where: {
                id: oeuvreImageId
            },
            data: {
                mediaURL: requestBody.mediaURL,
                oeuvreId: requestBody.oeuvreId
            }
        });

        const response = OeuvreImageSchema.parse(oeuvreImage);

        return NextResponse.json(response, {status: 200});

    } catch (error) {

        console.log(error)

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400})
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code === 'P2025') {
                return NextResponse.json({message: MESSAGES.OEUVRE_IMAGE_NOT_FOUND}, {status: 404})
            }

            if (error.code === 'P2002') {
                return NextResponse.json({message: MESSAGES.OEUVRE_IMAGE_NOT_FOUND}, {status: 404})
            }

            if (error.code === 'P2003') {
                return NextResponse.json({message: MESSAGES.OEUVRE_IMAGE_NOT_FOUND}, {status: 404})
            }

        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}

export async function DELETE(req) {

    try {

        const requestBody = OeuvreImageSchema.pick({id: true}).parse(JSON.parse(await req.text()));

        const oeuvreImageId = requestBody.id;

        await prisma.oeuvreImage.delete({
            where: {
                id: oeuvreImageId
            }
        });

        return NextResponse.json({message: MESSAGES.SUCCESS_DELETE}, {status: 200});

    } catch (error) {

        console.log(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code === 'P2025') {
                return NextResponse.json({message: MESSAGES.INVALID_USER}, {status: 404});
            }

            if (error.code === 'P2002') {
                return NextResponse.json({message: MESSAGES.OEUVRE_IMAGE_NOT_FOUND}, {status: 404});
            }

            if (error.code === 'P2003') {
                return NextResponse.json({message: MESSAGES.OEUVRE_IMAGE_NOT_FOUND}, {status: 404});
            }

        }

        return NextResponse.error(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}