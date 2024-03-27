import {useCallback, useEffect, useReducer, useRef, useState} from "react";

import {useRouter} from "next/router";
import Image from "next/image";

import ROUTES from "@/constants/ROUTES";

import {useArtists} from "@/hooks/useArtists";

import CreatableSelect from "react-select/creatable";
import Editor from "@/components/ui/Editor";

import PageLoader from "@/components/ui/PageLoader";
import Error from "@/components/error/Error";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";
import ArtisteNewSectionItem from "@/components/admin/artistes/users/new/ArtisteNewSectionItem";
import IconInput from "@/components/ui/iconinput/IconInput";
import Button from "@/components/ui/button/Button";

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
import {ImCross} from "react-icons/im";
import {CiCircleList} from "react-icons/ci";

import styles from './Index.module.scss';
import sectionStyles from '@/components/dashboard/items/sections/DashboardSectionItem.module.scss';
import {Toast} from "@/constants/ToastConfig";
import {TbNavigationNorth} from "react-icons/tb";
import MultiColors from "@/components/ui/select/MultiColors";
import Select from "react-select";

const initialState = {
    oeuvre: {
        name: undefined,
        description: undefined,
        anecdote: undefined,
        hauteur: undefined,
        longueur: undefined,
        profondeur: undefined,
        orientation: undefined,
        prix: undefined,
        numerotation: undefined,
        limitation: undefined,
        support: undefined,
        technique: undefined,
        encadrement: undefined,
        signature: undefined,
        Artists: undefined,
        UnknowArtistOeuvre: undefined,
        tag: undefined,
        type: undefined,
        images: undefined,
        couleurs: undefined,
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FORM':
            const keys = action.payload.field.split('.');
            return keys.reduce((acc, key, index) => {
                if (index === keys.length - 1) {
                    return {
                        ...acc,
                        [key]: action.payload.value,
                    };
                }
                return acc[key] ? acc[key] : {};
            }, state);
        default:
            throw new Error("Action inconnue");
    }
}


