import Image from "next/image";

import styles from './ArtistSTDItem.module.scss';
import {AiOutlineClose, AiOutlinePlus} from "react-icons/ai";
import {useState} from "react";

export default function ArtistSTDItem({stdItem}) {

    const [modalOpen, setModalOpen] = useState(false);

    const handleModalToggle = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div className={styles.main}>
            <button
                onClick={handleModalToggle}
                className={styles.item}>
                <div
                    className={styles.overlay}
                >
                    <AiOutlinePlus/>
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.imgContainer}>
                        <Image
                            src={stdItem.photoURL}
                            alt={stdItem.photoDescription}
                            width={1000}
                            height={1000}
                        />
                    </div>
                    <div className={styles.date}>
                        <p>{stdItem.date}</p>
                    </div>
                </div>
            </button>
            {modalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalFilter}/>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHead}>
                            <div className={styles.imgContainer}>
                                <Image
                                    src={stdItem.photoURL}
                                    alt={stdItem.photoDescription}
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                        </div>
                        <div className={styles.modalMain}>
                            <h3>{stdItem.title}</h3>
                            <p>{stdItem.description}</p>
                        </div>
                        <button className={styles.button} onClick={handleModalToggle}>
                            <AiOutlineClose className={styles.buttonIcon}/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
