import React from "react";
import styles from './SliderRange.module.scss';
import useFiltersStore from "@/stores/oeuvresFIltersStore";

export default function SliderRange({max, min, symbol = '€'}) {

    const {filters, setFilter} = useFiltersStore();

    return (
        <div className={styles.sliderRange}>
            <div className={styles.sliderTrack}
                 style={{'--value1': filters.priceRange[0], '--value2': filters.priceRange[1], '--max': max}}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilter('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                    className={styles.sliderThumb}
                    step={50}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className={styles.sliderThumb}
                    style={{
                        marginLeft: '-4px',
                    }}
                    step={50}
                />
            </div>
            <div className={styles.sliderValues} style={{
                marginTop: '10px',
            }}>
                <span>+ de {filters.priceRange[0]}{symbol}</span>
                <span>- de {filters.priceRange[1]}{symbol}</span>
            </div>
        </div>
    );
}
