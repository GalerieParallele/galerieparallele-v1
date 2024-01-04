import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";

import styles from './Index.module.scss';
import Select from "react-select";
import {useArtists} from "@/hooks/useArtists";
import {useState} from "react";
import DashboardArtisteCard from "@/components/dashboard/items/artistes/DashboardArtisteCard";

export default function DashboardArtistesIndex() {

    const {artists, artistLoading, error} = useArtists();

    const [artist, setArtist] = useState(null);

    return (
        <div className={styles.main}>
            <DashboardNavbar/>
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
                <DashboardArtisteCard
                    artiste={{
                        firstname: "Jean",
                        lastname: "Dupont",
                        pseudo: "Levaleeeeet"
                    }}
                />
                <DashboardArtisteCard
                    artiste={{
                        firstname: "Jean",
                        lastname: "Dupont",
                        pseudo: "Levaleeeeet"
                    }}
                />
                <DashboardArtisteCard
                    artiste={{
                        firstname: "Jean",
                        lastname: "Dupont",
                        pseudo: "Levaleeeeet"
                    }}
                />
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