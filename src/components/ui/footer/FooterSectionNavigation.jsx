import styles from "./FooterSectionNavigation.module.scss";

export default function FooterSectionNavigation({sectionName, children}) {
    return (
        <div className={styles.main}>
            <h5>{sectionName}</h5>
            <div className={styles.separator}/>
            {children}
        </div>
    )
}