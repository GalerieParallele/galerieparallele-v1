import {NextResponse} from "next/server";

export async function POST(req, res) {
    return NextResponse.json(
        {
            message: 'Déconnexion réussie.'
        },
        {
            status: 200
        },
        {
            headers:
                {'Set-Cookie': `token=deleted; HttpOnly; Path=/; Max-Age=0; SameSite=Lax; ${process.env.NODE_ENV === 'production' ? 'Secure' : ''}`}
        }
    );
}