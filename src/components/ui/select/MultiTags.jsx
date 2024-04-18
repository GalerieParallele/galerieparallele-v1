import {useEffect, useMemo, useState} from "react";

import {useTags} from "@/hooks/useTags";

import CreatableSelect from "react-select/creatable";

export default function MultiTags({onChange, defaultTagsSelected = [], blockedTags = []}) {

    const {tags, loading, error} = useTags();

    const [selectedValues, setSelectedValues] = useState([]);

    const options = useMemo(() => tags && tags.map(tag => ({
        value: tag.name,
        label: tag.name,
        isDisabled: blockedTags.includes(tag.name),
    })), [tags, blockedTags]);

    const handleChange = (selectedOptions) => {
        const newValues = selectedOptions.map(option => {
            if (option.__isNew__) {
                tags.push({name: option.value});
                return option.value;
            }
            return option.value;
        });
        setSelectedValues(newValues);
        onChange(newValues);
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