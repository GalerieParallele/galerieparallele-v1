import {useEffect, useState} from "react";
import {fetchOeuvreById, fetchOeuvres} from "@/services/oeuvresServices";

export const useOeuvres = () => {

    const [oeuvres, setOeuvres] = useState([]);
    const [oeuvre, setOeuvre] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadOeuvres = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchOeuvres();
            if (response.success) {
                setOeuvres(response.oeuvres);
            } else {
                setError(response.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getOeuvreById = async (id) => {
        setLoading(true);
        setError(null);

        id = parseInt(id);

        try {
            const response = await fetchOeuvreById(id);
            if (response.success) {
                setOeuvre(response.oeuvre);
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
            loadOeuvres();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        oeuvres, oeuvre, loading, error, getOeuvreById
    };

}