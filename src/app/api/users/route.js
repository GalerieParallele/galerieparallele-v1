import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export async function GET() {

    const prisma = new PrismaClient()
    await prisma.user.create({
        data: {
            firstname: generateRandomString(10),
            lastname: generateRandomString(10),
            password: generateRandomString(10),
        }
    })

    const users = await prisma.user.findMany()
    return NextResponse.json(users);
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
