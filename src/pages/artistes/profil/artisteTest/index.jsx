import Navbar from "@/components/ui/navbar/Navbar";

import ArtistProfilAvatar from "@/components/artist/profile/avatar/ArtistProfileAvatar";
import ArtistProfileSocial from "@/components/artist/profile/social/ArtistProfileSocial";

import ArtistProfileHead from "@/components/artist/profile/ArtistProfileHead";
import ArtistProfilSTD from "@/components/artist/profile/savethedate/ArtistProfileSTD";
import ArtistProfileBio from "@/components/artist/profile/bio/ArtistProfileBio";
import Picto from "@/components/ui/picto/Picto";
import Footer from "@/components/ui/footer/Footer";
import ArtistProfileExpo from "@/components/artist/profile/expo/ArtistProfileExpo";
import ArtistProfilePortrait from "@/components/artist/profile/portrait/ArtistProfilePortrait";

import styles from './Index.module.scss';

export default function artisteTest() {

    const stdFakeList = [
        {
            title: "Titre de test 1",
            photoURL: "https://firebasestorage.googleapis.com/v0/b/dp-gallery-37d61.appspot.com/o/10%2Forlinski-banner.jpg?alt=media&token=2a7e788e-bc33-4b3f-94d2-2a7196a6b2f6",
            photoDescription: "Photo de richard orlinski",
            description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.\n" +
                "\n" +
                "Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.\n" +
                "\n" +
                "On sait depuis longtemps que travailler avec du texte lisible et contenant longtemps que travailler avec du texte lisible et contenantlongtemps que travailler avec du texte lisible et contenantlongtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte.",
            date: "2021-05-05",
        },
        {
            title: "Titre de test 2",
            photoURL: "https://firebasestorage.googleapis.com/v0/b/dp-gallery-37d61.appspot.com/o/10%2Forlinski-banner.jpg?alt=media&token=2a7e788e-bc33-4b3f-94d2-2a7196a6b2f6",
            photoDescription: "Photo de richard orlinski",
            description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.\n" +
                "\n" +
                "Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.\n" +
                "\n" +
                "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte.",
            date: "2021-05-06",
        },
    ]

    const fakeTags = [
        {
            name: "Sculpture",
        },
        {
            name: "Peinture",
        },
        {
            name: "Photographie",
        },
        {
            name: "Dessin",
        }
    ]

    const fakeQuestion = [
        {
            question: "Si j'étais un animal, je serai",
            answer: "un lion",
        },
        {
            question: "Si j'étais une plante ou une fleur je serai",
            answer: "une tulipe",
        },
        {
            question: "Si j'étais un objet je serai",
            answer: "un stylo",
        },
        {
            question: "Si j'étais un film je serai",
            answer: "un film",
        },
        {
            question: "Si j'étais un animal, je serai",
            answer: "un lion",
        },
        {
            question: "Si j'étais une plante ou une fleur je serai",
            answer: "une tulipe",
        },
        {
            question: "Si j'étais un objet je serai",
            answer: "un stylo",
        },
        {
            question: "Si j'étais un film je serai",
            answer: "un film",
        },
    ]

    const fakeExpos = [
        {
            year: 2023,
            content: [
                {
                    name: "Nom de l'exposition 1",
                    location: "Paris (FR)",
                },
                {
                    name: "Nom de l'exposition 2",
                    location: "Paris (FR)",
                },
                {
                    name: "Nom de l'exposition 3",
                    location: "Paris (FR)",
                },
            ]
        },
        {
            year: 2022,
            content: [
                {
                    name: "Nom de l'exposition 1",
                    location: "Paris (FR)",
                },
                {
                    name: "Nom de l'exposition 2",
                    location: "Paris (FR)",
                },
                {
                    name: "Nom de l'exposition 3",
                    location: "Paris (FR)",
                },
                {
                    name: "Nom de l'exposition 4",
                    location: "Paris (FR)",
                }
            ]
        },
        {
            year: 2021,
            content: [
                {
                    name: "Nom de l'exposition 1",
                    location: "Paris (FR)",
                },
                {
                    name: "Nom de l'exposition 2",
                    location: "Paris (FR)",
                },
                {
                    name: "Nom de l'exposition 3",
                    location: "Paris (FR)",
                },
                {
                    name: "Nom de l'exposition 4",
                    location: "Paris (FR)",
                },
                {
                    name: "Nom de l'exposition 1",
                    location: "Paris (FR)",
                },
                {
                    name: "Nom de l'exposition 2",
                    location: "Paris (FR)",
                },
                {
                    name: "Nom de l'exposition 3",
                    location: "Paris (FR)",
                },
                {
                    name: "Nom de l'exposition 4",
                    location: "Paris (FR)",
                }
            ]
        }
    ]

    return (
        <main>
            <Navbar/>
            <div className={styles.main}>
                <section className={styles.artistPart}>
                    <div className={styles.artist}>
                        <div>
                            <ArtistProfilAvatar
                                imgSrc={"/assets/img/artistes/levalet.jpg"}
                                descImg={"Avatar de Richard Orlinski"}
                            />
                        </div>
                        <div>
                            <ArtistProfileSocial
                                facebook={"#"}
                                instagram={"#"}
                                linkedin={"#"}
                                fullName={"Levalet"}
                                website={"#"}
                                tags={fakeTags}
                            />
                        </div>
                    </div>
                    <div className={styles.stdPart}>
                        {/* Save the date */}
                        <ArtistProfileHead
                            title={"Save the date"}
                        />
                        <ArtistProfilSTD
                            stdList={stdFakeList}
                        />
                    </div>
                </section>
                <section className={styles.bioPart}>
                    <div>
                        {/* Biographie */}
                        <ArtistProfileHead
                            title={"Biographie"}
                        />
                        <ArtistProfileBio
                            content={"Charles Leval, alias Levalet, est né en 1988 à Epinal. Il grandit en Guadeloupe où il découvre la culture urbaine et les arts plastique. A 13 ans, il commence à peindre sur les murs de l’île. De retour en métropole à 17 ans, il étudie les arts visuels à Strasbourg. Il pratique le théâtre, touche à l’audiovisuel, à la photographie, à la sculpture, la peinture avant de se spécialiser dans les arts plastiques. "
                                +
                                "Hors les murs, son talent se décline au coeur des rues de Paris, dès 2012. « C’est là que j’ai véritablement commencé mon travail de dessin de rue, inspiré par l’architecture et par le sentiment de liberté qui se dégage de la capitale », dit-il. Son entrée dans le street art résulte davantage d’une transposition de sa passion pour le théâtre, l’image, le dessin et les installations dans la rue que par la fibre graffiti. Aujourd’hui, ses collages pourtant éphémères, vivent plus longtemps dans le 13è arrondissement de Paris là où Levalet réside. « Je peux coller en toute impunité, mes collages ne sont pas effacés par les services municipaux car la mairie mène une vraie politique d’inclusion des arts urbains dans l’identité du quartier », explique-t-il.\n" +
                                "\n" +
                                "Des installations en interactions avec la rue\n" +
                                "Ses installations mettent en scène des personnages dessinés à l’encre de chine, souvent en taille réelle, collés sur les murs au sein d’un environnement propice au dialogue entre l’art, l’architecture et le public. Cette interaction entre les installations et l’architecture crée des situations drôles, parfois totalement absurdes qui amusent le spectateur. Et provoque une sensation d’illusion totale pour le passant. Une sorte de miroir du quotidien, de mise en abyme curieuse et légère." +
                                "Levalet travaille ses dessins à partir de photos. Ses personnages qu’il utilise sont parfois des proches, des autoportraits ou des modèles qu’il fait poser spécialement. Quand il trouve le lieu idéal où s’exprimer, il le prend en photo, le mesure, utilise les fissures apparentes, les tâches, les mobiliers urbains pour créer une installation sur-mesure et unique. « Les cours d’eau offrent toujours des éléments d’architecture et des espaces qui semblent totalement étrangers au quotidien d’une mégalopole comme Paris », indique Levalet. « Cela m’inspire des situations surréalistes »." +
                                "En noir et blanc, parfois rehaussés d’un trait de couleur, les dessins de Levalet prennent vie au détour des rues ou des lieux fréquentés. Comme ces bouteilles de vins en équilibre sur un rebord mural du 2è arrondissement dans « Celle de trop », ou ces fontaines à eau détournées dans le 11è arrondissement, ou encore le « Minotaure » à tête de boeuf dans le 4è arrondissement.\n" +
                                "A chaque fois, Levalet utilise ces statues, ou d’autres éléments de décor de l’architecture, pour les détourner avec délectation." +
                                "Ces installations utilisent ainsi le décor naturel ou parfois, Levalet rajoute un objet pour que le regard du spectateur percute davantage. Un millet fixé au mur, s’accroche à la main d’un personnage dessiné et collé qui s’apprête à détruire ses téléviseurs et ordinateurs empilés dans l’oeuvre intitulée « Service après-vente ». Ou encore, une cannette de soda pliée et jetée sous les feux des caméras et micros de télévision de personnages factices et éphémères. « J’imagine mes installations directement pour le lieu que j’ai choisi, afin que la juxtaposition d’un élément qui appartient au réel, comme un lampadaire par exemple, et d’un élément représenté, comme un personnage suspendu, crée une certaine ambiguïté visuelle qui confond deux niveaux de réalité », explique-t-il." +
                                ""}
                        />
                    </div>
                </section>
                <section className={styles.videoBlock}>
                    <video
                        src={"https://firebasestorage.googleapis.com/v0/b/dp-gallery-37d61.appspot.com/o/10%2FLevalet%20%20odyss%C3%A9e%20artistique.mp4?alt=media&token=d1b94160-8eaa-4f77-b2bb-c9afe5e31a4b"}
                        typeof={"video/mp4"}
                        autoPlay={true}
                    />
                </section>
                <section className={styles.expoPrice}>
                    <div>
                        <ArtistProfileHead
                            title={"Expositions"}
                        />
                        <ArtistProfileExpo
                            expositions={fakeExpos}
                        />
                    </div>
                    <div>
                        <ArtistProfileHead
                            title={"Récompenses"}
                        />
                    </div>
                </section>
                <div>
                    <ArtistProfilePortrait/>
                </div>
            </div>
            <Picto/>
            <Footer/>
        </main>
    )
}