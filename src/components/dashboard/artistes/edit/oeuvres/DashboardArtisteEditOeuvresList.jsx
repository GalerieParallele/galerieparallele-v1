import DashboardArtisteEditOeuvreCard
    from "@/components/dashboard/artistes/edit/oeuvres/DashboardArtisteEditOeuvreCard";

import styles from './DashboardArtisteEditOeuvresList.module.scss';

export default function DashboardArtisteEditOeuvresList({artist, onDelete}) {

    const oeuvres = artist && artist.oeuvre ? artist.oeuvre : [];

    return (
        <div className={styles.main}>
            {
                oeuvres.map((oeuvre, index) => (
                    <DashboardArtisteEditOeuvreCard
                        key={index}
                        oeuvre={oeuvre}
                        artist={artist}
                        onDelete={onDelete}
                    />
                ))
            }
        </div>
    )

}