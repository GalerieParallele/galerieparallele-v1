import DashboardArtisteEditOeuvreCard
    from "@/components/dashboard/artistes/edit/oeuvres/DashboardArtisteEditOeuvreCard";

import styles from './DashboardArtisteEditOeuvresList.module.scss';
import {useEffect} from "react";

export default function DashboardArtisteEditOeuvresList({oeuvres}) {

    return (
        <div className={styles.main}>
            {
                oeuvres && oeuvres.map((oeuvre, index) => (
                    <DashboardArtisteEditOeuvreCard
                        key={index}
                        oeuvre={oeuvre}
                    />
                ))
            }
        </div>
    )

}