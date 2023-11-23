import z from 'zod'

import {Prisma} from "@prisma/client";
import {NextResponse} from "next/server";
import {prisma} from "@/utils/PrismaUtil";

const MESSAGES = {

    LEGAL_INFORMATION_ALREADY_EXISTS: "L'information légale concernant cet artiste existe déjà.",
    NO_ARTIST_FOUND: "Aucun artiste correspondant à l'id renseigné n'a été trouvé.",
    SUCCESS_EDIT: "Les informations légales concernant cet artiste ont bien été modifiées.",
}

const id = z
    .number({
        message: "L'id de l'information légale doit être un nombre.",
        required_error: "L'id de l'information légale est requis."
    })
    .int({
        message: "L'id de l'information légale doit être un nombre entier."
    })
    .positive({
        message: "L'id de l'information légale doit être un nombre positif."
    });

const societe = z
    .string({
        message: "Le nom de la société doit être une chaîne de caractères.",
        required_error: "Le nom de la société est requis."
    })
    .min(1, {
        message: "Le nom de la société doit contenir au moins 1 caractère."
    })
    .max(255, {
        message: "Le nom de la société doit contenir au maximum 255 caractères."
    });

const adrNumVoie = z
    .string({
        message: "Le numéro de voie doit être une chaîne de caractères.",
        required_error: "Le numéro de voie est requis."
    })
    .min(1, {
        message: "Le numéro de voie doit contenir au moins 1 caractère."
    })
    .max(255, {
        message: "Le numéro de voie doit contenir au maximum 255 caractères."
    });

const adrRue = z
    .string({
        message: "Le nom de la rue doit être une chaîne de caractères.",
        required_error: "Le nom de la rue est requis."
    })
    .min(1, {
        message: "Le nom de la rue doit contenir au moins 1 caractère."
    })
    .max(255, {
        message: "Le nom de la rue doit contenir au maximum 255 caractères."
    });

const adrVille = z
    .string({
        message: "Le nom de la ville doit être une chaîne de caractères.",
        required_error: "Le nom de la ville est requis."
    })
    .min(1, {
        message: "Le nom de la ville doit contenir au moins 1 caractère."
    })
    .max(255, {
        message: "Le nom de la ville doit contenir au maximum 255 caractères."
    });

const adrCodePostal = z
    .string({
        message: "Le code postal doit être une chaîne de caractères.",
        required_error: "Le code postal est requis."
    })
    .min(1, {
        message: "Le code postal doit contenir au moins 1 caractère."
    })
    .max(255, {
        message: "Le code postal doit contenir au maximum 255 caractères."
    });

const siret = z
    .string({
        message: "Le numéro de SIRET doit être une chaîne de caractères.",
        required_error: "Le numéro de SIRET est requis."
    })
    .length(14, {
        message: "Le numéro de SIRET doit contenir 14 caractères."
    });

const tva = z
    .string({
        message: "Le numéro de TVA doit être une chaîne de caractères.",
        required_error: "Le numéro de TVA est requis."
    })
    .length(13, {
        message: "Le numéro de TVA doit contenir 13 caractères."
    });

const numMaisonsDesArtistes = z
    .string({
        message: "Le numéro de la Maison des Artistes doit être une chaîne de caractères.",
        required_error: "Le numéro de la Maison des Artistes est requis."
    })
    .min(1, {
        message: "Le numéro de la Maison des Artistes doit contenir au moins 1 caractère."
    })
    .max(255, {
        message: "Le numéro de la Maison des Artistes doit contenir au maximum 255 caractères."
    });

const numSecuriteSociale = z
    .string({
        message: "Le numéro de sécurité sociale doit être une chaîne de caractères.",
        required_error: "Le numéro de sécurité sociale est requis."
    })
    .length(15, {
        message: "Le numéro de sécurité sociale doit contenir 15 caractères."
    });

const artistId = z
    .number({
        message: "L'id de l'artiste doit être un nombre.",
        required_error: "L'id de l'artiste est requis."
    })
    .int({
        message: "L'id de l'artiste doit être un nombre entier."
    })
    .positive({
        message: "L'id de l'artiste doit être un nombre positif."
    });

export const LegalInformationSchema = z.object({
    id,
    societe,
    adrNumVoie,
    adrRue,
    adrVille,
    adrCodePostal,
    siret,
    tva,
    numMaisonsDesArtistes,
    numSecuriteSociale,
    artistId
});

const LegalInformationCreateSchema =
    LegalInformationSchema
        .omit({id: true});

const LegalInformationUpdateSchema =
    LegalInformationSchema
        .partial()
        .extend({
            artistId
        })
        .omit({
            id: true
        });

export async function POST(req) {

    try {

        const requestBody = LegalInformationCreateSchema.parse(JSON.parse(await req.text()));

        const artistId = requestBody.artistId;
        delete requestBody.artistId;

        const legalInformation = await prisma.artistLegalInformation.create({
            data: {
                ...requestBody,
                artist: {
                    connect: {
                        id: artistId
                    }
                }
            }
        });

        return NextResponse.json(LegalInformationSchema.parse(legalInformation), {status: 201})

    } catch (error) {

        console.log(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code === 'P2002') {
                return NextResponse.json({message: MESSAGES.LEGAL_INFORMATION_ALREADY_EXISTS}, {status: 400});
            }

            if (error.code === 'P2003') {
                return NextResponse.json({message: MESSAGES.NO_ARTIST_FOUND}, {status: 400});
            }

            if (error.code === 'P2025') {
                return NextResponse.json({message: MESSAGES.NO_ARTIST_FOUND}, {status: 400});
            }
        }

        return NextResponse.json(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}

export async function PATCH(req) {

    try {

        const requestBody = LegalInformationUpdateSchema.parse(JSON.parse(await req.text()));

        const artistId = requestBody.artistId;

        delete requestBody.artistId;

        const legalInformationUpdate = await prisma.artistLegalInformation.update({
            where: {
                artistId
            },
            data: {
                ...requestBody,
            }
        });

        const validatedLegalInformationUpdate = LegalInformationSchema.parse(legalInformationUpdate);

        return NextResponse.json({
            message: MESSAGES.SUCCESS_EDIT,
            legalInformation: validatedLegalInformationUpdate
        }, {status: 200});

    } catch (error) {

        if (process.env.NODE_ENV === 'development') {
            console.log(error);
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({message: error.errors[0].message}, {status: 400});
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.NO_ARTIST_FOUND}, {status: 404});
        }

        return NextResponse.json(MESSAGES.API_SERVER_ERROR, {status: 500});

    }

}