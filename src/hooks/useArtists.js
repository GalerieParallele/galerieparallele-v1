import { useEffect, useState } from "react";
import { fetchArtists } from "@/services/artistes/artistesServices";

export const useArtists = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadArtists = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchArtists();
            if (response.success) {
                setArtists(response.artists);
            } else {
                setError(response.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            loadArtists();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return { artists, loading, error, reloadArtists: loadArtists };
};
