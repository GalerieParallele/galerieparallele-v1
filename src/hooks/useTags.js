import {useEffect, useState} from "react";
import {fetchTags} from "@/services/tagsServices";

export const useTags = () => {

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading(true);

        fetchTags()
            .then((response) => {
                setTags(response.tags)
            })
            .catch((error) => {
                setError(error.message)
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    return {tags, loading, error};
};