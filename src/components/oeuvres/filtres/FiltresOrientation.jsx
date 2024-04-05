import React from 'react';
import generalStyle from './General.module.scss';
import styles from './FiltresOrientation.module.scss';
import useFiltersStore from "@/stores/oeuvresFIltersStore";

export default function FiltresOrientation() {

    const {filters, setFilter} = useFiltersStore();

    const toggleSelection = (selectedOrientation) => {
        const newOrientations = filters.orientation.includes(selectedOrientation)
            ? filters.orientation.filter(orientation => orientation !== selectedOrientation)
            : [...filters.orientation, selectedOrientation];

        setFilter('orientation', newOrientations);
    };

    return (
        <div className={generalStyle.filtresContainer}>
            <h4 className={generalStyle.filtresTitle}>Orientation</h4>
            <div className={styles.filtresOrientation}>
                {['PAYSAGE', 'PORTRAIT', 'CARRE'].map((orientation) => (
                    <div
                        key={orientation}
                        className={styles.orientationItem}
                        onClick={() => toggleSelection(orientation)}
                    >
                        <div className={`${filters.orientation.includes(orientation) ? styles.selected : null} ${styles.container}`}>
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
        </div>
    );
}
