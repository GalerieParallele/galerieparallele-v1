import {NextResponse} from "next/server";

import AUTH from "@/constants/AUTH";
import {getUserFromToken} from "@/constants/Util";

export async function POST(req) {

    const {user, message} = await getUserFromToken(req);

    if (message !== null) {
        return NextResponse.json({message : message || "Vous devez être authentifié pour accéder à cette ressource."}, {status: 401});
    }

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
