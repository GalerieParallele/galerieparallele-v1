import Skeleton from "@/components/ui/Skeleton";
import InitialFiltresItem from "@/components/oeuvres/filtres/InitialFiltresItem";

import styles from './General.module.scss';
import colorsStyles from './FiltresCouleurs.module.scss';
import useFiltersStore from "@/stores/oeuvresFiltersStore";

export default function FiltresCouleurs({loading: oeuvreLoading, colors = []}) {

    const {filters, setFilter} = useFiltersStore();

    const handleChangeColor = (color) => {
        if (filters.colors.includes(color)) {
            setFilter('colors', filters.colors.filter(c => c !== color))
        } else {
            setFilter('colors', [...filters.colors, color])
        }
    }


    return (
        <InitialFiltresItem
            title={'Couleur' + (!oeuvreLoading && colors && colors.length > 0 ? `s` : '')}
        >
            <div className={styles.filtresList}>
                {
                    oeuvreLoading ? (
                        Array.from({length: 5}, (_, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        gap: 5,
                                    }}
                                >
                                    <div style={{
                                        width: "20px",
                                        height: "20px",
                                        overflow: "hidden",
                                    }}>
                                        <Skeleton/>
                                    </div>
                                    <div style={{
                                        width: "20px",
                                        height: "20px",
                                        overflow: "hidden",
                                        borderRadius: "50%",
                                    }}>
                                        <Skeleton/>
                                    </div>
                                    {/*random width min max*/}
                                    <div style={{
                                        width: Math.floor(Math.random() * (80 - 10 + 1) + 10) + "%",
                                        height: "20px",
                                        overflow: "hidden",
                                    }}>
                                        <Skeleton/>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        colors && colors.map((color, index) => {
                                return (
                                    <div className={colorsStyles.filtreCouleurRow}
                                         key={index}>
                                        <input
                                            type="checkbox"
                                            name={color.name}
                                            onChange={() => handleChangeColor(color.hexa)}
                                            checked={filters.colors.includes(color.hexa)}
                                        />
                                        <div style={{
                                            width: "20px",
                                            height: "20px",
                                            backgroundColor: color.hexa,
                                            borderRadius: "50%",
                                            margin: "0 5px",
                                            boxShadow: "var(--shadow)",
                                        }}/>
                                        <label htmlFor={color.name}>{color.name}</label>
                                    </div>
                                )
                            }
                        )
                    )
                }
            </div>
        </InitialFiltresItem>
    )
}