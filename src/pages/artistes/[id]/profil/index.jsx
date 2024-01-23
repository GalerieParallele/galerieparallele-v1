import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import styles from './Index.module.scss';
import PageLoader from "@/components/items/PageLoader";
import Error from "@/components/error/Error";
import {useArtists} from "@/hooks/useArtists";
import Navbar from "@/components/items/navbar/Navbar";
import ArtistProfilAvatar from "@/components/artist/profile/avatar/ArtistProfileAvatar";
import ArtistProfileSocial from "@/components/artist/profile/social/ArtistProfileSocial";
import ArtistProfileHead from "@/components/artist/profile/ArtistProfileHead";
import ArtistProfilSTD from "@/components/artist/profile/savethedate/ArtistProfileSTD";
import LittleSpinner from "@/components/items/LittleSpinner";
import ArtistProfileBio from "@/components/artist/profile/bio/ArtistProfileBio";
import Picto from "@/components/items/picto/Picto";
import Footer from "@/components/items/footer/Footer";
import ArtistProfilePortrait from "@/components/artist/profile/portrait/ArtistProfilePortrait";
import ArtistProfileExpo from "@/components/artist/profile/expo/ArtistProfileExpo";

export default function ArtisteProfilIndex() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [artisteId, setArtisteId] = useState(null);
    const [error, setError] = useState(false);
    const [artistDisplay, setArtistDisplay] = useState(null);

    const {loading: artistLoading, getArtistById, artist, error: artistError} = useArtists();

    useEffect(() => {

        const routerId = router.query.id;

        if (routerId && /^\d+$/.test(routerId)) {
            const artisteId = parseInt(routerId);
            setArtisteId(artisteId);
            setError(false);
        } else {
            setError(true);
        }
        setLoading(false);
    }, [router, router.query.id]);

    useEffect(() => {
        if (artisteId) {
            const fetchArtistById = getArtistById(artisteId)
            if (!fetchArtistById) {
                setError(true);
            }
        }
    }, [artisteId]);

    useEffect(() => {
        if (artist) {
            console.log(artist)
            setArtistDisplay(artist.pseudo ? artist.pseudo : artist.user.lastname.toUpperCase() + " " + artist.user.firstname);
        }
    }, [artist]);

    if (loading || artistLoading) {
        return <PageLoader/>;
    }


    if (error) {
        return <Error
            code={400}
            title={"Oops..."}
            message={"Une erreur est survenue, il semble que l'identifiant de l'artiste soit incorrect."}
        />;
    }

    if (artistError) {
        switch (artistError.error.code) {
            case 404:
                return <Error
                    code={404}
                    title={"Artiste introuvable"}
                    message={"L'artiste que vous recherchez n'existe pas ou a été supprimé."}
                />;
            default:
                return <Error
                    code={400}
                    title={"Oops..."}
                    message={"Une erreur est survenue lors de la requête de récupération de l'artiste."}
                />;
        }
    }

    return (
        <div>
            <Navbar/>
            <div className={styles.main}>
                <section className={styles.artistPart}>
                    <div className={styles.artist}>
                        <div>
                            {
                                artistLoading ? <LittleSpinner/> : (
                                    <ArtistProfilAvatar
                                        imgSrc={artist && artist.user.avatarURL || "/assets/img/avatar.png"}
                                        descImg={"Avatar de " + artistDisplay}
                                    />
                                )
                            }
                        </div>
                        <div>
                            {
                                artistLoading || !artist ? <LittleSpinner/> : (
                                    <ArtistProfileSocial
                                        facebook={artist.facebook ? artist.facebook : undefined}
                                        instagram={artist.instagram ? artist.instagram : undefined}
                                        linkedin={artist.linkedin ? artist.linkedin : undefined}
                                        website={artist.website ? artist.website : undefined}
                                        fullName={artistDisplay}
                                    />
                                )
                            }
                        </div>
                    </div>
                    {
                        artistLoading || !artist ? <LittleSpinner/> : (
                            artist.savethedate && (
                                <div className={styles.stdPart}>
                                    {/* Save the date */}
                                    <ArtistProfileHead
                                        title={"Save the date"}
                                    />
                                    <ArtistProfilSTD
                                        stdList={[]}
                                    />
                                </div>
                            )
                        )
                    }
                </section>
                {
                    artistLoading || !artist ? <LittleSpinner/> : (
                        artist.bio && (
                            <section className={styles.bioPart}>
                                <div>
                                    {/* Biographie */}
                                    <ArtistProfileHead
                                        title={"Biographie"}
                                    />
                                    <ArtistProfileBio
                                        content={"<p style={{color: \"red\"}}>salut</p>"}
                                    />
                                </div>
                            </section>
                        )
                    )
                }
                {
                    artistLoading || !artist ? <LittleSpinner/> : (
                        artist.illustrations && (
                            <section className={styles.videoBlock}>
                                <video
                                    src={"https://firebasestorage.googleapis.com/v0/b/dp-gallery-37d61.appspot.com/o/10%2FLevalet%20%20odyss%C3%A9e%20artistique.mp4?alt=media&token=d1b94160-8eaa-4f77-b2bb-c9afe5e31a4b"}
                                    typeof={"video/mp4"}
                                    autoPlay={true}
                                />
                            </section>
                        )
                    )
                }
                {
                    artistLoading || !artist ? <LittleSpinner/> : (
                        artist.illustrations || artist.recompenses && (
                            <section className={styles.expoPrice}>
                                {
                                    artist.expositions && (
                                        <div>
                                            <ArtistProfileHead
                                                title={"Expositions"}
                                            />
                                            <ArtistProfileExpo
                                                expositions={[]}
                                            />
                                        </div>
                                    )
                                }
                                {
                                    artist.recompenses && (
                                        <div>
                                            <ArtistProfileHead
                                                title={"Récompenses"}
                                            />
                                        </div>
                                    )
                                }
                            </section>
                        )
                    )
                }
                <div>
                    <ArtistProfilePortrait/>
                </div>
            </div>
            <Picto/>
            <Footer/>
        </div>
    )

}