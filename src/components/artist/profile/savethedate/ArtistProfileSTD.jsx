import ArtistSTDItem from "@/components/artist/profile/savethedate/ArtistSTDItem";

import styles from './ArtistProfileSTD.module.scss';

export default function ArtistProfilSTD({stdList}) {

    return (
        <div className={styles.main}>
            {stdList.map((stdItem, index) => (
                <ArtistSTDItem
                    stdItem={stdItem}
                    key={index}
                />
            ))}
        </div>
    )
}