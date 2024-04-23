import {OeuvreSchema} from "@/app/api/oeuvres/route";
import {NextResponse} from "next/server";
import {z} from "zod";


const MESSAGES = {
    INVALID_OEUVRE: "L'id renseigné ne correspond à aucune oeuvre",
}

export async function POST(req) {

    const requestBody = OeuvreSchema.pick({id: true}).parse(JSON.parse(await req.text()));

    const id = Number(requestBody.id);

    try {

        const oeuvre = await prisma.oeuvre.findUnique({
            where: {
                id
            },
            include: {
                Artists: {
                    select: {
                        artist: {
                            include: {
                                user:  {
                                    select: {
                                        firstname: true,
                                        lastname: true,
                                        avatarURL: true
                                    }
                                }
                            }
                        }
                    }
                },
                UnknowArtistOeuvre: {
                    select: {
                        artist: true
                    }
                },
                tag: {
                    select: {
                        tag: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                type: {
                    select: {
                        type: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                images: {
                    select: {
                        mediaURL: true,
                        position: true
                    }
                },
                couleurs: {
                    select: {
                        couleur: {
                            select: {
                                name: true,
                                hexa: true
                            }
                        }
                    }
                }
            }
        })

        if (!oeuvre) {
            return NextResponse.json({message: MESSAGES.INVALID_OEUVRE}, {status: 404});
        }

        oeuvre.artists = oeuvre.Artists.map(artist => artist.artist);
        oeuvre.Artists = undefined;

        oeuvre.unknowArtists = oeuvre.UnknowArtistOeuvre.map(artist => artist.artist);
        oeuvre.UnknowArtistOeuvre = undefined;

        oeuvre.tags = oeuvre.tag.map(tag => tag.tag.name);
        oeuvre.tag = undefined;

        oeuvre.types = oeuvre.type.map(type => type.type.name);
        oeuvre.type = undefined;

        oeuvre.images = oeuvre.images.sort((a, b) => a.position - b.position).map(image => {
            return {
                position: image.position,
                url: image.mediaURL,
            }
        });

        oeuvre.couleurs = oeuvre.couleurs.map(couleur => {
            return {
                name: couleur.couleur.name,
                hexa: couleur.couleur.hexa
            }
        });

        return NextResponse.json(
            oeuvre,
            {
                status: 200
            }
        )

    } catch (error) {

        if (process.env.NODE_ENV === "development") {
            console.error(error);
        }

        if (error instanceof z.ZodError) {
            return NextResponse.json({errors: error.errors[0].message}, {status: 400});
        }

        if (error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.INVALID_OEUVRE}, {status: 404});
        }

        return NextResponse.json({message: MESSAGES.API_SERVER_ERROR}, {status: 500});

    }

}

