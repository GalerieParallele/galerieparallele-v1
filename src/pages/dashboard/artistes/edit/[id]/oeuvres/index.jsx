import {useRouter} from "next/router";

import ROUTES from "@/constants/ROUTES";

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import PageLoader from "@/components/items/PageLoader";
import Error from "@/components/error/Error";
import Select from "react-select";
import Button from "@/components/items/button/Button";

import {useEffect, useState} from "react";
import {IoIosRefresh} from "react-icons/io";

import styles from './Index.module.scss';

export default function DashboardArtisteEditOeuvres() {

    const router = useRouter();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [artisteId, setArtisteId] = useState(null);

    useEffect(() => {
        if (router.query.id && /^\d+$/.test(router.query.id)) {
            setArtisteId(router.query.id);
            setError(false);
        } else {
            setError(true);
        }
        setLoading(false);
    }, [router, router.query.id]);

    if (loading) {
        return <PageLoader/>;
    }

    if (error) {
        return <Error
            code={404}
            title={"Artiste introuvable"}
            message={"L'artiste avec l'identifiant \"" + router.query.id + "\" n'existe pas"}
        />;
    }

    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.HOME}
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
                    onClick={() => router.push(ROUTES.ADMIN.ARTISTES.NEW)}
                />
                <Button
                    text={<IoIosRefresh/>}
                    onClick={() => {
                        // TODO : Ajouter un bouton de rechargement des artistes
                    }}
                />
            </div>
            <div className={styles.content}>
                <p>test</p>
            </div>
        </div>
    );
}