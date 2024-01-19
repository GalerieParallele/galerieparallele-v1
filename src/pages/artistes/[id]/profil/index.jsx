import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import styles from './Index.module.scss';
import PageLoader from "@/components/items/PageLoader";
import Error from "@/components/error/Error";
import {useArtists} from "@/hooks/useArtists";
import Image from "next/image";

export default function ArtisteProfilIndex() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [artisteId, setArtisteId] = useState(null);
    const [error, setError] = useState(false);

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
        <div className={styles.main}>
            {
                artist ? (
                    <>
                        <p>{artist.user && artist.user.id}</p>
                        <p>{artist.user.email}</p>
                        <Image
                            src={artist.user.avatarURL}
                            alt={"Avatar de " + artist.user.firstname}
                            width={100}
                            height={100}
                        />
                    </>
                ) : (
                    <p>Chargement...</p>
                )
            }
        </div>
    )

}