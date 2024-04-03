import {useEffect, useState} from "react";
import {fetchColors} from "@/services/couleursServices";

export const useColors = () => {

    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading(true);

        fetchColors()
            .then((response) => {
                setColors(response.colors)
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    return {colors, loading, error};

}