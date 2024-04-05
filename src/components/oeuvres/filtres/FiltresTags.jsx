import Skeleton from "@/components/ui/Skeleton";
import InitialFiltresItem from "@/components/oeuvres/filtres/InitialFiltresItem";

import styles from './FiltresTags.module.scss';
import useFiltersStore from "@/stores/oeuvresFIltersStore";

export default function FiltresTags({loading: oeuvreLoading, tags = []}) {

    const {filters, setFilter} = useFiltersStore();

    const handleChangeTag = (tag) => {
        if (filters.tags.includes(tag)) {
            setFilter('tags', filters.tags.filter(t => t !== tag))
        } else {
            setFilter('tags', [...filters.tags, tag])
        }
    }

    return (
        <InitialFiltresItem
            title={'Tag' + (!oeuvreLoading && tags && tags.length > 0 ? `s` : '')}
        >
            <div className={styles.tagsList}>
                {
                    oeuvreLoading ? (
                        Array.from({length: 20}, (_, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        gap: 5,
                                    }}
                                >
                                    <div style={{
                                        width: Math.floor(Math.random() * (120 - 50 + 1) + 50) + "px",
                                        height: "25px",
                                        overflow: "hidden",
                                        borderRadius: "20px",
                                    }}>
                                        <Skeleton/>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        tags.map((tag, index) => {
                            const id = `tag-${index}`; // Création d'un ID unique basé sur l'index
                            return (
                                <div key={id} className={styles.tagItem}>
                                    <input
                                        id={id}
                                        type="checkbox"
                                        className={styles.hiddenCheckbox}
                                        onChange={() => handleChangeTag(tag)}
                                        checked={filters.tags.includes(tag)}
                                    />
                                    <label htmlFor={id} className={styles.tagItem}>#{tag}</label>
                                </div>
                            );
                        })
                    )
                }
            </div>
        </InitialFiltresItem>
    )
}