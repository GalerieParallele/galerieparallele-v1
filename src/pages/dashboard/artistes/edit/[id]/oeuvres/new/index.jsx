import {useCallback, useEffect, useRef, useState} from "react";

import {useRouter} from "next/router";

import {create} from "zustand";

import ROUTES from "@/constants/ROUTES";

import styles from './Index.module.scss';
import sectionStyles from '@/components/dashboard/items/sections/DashboardSectionItem.module.scss';

import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import PageLoader from "@/components/ui/PageLoader";
import Error from "@/components/error/Error";
import IconInput, {handleOpenModalInformationRequired} from "@/components/ui/iconinput/IconInput";
import Button from "@/components/ui/button/Button";
import Editor from "@/components/ui/Editor";

import {MdDriveFileRenameOutline, MdOutlineDescription} from "react-icons/md";
import {
    FaArrowAltCircleLeft,
    FaArrowAltCircleRight,
    FaChair,
    FaEuroSign,
    FaExclamation, FaExternalLinkAlt,
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
import {TbNavigationNorth} from "react-icons/tb";
import Select from "react-select";
import {CiCircleList} from "react-icons/ci";
import LittleSpinner from "@/components/ui/LittleSpinner";
import StorageUtils from "@/utils/StorageUtils";
import {Toast} from "@/constants/ToastConfig";
import useArtistsStore from "@/stores/artistsStore";
import DashboardSectionItem from "@/components/dashboard/items/sections/DashboardSectionItem";
import {IoMdColorPalette} from "react-icons/io";
import MultiTags from "@/components/ui/select/MultiTags";
import MultiTypes from "@/components/ui/select/MultiTypes";

export const useOeuvreStore = create((set) => ({
    oeuvre: {
        name: '',
        description: '',
        anecdote: '',
        prix: 0,
        numerotation: 1,
        limitation: 1,
        support: '',
        technique: '',
        encadrement: '',
        signature: '',
        hauteur: 0,
        longueur: 0,
        profondeur: 0,
        orientation: [],
        artsperURL: '',
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

    const {
        artists,
        reloadArtists,
        loading: artistLoading
    } = useArtistsStore();

    const [artisteId, setArtisteId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [createLoading, setCreateLoading] = useState(false);
    const [error, setError] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [customFileName, setCustomFileName] = useState({});

    const {oeuvre, updateField} = useOeuvreStore();

    const fileInputRef = useRef(null);

    const handleGetImageLink = async (file) => {

        const {
            downloadURL,
            success
        } = await StorageUtils.uploadFile(file, 'artistes/' + artisteId + '/oeuvres/' + oeuvre.name + "/" + file.name, null);

        if (!success) {
            throw new Error(`Une erreur est survenue lors de l'upload de l'image ${file.name}. Si le problème persiste, veuillez contacter l'administrateur.`);
        }

        return downloadURL;

    }

    const handleFormat = async () => {

        const copyOeuvre = {...oeuvre};

        await Promise.all(
            selectedFiles.map(async (file) => {
                try {
                    const url = await handleGetImageLink(file);
                    if (url) {
                        copyOeuvre.images.push({
                            url: url,
                            position: selectedFiles.indexOf(file) + 1,
                        });
                    }
                } catch (error) {
                    Toast.fire({
                        icon: 'error',
                        title: "Une erreur est survenue lors de l'upload de l'image " + file.name + ". Si le problème persiste, veuillez contacter l'administrateur."
                    });
                }
            })
        );


        copyOeuvre.Artists = oeuvre.Artists.map(artist => artist.value);
        copyOeuvre.UnknowArtistOeuvre = oeuvre.UnknowArtistOeuvre.map(artist => artist.value);
        copyOeuvre.orientation = oeuvre.orientation.value;

        return copyOeuvre;
    }

    /**
     * Permet de soumettre le formulaire d'ajout d'une œuvre
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

        const data = await handleFormat();

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

                await StorageUtils.listFiles('artistes/' + artisteId + '/oeuvres/' + oeuvre.name).then(async files => {
                    for (const file of files) {
                        await StorageUtils.deleteFile('artistes/' + artisteId + '/oeuvres/' + oeuvre.name + "/" + file.name);
                    }
                });

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

            router.push(ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.HOME(artisteId));

        } catch (error) {

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

    useEffect(() => {
        reloadArtists();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                handleSubmit();
            }

            if (e.ctrlKey && e.key === 'Escape') router.push(ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.HOME(artisteId));
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    });

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
                returnURL={ROUTES.ADMIN.ARTISTES.EDIT.OEUVRES.HOME(artisteId)}
            />
            <div className={styles.content}>
                <DashboardSectionItem
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
                    <IconInput
                        label={"Lien Artsper"}
                        type={"text"}
                        IconComponent={FaExternalLinkAlt}
                        placeholder={"Ex: https://www.artsper.com/fr/oeuvres-d-art-contemporain/edition/1625325/myanmar-beauty-violence"}
                        onChange={(e) => updateField('artsperURL', e.target.value)}
                        name={"artsperURL"}
                        value={oeuvre.artsperURL}
                        disabled={loading}
                    />
                </DashboardSectionItem>
                <DashboardSectionItem
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
                        required
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
                        required
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
                        required
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
                    />
                </DashboardSectionItem>
                <DashboardSectionItem
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
                </DashboardSectionItem>
                <DashboardSectionItem
                    sectionName={"Couleur(s)"}
                >
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                        <span>
                                            <IoMdColorPalette/>
                                        </span>
                            <div>
                                <p>Couleur(s)</p>
                            </div>
                        </div>
                        <MultiColors onChange={(e) => {
                            updateField('couleurs', e)
                        }}/>
                    </div>
                </DashboardSectionItem>
                <DashboardSectionItem
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
                        <Select
                            placeholder={"Sélectionner un ou plusieurs artistes connus"}
                            closeMenuOnSelect={false}
                            defaultValue={[]}
                            noOptionsMessage={() => "Aucun artiste trouvé"}
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
                </DashboardSectionItem>
                <DashboardSectionItem
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
                            <p>
                                Orientation
                                <span onClick={handleOpenModalInformationRequired} style={{
                                    color: 'var(--red)',
                                    marginLeft: '5px'
                                }}>
                                       *
                            </span>
                            </p>
                        </div>
                        <Select
                            placeholder={"Sélectionner une orientation"}
                            closeMenuOnSelect={true}
                            defaultValue={[]}
                            isMulti={false}
                            noOptionsMessage={() => "Aucune orientation trouvée"}
                            options={[
                                {value: 'PORTRAIT', label: 'Portrait'},
                                {value: 'PAYSAGE', label: 'Paysage'},
                                {value: 'CARRE', label: 'Carré'},
                                {value: 'NO_DEFINED', label: 'Non défini'},
                            ]}
                            onChange={(value) => updateField('orientation', value)}
                            value={oeuvre.orientation}
                        />
                    </div>
                </DashboardSectionItem>
                <DashboardSectionItem
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
                        <MultiTags
                            onChange={(e) => {
                                updateField('tag', e)
                            }}
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
                        <MultiTypes
                            onChange={(e) => updateField('type', e)}
                        />
                    </div>
                </DashboardSectionItem>
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