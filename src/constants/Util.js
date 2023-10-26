import bcrypt from "bcryptjs";
import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

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

    const authHeader = req.headers.get('authorization');

    if (authHeader !== null){

        const parts = authHeader.split(' ');

        if (parts.length === 2){

            const token = parts[1];

            try {

                const decoded = jwt.verify(token, process.env.JWT);

                const user = await prisma.user.findUnique({where: {id: decoded.user.id}});

                if (!user) {
                    return {user: null, message: "L'utilisateur n'existe pas."};
                }

                return {user, message: "test"};

            } catch (error) {

                if (error instanceof jwt.TokenExpiredError) {
                    return {user: null, message: 'Le token a expiré.'};
                } else if (error instanceof jwt.JsonWebTokenError) {
                    return {user: null, message: 'Le token est invalide.'};
                }

                return {user: null, message: 'Le token est invalide ou mal formaté.'};

            }

        }

    }


    let tokenFromCookie;

    try {
        tokenFromCookie = cookies().get("token").value;
    } catch (error) {
        return NextResponse.json({message: "Erreur lors de la récupération du cookie."}, {status: 400});
    }

    if (!tokenFromCookie) {
        return NextResponse.json({message: "Aucun token trouvé."}, {status: 401});
    }

    let decoded;

    console.log(tokenFromCookie);

    try {
        decoded = jwt.verify(tokenFromCookie, process.env.JWT);
    } catch (err) {
        return NextResponse.json({message: "Message1"}, {status: 401});
    }

    try {
        const userId = decoded.user.id;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return NextResponse.json({message: "Message2"}, {status: 400});
        }

        return NextResponse.json({
            id: user.id,
            email: user.email,
            roles: user.roles,
            avatarURL: user.avatarURL,
        }, {status: HTTP_STATUS.OK});
    } catch (err) {
        return NextResponse.json({message: "Message3"}, {status: 400});
    }

}

