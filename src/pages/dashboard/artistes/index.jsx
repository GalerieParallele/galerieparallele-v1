import styles from './Index.module.scss';
import {useEffect, useMemo, useState} from "react";
import DashboardArtisteCard from "@/components/dashboard/items/artistes/DashboardArtisteCard";
import LittleSpinner from "@/components/ui/LittleSpinner";
import Button from "@/components/ui/button/Button";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import ROUTES from "@/constants/ROUTES";
import Select from "react-select";
import {useRouter} from "next/router";
import {IoIosRefresh} from "react-icons/io";
import useArtistsStore from "@/stores/artistsStore";
import {Toast} from "@/constants/ToastConfig";

export default function DashboardArtistesIndex(factory, deps) {

    const router = useRouter();

    const {
        artists,
        artistLoading,
        reloadArtists,
    } = useArtistsStore();

    const [currentArtistSearch, setCurrentArtistSearch] = useState(null);

    const filteredArtists = useMemo(() => {
        if (!currentArtistSearch) {
            return artists;
        }
        return artists.filter(artist => artist.id === currentArtistSearch.value);
    }, [artists, currentArtistSearch])

    useEffect(() => {
        reloadArtists()
            .catch(() => {
                Toast.fire({
                    icon: 'error',
                    title: 'Une erreur est survenue lors du chargement des artistes.'
                })
            })
    }, [currentArtistSearch, reloadArtists]);

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
                        options={artists.map(artist => {
                                const displayName = artist.user.lastname + " " + artist.user.firstname + (artist.pseudo ? " (" + artist.pseudo + ")" : "");
                                return {
                                    value: artist.id,
                                    label: displayName
                                }
                            }
                        )}
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
                ) : artists && artists.length === 0 ? (
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
