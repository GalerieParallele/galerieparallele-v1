import Navbar from "@/components/ui/navbar/Navbar";

import styles from './Index.module.scss';

export default function OeuvresIndex() {

    return (
        <div className={styles.main}>
            <Navbar/>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.filter}>
                        <h2>Filtres</h2>
                        <div className={styles.separator}/>
                        <div>
                            <div className={styles.filterRow}>
                                <input type="checkbox"/>
                                <label>Peinture</label>
                            </div>
                            <div className={styles.filterRow}>
                                <input type="checkbox"/>
                                <label>Sculpture</label>
                            </div>
                            <div className={styles.filterRow}>
                                <input type="checkbox"/>
                                <label>Photographie</label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.filter}>
                        <h2>Tendances</h2>
                        <div className={styles.separator}/>
                        <div className={styles.tendancesSpace}>
                            <span className={styles.tendanceItem}>
                                #populaire
                            </span>
                            <span className={styles.tendanceItem}>
                                #test
                            </span>
                            <span className={styles.tendanceItem}>
                                #rookie
                            </span>
                            <span className={styles.tendanceItem}>
                                #street
                            </span>
                            <span className={styles.tendanceItem}>
                                #free
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>

                </div>
            </div>
        </div>
    )

}