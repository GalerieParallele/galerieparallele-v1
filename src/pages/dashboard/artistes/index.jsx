import styles from './Index.module.scss';
import {useArtists} from "@/hooks/useArtists";
import {useMemo, useState} from "react";
import DashboardArtisteCard from "@/components/dashboard/items/artistes/DashboardArtisteCard";
import LittleSpinner from "@/components/items/LittleSpinner";
import Error from "@/components/error/Error";
import Button from "@/components/items/button/Button";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import ROUTES from "@/constants/ROUTES";
import Select from "react-select";
import {useRouter} from "next/router";
import {IoIosRefresh} from "react-icons/io";

export default function DashboardArtistesIndex() {

    const router = useRouter();

    const {artists, artistLoading, error, reloadArtists} = useArtists();
    const [currentArtistSearch, setCurrentArtistSearch] = useState(null);

    const filteredArtists = useMemo(() => {
        return currentArtistSearch ? artists.filter(artist => artist.id === currentArtistSearch.value) : artists;
    }, [artists, currentArtistSearch]);

    const selectOptions = artists.map(artist =>{
        const displayName = artist.user.lastname + " " + artist.user.firstname + (artist.pseudo ? " (" + artist.pseudo + ")" : "");
        return {
            value: artist.id,
            label: displayName
        }
        }
    );

    const displayError = error && error.code !== 404;
    const noArtistsFound = !artistLoading && !filteredArtists.length;

    if (displayError) {
        return (
            <Error
                code={error.code}
                title={"Une erreur est survenue"}
                message={"Il semble qu'une erreur soit survenue lors de la récupération des artistes."}
            />
        );
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
                        isClearable
                        options={selectOptions}
                        onChange={setCurrentArtistSearch}
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
                    text={<IoIosRefresh/>}
                    onClick={reloadArtists}
                />
            </div>
            <div className={styles.content}>
                {artistLoading ? (
                    <LittleSpinner/>
                ) : noArtistsFound ? (
                    <h3>Aucun artiste trouvé</h3>
                ) : (
                    filteredArtists.map(artist => (
                        <DashboardArtisteCard artiste={artist} key={artist.id}/>
                    ))
                )}
            </div>
        </div>
    );
}
