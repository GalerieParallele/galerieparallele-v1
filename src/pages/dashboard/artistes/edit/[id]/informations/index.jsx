import styles from './Index.module.scss';
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import ROUTES from "@/constants/ROUTES";
import Button from "@/components/ui/button/Button";
import useArtistsStore from "@/stores/artistsStore";
import useUpdateArtistInformations from "@/stores/useUpdateArtistInformations";
import IconInput from "@/components/ui/iconinput/IconInput";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import {MdEmail, MdPassword} from "react-icons/md";
import {IoHome} from "react-icons/io5";
import {handleGeneratePassword} from "@/constants/Util";
import {RxAvatar} from "react-icons/rx";
import {BsBuildingsFill, BsFillFileEarmarkPersonFill, BsTelephoneFill} from "react-icons/bs";
import {FaFlag} from "react-icons/fa";
import Select from "react-select";
import sectionStyles from "@/components/dashboard/items/sections/DashboardSectionItem.module.scss";
import {GrTextAlignCenter} from "react-icons/gr";
import Editor from "@/components/ui/Editor";
import {AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiOutlineFieldNumber} from "react-icons/ai";
import {FaEarthAfrica} from "react-icons/fa6";
import Switch from "react-switch";
import Skeleton from "@/components/ui/Skeleton";
import {Toast} from "@/constants/ToastConfig";


