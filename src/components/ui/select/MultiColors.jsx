import sectionStyles from "./MultiColors.module.scss";
import {IoIosColorPalette} from "react-icons/io";
import chroma from 'chroma-js';
import {useState} from "react";
import Select from "react-select";

const colors = [
    {value: '#66A3FF', label: 'Bleu Ciel'},
    {value: '#FC2912', label: 'Rouge'},
    {value: '#050002', label: 'Noir'},
    {value: '#0707BD', label: 'Bleu Foncé'},
    {value: '#0E9909', label: 'Vert'},
    {value: '#F0FF24', label: 'Jaune'},
    {value: '#615F57', label: 'Gris'},
    {value: '#FA62A9', label: 'Rose'},
    {value: '#e6e6e6', label: 'Blanc'},
    {value: '#E8DEC3', label: 'Beige'},
    {value: '#7D441E', label: 'Marron'},
    {value: '#FA8A28', label: 'Orange'},
    {value: '#94048A', label: 'Violet'},
    {value: '#314E7A', label: 'Bleu Marine'},
    {value: '#EDD458', label: 'Doré'},
    {value: '#CECECE', label: 'Argenté'},
];

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

export default function MultiColors({onChange}) {

    const [values, setValues] = useState([]);
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
                options={colors}
                styles={colorStyles}
                onChange={(value) => {
                    onChange({name: 'oeuvre.couleurs', value});
                    setValues(value);
                }}
                value={values}
            />
        </div>
    );
}