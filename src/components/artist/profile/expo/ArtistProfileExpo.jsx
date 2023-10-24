import {useState} from "react";
import ArtistProfileExpoItem from "@/components/artist/profile/expo/ArtistProfileExpoItem";

import styles from './ArtistProfileExpo.module.scss';

export default function ArtistProfileExpo({expositions}) {

    const [openIndex, setOpenIndex] = useState(null);

    const handleItemClick = (index) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <div className={styles.main}>
            {expositions.map((expo, index) => (
                <ArtistProfileExpoItem
                    item={expo}
                    isOpen={index === openIndex}
                    onClick={() => handleItemClick(index)}
                    key={index}
                />
            ))}
        </div>
    );
}
