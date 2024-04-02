import styles from "./OeuvreFeatureItem.module.scss";

import {MdError} from "react-icons/md";

export default function OeuvreFeatureItem({
                                              Icon = MdError,
                                              title = "Titre indéfini",
                                              content = "Contenu indéfini",
                                              description
                                          }) {

    return (
        <div className={styles.main}>
            <span>
                {Icon && <Icon/>}
                <h5>{title}</h5>
                {
                    description && (
                        <>
                            <div className={styles.description}>
                                {description}
                            </div>
                        </>

                    )
                }
            </span>
            <p>{content}</p>
        </div>
    )


}