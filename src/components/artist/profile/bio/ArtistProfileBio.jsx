import React, {useState} from 'react';
import styles from './ArtistProfileBio.module.scss';
import {BiChevronsDown, BiChevronsUp} from "react-icons/bi";

export default function ArtistProfileBio({content}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    const maxWord = 150;

    return (
        <div className={styles.main}>
            <p className={`${isExpanded ? styles.expanded : styles.fadeEnd}`}>{content}</p>
            {content.split(' ').length > maxWord && (
                <div className={styles.buttonSpace}>
                    <button onClick={handleToggleExpand} className={styles.toggleButton}>
                        {isExpanded ? <BiChevronsUp className={styles.up}/> : <BiChevronsDown className={styles.down}/>}
                    </button>
                </div>
            )}
        </div>
    );
}
