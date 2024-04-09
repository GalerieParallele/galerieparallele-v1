import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import styles from './Index.module.scss';
import Navbar from "@/components/ui/navbar/Navbar";
import ArtistProfilAvatar from "@/components/artist/profile/avatar/ArtistProfileAvatar";
import ArtistProfileSocial from "@/components/artist/profile/social/ArtistProfileSocial";
import ArtistProfileHead from "@/components/artist/profile/ArtistProfileHead";
import ArtistProfilSTD from "@/components/artist/profile/savethedate/ArtistProfileSTD";
import LittleSpinner from "@/components/ui/LittleSpinner";
import ArtistProfileBio from "@/components/artist/profile/bio/ArtistProfileBio";
import Picto from "@/components/ui/picto/Picto";
import Footer from "@/components/ui/footer/Footer";
import ArtistProfilePortrait from "@/components/artist/profile/portrait/ArtistProfilePortrait";
import ArtistProfileExpo from "@/components/artist/profile/expo/ArtistProfileExpo";
import useArtistsStore from "@/stores/artistsStore";
import PageLoader from "@/components/ui/PageLoader";
import Error from "@/components/error/Error";

export default function ArtisteProfilIndex() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [artistId, setArtistId] = useState(null);

    const {
        artist,
        artistLoading,
        error,
        getArtistById,
    } = useArtistsStore();

    const artistDisplay = artist && artist.user.lastname + " " + artist.user.firstname + (artist.pseudo ? " (" + artist.pseudo + ")" : "");

    useEffect(() => {

        const routerId = router.query.id;

        if (routerId && /^\d+$/.test(routerId)) {
            setArtistId(parseInt(routerId));
        }

        setLoading(false);

    }, [router, router.query.id]);

    useEffect(() => {
        if (artistId) {
            getArtistById(artistId);
        }
    }, [artistId]);

    if (artistLoading) {
        return <PageLoader/>
    }

    let content = <PageLoader/>;

    if (!artistId && !/^\d+$/.test(artistId)) {
        content = <Error
            code={404}
            message={"L'identifiant de l'artiste doit être un nombre"}
            title={"Indentifiant incorrect"}
        />
    }

    if (!loading && !artistLoading && error) {
        switch (error.code) {
            case 404:
                content = <Error
                    code={404}
                    message={error.message}
                    title={"Artiste introuvable"}
                />
                break;
            case 403:
            case 401:
                content = <Error
                    code={403}
                    message={error.message}
                    title={"Accès refusé"}
                />
                break;
            default:
                content = <Error
                    code={500}
                    message={"Une erreur est survenue."}
                    title={"Erreur"}
                />
                break;
        }
    }

    if (!loading && !artistLoading && artistId && artist) {
        content = <div>
            <Navbar/>
            <div className={styles.main}>
                <section className={styles.artistPart}>
                    <div className={styles.artist}>
                        <div>
                            {artistLoading ? <LittleSpinner/> : (<ArtistProfilAvatar
                                imgSrc={artist && artist.user.avatarURL || "/assets/img/avatar.png"}
                                descImg={"Avatar de " + artistDisplay}
                            />)}
                        </div>
                        <div>
                            {artistLoading || !artist ? <LittleSpinner/> : (<ArtistProfileSocial
                                facebook={artist.facebook ? artist.facebook : undefined}
                                instagram={artist.instagram ? artist.instagram : undefined}
                                linkedin={artist.linkedin ? artist.linkedin : undefined}
                                website={artist.website ? artist.website : undefined}
                                fullName={artistDisplay}
                            />)}
                        </div>
                    </div>
                    {artistLoading || !artist ? <LittleSpinner/> : (artist.savethedate && (
                        <div className={styles.stdPart}>
                            {/* Save the date */}
                            <ArtistProfileHead
                                title={"Save the date"}
                            />
                            <ArtistProfilSTD
                                stdList={[]}
                            />
                        </div>))}
                </section>
                {artistLoading || !artist ? <LittleSpinner/> : (artist.bio && (<section className={styles.bioPart}>
                    <div>
                        {/* Biographie */}
                        <ArtistProfileHead
                            title={"Biographie"}
                        />
                        <ArtistProfileBio
                            content={artist.bio && artist.bio}
                        />
                    </div>
                </section>))}
                {artistLoading || !artist ? <LittleSpinner/> : (artist.illustrations && (
                    <section className={styles.videoBlock}>
                        <video
                            src={"https://firebasestorage.googleapis.com/v0/b/dp-gallery-37d61.appspot.com/o/10%2FLevalet%20%20odyss%C3%A9e%20artistique.mp4?alt=media&token=d1b94160-8eaa-4f77-b2bb-c9afe5e31a4b"}
                            typeof={"video/mp4"}
                            autoPlay={true}
                        />
                    </section>))}
                {artistLoading || !artist ? <LittleSpinner/> : (artist.illustrations || artist.recompenses && (
                    <section className={styles.expoPrice}>
                        {artist.expositions && (<div>
                            <ArtistProfileHead
                                title={"Expositions"}
                            />
                            <ArtistProfileExpo
                                expositions={[]}
                            />
                        </div>)}
                        {artist.recompenses && (<div>
                            <ArtistProfileHead
                                title={"Récompenses"}
                            />
                        </div>)}
                    </section>))}
                <div>
                    <ArtistProfilePortrait/>
                </div>
            </div>
            <Picto/>
            <Footer/>
        </div>

    }
    return content;

}