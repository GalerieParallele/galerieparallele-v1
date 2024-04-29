import React from 'react';
import styles from './FiltresOrientation.module.scss';
import useFiltersStore from "@/stores/oeuvresFiltersStore";
import InitialFiltresItem from "@/components/oeuvres/filtres/InitialFiltresItem";

export default function FiltresOrientations() {

    const {filters, setFilter} = useFiltersStore();

    const toggleSelection = (selectedOrientation) => {
        const newOrientations = filters.orientation.includes(selectedOrientation)
            ? filters.orientation.filter(orientation => orientation !== selectedOrientation)
            : [...filters.orientation, selectedOrientation];

        setFilter('orientation', newOrientations);
    };

    return (
        <InitialFiltresItem
            title={'Orientations'}
        >
            <div className={styles.filtresOrientation}>
                {['PAYSAGE', 'PORTRAIT', 'CARRE'].map((orientation) => (
                    <div
                        key={orientation}
                        className={styles.orientationItem}
                        onClick={() => toggleSelection(orientation)}
                    >
                        <div
                            className={`${filters.orientation.includes(orientation) ? styles.selected : null} ${styles.container}`}>
                            <div className={`${styles.shape} ${styles[orientation.toLowerCase()]}`}/>
                        </div>
                        <p>{orientation.charAt(0) + orientation.slice(1).toLowerCase()}</p>
                        <input
                            type="checkbox"
                            checked={filters.orientation.includes(orientation)}
                            onChange={() => toggleSelection(orientation)}
                            style={{display: 'none'}}
                        />
                    </div>
                ))}
            </div>
        </InitialFiltresItem>
    );
}
