import {NextResponse} from "next/server";
import {z} from "zod";
import {prisma} from "@/utils/PrismaUtil";
import {ArtistSchema} from "@/app/api/artistes/route";
import {STATIC_MESSAGES} from "@/constants/STATIC_MESSAGES";

const MESSAGES = {
    INVALID_ARTIST: "L'id renseigné ne correspond à aucun artiste",
}

export async function POST(req) {

    try {

        const requestBody = ArtistSchema.pick({id: true}).parse(JSON.parse(await req.text()));

        const id = Number(requestBody.id);

        const artist = await prisma.artist.findUnique({
            where: {
                id
            },
            include: {
                oeuvre: {
                    select: {
                        oeuvre: {
                            include: {
                                Artists: {
                                    select: {
                                        artist: true
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
                                images: true,
                                couleurs: {
                                    select: {
                                        couleur: {
                                            select: {
                                                hexa: true,
                                                name: true
                                            }
                                        }
                                    }
                                },
                            },
                        },
                    }
                },
                tag: true,
                saveTheDate: true,
                exposition: true,
                portrait: true,
                recompense: true,
                user: true,

            }
        })

        if (!artist) {
            return NextResponse.json({message: MESSAGES.INVALID_ARTIST}, {status: 404});
        }

        artist.oeuvre = artist.oeuvre.map(oeuvre => {
            return oeuvre.oeuvre
        })

        artist.oeuvre = artist.oeuvre.map(oeuvre => {
            oeuvre.artists = oeuvre.Artists.map(artist => {
                return artist.artist
            })
            oeuvre.unknowArtists = oeuvre.UnknowArtistOeuvre.map(artist => {
                return artist.artist
            })
            oeuvre.couleurs = oeuvre.couleurs.map(couleur => {
                return couleur.couleur
            })
            oeuvre.images = oeuvre.images
                .map(image => {
                    return {
                        position: image.position,
                        url: image.mediaURL
                    }
                })
                .sort((a, b) => a.position - b.position)

            oeuvre.tag = oeuvre.tag.map(tag => {
                return tag.tag.name
            })
            oeuvre.type = oeuvre.type.map(type => {
                return type.type.name
            })

            oeuvre.tags = oeuvre.tag
            oeuvre.types = oeuvre.type

            delete oeuvre.Artists
            delete oeuvre.UnknowArtistOeuvre
            delete oeuvre.tag
            delete oeuvre.type
            return oeuvre
        })

        artist.user.password = undefined;
        artist.userid = undefined;

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

        if (error.code === 'P2025') {
            return NextResponse.json({message: MESSAGES.INVALID_ARTIST}, {status: 404});
        }

        return NextResponse.json({message: STATIC_MESSAGES.API_SERVER_ERROR}, {status: 500});

    }

}