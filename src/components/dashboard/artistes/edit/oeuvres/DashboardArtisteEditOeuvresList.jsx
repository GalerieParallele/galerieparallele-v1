import DashboardArtisteEditOeuvreCard
    from "@/components/dashboard/artistes/edit/oeuvres/DashboardArtisteEditOeuvreCard";

import styles from './DashboardArtisteEditOeuvresList.module.scss';
import {useEffect} from "react";

export default function DashboardArtisteEditOeuvresList({artist}) {

    const oeuvres = artist && artist.oeuvre ? artist.oeuvre : [];

    useEffect(() => {
        console.log(oeuvres)
    }, [oeuvres])

    return (
        <div className={styles.main}>
            {
                oeuvres.map((oeuvre, index) => (
                    <DashboardArtisteEditOeuvreCard
                        key={index}
                        oeuvre={oeuvre}
                        artist={artist}
                    />
                ))
            }
        </div>
    )

}