import SliderRange from "@/components/ui/SliderRange";

import styles from './General.module.scss';
import useFiltersStore from "@/stores/oeuvresFIltersStore";

export default function FiltresPrix({min, max}) {

    const {setFilter, filters} = useFiltersStore();

    const steps = [
        [0, 100],
        [100, 500],
        [500, 50000]
    ]
    return (
        <div className={styles.filtresContainer}>
            <h4 className={styles.filtresTitle}>
                Prix
            </h4>
            <form className={styles.filtresList}>
                {
                    steps.map((step, index) => (
                        <div className={styles.filtreRow} key={index}>
                            <input
                                type="radio"
                                name={"peinture"}
                                   onClick={
                                () => setFilter('priceRange', step)
                            }/>
                            <label htmlFor="radio">{`Entre ${step[0]}€ et ${step[1]}€`}</label>
                        </div>
                    ))
                }
                <SliderRange
                    min={min}
                    max={max}
                    initialValue={[min, max]}
                    onChange={(value) => setFilter('priceRange', value)}
                    currentValue={filters.priceRange}
                />
            </form>
        </div>
    )
}