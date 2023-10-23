import React, { useState } from 'react';
import styles from './ArtistProfileBio.module.scss';

export default function ArtistProfileBio({ content }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className={styles.main}>
            <p className={isExpanded ? styles.expanded : ''}>{content}</p>
            {content.split(' ').length > 70 && (
                <div className={styles.buttonSpace}>
                    <button onClick={handleToggleExpand} className={styles.toggleButton}>
                        {isExpanded ? 'Voir moins' : 'Voir plus'}
                    </button>
                </div>
            )}
        </div>
    );
}
