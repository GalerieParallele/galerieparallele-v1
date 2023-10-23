import Navbar from "@/components/items/navbar/Navbar";

import ArtistProfilAvatar from "@/components/artist/profile/avatar/ArtistProfileAvatar";
import ArtistProfileSocial from "@/components/artist/profile/social/ArtistProfileSocial";

import styles from './Index.module.scss';
import ArtistProfileHead from "@/components/artist/profile/ArtistProfileHead";
import ArtistProfilSTD from "@/components/artist/profile/savethedate/ArtistProfileSTD";
import ArtistProfileBio from "@/components/artist/profile/bio/ArtistProfileBio";
import Picto from "@/components/items/picto/Picto";
import Footer from "@/components/items/footer/Footer";
import ArtistProfilePortait from "@/components/artist/profile/portrait/ArtistProfilePortait";
import ArtistProfileExpo from "@/components/artist/profile/expo/ArtistProfileExpo";

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
        {
            title: "Titre de test 3",
            photoURL: "https://firebasestorage.googleapis.com/v0/b/dp-gallery-37d61.appspot.com/o/10%2Forlinski-banner.jpg?alt=media&token=2a7e788e-bc33-4b3f-94d2-2a7196a6b2f6",
            photoDescription: "Photo de richard orlinski",
            description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.\n" +
                "\n" +
                "Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.\n" +
                "\n" +
                "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte.",
            date: "2021-05-07",
        },
        {
            title: "Titre de test 4",
            photoURL: "https://firebasestorage.googleapis.com/v0/b/dp-gallery-37d61.appspot.com/o/10%2Forlinski-banner.jpg?alt=media&token=2a7e788e-bc33-4b3f-94d2-2a7196a6b2f6",
            photoDescription: "Photo de richard orlinski",
            description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte.\n" +
                "\n" +
                "Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.\n" +
                "\n" +
                "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte.",
            date: "2021-05-07",
        }
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

        }
    ]

    return (
        <main>
            <Navbar/>
            <main className={styles.main}>
                <section className={styles.section}>
                    <div className={styles.artist}>
                        <div>
                            <ArtistProfilAvatar
                                imgSrc={"/assets/img/artistes/orlinski.jpg"}
                                descImg={"Avatar de Richard Orlinski"}
                            />
                        </div>
                        <div>
                            <ArtistProfileSocial
                                facebook={"#"}
                                instagram={"#"}
                                linkedin={"#"}
                                fullName={"Richard Orlinski"}
                                website={"#"}
                                tags={fakeTags}
                            />
                        </div>
                    </div>
                    <div>
                        {/* Save the date */}
                        <ArtistProfileHead
                            title={"Save the date"}
                        />
                        <ArtistProfilSTD
                            stdList={stdFakeList}
                        />
                    </div>
                </section>
                <section className={styles.section}>
                    <div>
                        {/* Biographie */}
                        <ArtistProfileHead
                            title={"Biographie"}
                        />
                        <ArtistProfileBio
                            content={"Plusieurs variations de Lorem Ipsum peuvent être trouvées ici ou là, mais la majeure partie d'entre elles a été altérée par l'addition d'humour ou de mots aléatoires qui ne ressemblent pas une seconde à du texte standard. Si vous voulez utiliser un passage du Lorem Ipsum, vous devez être sûr qu'il n'y a rien d'embarrassant caché dans le texte. Tous les générateurs de Lorem Ipsum sur Internet tendent à reproduire le même extrait sans fin, ce qui fait de lipsum.com le seul vrai générateur de Lorem Ipsum."}
                        />
                    </div>
                    <div>
                        {/* Expositions */}
                        <ArtistProfileHead
                            title={"Expositions"}
                        />
                        <div>
                            <ArtistProfileExpo
                                expositions={}
                            />
                        </div>
                    </div>
                </section>
                <div>
                    {/* Portrait chinois */}
                    <ArtistProfileHead
                        title={"Portrait chinois"}
                    />
                    <div>
                        <ArtistProfilePortait
                            questionsList={fakeQuestion}
                        />
                    </div>
                </div>
                <div>
                    {/* Oeuvres */}
                    <ArtistProfileHead
                        title={"Oeuvres"}
                    />
                </div>
            </main>
            <Picto/>
            <Footer/>
        </main>
    )
}