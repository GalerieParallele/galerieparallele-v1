import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";

import styles from './Index.module.scss';
import Select from "react-select";
import {useArtists} from "@/hooks/useArtists";
import {useEffect, useState} from "react";
import DashboardArtisteCard from "@/components/dashboard/items/artistes/DashboardArtisteCard";
import ROUTES from "@/constants/ROUTES";
import Button from "@/components/items/button/Button";
import {useRouter} from "next/router";

export default function DashboardArtistesIndex() {

    const router = useRouter();

    const {artists, artistLoading, error} = useArtists();


    const [artist, setArtist] = useState(null);

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
                        options={artists.map(artist => ({value: artist.id, label: artist.name}))}
                        onChange={(newValue) => {
                            setArtist(newValue);
                        }}
                        value={artist}
                        isLoading={artistLoading}
                        isDisabled={artistLoading}
                    />
                </div>
                <Button
                    text={"Créer un artiste"}
                    onClick={() => router.push(ROUTES.ADMIN.ARTISTES.NEW)}
                />
            </div>
            <div className={styles.content}>
                {/*{*/}
                {/*    artistLoading ? (*/}
                {/*        <LittleSpinner/>*/}
                {/*    ) : (*/}
                {/*        <DashboardArtistesTuilesList*/}
                {/*            artistes={artists}*/}
                {/*        />*/}
                {/*    )*/}
                {/*}*/}
                <DashboardArtisteCard
                    artiste={{
                        firstname: "Jean",
                        lastname: "Dupont",
                        pseudo: "Levaleeeeet"
                    }}
                />
            </div>
        </div>
    )
}