import Image from "next/image";

export default function DashboardArtisteEditOeuvreCard({oeuvre}) {

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <Image
                        src={oeuvre && oeuvre.images.length > 0  && oeuvre.images[0].url || "/assets/img/no-img.jpg"}
                        alt={"Oeuvre"}
                        width={200}
                        height={300}
                    />
                    <div className={styles.oeuvreActions}>
                        <button
                            className={styles.show}
                        >
                            <FaEye/>
                        </button>
                        <button
                            className={styles.edit}
                        >
                            <MdEdit/>
                        </button>
                        <button
                            className={styles.delete}
                        >
                            <MdDelete/>
                        </button>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.oeuvreName}>
                        <div>
                            <h4>{oeuvre.name}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)

}
import styles from './DashboardArtisteEditOeuvreCard.module.scss';
import {MdDelete, MdEdit} from "react-icons/md";

import {FaEye} from "react-icons/fa";
