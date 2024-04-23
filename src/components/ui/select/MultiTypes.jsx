import {useEffect, useMemo, useState} from "react";

import CreatableSelect from "react-select/creatable";

import {useType} from "@/hooks/useType";

export default function MultiTypes({onChange, defaultTypesSelected = [], blockedTypes = []}) {

    const {types, loading, error} = useType();
    const [selectedValues, setSelectedValues] = useState([]);
    const [newTypes, setNewTypes] = useState([]);

    const options = useMemo(() => {
        const combinedTypes = types ? [...types, ...newTypes] : newTypes;
        return combinedTypes.map(type => ({
            value: type.name,
            label: type.name,
            isDisabled: blockedTypes.includes(type.name),
        }));
    }, [types, blockedTypes, newTypes]);

    const handleChange = (selectedOptions) => {
        const newValues = selectedOptions.map(option => option.value);
        setSelectedValues(newValues);
        onChange(newValues);

        // Traiter les nouveaux tags
        const newlyAddedTypes = selectedOptions
            .filter(option => option.__isNew__)
            .map(option => ({name: option.value}));

        if (newlyAddedTypes.length > 0) {
            setNewTypes(prevNewTypes => [...prevNewTypes, ...newlyAddedTypes]);
        }
    };

    useEffect(() => {
        setSelectedValues(defaultTypesSelected);
    }, []);

    const selectedOptions = options && options.filter(option => selectedValues.includes(option.value));

    return (
        <div style={{marginBottom: '150px'}}>
            <CreatableSelect
                placeholder="Sélectionner un ou plusieurs types"
                closeMenuOnSelect={false}
                isMulti
                options={options}
                noOptionsMessage={() => "Aucun type trouvé"}
                onChange={handleChange}
                value={selectedOptions}
                isLoading={loading || error}
                isOptionDisabled={(option) => option.isDisabled}
            />
        </div>
    );
}