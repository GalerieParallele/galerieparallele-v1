import AdminNav from "@/components/admin/AdminNav";

import styles from "../../styles/pages/Admin.module.css"

export default function Admin({children}) {
    return (
        <main className={styles.main}>
            <div className={styles.left}>
                <AdminNav/>
            </div>
            <div className={styles.right}>
                {children}
            </div>
        </main>
    )
}