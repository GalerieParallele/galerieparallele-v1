import styles from './Error.module.scss';
import Image from "next/image";
import {useRouter} from "next/router";
import Button from "@/components/ui/button/Button";
import ROUTES from "@/constants/ROUTES";

export default function Error({code, title, message}) {

    const router = useRouter();

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
                <div style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    <Button
                        text={"Retour"}
                        onClick={() => router.back()}
                    />
                    <Button
                        text={"Accueil"}
                        onClick={() => router.push(ROUTES.HOME)}
                    />
                </div>
            </div>
        </div>
    )
}