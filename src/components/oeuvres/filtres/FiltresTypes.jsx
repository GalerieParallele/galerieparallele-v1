import React from 'react';
import Skeleton from "@/components/ui/Skeleton";
import styles from './General.module.scss';
import useFiltersStore from "@/stores/oeuvresFIltersStore";


export default function FiltresTypes({loading: oeuvreLoading, types = []}) {

    const {filters, setFilter} = useFiltersStore();

    // Fonction pour basculer la sélection d'un type
    const toggleTypeSelection = (type) => {
        const newTypes = filters.types.includes(type)
            ? filters.types.filter(t => t !== type)  // Enlever le type si déjà sélectionné
            : [...filters.types, type];             // Ajouter le type si pas encore sélectionné

        setFilter('types', newTypes);
    };

    return (
        <div className={styles.filtresContainer}>
            <h4 className={styles.filtresTitle}>
                Types
            </h4>
            <div className={styles.filtresList}>
                {oeuvreLoading ? (
                    Array.from({length: 5}).map((_, index) => (
                        <div key={index} style={{display: "flex", gap: 5}}>
                            <Skeleton width="20px" height="20px"/>
                            <Skeleton width="100%" height="20px"/>
                        </div>
                    ))
                ) : (
                    types.map((type, index) => (
                        <div className={styles.filtreRow} key={index} onClick={() => toggleTypeSelection(type)}>
                            <input
                                type="checkbox"
                                id={`type-${type}`}
                                name={type}
                                checked={filters.types.includes(type)}
                                onChange={() => toggleTypeSelection(type)}
                                // style={{display: 'none'}} // Masquer les checkboxes puisque la sélection est gérée par onClick
                            />
                            <label htmlFor={`type-${type}`}>{type}</label>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
