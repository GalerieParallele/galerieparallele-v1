import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import styles from './Index.module.scss';
import PageLoader from "@/components/items/PageLoader";
import Error from "@/components/error/Error";
import {useArtists} from "@/hooks/useArtists";

export default function ArtisteProfilIndex() {

    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [artisteId, setArtisteId] = useState(null);
    const [error, setError] = useState(false);

    const {loading: artistLoading, getArtistById, artist} = useArtists();

    useEffect(() => {
        if (router.query.id && /^\d+$/.test(router.query.id)) {
            setArtisteId(router.query.id);
            setError(false);
            if (artisteId) {
                getArtistById(artisteId);
                console.log(artist);
            }
        } else {
            setError(true);
        }
        setLoading(false);
    }, [router, router.query.id]);

    useEffect(() => {
        if (artisteId) {
            getArtistById(artisteId);
            console.log(artist);
        }
    }, [artisteId, artist]);

    if (error) {
        return <Error
            code={404}
            title={"Artiste introuvable"}
            message={"L'artiste avec l'identifiant \"" + router.query.id + "\" n'existe pas ou est invalide."}
        />;
    }

    if (loading) {
        return <PageLoader/>;
    }

    return (
        <div className={styles.main}>
            <p>{artist && artist.user && artist.user.id}</p>
        </div>
    )

}