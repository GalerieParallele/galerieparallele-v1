import {useCallback, useEffect, useRef, useState} from "react";

import {useRouter} from "next/router";

import {create} from "zustand";

import ROUTES from "@/constants/ROUTES";

import styles from './Index.module.scss';
import sectionStyles from '@/components/dashboard/items/sections/DashboardSectionItem.module.scss';

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import PageLoader from "@/components/ui/PageLoader";
import Error from "@/components/error/Error";
import ArtisteNewSectionItem from "@/components/admin/artistes/users/new/ArtisteNewSectionItem";
import IconInput from "@/components/ui/iconinput/IconInput";
import Button from "@/components/ui/button/Button";
import Editor from "@/components/ui/Editor";

import {MdDriveFileRenameOutline, MdOutlineDescription} from "react-icons/md";
import {
    FaArrowAltCircleLeft,
    FaArrowAltCircleRight,
    FaChair,
    FaEuroSign,
    FaExclamation,
    FaHandSparkles,
    FaHashtag,
    FaRegImages,
    FaRulerCombined,
    FaRulerHorizontal,
    FaRulerVertical,
    FaSignature
} from "react-icons/fa";
import {AiOutlineFieldNumber} from "react-icons/ai";
import {PiFrameCornersDuotone} from "react-icons/pi";
import {BiGroup, BiSolidImageAdd} from "react-icons/bi";
import Image from "next/image";
import {ImCross} from "react-icons/im";
import MultiColors from "@/components/ui/select/MultiColors";
import CreatableSelect from "react-select/creatable";
import {useArtists} from "@/hooks/useArtists";
import {TbNavigationNorth} from "react-icons/tb";
import Select from "react-select";
import {CiCircleList} from "react-icons/ci";
import {Toast} from "@/constants/ToastConfig";
import LittleSpinner from "@/components/ui/LittleSpinner";

export const useOeuvreStore = create((set) => ({
    oeuvre: {
        name: '',
        description: '',
        anecdote: '',
        prix: 0,
        numerotation: 0,
        limitation: 0,
        support: '',
        technique: '',
        encadrement: '',
        signature: '',
        hauteur: 0,
        longueur: 0,
        profondeur: 0,
        orientation: [],
        type: [],
        tag: [],
        images: [],
        couleurs: [],
        Artists: [],
        UnknowArtistOeuvre: [],
    },
    updateField: (field, value) => set((state) => ({
        oeuvre: {...state.oeuvre, [field]: value},
    })),
}));

