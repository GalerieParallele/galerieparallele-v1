import React, {useReducer, useState} from "react";

import {useRouter} from "next/router";

import ROUTES from "@/constants/ROUTES";

import Admin from "@/components/admin/Admin";
import Button from "@/components/items/button/Button";
import Editor from "@/components/items/Editor";
import IconInput from "@/components/items/iconinput/IconInput";
import ArtisteNewSectionItem from "@/components/admin/artistes/users/new/ArtisteNewSectionItem";

import adminStyles from "@/pages/admin/articles/AdminArticles.module.css";
import styles from "./Index.module.scss";

import {MdDriveFileRenameOutline, MdOutlineDescription} from "react-icons/md";
import {AiOutlineArrowLeft, AiOutlineFieldNumber} from "react-icons/ai";
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
import {PiFrameCornersDuotone} from "react-icons/pi";
import {BiGroup, BiSolidImageAdd} from "react-icons/bi";
import CreatableSelect from "react-select/creatable";
import {CiCircleList} from "react-icons/ci";
import Image from "next/image";
import {ImCross} from "react-icons/im";

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

export default function OeuvreNew() {

    const router = useRouter();

    const [state, dispatch] = useReducer(reducer, initialState);

    const [loading, setLoading] = useState(false);

    return (
        <Admin>
            <main className={adminStyles.main}>
                <div>
                    <Button
                        text={<AiOutlineArrowLeft/>}
                        onClick={() => router.push(ROUTES.ADMIN.ARTISTES.OEUVRES)}
                    />
                </div>
                <div className={styles.main}>
                    <div className={styles.head}>
                        <h1>Oeuvre</h1>
                        <h3>Création d&apos;une nouvelle oeuvre</h3>
                        <Button
                            text={"Créer"}
                            onClick={() => console.log("create")}
                            isLoading={loading}
                            disabled={loading}
                        />
                    </div>
                    <div className={styles.sectionList}>
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
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
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
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
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
                            required
                        >
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
                                    <span>
                                        <FaRegImages/>
                                    </span>
                                    <div>
                                        <p>Images</p>
                                    </div>
                                </div>
                                <div className={styles.imgOeuvreContainer}>
                                    <div className={styles.addSpace}>
                                        <p className={styles.icon}><BiSolidImageAdd/></p>
                                        <p className={styles.text}>Glisser ou Cliquer pour ajouter une image</p>
                                    </div>
                                    <div className={styles.imgContainer}>
                                        <Image
                                            src={'/assets/img/magazine/cathedrale-reims.png'}
                                            alt={'Image de test'}
                                            layout={'fill'}
                                        />
                                        <button>
                                            <ImCross/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ArtisteNewSectionItem>
                        <ArtisteNewSectionItem
                            sectionName={"Artistes"}
                            required>
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
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
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
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
                            required
                        >
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
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
                            <div className={styles.specialSection}>
                                <div className={styles.specialSectionHead}>
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
            </main>
        </Admin>
    );
}