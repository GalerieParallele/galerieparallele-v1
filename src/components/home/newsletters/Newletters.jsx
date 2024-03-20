import {IoMdMail} from "react-icons/io";

import styles from "./Newletters.module.css";
import Button from "@/components/ui/button/Button";

export default function Newletters() {
    return (
        <main className={styles.main}>
            <div className={styles.top}>
                <h4>
                    Newletters
                </h4>
                <h5>Cum doloribus mollitia ab adipisci illum ut incidunt.</h5>
            </div>
            <div className={styles.bottom}>
                <span className={styles.icon}>
                    <IoMdMail/>
                </span>
                <input type="text" placeholder="Enter your email address"/>
                <Button text="Subscribe"/>
            </div>
        </main>
    )
}