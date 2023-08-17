import {NextResponse} from "next/server";
import {Prisma, PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const ERROR_MESSAGES = {
    MISSING_FIELDS: 'Veuillez renseigner tous les champs (email, password)',
    INVALID_EMAIL: 'Veuillez fournir une adresse e-mail valide',
    EMAIL_EXISTS: 'Un compte avec cet e-mail existe déjà',
    SUCCESS: 'Utilisateur créé avec succès'
};

export async function GET() {

    const users = await prisma.user.findMany();

    return NextResponse.json({
        total: users.length,
        list: users,
    });
}

export async function POST(request, res) {

    const requestBodyText = await request.text();

    try {
        const requestBody = JSON.parse(requestBodyText);
        const {email = '', password = ''} = requestBody;

        if (!email || !password) {
            return NextResponse.json({message: ERROR_MESSAGES.MISSING_FIELDS});
        }

        if (!isValidEmail(email)) {
            return NextResponse.json({message: ERROR_MESSAGES.INVALID_EMAIL});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({message: ERROR_MESSAGES.SUCCESS, user});

    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json({message: ERROR_MESSAGES.EMAIL_EXISTS});
        }

        return NextResponse.error(error, {status: 500});

    } finally {

        await prisma.$disconnect();

    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
