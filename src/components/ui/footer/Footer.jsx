import FooterSocial from "@/components/ui/footer/FooterSocial";
import styles from "./Footer.module.scss";
import FooterPartenaires from "@/components/ui/footer/FooterPartenaires";
import FooterSocialLinks from "@/components/ui/footer/FooterSocialLinks";
import FooterMap from "@/components/ui/footer/FooterMap";
import FooterSectionNavigation from "@/components/ui/footer/FooterSectionNavigation";
import Link from "next/link";
import FooterArtistContact from "@/components/ui/footer/FooterArtistContact";
import FooterLegal from "@/components/ui/footer/FooterLegal";
import Confiance from "@/components/ui/confiance/Confiance";

const sectionsQuiSommesNous = {
    histoire: {
        link: "#",
        name: "Notre histoire"
    },
    vision: {
        link: "#",
        name: "Notre vision"
    },
    equipe: {
        link: "#",
        name: "Nos équipes"
    },
    projets: {
        link: "#",
        name: "Nos projets"
    },
    faq: {
        link: "#",
        name: "FAQ"
    },
    contact: {
        link: "#",
        name: "Contactez-nous"
    }
}

const sectionsServices = {
    guide: {
        link: "#",
        name: "Le guide des entreprises"
    },
    leasing: {
        link: "#",
        name: "Leasing d'oeuvres d'art"
    },
    studio: {
        link: "#",
        name: "Studio Parallèle"
    },
    location: {
        link: "#",
        name: "Location de salle & évènements privés"
    },
    defiscalisation: {
        link: "#",
        name: "Aide à la défiscalisation"
    },
    cadeau: {
        link: "#",
        name: "Carte cadeau"
    },
}

export default function Footer() {
    return (
        <>
            <Confiance/>
            <main className={styles.main}>
                <div>
                    <FooterSocial/>
                </div>
                <div className={styles.center}>
                    <div className={styles.centerLeft}>
                        <FooterSocialLinks/>
                        <FooterMap/>
                    </div>
                    <FooterSectionNavigation sectionName="Qui sommes-nous ?">
                        {Object.values(sectionsQuiSommesNous).map((section, index) => (
                            <Link
                                href={section.link}
                                key={index}>
                                {section.name}
                            </Link>
                        ))}
                    </FooterSectionNavigation>
                    <FooterSectionNavigation sectionName="Services">
                        {Object.values(sectionsServices).map((section, index) => (
                            <Link
                                href={section.link}
                                key={index}>
                                {section.name}
                            </Link>
                        ))}
                    </FooterSectionNavigation>
                    <div>
                        <FooterArtistContact/>
                    </div>
                </div>
                <div>
                    <FooterPartenaires/>
                </div>
                <div>
                    <FooterLegal/>
                </div>
            </main>
        </>
    );
}
