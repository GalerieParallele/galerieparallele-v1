import Image from "next/image";

import styles from './DashboardArtisteEditOeuvreCard.module.scss';
import {MdDelete, MdEdit} from "react-icons/md";
import {FaEye} from "react-icons/fa";

export default function DashboardArtisteEditOeuvreCard({oeuvre}) {

    return (
        <div className={styles.main}>
            <Image
                src={"https://picsum.photos/200/300"}
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
           <div className={styles.oeuvreName}>
               <div>
                   <h4>{oeuvre.name}</h4>
               </div>
           </div>
        </div>
    )

}