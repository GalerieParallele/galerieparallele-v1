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

    useEffect(() => {
        console.log(artist);
    }, [artist]);


    if (error) {
        console.log(error);
        return <Error
            code={error.code === 404 ? 404 : 400}
            title={error.code === 404 ? "Artiste introuvable" : "Erreur de requête"}
            message={error.code === 404 ? "L'artiste que vous recherchez n'existe pas." : "L'identifiant de l'artiste est incorrect, invalide ou inexistant."}
        />;
    }

    if (loading || artistLoading) {
        return <PageLoader/>;
    }

    return (
        <div className={styles.main}>
            {
                artist && (
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
                )
            }
        </div>
    )

}