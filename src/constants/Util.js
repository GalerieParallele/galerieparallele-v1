import bcrypt from "bcryptjs";
import {prisma} from "@/utils/PrismaUtil";
import jwt from "jsonwebtoken";

const MESSAGES = {
    TOKEN_VERIFICATION_ERROR: "Une erreur est survenue lors de la vérification du jeton d'authentification.",
}

/**
 * Permet de vérifier si un mot de passe est valide
 * @param password Le mot de passe à vérifier
 * @returns {boolean} True si le mot de passe est valide, false sinon
 */
export function checkPassword(password) {
    return password.length >= 8;
}

/**
 * Permet de vérifier si un email est valide
 * @param email L'email à vérifier
 * @returns {boolean} True si l'email est valide, false sinon
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Permet de hasher un mot de passe
 * @param password Le mot de passe à hasher
 * @returns {*} Le mot de passe hashé
 */
export function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

/**
 * Permet de récupérer le token à partir d'une requête
 * @param req La requête
 * @returns {string|null} Le token s'il est présent dans le cookie, null sinon
 */
export function getTokenFromRequest(req) {

    const cookieHeader = req.headers.get('cookie');

    if (!cookieHeader) return null;

    const match = cookieHeader.match(/(^|;) ?token=([^;]*)(;|$)/);

    return match ? decodeURIComponent(match[2]) : null;

}

/**
 * Permet de récupérer l'utilisateur à partir d'un token
 * @param token Le token
 * @returns {Omit<*, "password">|null} L'utilisateur s'il est présent dans la base de données (sans le mot de passe), null sinon
 */
export async function getUserFromToken(token) {

    try {

        const {user: {id}} = jwt.verify(token, process.env.JWT);

        const user = await prisma.user.findUnique({where: {id}});

        if (user) {
            const {password, ...safeUser} = user;
            return safeUser;
        }

    } catch (error) {

        if (process.env.ENV === 'development') console.error(MESSAGES.TOKEN_VERIFICATION_ERROR, error);

    }

    return null;
}

