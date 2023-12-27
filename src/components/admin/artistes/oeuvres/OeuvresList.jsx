import styles from './OeuvresList.module.scss';
import OeuvreListItem from "@/components/admin/artistes/oeuvres/OeuvreListItem";

export default function OeuvresList({oeuvres}) {
    return (
        <div className={styles.main}>
            {oeuvres.map((oeuvre, index) => (
                <OeuvreListItem oeuvre={oeuvre} key={index}/>
            ))}
        </div>
    )
}