import React, {useState} from 'react';
import styles from './ArtistProfileBio.module.scss';
import {BiChevronsDown, BiChevronsUp} from "react-icons/bi";

export default function ArtistProfileBio({content}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggleExpand = () => setIsExpanded(!isExpanded);

    const maxWord = 150;
    const wordCount = content.split(' ').length;
    const shouldShowToggle = wordCount > maxWord;

    const contentClass = isExpanded ? styles.expanded : (shouldShowToggle ? styles.fadeEnd : '');

    return (
        <div className={styles.main}>
            <div className={contentClass}>
                <div dangerouslySetInnerHTML={{__html: content}} />
            </div>
            {shouldShowToggle && (
                <div className={styles.buttonSpace}>
                    <button onClick={handleToggleExpand} className={styles.toggleButton}>
                        {isExpanded ? <BiChevronsUp className={styles.up}/> : <BiChevronsDown className={styles.down}/>}
                    </button>
                </div>
            )}
        </div>
    );
}
