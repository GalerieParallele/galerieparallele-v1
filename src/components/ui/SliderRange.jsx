import React, { useState } from "react";
import styles from './SliderRange.module.scss';

export default function SliderRange({ initialMin, initialMax, initialValue, onChange }) {
    const [min, setMin] = useState(initialMin || 0);
    const [max, setMax] = useState(initialMax || 100);
    const [value, setValue] = useState(initialValue || [min, max]);

    const handleMinChange = (e) => {
        const newValue = Math.min(parseInt(e.target.value), value[1]);
        setValue([newValue, value[1]]);
        onChange([newValue, value[1]]);
    };

    const handleMaxChange = (e) => {
        const newValue = Math.max(parseInt(e.target.value), value[0]);
        setValue([value[0], newValue]);
        onChange([value[0], newValue]);
    };

    return (
        <div className={styles.sliderRange}>
            <div className={styles.sliderTrack} style={{ '--value1': value[0], '--value2': value[1], '--max': max }}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value[0]}
                    onChange={handleMinChange}
                    className={styles.sliderThumb}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value[1]}
                    onChange={handleMaxChange}
                    className={styles.sliderThumb}
                    style={{
                        marginLeft: '-3px',
                    }}
                />
            </div>
            <div className={styles.sliderValues} style={{
                marginTop: '10px',
            }}>
                <span>+ de {value[0]}€</span>
                <span>- de {value[1]}€</span>
            </div>
        </div>
    );
}
