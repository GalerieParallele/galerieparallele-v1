import {NextResponse} from "next/server";
import {z} from "zod";
import {prisma} from "@/utils/PrismaUtil";
import {ArtistSchema} from "@/app/api/artistes/route";

const MESSAGES = {
    INVALID_ARTIST: "L'id renseigné ne correspond à aucun artiste",
}

const ArtistSchemaById = z.object({
    id: z.number({
        message: "L'id de l'artiste doit être un nombre",
        required_error: "L'id de l'artiste est requis"
    })
        .int({
            message: "L'id de l'artiste doit être un nombre entier",
            required_error: "L'id de l'artiste est requis"
        })
        .positive({
            message: "L'id de l'artiste doit être un nombre positif",
            required_error: "L'id de l'artiste est requis"
        })
});

export async function POST(req) {

    try {

        const requestBody = ArtistSchema.pick({id: true}).parse(JSON.parse(await req.text()));

        const id = Number(requestBody.id);

        const artist = await prisma.artist.findUnique({
            where: {
                id
            },
            include: {
                oeuvre: true,
                tag: true,
                saveTheDate: true,
                exposition: true,
                portrait: true
            }
        })

        if (!artist) {
            return NextResponse.json({message: MESSAGES.INVALID_ARTIST}, {status: 404});
        }

        return NextResponse.json(
            artist,
            {
                status: 200
            }
        )

    } catch (error) {

        console.error(error);

        if (error instanceof z.ZodError) {
            return NextResponse.json({errors: error.errors[0].message}, {status: 400});
        }

        if (error.code === '02025') {
            return NextResponse.json({message: MESSAGES.INVALID_ARTIST}, {status: 404});
        }

        return NextResponse.json({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }

}