export default function DashboardArtisteEditOeuvresNewIndex() {

    const router = useRouter();

    const {artists, loading: artistLoading} = useArtists();

    const [artisteId, setArtisteId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [createLoading, setCreateLoading] = useState(false);
    const [error, setError] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [customFileName, setCustomFileName] = useState({});

    const {oeuvre, updateField} = useOeuvreStore();

    const fileInputRef = useRef(null);

    const handleFormat = () => {

        const copyOeuvre = {...oeuvre};

        copyOeuvre.images = selectedFiles.map(file => {
            return {
                url: "https://fakeurl.fr",
                position: selectedFiles.indexOf(file),
            }
        });

        copyOeuvre.Artists = oeuvre.Artists.map(artist => artist.value);
        copyOeuvre.UnknowArtistOeuvre = oeuvre.UnknowArtistOeuvre.map(artist => artist.value);
        copyOeuvre.type = oeuvre.type.map(type => type.value);
        copyOeuvre.tag = oeuvre.tag.map(tag => tag.value);
        copyOeuvre.orientation = oeuvre.orientation.value;

        return copyOeuvre;
    }

    /**
     * Permet de soumettre le formulaire d'ajout d'une oeuvre
     * @param e
     * @returns {Promise<void>}
     */
    const handleSubmit = async (e) => {

        if (e) e.preventDefault();

        setCreateLoading(true);

        Toast.fire({
            icon: 'info',
            title: 'Création de l\'oeuvre en cours...'
        });

        const data = handleFormat();

        try {

            const response = await fetch(ROUTES.API.OEUVRES.HOME, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseJSON = await response.json();

            if (response.status !== 201) {
                Toast.fire({
                    icon: 'error',
                    title: responseJSON.message || "Une erreur est survenue lors de la création de l'oeuvre. Si le problème persiste, veuillez contacter l'administrateur."
                });
                return false;
            }

            Toast.fire({
                icon: 'success',
                title: 'L\'oeuvre a bien été créée'
            });

        } catch (error) {

            console.log(error)

            if (process.env.NODE_ENV === 'development') console.error(error);

            Toast.fire({
                icon: 'error',
                title: error.message || "Une erreur est survenue lors de la création de l'oeuvre. Si le problème persiste, veuillez contacter l'administrateur."
            });
            return false;
        } finally {

            setCreateLoading(false);

        }
    };

    /**
     * Permet d'ouvrir la fenêtre de sélection de fichier
     * @type {(function(*): void)|*}
     */
    const handleOpenMultipleFilesModal = useCallback(() => {
        fileInputRef.current.click();
    }, []);

    /**
     * Permet d'ajouter des fichiers à la liste des fichiers sélectionnés (sans doublons)
     * @param files
     */
    const addFiles = (files) => {
        setSelectedFiles(prev => {
            const newFiles = files.filter(f => !prev.map(pf => pf.name).includes(f.name));
            return [...prev, ...newFiles];
        });
        setCustomFileName(prev => {
            const newCustomFileName = {...prev};
            files.forEach(file => {
                if (!newCustomFileName[file.name]) {
                    newCustomFileName[file.name] = file.name;
                }
            });
            return newCustomFileName;
        });
    }

    const handleFileSelect = useCallback((e) => {
        let files = [...e.target.files];
        addFiles(files);
        e.target.value = '';
    }, []);

    /**
     * Permet de gérer la sélection de fichier et de les déplacer dans le state
     * @param dragIndex {number}
     * @param hoverIndex {number}
     */
    const moveImage = (dragIndex, hoverIndex) => {
        const dragItem = selectedFiles[dragIndex];
        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(dragIndex, 1);
        newSelectedFiles.splice(hoverIndex, 0, dragItem);
        setSelectedFiles(newSelectedFiles);
    };

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
                returnURL={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES(artisteId)}
            />
            <div className={styles.content}>
                <ArtisteNewSectionItem
                    sectionName={"Informations générales"}
                    required
                >
                    <IconInput
                        label={"Nom de l'oeuvre"}
                        type={"text"}
                        IconComponent={MdDriveFileRenameOutline}
                        placeholder={"Ex: Mona lisa"}
                        value={oeuvre.name}
                        name={"name"}
                        onChange={(e) => updateField('name', e.target.value)}
                        disabled={loading}
                        required
                    />
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <MdOutlineDescription/>
                                    </span>

                            <p>Description</p>

                        </div>
                        <Editor
                            onEditorChange={(content) => updateField('description', content)
                            }
                        />
                    </div>
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <FaExclamation/>
                                    </span>
                            <p>Anecdote</p>
                        </div>
                        <Editor
                            onEditorChange={(content) => updateField('anecdote', content)
                            }
                        />
                    </div>
                    <IconInput
                        label={"Prix"}
                        step={"0.01"}
                        type={"number"}
                        IconComponent={FaEuroSign}
                        placeholder={"Ex: 159,99"}
                        onChange={(e) => updateField('prix', parseFloat(e.target.value))}
                        name={"prix"}
                        value={oeuvre.prix}
                        disabled={loading}
                        required
                    />
                </ArtisteNewSectionItem>
                <ArtisteNewSectionItem
                    sectionName={"Informations techniques"}
                    required
                >
                    <IconInput
                        label={"Numérotation"}
                        type={"number"}
                        step={"1"}
                        min={"1"}
                        IconComponent={AiOutlineFieldNumber}
                        placeholder={"Ex: 5"}
                        onChange={(e) => updateField('numerotation', parseInt(e.target.value))}
                        name={"numerotation"}
                        value={oeuvre.numerotation}
                        disabled={loading}
                    />
                    <IconInput
                        label={"Limitation"}
                        type={"number"}
                        step={"1"}
                        min={"1"}
                        IconComponent={AiOutlineFieldNumber}
                        placeholder={"Ex: 10"}
                        onChange={(e) => updateField('limitation', parseInt(e.target.value))}
                        name={"limitation"}
                        value={oeuvre.limitation}
                        disabled={loading}
                    />
                    <IconInput
                        label={"Support"}
                        type={"text"}
                        IconComponent={FaChair}
                        placeholder={"Ex: Toile"}
                        onChange={(e) => updateField('support', e.target.value)}
                        name={"support"}
                        value={oeuvre.support}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Technique"}
                        type={"text"}
                        IconComponent={FaHandSparkles}
                        placeholder={"Ex: Peinture à l'huile"}
                        onChange={(e) => updateField('technique', e.target.value)}
                        name={"technique"}
                        value={oeuvre.technique}
                        disabled={loading}
                    />
                    <IconInput
                        label={"Encadrement"}
                        type={"text"}
                        IconComponent={PiFrameCornersDuotone}
                        placeholder={"Ex: Bois"}
                        onChange={(e) => updateField('encadrement', e.target.value)}
                        name={"encadrement"}
                        value={oeuvre.encadrement}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Signature"}
                        type={"text"}
                        IconComponent={FaSignature}
                        placeholder={"Ex: En bas à droite"}
                        onChange={(e) => updateField('signature', e.target.value)}
                        name={"signature"}
                        value={oeuvre.signature}
                        disabled={loading}
                        required
                    />
                </ArtisteNewSectionItem>
                <ArtisteNewSectionItem
                    sectionName={"Images"}
                >
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                            <div>
                                <FaRegImages/>
                            </div>
                            <div>
                                <p>Images</p>
                            </div>
                        </div>
                        <div className={styles.imgOeuvreContainer}>
                            <div
                                className={styles.addSpace}
                                onClick={handleOpenMultipleFilesModal}
                            >
                                <p className={styles.icon}><BiSolidImageAdd/></p>
                                <p className={styles.text}>Glisser ou Cliquer pour ajouter une image</p>
                            </div>
                            <input
                                type="file"
                                multiple
                                style={{display: 'none'}}
                                onChange={handleFileSelect}
                                accept={"image/*"}
                                ref={fileInputRef}
                            />
                            {selectedFiles.length > 0 && selectedFiles.map((file, index) => (
                                <div key={file.name} className={styles.imgContainer}>
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        layout={'fill'}
                                    />
                                    <div className={styles.controlButtons}>
                                        {index > 0 && (
                                            <button onClick={() => moveImage(index, index - 1)}><FaArrowAltCircleLeft/>
                                            </button>
                                        )}
                                        {index < selectedFiles.length - 1 && (
                                            <button onClick={() => moveImage(index, index + 1)}><FaArrowAltCircleRight/>
                                            </button>
                                        )}
                                    </div>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => {
                                            setSelectedFiles(prev => {
                                                const newFiles = [...prev];
                                                newFiles.splice(index, 1);
                                                return newFiles;
                                            });
                                        }}>
                                        <ImCross/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </ArtisteNewSectionItem>
                <ArtisteNewSectionItem
                    sectionName={"Couleur(s)"}
                >
                    <MultiColors onChange={(e) => updateField('couleurs', e)}/>
                </ArtisteNewSectionItem>
                <ArtisteNewSectionItem
                    sectionName={"Artistes"}
                >
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                        <span>
                                            <BiGroup/>
                                        </span>
                            <div>
                                <p>Artiste(s) connu(s)</p>
                            </div>
                        </div>
                        <CreatableSelect
                            placeholder={"Sélectionner un ou plusieurs artistes connus"}
                            closeMenuOnSelect={false}
                            defaultValue={[]}
                            isMulti
                            isLoading={artistLoading}
                            options={
                                artists && artists.map((artist) => {
                                    return {
                                        value: artist.id,
                                        label: `${artist.user.firstname} ${artist.user.lastname}${artist.pseudo ? ` (${artist.pseudo})` : ''}`,
                                    }
                                })
                            }
                            name={"Artists"}
                            onChange={(e) => updateField('Artists', e)}
                            value={oeuvre.Artists}
                        />
                    </div>
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                        <span>
                                            <BiGroup/>
                                        </span>
                            <div>
                                <p>Artiste(s) inconnu(s)</p>
                            </div>
                        </div>
                        <CreatableSelect
                            placeholder={"Sélectionner un ou plusieurs artistes inconnus"}
                            closeMenuOnSelect={false}
                            defaultValue={[]}
                            isMulti
                            options={[
                                {value: 'Mathieu', label: 'Mathieu'},
                                {value: 'Jean', label: 'Jean'},
                                {value: 'Pierre', label: 'Pierre'},
                                {value: 'Paul', label: 'Paul'},
                                {value: 'Jacques', label: 'Jacques'},
                            ]}
                            name={"UnknowArtistOeuvre"}
                            onChange={(e) => updateField('UnknowArtistOeuvre', e)}
                            value={oeuvre.UnknowArtistOeuvre}
                        />
                    </div>
                </ArtisteNewSectionItem>
                <ArtisteNewSectionItem
                    sectionName={"Dimensions"}
                    required
                >
                    <IconInput
                        label={"Hauteur (cm)"}
                        type={"number"}
                        step={"0.01"}
                        IconComponent={FaRulerVertical}
                        placeholder={"Ex: 153"}
                        onChange={(e) => updateField('hauteur', parseFloat(e.target.value))}
                        name={"hauteur"}
                        value={oeuvre.hauteur}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Longueur (cm)"}
                        type={"number"}
                        step={"0.01"}
                        IconComponent={FaRulerHorizontal}
                        placeholder={"Ex: 203"}
                        onChange={(e) => updateField('longueur', parseFloat(e.target.value))}
                        name={"longueur"}
                        value={oeuvre.longueur}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Profondeur (cm)"}
                        type={"number"}
                        step={"0.01"}
                        IconComponent={FaRulerCombined}
                        placeholder={"Ex: 58"}
                        onChange={(e) => updateField('profondeur', parseFloat(e.target.value))}
                        name={"profondeur"}
                        value={oeuvre.profondeur}
                        disabled={loading}
                    />
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <TbNavigationNorth/>
                                    </span>
                            <div>
                                <p>Orientation</p>
                            </div>
                        </div>
                        <Select
                            placeholder={"Sélectionner une orientation"}
                            closeMenuOnSelect={true}
                            defaultValue={[]}
                            isMulti={false}
                            options={[
                                {value: 'PORTRAIT', label: 'Portrait'},
                                {value: 'PAYSAGE', label: 'Paysage'},
                                {value: 'CARRE', label: 'Carré'},
                            ]}
                            onChange={(value) => updateField('orientation', value)}
                            value={oeuvre.orientation}
                        />
                    </div>
                </ArtisteNewSectionItem>
                <ArtisteNewSectionItem
                    sectionName={"Autres"}
                >
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <FaHashtag/>
                                    </span>
                            <div>
                                <p>Tags</p>
                            </div>
                        </div>
                        <CreatableSelect
                            placeholder={"Sélectionner un ou plusieurs tags"}
                            closeMenuOnSelect={false}
                            defaultValue={[]}
                            isMulti
                            options={[
                                {value: 'Tag1', label: 'Tag1'},
                                {value: 'Tag2', label: 'Tag2'},
                                {value: 'Tag3', label: 'Tag3'},
                                {value: 'Tag4', label: 'Tag4'},
                                {value: 'Tag5', label: 'Tag5'},
                            ]}
                            onChange={(e) => updateField('tag', e)}
                            value={oeuvre.tag}
                        />
                    </div>
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <CiCircleList/>
                                    </span>
                            <div>
                                <p>Type(s) d&apos;oeuvre</p>
                            </div>
                        </div>
                        <CreatableSelect
                            placeholder={"Sélectionner un ou plusieurs types d'oeuvre"}
                            closeMenuOnSelect={false}
                            defaultValue={[]}
                            isMulti
                            options={[
                                {value: 'Type1', label: 'Type1'},
                                {value: 'Type2', label: 'Type2'},
                                {value: 'Type3', label: 'Type3'},
                                {value: 'Type4', label: 'Type4'},
                                {value: 'Type5', label: 'Type5'},
                            ]}
                            onChange={(e) => updateField('type', e)}
                            value={oeuvre.type}
                        />
                    </div>
                </ArtisteNewSectionItem>
                <div className={styles.topSpace}>
                    <Button
                        text={createLoading ? <LittleSpinner/> : "Créer l'oeuvre"}
                        type={"submit"}
                        onClick={handleSubmit}
                        disabled={createLoading}
                    />
                </div>
            </div>
        </div>
    )
}