export default function DashboardArtisteEditInformations() {

    const router = useRouter();

    const {
        formData,
        updateFormData,
        resetFormData
    } = useUpdateArtistInformations();

    const {
        artist,
        getArtistById,
        loading
    } = useArtistsStore();

    const [artisteId, setArtisteId] = useState(null);

    const [countries, setCountries] = useState([]);
    const [countriesLoading, setCountriesLoading] = useState(true);

    const [avatarFile, setAvatarFile] = useState(null);
    const [nationality, setNationality] = useState(null);

    const handleSubmit = async () => {

        const userBody = formData.user;

        console.log(userBody);

        // Vérifier si user body est complètement undefined
        if (Object.keys(userBody).some(key => userBody[key] !== undefined)) {

            const res = await fetch(ROUTES.API.USERS.HOME, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: artist.user.id,
                    ...userBody
                })
            })

            const data = await res.json();

            if (res.ok) {
                Toast.fire({
                    icon: "success",
                    title: "Les informations de l'utilisateur ont bien été mises à jour"
                })
            } else {
                Toast.fire({
                    icon: "error",
                    title: data.message
                })
            }
        }
    }

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(response => response.json())
            .then(data => {
                setCountries(data);
                setCountriesLoading(false);
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    /**
     * Permet de rénitialiser le formulaire à chaque fois que l'on change de page
     */
    useEffect(() => {
        resetFormData();
    }, [resetFormData])

    /**
     * Permet de définir l'id de l'artiste à chaque fois que l'on change de page
     */
    useEffect(() => {

        const routerId = router.query.id;

        if (routerId && /^\d+$/.test(routerId)) {
            setArtisteId(parseInt(routerId));
        }
    }, [router, router.query.id])

    /**
     * Permet de récupérer les informations de l'artiste
     */
    useEffect(() => {
        if (artisteId) {
            getArtistById(artisteId);
        }
    }, [artisteId, getArtistById])

    useEffect(() => {
        if (artist)
            updateFormData("artist.private", artist.private)
    }, [artist, updateFormData])


    return (
        <div className={styles.main}>
            <DashboardNavbar
                returnURL={ROUTES.ADMIN.ARTISTES.EDIT.HOME(artisteId)}
            />
            <div className={styles.content}>
                {
                    loading || countriesLoading ? (
                        Array.from({length: 3}).map((_, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        width: "100%",
                                        height: "70px",
                                    }}
                                >
                                    <Skeleton/>
                                </div>
                            )
                        })
                    ) : (
                        <>
                            <div className={styles.topSpace}>
                                <Button
                                    text={"Enregistrer"}
                                    type={"submit"}
                                    onClick={handleSubmit}
                                />
                            </div>
                            <DashboardSectionItem
                                sectionName={"Informations Utilisateur"}
                                description={"Ces informations ne seront pas visibles du grand public"}
                            >
                                <IconInput
                                    label={"E-mail"}
                                    type={"email"}
                                    IconComponent={MdEmail}
                                    placeholder={artist && artist.user && artist.user.email ? artist.user.email : "Ex: example@mail.com"}
                                    onChange={(e) => updateFormData("user.email", e.target.value === "" ? undefined : e.target.value)}
                                    name={"user.email"}
                                    value={formData && formData.user && formData.user.email}
                                    disabled={loading}
                                    autoComplete={"email"}
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "flex-end",
                                        width: "100%",
                                        gap: "1rem"
                                    }}>
                                    <div style={{
                                        width: "100%",
                                    }}>
                                        <IconInput
                                            label={"Mot de passe"}
                                            type={"password"}
                                            IconComponent={MdPassword}
                                            placeholder={"Ex: eO8*!Klo"}
                                            onChange={(e) => updateFormData("user.password", e.target.value === "" ? undefined : e.target.value)}
                                            name={"user.password"}
                                            value={formData && formData.user && formData.user.password}
                                            disabled={loading}
                                            autoComplete={"current-password"}
                                        />
                                    </div>
                                    <div>
                                        <Button

                                            text={"Générer"}
                                            onClick={() => {
                                                updateFormData("user.password", handleGeneratePassword())
                                            }}
                                        />
                                    </div>
                                </div>
                                <IconInput
                                    label={"Avatar"}
                                    type={"file"}
                                    // file by formdata file or artist urlavatar
                                    file={avatarFile ? avatarFile : artist && artist.user && artist.user.avatarURL ? artist.user.avatarURL : '/assets/img/avatar.png'}
                                    fileText={`Cliquez ici pour ${artist && artist.user && artist.user.avatarURL ? "modifier" : "ajouter"} l'avatar`}
                                    IconComponent={RxAvatar}
                                    multiple={false}
                                    onChange={(e) => {
                                        console.log(e.target.files);
                                        setAvatarFile(URL.createObjectURL(e.target.files[0]));
                                        updateFormData("user.avatarURL", e.target.files[0]);
                                    }}
                                    name={"user.avatarURL"}
                                    accept={"image/*"}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Prénom"}
                                    type={"text"}
                                    IconComponent={BsFillFileEarmarkPersonFill}
                                    placeholder={artist && artist.user && artist.user.firstname ? artist.user.firstname : "Ex: Mathéo"}
                                    onChange={(e) => updateFormData("user.firstname", e.target.value === "" ? undefined : e.target.value)}
                                    name={"user.firstname"}
                                    value={formData && formData.user && formData.user.firstname}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Nom"}
                                    type={"text"}
                                    IconComponent={BsFillFileEarmarkPersonFill}
                                    placeholder={artist && artist.user && artist.user.lastname ? artist.user.lastname : "Ex: OLSEN"}
                                    onChange={(e) => updateFormData("user.lastname", e.target.value === "" ? undefined : e.target.value.toUpperCase())}
                                    name={"user.lastname"}
                                    value={formData && formData.user && formData.user.lastname}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Numéro de téléphone"}
                                    type={"tel"}
                                    IconComponent={BsTelephoneFill}
                                    placeholder={artist && artist.user && artist.user.phone ? artist.user.phone : "Ex: 0769141995"}
                                    onChange={(e) => updateFormData("user.phone", e.target.value === "" ? undefined : e.target.value)}
                                    name={"user.phone"}
                                    value={formData && formData.user && formData.user.phone}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Adresse"}
                                    type={"text"}
                                    IconComponent={IoHome}
                                    placeholder={artist && artist.user && artist.user.street ? artist.user.street : "Ex: 1 rue de Paris"}
                                    onChange={(e) => updateFormData("user.street", e.target.value === "" ? undefined : e.target.value)}
                                    name={"user.street"}
                                    value={formData && formData.user && formData.user.street}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Ville"}
                                    type={"text"}
                                    IconComponent={IoHome}
                                    placeholder={artist && artist.user && artist.user.city ? artist.user.city : "Ex: Paris"}
                                    onChange={(e) => updateFormData("user.city", e.target.value === "" ? undefined : e.target.value)}
                                    name={"user.city"}
                                    value={formData && formData.user && formData.user.city}
                                    disabled={loading}
                                />
                                <IconInput
                                    label={"Code postal"}
                                    type={"text"}
                                    IconComponent={IoHome}
                                    placeholder={artist && artist.user && artist.user.postalCode ? artist.user.postalCode : "Ex: 75000"}
                                    onChange={(e) => updateFormData("user.postalCode", e.target.value)}
                                    name={"user.postalCode"}
                                    value={formData && formData.user && formData.user.postalCode}
                                    disabled={loading}
                                />
                            </DashboardSectionItem>
                            <DashboardSectionItem
                                sectionName={"Informations Artiste"}
                            >
                                <IconInput
                                    label={"Nom d'artiste"}
                                    type={"text"}
                                    IconComponent={BsFillFileEarmarkPersonFill}
                                    placeholder={artist && artist.pseudo ? artist.pseudo : "Ex: Artik_Beat"}
                                    value={formData && formData.artist && formData.artist.pseudo}
                                    name={"artist.pseudo"}
                                    onChange={(e) => updateFormData("artist.pseudo", e.target.value === "" ? undefined : e.target.value)}
                                />
                                <div className={sectionStyles.specialSection}>
                                    <div className={sectionStyles.specialSectionHead}>
                                <span>
                                    <FaFlag/>
                                </span>
                                        <div>
                                            <p>Nationalité(s)</p>
                                        </div>
                                    </div>
                                    <Select
                                        placeholder={artist ? artist.nationality : "Selectionnez une nationalité"}
                                        closeMenuOnSelect={true}
                                        defaultValue={[]}
                                        isMulti={false}
                                        name={"artist.nationality"}
                                        isClearable
                                        value={nationality}
                                        options={
                                            countries.map((country) => {
                                                return {
                                                    value: country.translations.fra.common,
                                                    label: country.translations.fra.common
                                                }
                                            })}
                                        animate={true}
                                        isLoading={countriesLoading}
                                        isDisabled={countriesLoading}
                                        onChange={(selectedOption) => {
                                            setNationality(selectedOption)
                                            updateFormData("artist.nationality", selectedOption ? selectedOption.value : undefined)
                                        }}
                                    />
                                </div>
                                <div className={sectionStyles.specialSection}>
                                    <div className={sectionStyles.specialSectionHead}>
                                        <span>
                                            <GrTextAlignCenter/>
                                        </span>
                                        <div>
                                            <p>Biographie</p>
                                        </div>
                                    </div>
                                    <Editor
                                        defaultContent={artist && artist.bio ? artist.bio : ""}
                                        onEditorChange={(content) => {
                                            updateFormData("artist.bio", content)
                                        }
                                        }
                                    />
                                </div>
                                <IconInput
                                    label={"Instagram"}
                                    type={"text"}
                                    IconComponent={AiFillInstagram}
                                    placeholder={artist && artist.instagram ? artist.instagram : "Ex: https://www.instagram.com/..."}
                                    value={formData && formData.artist && formData.artist.instagram}
                                    name={"artist.instagram"}
                                    onChange={(e) => updateFormData("artist.instagram", e.target.value === "" ? undefined : e.target.value)}
                                />
                                <IconInput
                                    label={"Facebook"}
                                    type={"text"}
                                    IconComponent={AiFillFacebook}
                                    placeholder={artist && artist.facebook ? artist.facebook : "Ex: https://www.facebook.com/..."}
                                    value={formData && formData.artist && formData.artist.facebook}
                                    name={"artist.facebook"}
                                    onChange={(e) => updateFormData("artist.facebook", e.target.value === "" ? undefined : e.target.value)}
                                />
                                <IconInput
                                    label={"LinkedIn"}
                                    type={"text"}
                                    IconComponent={AiFillLinkedin}
                                    placeholder={artist && artist.linkedin ? artist.linkedin : "Ex: https://www.linkedin.com/..."}
                                    value={formData && formData.artist && formData.artist.linkedin}
                                    name={"artist.linkedin"}
                                    onChange={(e) => updateFormData("artist.linkedin", e.target.value === "" ? undefined : e.target.value)}
                                />
                                <IconInput
                                    label={"Site web"}
                                    type={"text"}
                                    IconComponent={FaEarthAfrica}
                                    placeholder={artist && artist.website ? artist.website : "Ex: https://matheo-olsen.fr"}
                                    value={formData && formData.artist && formData.artist.website}
                                    name={"artist.website"}
                                    onChange={(e) => updateFormData("artist.website", e.target.value === "" ? undefined : e.target.value)}
                                />
                                <div className={sectionStyles.specialSection}>
                                    <div className={sectionStyles.specialSectionHead}>
                                <span>
                                    <GrTextAlignCenter/>
                                </span>
                                        <div>
                                            <p>Visibilité</p>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            gap: "1rem"
                                        }}
                                    >
                            <span
                                style={{
                                    color: formData && formData.artist && formData.artist.private ? "var(--light-gray)" : "var(--black)",
                                }}
                            >
                                Public
                            </span>
                                        <Switch
                                            onChange={(checked) => {
                                                updateFormData("artist.private", checked)
                                            }}
                                            checked={formData && formData.artist && formData.artist.private}
                                            onColor={"#070707"}
                                            offColor={"#070707"}
                                            checkedIcon={false}
                                            uncheckedIcon={false}
                                        />
                                        <span
                                            style={{
                                                color: formData && formData.artist && formData.artist.private ? "var(--black)" : "var(--light-gray)",
                                            }}
                                        >
                                Privé{" "}{formData && formData.artist && formData.artist.private && <span
                                            style={{color: 'var(--red)'}}>( = uniquement visible par le staff de la galerie)</span>}
                            </span>
                                    </div>
                                </div>
                            </DashboardSectionItem>
                            <DashboardSectionItem
                                sectionName={"Informations Juridique"}
                                description={"Ces informations ne seront pas visibles du grand public"}
                            >
                                <IconInput
                                    label={"Nom de société"}
                                    type={"text"}
                                    IconComponent={BsBuildingsFill}
                                    placeholder={artist && artist.legalInformation && artist.legalInformation.societe ? artist.legalInformation.societe : "Ex: GalerieParallele"}
                                    name={"legal.societe"}
                                    value={formData && formData.artist && formData.artist.legalInformation && formData.artist.legalInformation.legalInformation && formData.artist.legalInformation.legalInformation.societe}
                                    onChange={(e) => updateFormData("artist.legalInformation.legalInformation.societe", e.target.value === "" ? undefined : e.target.value)}
                                    required
                                />
                                <IconInput
                                    label={"Numéro de voie"}
                                    type={"text"}
                                    IconComponent={IoHome}
                                    placeholder={artist && artist.legalInformation && artist.legalInformation.adrNumVoie ? artist.legalInformation.adrNumVoie : "Ex: 1"}
                                    name={"legal.adrNumVoie"}
                                    value={formData.artist.legalInformation.legalInformation.adrNumVoie}
                                    onChange={(e) => updateFormData("artist.legalInformation.legalInformation.adrNumVoie", e.target.value === "" ? undefined : e.target.value)}
                                    required
                                />
                                <IconInput
                                    label={"Nom de la voie"}
                                    type={"text"}
                                    IconComponent={IoHome}
                                    placeholder={formData.artist.legalInformation.legalInformation.adrRue ? formData.artist.legalInformation.legalInformation.adrRue : "Ex: Rue de Paris"}
                                    name={"legal.adrRue"}
                                    value={formData && formData.artist.legalInformation.legalInformation.adrRue}
                                    onChange={(e) => updateFormData("artist.legalInformation.legalInformation.adrRue", e.target.value === "" ? undefined : e.target.value)}
                                    required
                                />
                                <IconInput
                                    label={"Ville"}
                                    type={"text"}
                                    IconComponent={IoHome}
                                    placeholder={formData.artist.legalInformation.legalInformation.adrVille ? formData.artist.legalInformation.legalInformation.adrVille : "Ex: Paris"}
                                    name={"legal.adrVille"}
                                    value={formData.artist.legalInformation.legalInformation.adrVille}
                                    onChange={(e) => updateFormData("artist.legalInformation.legalInformation.adrVille", e.target.value === "" ? undefined : e.target.value)}
                                    required
                                />
                                <IconInput
                                    label={"Code postal"}
                                    type={"text"}
                                    IconComponent={IoHome}
                                    placeholder={formData.artist.legalInformation.legalInformation.adrCodePostal ? formData.artist.legalInformation.legalInformation.adrCodePostal : "Ex: 75000"}
                                    name={"legal.adrCodePostal"}
                                    value={formData.artist.legalInformation.legalInformation.adrCodePostal}
                                    onChange={(e) => updateFormData("artist.legalInformation.legalInformation.adrCodePostal", e.target.value === "" ? undefined : e.target.value)}
                                    required
                                />
                                <IconInput
                                    label={"Numéro de SIRET (non visible sur le site)"}
                                    type={"text"}
                                    IconComponent={AiOutlineFieldNumber}
                                    placeholder={artist && artist.legalInformation && artist.legalInformation.siret ? artist.legalInformation.siret : "Ex: 12345678912345"}
                                    name={"legal.siret"}
                                    value={formData.artist.legalInformation.legalInformation.siret}
                                    onChange={(e) => updateFormData("artist.legalInformation.legalInformation.siret", e.target.value === "" ? undefined : e.target.value)}
                                    required
                                />
                                <IconInput
                                    label={"Numéro de TVA (non visible sur le site)"}
                                    type={"text"}
                                    IconComponent={AiOutlineFieldNumber}
                                    placeholder={formData.artist.legalInformation.legalInformation.tva ? formData.artist.legalInformation.legalInformation.tva : "Ex: 12345678912345"}
                                    name={"legal.tva"}
                                    value={formData.artist.legalInformation.legalInformation.tva}
                                    onChange={(e) => updateFormData("artist.legalInformation.legalInformation.tva", e.target.value === "" ? undefined : e.target.value)}
                                    required
                                />
                                <IconInput
                                    label={"Numéro maison des artistes (non visible sur le site)"}
                                    type={"text"}
                                    IconComponent={AiOutlineFieldNumber}
                                    placeholder={formData.artist.legalInformation.legalInformation.numMaisonsDesArtistes ? formData.artist.legalInformation.legalInformation.numMaisonsDesArtistes : "Ex: 12345678912345"}
                                    name={"legal.numMaisonsDesArtistes"}
                                    value={formData.artist.legalInformation.legalInformation.numMaisonsDesArtistes}
                                    onChange={(e) => updateFormData("artist.legalInformation.legalInformation.numMaisonsDesArtistes", e.target.value === "" ? undefined : e.target.value)}
                                    required
                                />
                                <IconInput
                                    label={"Numéro de sécurité sociale (non visible sur le site)"}
                                    type={"text"}
                                    IconComponent={AiOutlineFieldNumber}
                                    placeholder={formData.artist.legalInformation.legalInformation.numSecuriteSociale ? formData.artist.legalInformation.legalInformation.numSecuriteSociale : "Ex: 12345678912345"}
                                    name={"legal.numSecuriteSociale"}
                                    value={formData.artist.legalInformation.legalInformation.numSecuriteSociale}
                                    onChange={(e) => updateFormData("artist.legalInformation.legalInformation.numSecuriteSociale", e.target.value === "" ? undefined : e.target.value)}
                                    required
                                />
                            </DashboardSectionItem>
                        </>
                    )
                }
            </div>
        </div>
    )
}