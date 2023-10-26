import Admin from "@/components/admin/Admin";
import Button from "@/components/items/button/Button";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
    AiOutlineArrowLeft, AiOutlineColumnHeight, AiOutlineColumnWidth,
    AiOutlineFieldNumber
} from "react-icons/ai";
import ROUTES from "@/constants/ROUTES";
import React, {useState} from "react";
import {useRouter} from "next/router";

import makeAnimated from 'react-select/animated';

import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import styles from './Index.module.scss';
import IconInput from "@/components/items/iconinput/IconInput";
import {MdEmail, MdPassword} from "react-icons/md";
import {RxAvatar} from "react-icons/rx";
import {BsFillFileEarmarkPersonFill, BsHammer, BsTelephoneFill} from "react-icons/bs";
import ArtisteNewSectionItem from "@/components/admin/artistes/new/ArtisteNewSectionItem";
import {IoHome, IoTextOutline} from "react-icons/io5";
import {PiListNumbers, PiStool, PiTextIndentBold, PiUserRectangleBold} from "react-icons/pi";
import Editor from "@/components/items/Editor";
import {GrTextAlignCenter} from "react-icons/gr";
import {FaEarthAfrica} from "react-icons/fa6";
import Select from 'react-select';
import {BiGroup, BiImageAdd, BiLaugh, BiSolidGroup} from "react-icons/bi";
import {FiHash} from "react-icons/fi";
import {IoIosResize} from "react-icons/io";
import ArtisteNumerotationItem from "@/components/admin/artistes/new/ArtisteNumerotationItem";
import {FaHandHoldingHeart, FaSignature} from "react-icons/fa";

