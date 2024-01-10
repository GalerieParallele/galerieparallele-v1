import styles from './DashboardEditPotraitChinoisCard.module.scss';
import {FaEdit, FaEye, FaEyeSlash, FaRegSave, FaRegTrashAlt} from "react-icons/fa";
import {useState} from "react";
import {IoMdReturnLeft} from "react-icons/io";
import Switch from "react-switch";
import LittleSpinner from "@/components/items/LittleSpinner";

export default function DashboardEditPotraitChinoisCard({question, response, visibility}) {

    const [editCard, setEditCard] = useState(false);
    const [questionValue, setQuestionValue] = useState(question);
    const [responseValue, setResponseValue] = useState(response);
    const [visibilityValue, setVisibilityValue] = useState(visibility);

    return (
        <div className={styles.main}>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
            }}>
                <div className={styles.row}>
                    {
                        editCard ?
                            <input
                                type="text"
                                value={questionValue}
                                onChange={(e) => setQuestionValue(e.target.value)}
                            />
                            :
                            <h3>{question}</h3>
                    }
                </div>
                <div className={styles.row}>
                    {
                        editCard ?
                            <input
                                type="text"
                                value={responseValue}
                                onChange={(e) => setResponseValue(e.target.value)}
                            />
                            :
                            <p>{response}</p>
                    }
                </div>
            </div>
            <div className={styles.actions}>
                {
                    !editCard ?
                        <>
                            <div>
                                <Switch
                                    checked={visibilityValue}
                                    onChange={() => setVisibilityValue(!visibilityValue)}
                                    uncheckedIcon={<div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%',
                                        color: 'white',
                                    }}><FaEye/></div>}
                                    checkedIcon={<div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%',
                                        color: 'white',
                                    }}><FaEyeSlash/></div>}
                                />
                            </div>
                            <button
                                className={styles.edit}
                                onClick={() => setEditCard(true)}>
                                <FaEdit/>
                            </button>
                            <button
                                className={styles.delete}
                                onClick={() => console.log("Delete")}>
                                <FaRegTrashAlt/>
                            </button>
                        </>
                        :
                        <>
                            <button
                                className={styles.return}
                                onClick={() => setEditCard(false)}>
                                <IoMdReturnLeft/>
                            </button>
                            <button
                                className={styles.save}
                                onClick={() => console.log("Save")}>
                                <FaRegSave/>
                            </button>
                        </>
                }
            </div>
        </div>
    )

}