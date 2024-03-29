import styles from "./OeuvreFeatureItem.module.scss";

import {MdError} from "react-icons/md";

export default function OeuvreFeatureItem({Icon = MdError, title = "Titre indéfini", content = "Contenu indéfini"}) {

    return (
        <div className={styles.main}>
            <span>
                {Icon && <Icon/>}
                <h4>{title}</h4>
            </span>
            <p>{content}</p>
        </div>
    )


}