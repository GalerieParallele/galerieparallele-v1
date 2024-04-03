import {useState} from "react";
import {fetchOeuvreById} from "@/services/oeuvresServices";

export const useOeuvres = () => {

    const [oeuvres, setOeuvres] = useState([]);
    const [oeuvre, setOeuvre] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return {
        oeuvres,
        oeuvre,
        loading,
        error,
        getOeuvreById
    };

}