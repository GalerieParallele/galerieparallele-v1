import sectionStyles from "./MultiColors.module.scss";
import {IoIosColorPalette} from "react-icons/io";
import chroma from 'chroma-js';
import {useEffect, useState} from "react";
import Select from "react-select";
import {useColors} from "@/hooks/useColors";

export default function MultiColors({onChange}) {

    const {colors, loading, error} = useColors();

    const colorStyles = {
        control: styles => ({...styles, backgroundColor: 'white'}),
        option: (styles, {data, isDisabled, isFocused, isSelected}) => {
            try {
                // Assurez-vous que data.value est une couleur valide.
                const color = chroma(data.value);
                return {
                    ...styles,
                    backgroundColor: isDisabled
                        ? null
                        : isSelected
                            ? data.value
                            : isFocused
                                ? color.alpha(0.1).css()
                                : null,
                    color: isDisabled
                        ? '#ccc'
                        : isSelected
                            ? chroma.contrast(color, 'white') > 2
                                ? 'white'
                                : 'black'
                            : data.value,
                    cursor: isDisabled ? 'not-allowed' : 'default',

                    ':active': {
                        ...styles[':active'],
                        backgroundColor: !isDisabled && (isSelected ? data.value : color.alpha(0.3).css()),
                    },
                };
            } catch (error) {
                // Gérer ou ignorer l'erreur.
                console.error('Erreur lors de l’interprétation de la couleur :', error);
                return styles; // Retourne les styles par défaut en cas d'erreur.
            }
        },
        multiValue: (styles, {data}) => {
            const color = chroma(data.value);
            return {
                ...styles,
                backgroundColor: color.alpha(0.1).css(),
            };
        },
        multiValueLabel: (styles, {data}) => ({
            ...styles,
            color: data.value,
        }),
        multiValueRemove: (styles, {data}) => ({
            ...styles,
            color: data.value,
            ':hover': {
                backgroundColor: data.value,
                color: 'white',
            },
        }),
    };


    const [selectedColors, setSelectedColors] = useState([]);

    const handleChange = (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        onChange(values);
        setSelectedColors(selectedOptions);
    };

    return (
        <div className={sectionStyles.main}>
            <div className={sectionStyles.specialSectionHead}>
                <span><IoIosColorPalette/></span>
                <div><p>Couleurs</p></div>
            </div>
            <Select
                placeholder={"Sélectionner une couleur"}
                closeMenuOnSelect={false}
                defaultValue={[]}
                isMulti
                options={colors.map(color => ({value: color.hexa, label: color.name}))}
                noOptionsMessage={() => "Aucune couleur trouvée"}
                styles={colorStyles}
                onChange={handleChange}
                value={selectedColors}
                isLoading={loading}
                isDisabled={loading || error}
            />
        </div>
    );
}