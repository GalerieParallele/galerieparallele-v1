// Importez vos composants et l'utilitaire Prisma
import HeadReimsIndex from "@/components/reims/HeadReimsIndex";
import Navbar from "@/components/items/navbar/Navbar";
import SearchContainer from "@/components/reims/SearchContainer";
import {prisma} from "@/utils/PrismaUtil";

// Votre composant de page, qui reçoit les données en tant que props
export default function ReimsIndex({artists}) {
    // Ici, vous pouvez utiliser les données d'artistes récupérées par getServerSideProps
    return (
        <main>
            <Navbar/>
            <HeadReimsIndex/>
            <SearchContainer/>
            {
                artists?.map((artist) => (
                    <div key={artist.id}>
                        <h1>{artist.firstname} {artist.email}</h1>
                        <p>{artist.email}</p>
                    </div>
                ))
            }
        </main>
    );
}

export async function getServerSideProps(context) {

    const artists = await prisma.user.findMany();

    artists.map((artist) => {
        delete artist.password;
    });

    return {
        props: {artists},
    };
}
