import {z} from 'zod';

const MESSAGES = {

    ID_REQUIRED: "L'id de l'artiste est requis.",
    PSEUDO_REQUIRED: "Le pseudo de l'artiste est requis.",
    NATIONALITY_REQUIRED: "La nationalité de l'artiste est requise.",
    BIO_REQUIRED: "La biographie de l'artiste est requise.",

    ID_MUST_BE_NUMBER: "L'id de l'artiste doit être un nombre entier.",
    ID_MUST_BE_POSITIVE: "L'id de l'artiste doit être un nombre positif.",
    PSEUDO_MUST_BE_STRING: "Le pseudo de l'artiste doit être une chaîne de caractères.",
    PSEUDO_MIN_LENGTH: "Le pseudo de l'artiste doit contenir au moins 1 caractère.",
    NATIONALITY_MUST_BE_STRING: "La nationalité de l'artiste doit être une chaîne de caractères.",
    NATIONALITY_MIN_LENGTH: "La nationalité de l'artiste doit contenir au moins 1 caractère.",

}

const id = z
    .number({
        invalid_type_error: MESSAGES.ID_MUST_BE_NUMBER,
        required_error: MESSAGES.ID_REQUIRED,
        description: "Id de l'artiste.",
    })
    .positive({
        message: MESSAGES.ID_MUST_BE_POSITIVE,
    })

const pseudo = z
    .string({
        invalid_type_error: MESSAGES.PSEUDO_MUST_BE_STRING,
        required_error: MESSAGES.PSEUDO_REQUIRED,
        description: "Pseudo de l'artiste.",
    })
    .min(1, {
        message: MESSAGES.PSEUDO_MIN_LENGTH,
    })

const nationality = z
    .string({
        invalid_type_error: MESSAGES.NATIONALITY_MUST_BE_STRING,
        required_error: MESSAGES.NATIONALITY_REQUIRED,
        description: "Nationalité de l'artiste.",
    })
    .min(1, {
        message: MESSAGES.NATIONALITY_MIN_LENGTH,
    })

const bio = z
    .string({
        invalid_type_error: "La biographie de l'artiste doit être une chaîne de caractères.",
        required_error: "La biographie de l'artiste est requise.",
        description: "Biographie de l'artiste.",
    })
    .min(1, {
        message: "La biographie de l'artiste doit contenir au moins 1 caractère.",
    })