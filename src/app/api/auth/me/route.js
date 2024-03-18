import {NextResponse} from "next/server";

import {getTokenFromRequest, getUserFromToken} from "@/constants/Util";

const MESSAGE = {
    MISSING_TOKEN: "Vous devez être authentifié pour accéder à cette ressource."
}

export async function POST(req) {

    const token = getTokenFromRequest(req);

    if(token === null) {
        return NextResponse.json({message: MESSAGE.MISSING_TOKEN}, {status: 401});
    }

    const user = await getUserFromToken(token);

    if (user === null) {
        return NextResponse.json({message: MESSAGE.MISSING_TOKEN}, {status: 401});
    }


    return NextResponse.json(user, {status: 200})
}
