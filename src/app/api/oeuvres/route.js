import {NextResponse} from "next/server";

import {z} from 'zod';

import {Prisma, PrismaClient} from "@prisma/client";

const MESSAGES = {}

const id = z
    .number({
        required_error: "L'id de l'oeuvre est requis",
        invalid_type_error: "L'id de l'oeuvre doit être un nombre entier",
    })
    .int({
        message: "L'id de l'oeuvre doit être un nombre entier",
    })
    .positive({
        message: "L'id de l'oeuvre doit être positif",
    });

const name = z
    .string({
        required_error: "Le nom de l'oeuvre est requis",
        invalid_type_error: "Le nom de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "Le nom de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(255, {
        message: "Le nom de l'oeuvre doit contenir au plus 255 caractères",
    });

const description = z
    .string({
        required_error: "La description de l'oeuvre est requise",
        invalid_type_error: "La description de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "La description de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(65535, {
        message: "La description de l'oeuvre doit contenir au plus 65535 caractères",
    })
    .optional();

const anecdote = z
    .string({
        required_error: "L'anecdote de l'oeuvre est requise",
        invalid_type_error: "L'anecdote de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "L'anecdote de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(65535, {
        message: "L'anecdote de l'oeuvre doit contenir au plus 65535 caractères",
    });

const hauteur = z
    .number({
        required_error: "La hauteur de l'oeuvre est requise",
        invalid_type_error: "La hauteur de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "La hauteur de l'oeuvre doit être positive",
    })
    .int({
        message: "La hauteur de l'oeuvre doit être un nombre entier",
    });

const longueur = z
    .number({
        required_error: "La longueur de l'oeuvre est requise",
        invalid_type_error: "La longueur de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "La longueur de l'oeuvre doit être positive",
    })
    .int({
        message: "La longueur de l'oeuvre doit être un nombre entier",
    });

const largeur = z
    .number({
        required_error: "La largeur de l'oeuvre est requise",
        invalid_type_error: "La largeur de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "La largeur de l'oeuvre doit être positive",
    })
    .int({
        message: "La largeur de l'oeuvre doit être un nombre entier",
    })
    .optional();

const numerotation = z
    .number({
        required_error: "La numérotation de l'oeuvre est requise",
        invalid_type_error: "La numérotation de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "La numérotation de l'oeuvre doit être positive",
    })
    .int({
        message: "La numérotation de l'oeuvre doit être un nombre entier",
    });

const support = z
    .string({
        required_error: "Le support de l'oeuvre est requis",
        invalid_type_error: "Le support de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "Le support de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(255, {
        message: "Le support de l'oeuvre doit contenir au plus 255 caractères",
    });

const technique = z
    .string({
        required_error: "La technique de l'oeuvre est requise",
        invalid_type_error: "La technique de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "La technique de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(255, {
        message: "La technique de l'oeuvre doit contenir au plus 255 caractères",
    });

const encadrement = z
    .string({
        required_error: "L'encadrement de l'oeuvre est requis",
        invalid_type_error: "L'encadrement de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "L'encadrement de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(255, {
        message: "L'encadrement de l'oeuvre doit contenir au plus 255 caractères",
    });

const signature = z
    .string({
        required_error: "La signature de l'oeuvre est requise",
        invalid_type_error: "La signature de l'oeuvre doit être une chaîne de caractères",
    })
    .min(1, {
        message: "La signature de l'oeuvre doit contenir au moins 1 caractère",
    })
    .max(255, {
        message: "La signature de l'oeuvre doit contenir au plus 255 caractères",
    });

const prix = z
    .number({
        required_error: "Le prix de l'oeuvre est requis",
        invalid_type_error: "Le prix de l'oeuvre doit être un nombre",
    })
    .positive({
        message: "Le prix de l'oeuvre doit être positif",
    })
    .int({
        message: "Le prix de l'oeuvre doit être un nombre entier",
    });

const OeuvreSchema = z.object({
    id,
    name,
    description,
    anecdote,
    hauteur,
    longueur,
    largeur,
    numerotation,
    support,
    technique,
    encadrement,
    signature,
    prix,
});

const OeuvreCreateSchema = OeuvreSchema
    .omit({
        id: true,
    });

const OeuvreUpdateDeleteSchema = OeuvreSchema
    .partial()
    .extend({
        id,
    });
