import Button from "@/components/items/button/Button";

import styles from "./FooterArtistContact.module.scss";

export default function FooterArtistContact() {
    return (
        <div className={styles.main}>
            <h4>Envie d&apos;exposer ?</h4>
            <p>Vous souhaitez exposer dans galeries ?</p>
            <p>Contactez nos équipes dès maintenant.</p>
            <Button
                isWhite
                text="Demander à exposer"
            />
        </div>
    )
}