import {useRouter} from "next/router";

import ROUTES from "@/constants/ROUTES";

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import Select from "react-select";
import Button from "@/components/ui/button/Button";

import {useEffect, useState} from "react";
import {IoIosRefresh} from "react-icons/io";

import styles from './Index.module.scss';
import DashboardArtisteEditOeuvresList
    from "@/components/dashboard/artistes/edit/oeuvres/DashboardArtisteEditOeuvresList";
import useArtistsStore from "@/stores/artistsStore";

export default function DashboardArtisteEditOeuvres() {

    const router = useRouter();

    const {
        artist,
        getArtistById,
        loading
    } = useArtistsStore();

    const [artisteId, setArtisteId] = useState(null);

    useEffect(() => {

        const routerId = router.query.id;

        if (routerId && /^\d+$/.test(routerId)) {

            setArtisteId(routerId);
        }

    }, [router, router.query.id]);

    /**
     * Permet de récupérer les informations de l'artiste
     */
    useEffect(() => {
        if (artisteId) {
            getArtistById(artisteId);
        }
    }, [artisteId, getArtistById])

    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.ARTISTES.EDIT.HOME(artisteId)}
            />
            <div className={styles.searchSpace}>
                <div className={styles.searchBar}>
                    <Select
                        placeholder={"Rechercher une oeuvre"}
                        closeMenuOnSelect={true}
                        defaultValue={[]}
                        isMulti={false}
                        isClearable
                        // options={selectOptions}
                        // onChange={setCurrentArtistSearch}
                        // value={currentArtistSearch}
                        // isLoading={artistLoading}
                        // isDisabled={artistLoading}
                    />
                </div>
                <Button
                    text={"Créer une oeuvre"}
                    onClick={() => router.push(ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.NEW(artisteId))}
                />
                <Button
                    text={<IoIosRefresh/>}
                    onClick={() => {
                        // TODO : Ajouter un bouton de rechargement des artistes
                    }}
                />
            </div>
            <div className={styles.content}>
                {
                    artist && artist.oeuvre.length > 0 ? (
                        <DashboardArtisteEditOeuvresList
                            artist={artist}
                        />
                    ) : (
                        <h3>Cet artiste ne possède pas d&apos;oeuvre enregistrée sur le site</h3>
                    )
                }

            </div>
        </div>
    );
}