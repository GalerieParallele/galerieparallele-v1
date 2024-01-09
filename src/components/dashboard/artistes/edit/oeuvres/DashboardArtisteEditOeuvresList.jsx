import DashboardArtisteEditOeuvreCard
    from "@/components/dashboard/artistes/edit/oeuvres/DashboardArtisteEditOeuvreCard";

import styles from './DashboardArtisteEditOeuvresList.module.scss';

export default function DashboardArtisteEditOeuvresList() {

    const fakeOeuvres = [
            {
                id: 1,
                name: "Oeuvre 1 avec un nom très long qui prend beaucoup de place"
            },
            {
                id: 2,
                name: "Oeuvre 2"
            },
            {
                id: 3,
                name: "Oeuvre 3"
            },
            {
                id: 4,
                name: "Oeuvre 4"
            },
            {
                id: 5,
                name: "Oeuvre 5"
            },
            {
                id: 6,
                name: "Oeuvre 6"
            },
            {
                id: 7,
                name: "Oeuvre 7"
            },
            {
                id: 8,
                name: "Oeuvre 8"
            },
            {
                id: 9,
                name: "Oeuvre 9"
            },
            {
                id: 10,
                name: "Oeuvre 10"
            },
        ];


    return (
        <div className={styles.main}>
            {
                fakeOeuvres.map((oeuvre, index) => (
                    <DashboardArtisteEditOeuvreCard
                        key={index}
                        oeuvre={oeuvre}
                    />
                ))
            }
        </div>
    )

}