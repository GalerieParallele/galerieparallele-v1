import styles from './ArtistProfileHead.module.scss';

export default function ArtistProfileHead({title}) {
    return (
        <div className={styles.main}>
            <h3>{title}</h3>
            <span className={styles.bottomLine} />
        </div>
    )
}