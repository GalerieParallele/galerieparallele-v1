import {useState} from "react";
import {fetchActualities} from "@/services/actualitiesServices";

export const useActualities = () => {

    const [actualities, setActualities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadActualities = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchActualities();
            if (response.success) {
                setActualities(response.actualities);
            } else {
                setError(response.error);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

};