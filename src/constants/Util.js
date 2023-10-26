import bcrypt from "bcryptjs";

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
