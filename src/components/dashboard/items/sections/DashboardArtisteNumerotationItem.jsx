import {useState} from "react";

import styles from './DashboardArtisteNumerotationItem.module.scss';

export default function DashboardArtisteNumerotationItem() {

    const [checked, setChecked] = useState(false);
    const [inputValue, setInputValue] = useState(2);

    return (
        <div className={styles.main}>
            <div className={styles.head}>
                <div>
                    <label form="oeuvreUnique">
                        Oeuvre unique
                    </label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="oeuvreUnique"
                        name="oeuvreUnique"
                        checked={checked}
                        onChange={() => {
                            if (checked) {
                                setInputValue(2);
                            }
                            setChecked(!checked);
                        }}
                    />
                </div>
            </div>
            {
                checked ? null : (
                    <div className={styles.inputNum}>
                        <p>{`Oeuvre numérotée et limitée à ${inputValue ? inputValue : 0} exemplaires`}</p>
                        <input
                            type="number"
                            min={1}
                            value={inputValue}
                            onChange={(e) => {
                                if (e.target.value == 1) {
                                    setChecked(true);
                                } else {
                                    setInputValue(e.target.value);
                                }
                            }}
                        />
                    </div>
                )
            }
        </div>
    )
}