export default function DashboardArtisteEditOeuvresNewIndex() {

    const router = useRouter();

    const [state, dispatch] = useReducer(reducer, initialState);

    const fileInputRef = useRef(null);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [artisteId, setArtisteId] = useState(null);

    const [selectedFiles, setSelectedFiles] = useState([]); // Permet de stocker les fichiers sélectionnés
    const [customFileName, setCustomFileName] = useState({}); // Permet de stocker le nom personnalisé du fichier

    const {artists, loading: artistLoading} = useArtists();

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
     * Permet d'ouvrir la fenêtre de sélection de fichier
     * @type {(function(*): void)|*}
     */
    const handleOpenMultipleFilesModal = useCallback(() => {
        fileInputRef.current.click();
    }, []);

    const moveImage = (dragIndex, hoverIndex) => {
        const dragItem = selectedFiles[dragIndex];
        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(dragIndex, 1);
        newSelectedFiles.splice(hoverIndex, 0, dragItem);
        setSelectedFiles(newSelectedFiles);
    };

    const getImagePositionByFileName = (fileName) => {
        return selectedFiles.findIndex(file => file.name === fileName);
    }

    const getSchemaImage = () => {
        return selectedFiles.map(file => {
            return {
                name: customFileName[file.name],
                position: getImagePositionByFileName(file.name),
            }
        });
    }

    /**
     * Permet de mettre à jour le state du formulaire
     * @param argument
     */
    const handleChange = (argument) => {
        const {name, value} = argument.target ? argument : argument;
        dispatch({
            type: 'UPDATE_FORM',
            payload: {field: name, value},
        });
    };

    const handleSubmit = async (e) => {

        if (e) e.preventDefault();

        console.log(getSchemaImage());

        if (state.oeuvre.tag) {
            state.oeuvre.tag = state.oeuvre.tag.map(tag => tag.value);
        }
        if (state.oeuvre.type) {
            state.oeuvre.type = state.oeuvre.type.map(type => type.value);
        }
        if (state.oeuvre.Artists) {
            state.oeuvre.Artists = state.oeuvre.Artists.map(artist => artist.value);
        }
        if (state.oeuvre.UnknowArtistOeuvre) {
            state.oeuvre.UnknowArtistOeuvre = state.oeuvre.UnknowArtistOeuvre.map(unknowArtist => unknowArtist.value);
        }


        try {

            const response = await fetch("http://localhost:3000/api/oeuvres", {
                method: 'POST',
                body: JSON.stringify({
                    ...state.oeuvre,
                    hauteur: parseFloat(state.oeuvre.hauteur),
                    longueur: parseFloat(state.oeuvre.longueur),
                    profondeur: parseFloat(state.oeuvre.profondeur),
                    prix: parseFloat(state.oeuvre.prix),
                    numerotation: parseInt(state.oeuvre.numerotation),
                    limitation: parseInt(state.oeuvre.limitation),
                })
            });

            const responseJSON = await response.json();

            console.log(responseJSON);

            if (!responseJSON.ok) Toast.fire({
                icon: 'error',
                title: responseJSON.message || "Une erreur est survenue lors de la création de l'oeuvre. Si le problème persiste, veuillez contacter l'administrateur."
            });

        } catch (error) {

            console.log(error)

            if (process.env.NODE_ENV === 'development') console.error(error);

            Toast.fire({
                icon: 'error',
                title: error.message || "Une erreur est survenue lors de la création de l'oeuvre. Si le problème persiste, veuillez contacter l'administrateur."
            });
            return false;
        }
    }

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
                        value={state.oeuvre.name}
                        name={"oeuvre.name"}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <MdOutlineDescription/>
                                    </span>
                            <div>
                                <p>Description</p>
                            </div>
                        </div>
                        <Editor
                            onEditorChange={(content) => {
                                dispatch({
                                    type: 'UPDATE_FORM',
                                    payload: {field: 'oeuvre.description', value: content},
                                });
                            }
                            }
                        />
                    </div>
                    <div className={sectionStyles.specialSection}>
                        <div className={sectionStyles.specialSectionHead}>
                                    <span>
                                        <FaExclamation/>
                                    </span>
                            <div>
                                <p>Anecdote</p>
                            </div>
                        </div>
                        <Editor
                            onEditorChange={(content) => {
                                dispatch({
                                    type: 'UPDATE_FORM',
                                    payload: {field: 'oeuvre.anecdote', value: content},
                                });
                            }
                            }
                        />
                    </div>
                    <IconInput
                        label={"Prix"}
                        step={"0.01"}
                        type={"number"}
                        IconComponent={FaEuroSign}
                        placeholder={"Ex: 159,99"}
                        onChange={handleChange}
                        name={"oeuvre.prix"}
                        value={state.oeuvre.prix}
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
                        onChange={handleChange}
                        name={"oeuvre.numerotation"}
                        value={state.oeuvre.numerotation}
                        disabled={loading}
                    />
                    <IconInput
                        label={"Limitation"}
                        type={"number"}
                        step={"1"}
                        min={"1"}
                        IconComponent={AiOutlineFieldNumber}
                        placeholder={"Ex: 10"}
                        onChange={handleChange}
                        name={"oeuvre.limitation"}
                        value={state.oeuvre.limitation}
                        disabled={loading}
                    />
                    <IconInput
                        label={"Support"}
                        type={"text"}
                        IconComponent={FaChair}
                        placeholder={"Ex: Toile"}
                        onChange={handleChange}
                        name={"oeuvre.support"}
                        value={state.oeuvre.support}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Technique"}
                        type={"text"}
                        IconComponent={FaHandSparkles}
                        placeholder={"Ex: Peinture à l'huile"}
                        onChange={handleChange}
                        name={"oeuvre.technique"}
                        value={state.oeuvre.technique}
                        disabled={loading}
                    />
                    <IconInput
                        label={"Encadrement"}
                        type={"text"}
                        IconComponent={PiFrameCornersDuotone}
                        placeholder={"Ex: Bois"}
                        onChange={handleChange}
                        name={"oeuvre.encadrement"}
                        value={state.oeuvre.encadrement}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Signature"}
                        type={"text"}
                        IconComponent={FaSignature}
                        placeholder={"Ex: En bas à droite"}
                        onChange={handleChange}
                        name={"oeuvre.signature"}
                        value={state.oeuvre.signature}
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
                    <MultiColors onChange={handleChange}/>
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
                            name={"oeuvre.Artists"}
                            onChange={(value) => {
                                dispatch({
                                    type: 'UPDATE_FORM',
                                    payload: {field: 'oeuvre.Artists', value},
                                });
                            }}
                            value={state.oeuvre.Artists}
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
                            name={"oeuvre.UnknowArtistOeuvre"}
                            onChange={(value) => {
                                dispatch({
                                    type: 'UPDATE_FORM',
                                    payload: {field: 'oeuvre.UnknowArtistOeuvre', value},
                                });
                            }}
                            value={state.oeuvre.UnknowArtistOeuvre}
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
                        onChange={handleChange}
                        name={"oeuvre.hauteur"}
                        value={state.oeuvre.hauteur}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Longueur (cm)"}
                        type={"number"}
                        step={"0.01"}
                        IconComponent={FaRulerHorizontal}
                        placeholder={"Ex: 203"}
                        onChange={handleChange}
                        name={"oeuvre.longueur"}
                        value={state.oeuvre.longueur}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Profondeur (cm)"}
                        type={"number"}
                        step={"0.01"}
                        IconComponent={FaRulerCombined}
                        placeholder={"Ex: 58"}
                        onChange={handleChange}
                        name={"oeuvre.profondeur"}
                        value={state.oeuvre.profondeur}
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
                            onChange={(value) => {
                                dispatch({
                                    type: 'UPDATE_FORM',
                                    payload: {field: 'oeuvre.orientation', value},
                                });
                            }}
                            value={state.oeuvre.orientation}
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
                            onChange={(value) => {
                                dispatch({
                                    type: 'UPDATE_FORM',
                                    payload: {field: 'oeuvre.tag', value},
                                });
                            }}
                            value={state.oeuvre.tag}
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
                            onChange={(value) => {
                                dispatch({
                                    type: 'UPDATE_FORM',
                                    payload: {field: 'oeuvre.type', value},
                                });
                            }}
                            value={state.oeuvre.type}
                        />
                    </div>
                </ArtisteNewSectionItem>
                <div className={styles.topSpace}>
                    <Button
                        text={"Créer l'oeuvre"}
                        type={"submit"}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}