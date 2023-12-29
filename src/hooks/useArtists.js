import {useEffect, useState} from "react";

import {fetchArtists} from "@/services/artistes/artistesServices";

export const useArtists = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchArtists()
            .then(data => setArtists(data.list))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return {artists, loading, error};
};