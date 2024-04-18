import {useEffect, useState} from "react";
import {fetchTypes} from "@/services/typesServices";

export const useType = () => {

    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading(true);

        fetchTypes()
            .then((response) => {
                setTypes(response.types)
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    return {types, loading, error};
};