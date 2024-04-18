import React, {useEffect, useMemo, useState} from "react";
import Select from "react-select";
import {useColors} from "@/hooks/useColors";

export default function MultiColors({onChange, defaultHexaSelected = [], blockedColors = []}) {

    const {colors, loading, error} = useColors();

    const [selectedValues, setSelectedValues] = useState([]);

    const options = useMemo(() => colors && colors.map(color => ({
        value: color.hexa,
        label: color.name,
        isDisabled: blockedColors.includes(color.hexa),
    })), [colors, blockedColors]);

    const handleChange = (selectedOptions) => {
        const newValues = selectedOptions.map(option => option.value);
        setSelectedValues(newValues);
        onChange(newValues);
    };

    useEffect(() => {
        setSelectedValues(defaultHexaSelected);
    }, []);

    const selectedOptions = options && options.filter(option => selectedValues.includes(option.value));

    return (
        <div style={{marginBottom: '150px'}}>
            <Select
                placeholder="Sélectionner une couleur"
                closeMenuOnSelect={false}
                isMulti
                options={options}
                noOptionsMessage={() => "Aucune couleur trouvée"}
                onChange={handleChange}
                value={selectedOptions}
                isLoading={loading || error}
                formatOptionLabel={(option) => (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            backgroundColor: option.value,
                            marginRight: '10px',
                            borderRadius: '50%',
                        }}/>
                        {option.label}
                    </div>
                )}
                isOptionDisabled={(option) => option.isDisabled}
            />
        </div>
    );
}
