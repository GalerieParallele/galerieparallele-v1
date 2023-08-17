import {NextResponse} from "next/server";
import {Prisma, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {

    const users = await prisma.user.findMany();

    return NextResponse.json(users);
}

export async function POST(request) {

    // Messages d'erreur
    const missingFieldsMessage = 'Veuillez renseigner tous les champs (email, password)';
    const invalidEmailMessage = 'Veuillez fournir une adresse e-mail valide';
    const emailExistsErrorMessage = 'Un compte avec cet e-mail existe déjà';
    const successMessage = 'Utilisateur créé avec succès';

    // Récupération du corps de la requête
    const requestBodyText = await request.text();

    try {
        const requestBody = JSON.parse(requestBodyText);
        const {email = '', password = ''} = requestBody;

        if (!email || !password) {
            return NextResponse.json({message: missingFieldsMessage});
        }

        if (!isValidEmail(email)) {
            return NextResponse.json({message: invalidEmailMessage});
        }

        const user = await prisma.user.create({
            data: {
                email,
                password,
            },
        });

        return NextResponse.json({message: successMessage, user});

    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json({message: emailExistsErrorMessage});
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
