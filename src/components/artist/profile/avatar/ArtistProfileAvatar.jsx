import Image from "next/image";

import styles from './ArtistProfileAvatar.module.scss';

export default function ArtistProfilAvatar({imgSrc, descImg}) {
    return (
        <div className={styles.imgContainer}>
            <Image
                src={imgSrc}
                alt={descImg}
                width={200}
                height={200}
            />
        </div>
    )
}