export default function ArtisteAdminNew() {

    const router = useRouter();

    const animatedComponents = makeAnimated();

    const [formData, setFormData] = useState({
        email: '',
        oeuvreArtist: [],
        oeuvreUnknownArtist: [],
        oeuvreType: [],
        tags: [],
    });

    const handleChangeArtist = (item) => {
        setFormData({
            ...formData,
            oeuvreArtist: item
        });
    };

    const handleChangeUnknownArtist = (item) => {
        setFormData({
            ...formData,
            oeuvreUnknownArtist: item
        });
    };

    const handleChangeOeurveType = (item) => {
        setFormData({
            ...formData,
            oeuvreType: item
        });
    };

    const handleChangeTags = (item) => {
        setFormData({
            ...formData,
            tags: item
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        console.log(formData);
    };

    return (
        <Admin>
            <main className={adminStyles.main}>
                <div>
                    <Button
                        text={<AiOutlineArrowLeft/>}
                        onClick={() => router.push(ROUTES.ADMIN.ARTISTES.HOME)}
                    />
                </div>
                <div className={styles.main}>
                    <div className={styles.head}>
                        <h1>Artistes</h1>
                        <h3>Création d&apos;un nouvel artiste</h3>
                    </div>
                    <div className={styles.sectionList}>
                        <ArtisteNewSectionItem
                            sectionName={"Compte utilisateur"}
                        >
                            <IconInput
                                label={"E-mail"}
                                type={"email"}
                                IconComponent={MdEmail}
                                placeholder={"Ex: example@mail.com"}
                                onChange={handleChange}
                                name={"email"}
                                value={formData.email}
                            />
                            <IconInput
                                label={"Mot de passe"}
                                type={"password"}
                                IconComponent={MdPassword}
                                placeholder={"Ex: euI8k%$uYvg"}
                            />
                            <IconInput
                                label={"Avatar"}
                                type={"file"}
                                IconComponent={RxAvatar}
                            />
                            <IconInput
                                label={"Prénom"}
                                type={"text"}
                                IconComponent={BsFillFileEarmarkPersonFill}
                                placeholder={"Ex: Jean"}
                            />
                            <IconInput
                                label={"Nom"}
                                type={"text"}
                                IconComponent={BsFillFileEarmarkPersonFill}
                                placeholder={"Ex: Dupont"}
                            />
                            <IconInput
                                label={"Numéro de téléphone"}
                                type={"tel"}
                                IconComponent={BsTelephoneFill}
                                placeholder={"Ex: 0769141995"}
                            />
                            <IconInput
                                label={"Adresse"}
                                type={"text"}
                                IconComponent={IoHome}
                                placeholder={"Ex: 1 rue de la paix"}
                            />
                            <IconInput
                                label={"Ville"}
                                type={"text"}
                                IconComponent={IoHome}
                                placeholder={"Ex: Paris"}
                            />
                            <IconInput
                                label={"Code postal"}
                                type={"text"}
                                IconComponent={IoHome}
                                placeholder={"Ex: 75000"}
                            />
                        </ArtisteNewSectionItem>
                        <ArtisteNewSectionItem
                            sectionName={"Informations juridiques"}
                        >
                            <p>Prochainement...</p>
                        </ArtisteNewSectionItem>
                        <ArtisteNewSectionItem
                            sectionName={"Relations contractuelles"}
                        >
                            <p>Prochainement...</p>
                        </ArtisteNewSectionItem>
                        <ArtisteNewSectionItem
                            sectionName={"Informations artiste"}
                        >
                            <IconInput
                                label={"Numéro de SIRET (non visible sur le site)"}
                                type={"text"}
                                IconComponent={AiOutlineFieldNumber}
                                placeholder={"Ex: 12345678912345"}
                            />
                            <IconInput
                                label={"Numéro de TVA (non visible sur le site)"}
                                type={"text"}
                                IconComponent={AiOutlineFieldNumber}
                                placeholder={"Ex: 12345678912345"}
                            />
                            <IconInput
                                label={"Nom d'artiste"}
                                type={"text"}
                                IconComponent={BsFillFileEarmarkPersonFill}
                                placeholder={"Ex: M4TRIX"}
                            />
                            <IconInput
                                label={"Facebook"}
                                type={"text"}
                                IconComponent={AiFillFacebook}
                                placeholder={"Ex: https://www.facebook.com/..."}
                            />
                            <IconInput
                                label={"Instagram"}
                                type={"text"}
                                IconComponent={AiFillInstagram}
                                placeholder={"Ex: https://www.instagram.com/..."}
                            />
                            <IconInput
                                label={"LinkedIn"}
                                type={"text"}
                                IconComponent={AiFillLinkedin}
                                placeholder={"Ex: https://www.linkedin.com/..."}
                            />
                            <IconInput
                                label={"Site web"}
                                type={"text"}
                                IconComponent={FaEarthAfrica}
                                placeholder={"Ex: https://www.m4trix.com"}
                            />
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
                                    <span>
                                        <GrTextAlignCenter/>
                                    </span>
                                    <div>
                                        <p>Biographie</p>
                                    </div>
                                </div>
                                <Editor/>
                            </div>
                        </ArtisteNewSectionItem>
                        <ArtisteNewSectionItem
                            sectionName={"Illustrations"}
                        >
                            <IconInput
                                label={"Numéro de SIRET (non visible sur le site)"}
                                type={"text"}
                                IconComponent={AiOutlineFieldNumber}
                                placeholder={"Ex: 12345678912345"}
                            />
                            <IconInput
                                label={"Numéro de TVA (non visible sur le site)"}
                                type={"text"}
                                IconComponent={AiOutlineFieldNumber}
                                placeholder={"Ex: 12345678912345"}
                            />
                            <IconInput
                                label={"Nom d'artiste"}
                                type={"text"}
                                IconComponent={BsFillFileEarmarkPersonFill}
                                placeholder={"Ex: M4TRIX"}
                            />
                            <IconInput
                                label={"Facebook"}
                                type={"text"}
                                IconComponent={AiFillFacebook}
                                placeholder={"Ex: https://www.facebook.com/..."}
                            />
                            <IconInput
                                label={"Instagram"}
                                type={"text"}
                                IconComponent={AiFillInstagram}
                                placeholder={"Ex: https://www.instagram.com/..."}
                            />
                            <IconInput
                                label={"LinkedIn"}
                                type={"text"}
                                IconComponent={AiFillLinkedin}
                                placeholder={"Ex: https://www.linkedin.com/..."}
                            />
                            <IconInput
                                label={"Site web"}
                                type={"text"}
                                IconComponent={FaEarthAfrica}
                                placeholder={"Ex: https://www.m4trix.com"}
                            />
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
                                        <span>
                                            <GrTextAlignCenter/>
                                        </span>
                                    <div>
                                        <p>Biographie</p>
                                    </div>
                                </div>
                                <Editor/>
                            </div>
                        </ArtisteNewSectionItem>
                        <ArtisteNewSectionItem
                            sectionName={"Save The Date"}
                        >
                            <p>Prochainement...</p>
                        </ArtisteNewSectionItem>
                        <ArtisteNewSectionItem
                            sectionName={"Oeuvres"}
                        >
                            <IconInput
                                label={"Nom de l'oeuvre"}
                                type={"text"}
                                IconComponent={IoTextOutline}
                                placeholder={"Ex: Sur le chemin de la vie"}
                            />
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
                                        <span>
                                            <BiSolidGroup/>
                                        </span>
                                    <div>
                                        <p>Artistes connu</p>
                                    </div>
                                </div>
                                <Select
                                    placeholder={"Sélectionner un ou plusieurs artistes connu"}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    defaultValue={[]}
                                    isMulti
                                    options={[
                                        {value: '1', label: 'Richard Orlinksi'},
                                        {value: '2', label: 'Jean-Michel Basquiat'},
                                        {value: '3', label: 'Andy Warhol'},
                                        {value: '4', label: 'Keith Haring'},
                                        {value: '5', label: 'Banksy'},
                                        {value: '6', label: 'JR'},
                                        {value: '7', label: 'Invader'},
                                        {value: '8', label: 'Kaws'},
                                        {value: '9', label: 'Shepard Fairey'},
                                        {value: '10', label: 'Vhils'},
                                    ]}
                                    onChange={handleChangeArtist}
                                    value={formData.oeuvreArtist}
                                />
                            </div>
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
                                        <span>
                                            <BiGroup/>
                                        </span>
                                    <div>
                                        <p>Artistes non référencé</p>
                                    </div>
                                </div>
                                <Select
                                    placeholder={"Sélectionner un ou plusieurs artistes non référencé"}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    defaultValue={[]}
                                    isMulti
                                    options={[
                                        {value: '1', label: 'Mathieu'},
                                        {value: '2', label: 'Jean'},
                                        {value: '3', label: 'Pierre'},
                                        {value: '4', label: 'Paul'},
                                        {value: '5', label: 'Jacques'},
                                        {value: '6', label: 'Jean-Pierre'},
                                        {value: '7', label: 'Jean-Jacques'},
                                        {value: '8', label: 'Jean-Paul'},
                                        {value: '9', label: 'Pierre-Paul'},
                                        {value: '10', label: 'Pierre-Jacques'},
                                    ]}
                                    onChange={handleChangeUnknownArtist}
                                    value={formData.oeuvreUnknownArtist}
                                />
                            </div>
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
                                        <span>
                                            <BiImageAdd/>
                                        </span>
                                    <div>
                                        <p>Image(s)</p>
                                    </div>
                                </div>
                                <div>
                                    {/*TODO : Ajouter un composant pour ajouter une ou plusieurs images*/}
                                </div>
                            </div>
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
                                        <span>
                                            <BsHammer/>
                                        </span>
                                    <div>
                                        <p>Type de l&lsquo;oeuvre</p>
                                    </div>
                                </div>
                                <Select
                                    placeholder={"Sélectionner un ou plusieurs type pour l'oeuvre"}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    defaultValue={[]}
                                    isMulti
                                    options={[
                                        {value: '1', label: 'Sculpture'},
                                        {value: '2', label: 'Peinture'},
                                        {value: '3', label: 'Photographie'},
                                        {value: '4', label: 'Dessin'},
                                        {value: '5', label: 'Graffiti'},
                                        {value: '6', label: 'Street Art'},
                                        {value: '7', label: 'Art numérique'},
                                        {value: '8', label: 'Art vidéo'},
                                        {value: '9', label: 'Art sonore'},
                                        {value: '10', label: 'Art performance'},
                                    ]}
                                    onChange={handleChangeOeurveType}
                                    value={formData.oeuvreType}
                                />
                            </div>
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
                                        <span>
                                            <FiHash/>
                                        </span>
                                    <div>
                                        <p>Tags</p>
                                    </div>
                                </div>
                                <Select
                                    placeholder={"Sélectionner un ou plusieurs tags pour l'oeuvre"}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    defaultValue={[]}
                                    isMulti
                                    options={[
                                        {value: '1', label: 'Sculpture'},
                                        {value: '2', label: 'Peinture'},
                                        {value: '3', label: 'Photographie'},
                                        {value: '4', label: 'Dessin'},
                                        {value: '5', label: 'Graffiti'},
                                        {value: '6', label: 'Street Art'},
                                        {value: '7', label: 'Art numérique'},
                                        {value: '8', label: 'Art vidéo'},
                                        {value: '9', label: 'Art sonore'},
                                        {value: '10', label: 'Art performance'},
                                    ]}
                                    onChange={handleChangeTags}
                                    value={formData.tags}
                                />
                            </div>
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
                                    <span>
                                        <GrTextAlignCenter/>
                                    </span>
                                    <div>
                                        <p>Description de l&lsquo;oeuvre</p>
                                    </div>
                                </div>
                                <Editor/>
                            </div>
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
                                    <span>
                                        <BiLaugh/>
                                    </span>
                                    <div>
                                        <p>Anecdote</p>
                                    </div>
                                </div>
                                <Editor/>
                            </div>
                            <IconInput
                                label={"Hauteur (en cm)"}
                                type={"number"}
                                IconComponent={AiOutlineColumnHeight}
                                placeholder={"Ex: 120"}
                                required
                            />
                            <IconInput
                                label={"Longueur (en cm)"}
                                type={"number"}
                                IconComponent={AiOutlineColumnWidth}
                                placeholder={"Ex: 80"}
                                required
                            />
                            <IconInput
                                label={"Largeur (en cm)"}
                                type={"number"}
                                IconComponent={IoIosResize}
                                placeholder={"Ex: 30"}
                            />
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
                                    <span>
                                        <PiListNumbers/>
                                    </span>
                                    <div>
                                        <p>Numérotation</p>
                                    </div>
                                </div>
                                <div>
                                    <ArtisteNumerotationItem/>
                                </div>
                            </div>
                            <IconInput
                                label={"Support et matériau(x) utilisé(s)"}
                                type={"text"}
                                IconComponent={PiStool}
                                placeholder={"Ex: Papier photo, Toile..."}
                            />
                            <IconInput
                                label={"Technique(s) utilisée(s)"}
                                type={"text"}
                                IconComponent={FaHandHoldingHeart}
                                placeholder={"Ex: Peinture à l'huile, Acrylique..."}
                            />
                            <IconInput
                                label={"Encadrement"}
                                type={"text"}
                                IconComponent={PiUserRectangleBold}
                                placeholder={"Ex: Caisse américaine, Cadre..."}
                            />
                            <IconInput
                                label={"Signature"}
                                type={"text"}
                                IconComponent={FaSignature}
                                placeholder={"Ex: Signé en bas à droite"}
                            />
                        </ArtisteNewSectionItem>
                    </div>
                </div>
            </main>
        </Admin>
    )

}