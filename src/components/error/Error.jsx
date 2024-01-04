import styles from './Error.module.scss';
import Image from "next/image";

export default function Error({code, title, message}) {
    return (
        <div className={styles.main}>
            <Image src={"/assets/img/back_error2.jpg"} alt={'Photo de montagnes'}
                   width={2000}
                   height={2000}
                   layout={"responsive"}
            />
            <div className={styles.filter}/>
            <div className={styles.box}>
                <h1>{code}</h1>
                <h2>{title}</h2>
                <p>{message}</p>
            </div>
        </div>
    )
}