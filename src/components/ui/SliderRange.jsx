import React from "react";
import styles from './SliderRange.module.scss';
import useFiltersStore from "@/stores/oeuvresFiltersStore";

export default function SliderRange({ max, min, filterKey, filterValue, symbol }) {

    const { setFilter } = useFiltersStore();

    const handleOnChange = (valueIndex, value) => {
        const newFilterValue = [...filterValue];
        newFilterValue[valueIndex] = parseInt(value);
        setFilter(filterKey, newFilterValue);
    };

    return (
        <div className={styles.sliderRange}>
            <div className={styles.sliderTrack}
                 style={{'--value1': filterValue[0], '--value2': filterValue[1], '--max': max}}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={filterValue[0]}
                    onChange={(e) => handleOnChange(0, e.target.value)}
                    className={styles.sliderThumb}
                    step={1}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={filterValue[1]}
                    onChange={(e) => handleOnChange(1, e.target.value)}
                    className={styles.sliderThumb}
                    style={{marginLeft: '-4px'}}
                    step={1}
                />
            </div>
            <div className={styles.sliderValues} style={{
                marginTop: '10px',
            }}>
                <span>+ de {filterValue[0]} {symbol}</span>
                <span>- de {filterValue[1]} {symbol}</span>
            </div>
        </div>
    );
}
