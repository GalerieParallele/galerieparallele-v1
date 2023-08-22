import {NextResponse} from "next/server";

import AUTH from "@/constants/AUTH";

export async function POST(req, res) {

    return NextResponse.json(
        {
            message: 'Déconnexion réussie.'
        },
        {
            status: 200,
            headers: {
                'Set-Cookie': `token=deleted; HttpOnly; Path=/; Max-Age=0; ${AUTH.sameSiteSetting} ${AUTH.isProduction ? AUTH.secureCookieFlag : ''}`
            }
        }
    );
}
