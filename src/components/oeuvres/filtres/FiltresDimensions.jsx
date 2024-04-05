import InitialFiltresItem from "@/components/oeuvres/filtres/InitialFiltresItem";

import styles from "@/components/oeuvres/filtres/General.module.scss";
import SliderRange from "@/components/ui/SliderRange";
import useFiltersStore from "@/stores/oeuvresFIltersStore";

export default function FiltresDimensions() {

    const {setFilter, filters, initialState} = useFiltersStore();

    return (
        <InitialFiltresItem
            title={"Dimensions"}
        >
            <div className={styles.filtresList}>
                <div>
                    <h4
                        style={{marginBottom: '20px'}}
                    >Hauteur :</h4>
                    <SliderRange
                        min={initialState.heightRange[0]}
                        max={initialState.heightRange[1]}
                        symbol={'cm'}
                        filterKey={'heightRange'}
                        filterValue={filters.heightRange}
                    />
                </div>
                <div>
                    <h4
                        style={{marginBottom: '20px'}}
                    >Longueur :</h4>
                    <SliderRange
                        min={initialState.widthRange[0]}
                        max={initialState.widthRange[1]}
                        symbol={'cm'}
                        filterKey={'widthRange'}
                        filterValue={filters.widthRange}
                    />
                </div>
                <div>
                    <h4
                        style={{marginBottom: '20px'}}
                    >Profondeur :</h4>
                    <SliderRange
                        min={initialState.depthRange[0]}
                        max={initialState.depthRange[1]}
                        symbol={'cm'}
                        filterKey={'depthRange'}
                        filterValue={filters.depthRange}
                    />
                </div>
            </div>
        </InitialFiltresItem>
    )

}