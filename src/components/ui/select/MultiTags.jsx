import {useEffect, useMemo, useState} from "react";
import {useTags} from "@/hooks/useTags";
import CreatableSelect from "react-select/creatable";

export default function MultiTags({onChange, defaultTagsSelected = [], blockedTags = []}) {

    const {tags, loading, error} = useTags();
    const [selectedValues, setSelectedValues] = useState([]);
    const [newTags, setNewTags] = useState([]);

    const options = useMemo(() => {
        // Combiner les tags existants et les nouveaux tags pour les options
        const combinedTags = tags ? [...tags, ...newTags] : newTags;
        return combinedTags.map(tag => ({
            value: tag.name,
            label: tag.name,
            isDisabled: blockedTags.includes(tag.name),
        }));
    }, [tags, blockedTags, newTags]);

    const handleChange = (selectedOptions) => {
        const newValues = selectedOptions.map(option => option.value);
        setSelectedValues(newValues);
        onChange(newValues);

        // Traiter les nouveaux tags
        const newlyAddedTags = selectedOptions
            .filter(option => option.__isNew__)
            .map(option => ({name: option.value}));

        if (newlyAddedTags.length > 0) {
            setNewTags(prevNewTags => [...prevNewTags, ...newlyAddedTags]);
        }
    };

    useEffect(() => {
        setSelectedValues(defaultTagsSelected);
    }, []);

    const selectedOptions = options && options.filter(option => selectedValues.includes(option.value));

    return (
        <div style={{marginBottom: '150px'}}>
            <CreatableSelect
                placeholder="Sélectionner un ou plusieurs tags"
                closeMenuOnSelect={false}
                isMulti
                options={options}
                noOptionsMessage={() => "Aucun tag trouvé"}
                onChange={handleChange}
                value={selectedOptions}
                isLoading={loading || error}
                isOptionDisabled={(option) => option.isDisabled}
            />
        </div>
    );
}
