import bcrypt from "bcryptjs";
import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const authErrorMessage = "Vous devez être authentifié pour accéder à cette ressource.";

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
 * Permet de vérifier si un utilisateur est authentifié et de récupérer ses informations pour l'api
 */
export async function getUserFromToken(req) {

    /**
     * Permet de vérifier si un token est valide et de récupérer l'utilisateur associé
     * @param {string} token
     * @returns {Promise<{user: object, message: null} | null>}
     */
    async function verifyAndFindUser(token) {
        try {
            const {user: {id}} = jwt.verify(token, process.env.JWT);
            const user = await prisma.user.findUnique({where: {id}});
            if (user) {
                const {password, articles, artist, ...safeUser} = user;
                return {user: safeUser, message: null};
            }
        } catch (error) {
            console.error("Token verification error:", error);
        }
        return null;
    }

    const token = req.headers.get('authorization')?.split(' ')[1] || req.headers.get('Authorization')?.split(' ')[1]

    const user = token ? await verifyAndFindUser(token) : null;

    return user || {user: null, message: authErrorMessage};
}

