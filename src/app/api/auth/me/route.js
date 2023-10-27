import {NextResponse} from "next/server";

import {getUserFromToken} from "@/constants/Util";

export async function POST(req) {

    const {user, message} = await getUserFromToken(req);

    if (message !== null) {
        return NextResponse.json({message: message || "Vous devez être authentifié pour accéder à cette ressource."}, {status: 401});
    }

    return NextResponse.json({user}, {status: 200})
}
