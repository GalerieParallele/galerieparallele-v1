import {PrismaClient} from "@prisma/client";

import Link from "next/link";

import "@/app/globals.css";

export default function Home({users}) {
    return (
        <main>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                    </li>
                ))}
            </ul>
            <Link href={"/login"}>Test</Link>
        </main>
    );
}

export async function getServerSideProps() {

    const prisma = new PrismaClient();

    let users = [];

    try {
        users = await prisma.user.findMany();
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        await prisma.$disconnect();
    }

    return {
        props: {users},
    };
}
