import z from 'zod'

import {PrismaClient} from "@prisma/client";
import {ArtistSchema} from "@/app/api/artistes/route";

const prisma = new PrismaClient();

const MESSAGES = {}

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

const artistId = ArtistSchema.pick({id: true});

const LegalInformationSchema = z.object({
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

const LegalInformationCreateSchema = LegalInformationSchema.omit({id: true});

export async function POST(req){

    try {

        const requestBody = LegalInformationSchema.parse(JSON.parse(await req.text()));

        const legalInformation = await prisma.artistLegalInformation.create({
            data: requestBody
        });

    }

}