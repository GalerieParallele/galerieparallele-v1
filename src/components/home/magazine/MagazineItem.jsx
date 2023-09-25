import styles from "./MagazineItem.module.scss";
import Image from "next/image";
import {AiFillRead} from "react-icons/ai";

export default function MagazineItem({title, content, date}) {
    return (
        <div className={styles.main}>
            <div className={styles.head}>
                <div className={styles.imgContainer}>
                    <Image
                        src={"https://picsum.photos/400/300"}
                        alt={"Photo de la cathédrale de reims"}
                        width={400}
                        height={300}
                        priority
                    />
                    <div className={styles.more}>
                        <div>
                            <AiFillRead/>
                        </div>
                        <div>
                            <p>Lire l&apos;article</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.date}>
                    <p>{date}</p>
                </div>
                <div className={styles.mainContent}>
                    <h4>{title}</h4>
                    <h5>{content}</h5>
                </div>
            </div>
        </div>
    )
}