import React, {useCallback, useEffect, useReducer, useRef, useState} from "react";

import {useRouter} from "next/router";

import ROUTES from "@/constants/ROUTES";

import PageLoader from "@/components/items/PageLoader";
import Error from "@/components/error/Error";
import DashboardNavbar from "@/components/dashboard/items/DashboardNavbar";

import styles from './Index.module.scss';
import sectionStyles from '@/components/dashboard/items/sections/DashboardSectionItem.module.scss';
import {useArtists} from "@/hooks/useArtists";
import ArtisteNewSectionItem from "@/components/admin/artistes/users/new/ArtisteNewSectionItem";
import IconInput from "@/components/items/iconinput/IconInput";
import {MdDriveFileRenameOutline, MdOutlineDescription} from "react-icons/md";
import Editor from "@/components/items/Editor";
import {
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
import CreatableSelect from "react-select/creatable";
import {CiCircleList} from "react-icons/ci";

const initialState = {
    oeuvre: {
        name: undefined,
        description: undefined,
        anecdote: undefined,
        price: undefined,
        dimension: {
            height: undefined,
            width: undefined,
            depth: undefined,
        },
        more_info: {
            numerotation: undefined,
            support: undefined,
            technique: undefined,
            encadrement: undefined,
            signature: undefined,
        },
        artists: [],
        unknown_artist: [],
        tags: [],
        type: [],
        images: [],
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_FORM':
            const [field, nestedField] = action.payload.field.split('.');
            return {
                ...state,
                [field]: {
                    ...state[field],
                    [nestedField]: action.payload.value,
                },
            };
        default:
            throw new Error();
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

    const {artists, artistLoading, artistError, reloadArtists} = useArtists();

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
                        onChange={() => console.log("change")}
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
                        onChange={() => console.log("change")}
                        name={"oeuvre.price"}
                        value={state.oeuvre.price}
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
                        onChange={() => console.log("change")}
                        name={"oeuvre.more_info.numerotation"}
                        value={state.oeuvre.more_info.numerotation}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Support"}
                        type={"text"}
                        IconComponent={FaChair}
                        placeholder={"Ex: Toile"}
                        onChange={() => console.log("change")}
                        name={"oeuvre.more_info.support"}
                        value={state.oeuvre.more_info.support}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Technique"}
                        type={"text"}
                        IconComponent={FaHandSparkles}
                        placeholder={"Ex: Peinture à l'huile"}
                        onChange={() => console.log("change")}
                        name={"oeuvre.more_info.technique"}
                        value={state.oeuvre.more_info.technique}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Encadrement"}
                        type={"text"}
                        IconComponent={PiFrameCornersDuotone}
                        placeholder={"Ex: Bois"}
                        onChange={() => console.log("change")}
                        name={"oeuvre.more_info.encadrement"}
                        value={state.oeuvre.more_info.encadrement}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Signature"}
                        type={"text"}
                        IconComponent={FaSignature}
                        placeholder={"Ex: En bas à droite"}
                        onChange={() => console.log("change")}
                        name={"oeuvre.more_info.signature"}
                        value={state.oeuvre.more_info.signature}
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
                            {/* TODO: Ici la liste des image importées */}
                            {
                                selectedFiles.length > 0 && (
                                    selectedFiles.map((file, index) => {
                                            return (
                                                <div key={index} className={styles.imgContainer}>
                                                    <Image
                                                        src={URL.createObjectURL(file)}
                                                        alt={file.name}
                                                        layout={'fill'}
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            setSelectedFiles(prev => {
                                                                const newFiles = [...prev];
                                                                newFiles.splice(index, 1);
                                                                return newFiles;
                                                            });
                                                        }}
                                                    >
                                                        <ImCross/>
                                                    </button>
                                                </div>
                                            )
                                        }
                                    )
                                )
                            }
                            {/* fin de la liste */}
                        </div>
                    </div>
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
                            onChange={() => console.log("change")}
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
                                {value: '1', label: 'Mathieu'},
                                {value: '2', label: 'Jean'},
                                {value: '3', label: 'Pierre'},
                                {value: '4', label: 'Paul'},
                                {value: '5', label: 'Jacques'},
                            ]}
                            onChange={() => console.log("change")}
                            // value={formData.oeuvreUnknownArtist}
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
                        onChange={() => console.log("change")}
                        name={"oeuvre.dimension.height"}
                        value={state.oeuvre.dimension.height}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Longueur (cm)"}
                        type={"number"}
                        step={"0.01"}
                        IconComponent={FaRulerHorizontal}
                        placeholder={"Ex: 203"}
                        onChange={() => console.log("change")}
                        name={"oeuvre.dimension.width"}
                        value={state.oeuvre.dimension.width}
                        disabled={loading}
                        required
                    />
                    <IconInput
                        label={"Largeur (cm)"}
                        type={"number"}
                        step={"0.01"}
                        IconComponent={FaRulerCombined}
                        placeholder={"Ex: 58"}
                        onChange={() => console.log("change")}
                        name={"oeuvre.dimension.depth"}
                        value={state.oeuvre.dimension.depth}
                        disabled={loading}
                    />
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
                                {value: '1', label: 'Mathieu'},
                                {value: '2', label: 'Jean'},
                                {value: '3', label: 'Pierre'},
                                {value: '4', label: 'Paul'},
                                {value: '5', label: 'Jacques'},
                            ]}
                            onChange={() => console.log("change")}
                            // value={formData.oeuvreUnknownArtist}
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
                                {value: '1', label: 'Type 1'},
                                {value: '2', label: 'Type 2'},
                                {value: '3', label: 'Type 3'},
                                {value: '4', label: 'Type 4'},
                                {value: '5', label: 'Type 5'},
                            ]}
                            onChange={() => console.log("change")}
                            // value={formData.oeuvreUnknownArtist}
                        />
                    </div>
                </ArtisteNewSectionItem>
            </div>
        </div>
    )
}