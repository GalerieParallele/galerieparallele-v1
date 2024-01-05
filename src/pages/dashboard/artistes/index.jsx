import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";

import styles from './Index.module.scss';
import Select from "react-select";
import {useArtists} from "@/hooks/useArtists";
import {useState} from "react";
import DashboardArtisteCard from "@/components/dashboard/items/artistes/DashboardArtisteCard";
import ROUTES from "@/constants/ROUTES";
import Button from "@/components/items/button/Button";
import {useRouter} from "next/router";
import LittleSpinner from "@/components/items/LittleSpinner";
import Error from "@/components/error/Error";

export default function DashboardArtistesIndex() {

    const router = useRouter();

    const {artists, artistLoading, error, reloadArtists} = useArtists();


    const [currentArtistSearch, setCurrentArtistSearch] = useState(null);

    if (error) {
        return <Error
            code={404}
            title={"Une erreur est survenue"}
            message={"Il semblerez qu'une erreur soit survenue lors de la récupération des artistes."}
        />
    }

    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.HOME}
            />
            <div className={styles.searchSpace}>
                <div className={styles.searchBar}>
                    <Select
                        placeholder={"Rechercher un artiste"}
                        closeMenuOnSelect={true}
                        defaultValue={[]}
                        isMulti={false}
                        options={artists ? artists.map(artist => ({value: artist.id, label: artist.name})) : []}
                        onChange={(newValue) => {
                            setCurrentArtistSearch(newValue);
                        }}
                        value={currentArtistSearch}
                        isLoading={artistLoading}
                        isDisabled={artistLoading}
                    />
                </div>
                <Button
                    text={"Créer un artiste"}
                    onClick={() => router.push(ROUTES.ADMIN.ARTISTES.NEW)}
                />
                <Button
                    text={"Actualiser"}
                    onClick={() => reloadArtists()}
                />
            </div>
            <div className={styles.content}>
                {
                    artistLoading ? (
                        <LittleSpinner/>
                    ) : (
                        artists && artists.length > 0 ?
                            (
                                <DashboardArtisteCard
                                    artiste={artists[0]}
                                />
                            ) : (
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "0.5rem",
                                }}>
                                    <h3>Aucun artiste trouvé</h3>
                                </div>
                            )
                    )
                }
            </div>
        </div>
    )
}