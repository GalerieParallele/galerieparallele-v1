import {useEffect, useMemo, useState} from "react";

import CreatableSelect from "react-select/creatable";

import {useType} from "@/hooks/useType";

export default function MultiTypes({onChange, defaultTypesSelected = [], blockedTypes = []}) {

    const {types, loading, error} = useType();

    const [selectedValues, setSelectedValues] = useState([]);

    const options = useMemo(() => types && types.map(type => ({
        value: type,
        label: type,
        isDisabled: blockedTypes.includes(type),
    })), [types, blockedTypes]);

    const handleChange = (selectedOptions) => {
        const newValues = selectedOptions.map(option => {
            if (option.__isNew__) {
                types.push({name: option.value});
                return option.value;
            }
            return option.value;
        });
        setSelectedValues(newValues);
        onChange(newValues);
    };

    useEffect(() => {
        setSelectedValues(defaultTypesSelected);
    }, []);

    const selectedOptions = options && options.filter(option => selectedValues.includes(option.value));

    useEffect(() => {
        console.log('selectedValues', selectedValues)
    })

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