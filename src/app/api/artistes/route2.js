import {z} from 'zod';

const MESSAGES = {

    BIO_REQUIRED: "La biographie de l'artiste est requise.",
    BIO_MUST_BE_STRING: "La biographie de l'artiste doit être une chaîne de caractères.",
    BIO_MIN_LENGTH: "La biographie de l'artiste doit contenir au moins 1 caractère.",

    ID_REQUIRED: "L'id de l'artiste est requis.",
    ID_MUST_BE_NUMBER: "L'id de l'artiste doit être un nombre entier.",
    ID_MUST_BE_POSITIVE: "L'id de l'artiste doit être un nombre positif.",

    PSEUDO_REQUIRED: "Le pseudo de l'artiste est requis.",
    PSEUDO_MUST_BE_STRING: "Le pseudo de l'artiste doit être une chaîne de caractères.",
    PSEUDO_MIN_LENGTH: "Le pseudo de l'artiste doit contenir au moins 1 caractère.",

    NATIONALITY_REQUIRED: "La nationalité de l'artiste est requise.",
    NATIONALITY_MUST_BE_STRING: "La nationalité de l'artiste doit être une chaîne de caractères.",
    NATIONALITY_MIN_LENGTH: "La nationalité de l'artiste doit contenir au moins 1 caractère.",

    INSTAGRAM_MUST_BE_STRING: "L'instagram de l'artiste doit être une chaîne de caractères.",
    INSTAGRAM_STARTS_WITH: "L'instagram de l'artiste doit commencer par 'https://www.instagram.com/'.",
    INSTAGRAM_REQUIRED: "L'instagram de l'artiste est requis.",

    FACEBOOK_MUST_BE_STRING: "Le facebook de l'artiste doit être une chaîne de caractères.",
    FACEBOOK_STARTS_WITH: "Le facebook de l'artiste doit commencer par 'https://www.facebook.com/'.",
    FACEBOOK_REQUIRED: "Le facebook de l'artiste est requis.",

    LINKEDIN_MUST_BE_STRING: "Le linkedin de l'artiste doit être une chaîne de caractères.",
    LINKEDIN_STARTS_WITH: "Le linkedin de l'artiste doit commencer par 'https://www.linkedin.com/'.",
    LINKEDIN_REQUIRED: "Le linkedin de l'artiste est requis.",

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
        invalid_type_error: MESSAGES.BIO_MUST_BE_STRING,
        required_error: MESSAGES.BIO_REQUIRED,
        description: "Biographie de l'artiste.",
    })
    .min(1, {
        message: MESSAGES.BIO_MIN_LENGTH,
    })
    .optional()
    .nullable()

const instagram = z
    .string({
        invalid_type_error: MESSAGES.INSTAGRAM_MUST_BE_STRING,
        required_error: MESSAGES.INSTAGRAM_REQUIRED,
        description: "Instagram de l'artiste.",
    })
    .startsWith('https://www.instagram.com/', {
        message: MESSAGES.INSTAGRAM_STARTS_WITH,
    })
    .optional()
    .nullable()

const facebook = z
    .string({
        invalid_type_error: MESSAGES.FACEBOOK_MUST_BE_STRING,
        required_error: MESSAGES.FACEBOOK_REQUIRED,
        description: "Facebook de l'artiste.",
    })
    .startsWith('https://www.facebook.com/', {
        message: MESSAGES.FACEBOOK_STARTS_WITH,
    })
    .optional()
    .nullable()

const linkedin = z
    .string({
        invalid_type_error: MESSAGES.LINKEDIN_MUST_BE_STRING,
        required_error: MESSAGES.LINKEDIN_REQUIRED,
        description: "Linkedin de l'artiste.",
    })
    .startsWith('https://www.linkedin.com/', {
        message: MESSAGES.LINKEDIN_STARTS_WITH,
    })
    .optional()
    .nullable()

