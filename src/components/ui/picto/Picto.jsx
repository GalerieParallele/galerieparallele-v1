import React from "react";

import styles from "./Picto.module.css"
import PictoItem from "@/components/ui/picto/PictoItem";

export default function Picto() {
    return (
        <div className={styles.picto}>
            <PictoItem
                mediaURL={"/assets/img/pictos-infos/9.png"}
                title={"????"}
            />
            <PictoItem
                mediaURL={"/assets/img/pictos-infos/aidedefiscalisation.png"}
                title={"Aide à la défiscalisation"}
            />
            <PictoItem
                mediaURL={"/assets/img/pictos-infos/avotreservice.png"}
                title={"A votre service"}
            />
            <PictoItem
                mediaURL={"/assets/img/pictos-infos/largeselect.png"}
                title={"Large sélection"}
            />
            <PictoItem
                mediaURL={"/assets/img/pictos-infos/livraisoninter.png"}
                title={"Livraison à l'international"}
            />
            <PictoItem
                mediaURL={"/assets/img/pictos-infos/oeil expert.png"}
                title={"Un oeil expert"}
            />
            <PictoItem
                mediaURL={"/assets/img/pictos-infos/paiement sécurisé.png"}
                title={"Paiement sécurisé"}
            />
            <PictoItem
                mediaURL={"/assets/img/pictos-infos/projetcompletsurmesure.png"}
                title={"Projet complet et sur-mesure"}
            />
            <PictoItem
                mediaURL={"/assets/img/pictos-infos/specialisteb2b.png"}
                title={"Spécialiste B2B"}
            />
        </div>
    )
}